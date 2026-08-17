import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../../core/constants/app_colors.dart';
import '../bloc/sync_bloc.dart';
import '../bloc/sync_event.dart';
import '../bloc/sync_state.dart';

class SyncBottomSheet extends StatelessWidget {
  const SyncBottomSheet({super.key});

  static void show(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      builder: (ctx) => const SyncBottomSheet(),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: const Color(0xFF0C1D16),
        borderRadius: const BorderRadius.vertical(top: Radius.circular(28)),
        border: Border.all(color: AppColors.primaryEmerald.withOpacity(0.3)),
      ),
      child: SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Handle Bar
            Center(
              child: Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: Colors.white24,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Header
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Row(
                  children: [
                    Icon(Icons.sync_alt_rounded, color: AppColors.primaryEmerald, size: 24),
                    SizedBox(width: 8),
                    Text(
                      'Pusat Sinkronisasi Offline',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                  ],
                ),
                IconButton(
                  icon: const Icon(Icons.close, color: Colors.white54),
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
            const SizedBox(height: 16),

            // Sync Status Monitor
            BlocBuilder<SyncBloc, SyncState>(
              builder: (context, state) {
                final isSyncing = state is SyncInProgressState;

                return Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: AppColors.backgroundDark,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(
                      color: AppColors.primaryEmerald.withOpacity(0.3),
                    ),
                  ),
                  child: Column(
                    children: [
                      const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('Mode Sinkronisasi:', style: TextStyle(color: AppColors.textMuted, fontSize: 13)),
                          Row(
                            children: [
                              Icon(Icons.bolt, color: AppColors.primaryEmerald, size: 16),
                              SizedBox(width: 4),
                              Text(
                                'Store-and-Forward (30s)',
                                style: TextStyle(
                                  color: AppColors.primaryEmerald,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 13,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      const Divider(color: Colors.white10, height: 20),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text('Status Proses:', style: TextStyle(color: AppColors.textMuted, fontSize: 13)),
                          Text(
                            isSyncing ? 'Sedang Mengunggah...' : 'Siap Sinkronisasi',
                            style: const TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 13,
                            ),
                          ),
                        ],
                      ),
                      if (state is SyncSuccessState) ...[
                        const Divider(color: Colors.white10, height: 20),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text('Hasil Sync Terakhir:', style: TextStyle(color: AppColors.textMuted, fontSize: 12)),
                            Text(
                              '✅ ${state.syncedCount} Sukses (${state.conflictCount} Konflik)',
                              style: const TextStyle(color: AppColors.primaryEmerald, fontSize: 12, fontWeight: FontWeight.bold),
                            ),
                          ],
                        ),
                      ],
                      if (state is SyncFailureState) ...[
                        const Divider(color: Colors.white10, height: 20),
                        Text(
                          '⚠️ Info: ${state.errorMessage}',
                          style: const TextStyle(color: AppColors.signalAmber, fontSize: 12),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    ],
                  ),
                );
              },
            ),
            const SizedBox(height: 20),

            // Action Button
            BlocBuilder<SyncBloc, SyncState>(
              builder: (context, state) {
                final isSyncing = state is SyncInProgressState;
                return SizedBox(
                  height: 54,
                  child: ElevatedButton(
                    onPressed: isSyncing
                        ? null
                        : () {
                            HapticFeedback.mediumImpact();
                            context.read<SyncBloc>().add(const ManualSyncRequestedEvent('DEVICE-MANUAL'));
                          },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primaryEmerald,
                      foregroundColor: Colors.black,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      elevation: 4,
                    ),
                    child: isSyncing
                        ? const Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              SizedBox(
                                width: 20,
                                height: 20,
                                child: CircularProgressIndicator(strokeWidth: 2.5, color: Colors.black),
                              ),
                              SizedBox(width: 10),
                              Text('Mengunggah Batch Transaksi...', style: TextStyle(fontWeight: FontWeight.bold)),
                            ],
                          )
                        : const Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(Icons.cloud_upload_rounded),
                              SizedBox(width: 8),
                              Text(
                                'SINKRONISASI SEKARANG',
                                style: TextStyle(fontWeight: FontWeight.w900, fontSize: 14, letterSpacing: 0.5),
                              ),
                            ],
                          ),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
