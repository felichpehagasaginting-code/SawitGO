import 'dart:convert';
import 'package:isar/isar.dart';
import 'package:uuid/uuid.dart';
import '../../../../core/constants/role_weights.dart';
import '../../../../core/crypto/local_crypto_service.dart';
import '../models/harvest_log_local.dart';
import '../../../sync/data/pending_sync_queue.dart';

class HarvestRepository {
  final Isar isar;
  final _uuid = const Uuid();

  HarvestRepository(this.isar);

  Future<LocalHarvestLog> createOfflineHarvest({
    required String tphId,
    required String blockId,
    required String blockCode,
    required String tphNumber,
    required String userId,
    required String userName,
    required int userRoleWeight,
    required DateTime harvestDate,
    required int janjangCount,
    required double brondolanWeightKg,
    required double estimatedWeightKg,
    required int mentahCount,
    required int masakCount,
    required int lewatMasakCount,
    required int tangkaiPanjangCount,
    required double latitude,
    required double longitude,
    required double gpsAccuracy,
  }) async {
    final serverId = _uuid.v4();
    final clientTimestampMs = DateTime.now().millisecondsSinceEpoch;
    final priorityScore = RoleWeights.calculatePriorityScore(userRoleWeight, clientTimestampMs);
    final idempotencyKey = 'IDEMP-$serverId-$clientTimestampMs';

    final log = LocalHarvestLog()
      ..serverId = serverId
      ..tphId = tphId
      ..blockId = blockId
      ..blockCode = blockCode
      ..tphNumber = tphNumber
      ..userId = userId
      ..userName = userName
      ..userRoleWeight = userRoleWeight
      ..harvestDate = harvestDate
      ..janjangCount = janjangCount
      ..brondolanWeightKg = brondolanWeightKg
      ..estimatedWeightKg = estimatedWeightKg
      ..mentahCount = mentahCount
      ..masakCount = masakCount
      ..lewatMasakCount = lewatMasakCount
      ..tangkaiPanjangCount = tangkaiPanjangCount
      ..latitude = latitude
      ..longitude = longitude
      ..gpsAccuracy = gpsAccuracy
      ..clientTimestampMs = clientTimestampMs
      ..priorityScore = priorityScore
      ..idempotencyKey = idempotencyKey
      ..isSynced = false
      ..syncStatus = 'QUEUED'
      ..createdAt = DateTime.now()
      ..updatedAt = DateTime.now();

    // Enkripsi Payload untuk antrean pengiriman offline (AES-256)
    final payloadMap = {
      'id': serverId,
      'tphId': tphId,
      'blockId': blockId,
      'harvestDate': harvestDate.toIso8601String().split('T')[0],
      'janjangCount': janjangCount,
      'brondolanWeightKg': brondolanWeightKg,
      'clientTimestampMs': clientTimestampMs,
      'priorityScore': priorityScore,
      'idempotencyKey': idempotencyKey,
    };
    final encryptedJson = await LocalCryptoService.encryptPayload(jsonEncode(payloadMap));

    final queueItem = PendingSyncQueue()
      ..harvestLogServerId = serverId
      ..httpMethod = 'POST'
      ..endpoint = '/api/v1/sync/batch'
      ..payloadJson = encryptedJson
      ..retryCount = 0
      ..createdAt = DateTime.now();

    await isar.writeTxn(() async {
      await isar.localHarvestLogs.put(log);
      await isar.pendingSyncQueues.put(queueItem);
    });

    return log;
  }
}
