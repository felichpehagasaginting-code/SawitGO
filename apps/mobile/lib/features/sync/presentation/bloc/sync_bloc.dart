import 'dart:async';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:isar/isar.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'sync_event.dart';
import 'sync_state.dart';
import '../../data/sync_remote_datasource.dart';
import '../../../harvest/data/models/harvest_log_local.dart';
import '../../data/pending_sync_queue.dart';

class SyncBloc extends Bloc<SyncEvent, SyncState> {
  final Isar isar;
  final SyncRemoteDataSource remoteDataSource;
  final Connectivity connectivity;
  Timer? _autoSyncTimer;

  SyncBloc({
    required this.isar,
    required this.remoteDataSource,
    required this.connectivity,
  }) : super(const SyncIdleState()) {
    on<TriggerAutoSyncEvent>(_onTriggerSync);
    on<ManualSyncRequestedEvent>(_onTriggerSync);

    _initPeriodicSyncObserver();
  }

  void _initPeriodicSyncObserver() {
    // 1. Sinkronisasi instan otomatis saat jaringan terhubung (Reactive Fast Sync)
    connectivity.onConnectivityChanged.listen((results) {
      if (!results.contains(ConnectivityResult.none)) {
        add(const TriggerAutoSyncEvent('DEVICE-REACTIVE-CONNECTIVITY'));
      }
    });

    // 2. Heartbeat timer setiap 15 detik untuk verifikasi antrean offline
    _autoSyncTimer = Timer.periodic(const Duration(seconds: 15), (timer) async {
      final connectivityResult = await connectivity.checkConnectivity();
      if (!connectivityResult.contains(ConnectivityResult.none)) {
        add(const TriggerAutoSyncEvent('DEVICE-AUTO-TIMER'));
      }
    });
  }

  Future<void> _onTriggerSync(SyncEvent event, Emitter<SyncState> emit) async {
    final pendingLogs = await isar.localHarvestLogs
        .filter()
        .isSyncedEqualTo(false)
        .limit(50)
        .findAll();

    if (pendingLogs.isEmpty) {
      emit(const SyncIdleState(pendingCount: 0));
      return;
    }

    emit(SyncInProgressState(pendingLogs.length));

    try {
      final deviceId = (event is TriggerAutoSyncEvent)
          ? event.deviceId
          : (event as ManualSyncRequestedEvent).deviceId;

      final response = await remoteDataSource.sendBatchSync(
        deviceId: deviceId,
        items: pendingLogs,
      );

      final data = response['data'] ?? response;
      final processedItems = (data['processedItems'] as List<dynamic>?) ?? [];

      int successCount = 0;
      int conflictCount = 0;

      await isar.writeTxn(() async {
        for (final item in processedItems) {
          final serverId = item['id']?.toString();
          final status = item['status']?.toString();

          final localLog = await isar.localHarvestLogs
              .filter()
              .serverIdEqualTo(serverId ?? '')
              .findFirst();

          if (localLog != null) {
            if (status == 'ACCEPTED_NEW' ||
                status == 'ACCEPTED_OVERWRITE' ||
                status == 'IGNORED_IDEMPOTENT') {
              localLog.isSynced = true;
              localLog.syncStatus = 'SYNCED';
              await isar.localHarvestLogs.put(localLog);
              successCount++;
            } else if (status == 'REJECTED_STALE') {
              // 409 Stale: Server data memenangkan konsensus
              localLog.isSynced = true;
              localLog.syncStatus = 'REJECTED_STALE';
              await isar.localHarvestLogs.put(localLog);
              conflictCount++;
            }
          }

          // Bersihkan item dari PendingSyncQueue
          final queueItem = await isar.pendingSyncQueues
              .filter()
              .harvestLogServerIdEqualTo(serverId ?? '')
              .findFirst();
          if (queueItem != null) {
            await isar.pendingSyncQueues.delete(queueItem.localId);
          }
        }
      });

      emit(SyncSuccessState(syncedCount: successCount, conflictCount: conflictCount));

      // Kembali ke status idle dengan sisa antrean terbaru
      final remainingCount =
          await isar.localHarvestLogs.filter().isSyncedEqualTo(false).count();
      emit(SyncIdleState(pendingCount: remainingCount));
    } catch (e) {
      emit(SyncFailureState(e.toString()));
    }
  }

  @override
  Future<void> close() {
    _autoSyncTimer?.cancel();
    return super.close();
  }
}
