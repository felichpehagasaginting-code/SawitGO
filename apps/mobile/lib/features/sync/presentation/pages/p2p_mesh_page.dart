import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../../core/constants/app_colors.dart';
import '../../../auth/domain/models/user_model.dart';
import '../../../harvest/data/repositories/harvest_repository.dart';

class P2pMeshPage extends StatefulWidget {
  final HarvestRepository repository;
  final UserModel user;

  const P2pMeshPage({
    super.key,
    required this.repository,
    required this.user,
  });

  @override
  State<P2pMeshPage> createState() => _P2pMeshPageState();
}

class _P2pMeshPageState extends State<P2pMeshPage> with SingleTickerProviderStateMixin {
  late AnimationController _radarController;
  bool _isTransferring = false;
  bool _isTransferComplete = false;

  @override
  void initState() {
    super.initState();
    _radarController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat();
  }

  @override
  void dispose() {
    _radarController.dispose();
    super.dispose();
  }

  Future<void> _startP2pTransfer() async {
    setState(() => _isTransferring = true);
    HapticFeedback.heavyImpact();

    await Future.delayed(const Duration(seconds: 2));

    if (mounted) {
      setState(() {
        _isTransferring = false;
        _isTransferComplete = true;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          backgroundColor: AppColors.statusSynced,
          content: Text('📡 3 Batch Panen Berhasil Ditransfer ke Unit Truk DT-08!'),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.appBackground,
      appBar: AppBar(
        backgroundColor: AppColors.cardBackground,
        elevation: 0,
        scrolledUnderElevation: 0,
        title: const Text(
          'P2P Data Mule & Sync',
          style: TextStyle(
            fontFamily: 'Poppins',
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: AppColors.textPrimary,
          ),
        ),
      ),
      body: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // 1. HERO RADAR CARD: P2P DATA MULE DISCOVERY
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppColors.cardBackground,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppColors.slateBorder),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.02),
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Radar Truk Data Mule',
                            style: TextStyle(
                              fontFamily: 'Poppins',
                              color: AppColors.textPrimary,
                              fontSize: 15,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          SizedBox(height: 2),
                          Text(
                            'Koneksi Nirkabel BLE & Wi-Fi Direct',
                            style: TextStyle(
                              fontFamily: 'Inter',
                              color: AppColors.textSecondary,
                              fontSize: 11,
                            ),
                          ),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: const Color(0xFFEFF8FF),
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: const Color(0xFFB2DDFF)),
                        ),
                        child: const Row(
                          children: [
                            Icon(Icons.radar_rounded, size: 12, color: Color(0xFF175CD3)),
                            SizedBox(width: 4),
                            Text(
                              'AKTIF',
                              style: TextStyle(
                                fontFamily: 'Inter',
                                color: Color(0xFF175CD3),
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),

                  // RADAR ANIMATION CONTAINER
                  Stack(
                    alignment: Alignment.center,
                    children: [
                      RotationTransition(
                        turns: _radarController,
                        child: Container(
                          width: 130,
                          height: 130,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(color: const Color(0xFF175CD3).withOpacity(0.2), width: 2),
                          ),
                        ),
                      ),
                      Container(
                        width: 90,
                        height: 90,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: const Color(0xFFEFF8FF),
                          border: Border.all(color: const Color(0xFF175CD3).withOpacity(0.3)),
                        ),
                      ),
                      const Icon(Icons.local_shipping_rounded, color: Color(0xFF175CD3), size: 36),
                    ],
                  ),
                  const SizedBox(height: 18),

                  const Text(
                    'Unit Truk DT-08 Terdeteksi (15m)',
                    style: TextStyle(
                      fontFamily: 'Poppins',
                      color: AppColors.textPrimary,
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const Text(
                    'Driver: Pak Joko Widodo • RSSI: -48 dBm (Sangat Kuat)',
                    style: TextStyle(
                      fontFamily: 'Inter',
                      color: AppColors.textSecondary,
                      fontSize: 11,
                    ),
                  ),
                  const SizedBox(height: 18),

                  // TRANSFER BUTTON
                  SizedBox(
                    width: double.infinity,
                    height: 48,
                    child: ElevatedButton.icon(
                      icon: _isTransferring
                          ? const SizedBox(
                              width: 18,
                              height: 18,
                              child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
                            )
                          : Icon(_isTransferComplete ? Icons.check_circle_rounded : Icons.wifi_protected_setup_rounded, size: 18),
                      label: Text(
                        _isTransferring
                            ? 'MENTRANSFER BATCH...'
                            : _isTransferComplete
                                ? '✓ BATCH BERHASIL DITRANSFER'
                                : 'KIRIM 3 BATCH KE TRUK (OFFLINE)',
                        style: const TextStyle(
                          fontFamily: 'Poppins',
                          fontWeight: FontWeight.bold,
                          fontSize: 12,
                        ),
                      ),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: _isTransferComplete ? AppColors.statusSynced : const Color(0xFF175CD3),
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                      ),
                      onPressed: _isTransferring ? null : _startP2pTransfer,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // 2. QUEUE PAYLOAD CARD
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: AppColors.cardBackground,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.slateBorder),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'ANTREAN DATA TPH LOKAL',
                        style: TextStyle(
                          fontFamily: 'Inter',
                          color: AppColors.textSecondary,
                          fontSize: 11,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Icon(Icons.inventory_2_rounded, size: 16, color: AppColors.textSecondary),
                    ],
                  ),
                  const SizedBox(height: 12),
                  _buildPayloadRow('Payload #01 • TPH-04 (65 Jjg)', 'Enkripsi AES-256 GCM', '1.2 Ton', false),
                  const Divider(color: AppColors.slateBorder, height: 16),
                  _buildPayloadRow('Payload #02 • TPH-02 (45 Jjg)', 'Enkripsi AES-256 GCM', '0.8 Ton', true),
                  const Divider(color: AppColors.slateBorder, height: 16),
                  _buildPayloadRow('Payload #03 • TPH-01 (35 Jjg)', 'Enkripsi AES-256 GCM', '0.6 Ton', true),
                ],
              ),
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }

  Widget _buildPayloadRow(String title, String subtitle, String tonase, bool isSynced) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: const TextStyle(
                fontFamily: 'Inter',
                color: AppColors.textPrimary,
                fontWeight: FontWeight.w600,
                fontSize: 12,
              ),
            ),
            Text(
              subtitle,
              style: const TextStyle(
                fontFamily: 'Inter',
                color: AppColors.textSecondary,
                fontSize: 10,
              ),
            ),
          ],
        ),
        Row(
          children: [
            Text(
              tonase,
              style: const TextStyle(
                fontFamily: 'JetBrains Mono',
                fontWeight: FontWeight.bold,
                fontSize: 12,
                color: AppColors.textPrimary,
              ),
            ),
            const SizedBox(width: 8),
            Container(
              width: 8,
              height: 8,
              decoration: BoxDecoration(
                color: isSynced ? AppColors.statusSynced : AppColors.statusPending,
                shape: BoxShape.circle,
              ),
            ),
          ],
        ),
      ],
    );
  }
}
