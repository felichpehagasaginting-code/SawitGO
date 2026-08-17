import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../../core/constants/app_colors.dart';
import '../../../auth/domain/models/user_model.dart';

class ManagerAuditPage extends StatelessWidget {
  final UserModel user;

  const ManagerAuditPage({
    super.key,
    required this.user,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.appBackground,
      appBar: AppBar(
        backgroundColor: AppColors.cardBackground,
        elevation: 0,
        scrolledUnderElevation: 0,
        leading: Navigator.canPop(context)
            ? IconButton(
                icon: const Icon(Icons.arrow_back_ios_new_rounded, size: 18, color: AppColors.textPrimary),
                onPressed: () => Navigator.pop(context),
              )
            : null,
        title: const Text(
          'Executive Estate Cockpit',
          style: TextStyle(
            fontFamily: 'Poppins',
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: AppColors.textPrimary,
          ),
        ),
        actions: [
          Container(
            margin: const EdgeInsets.only(right: 16),
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: const Color(0xFFF3E8FF),
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: const Color(0xFFDDD6FE)),
            ),
            child: const Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.shield_rounded, size: 12, color: Color(0xFF7C3AED)),
                SizedBox(width: 4),
                Text(
                  'Bobot W5',
                  style: TextStyle(
                    fontFamily: 'JetBrains Mono',
                    fontSize: 10,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF7C3AED),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // ==================== 1. EXECUTIVE HERO CARD ====================
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: const Color(0xFF0F172A),
                borderRadius: BorderRadius.circular(24),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.08),
                    blurRadius: 16,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'Ringkasan Seluruh Kebun',
                              style: TextStyle(
                                fontFamily: 'Inter',
                                fontSize: 12,
                                color: Color(0xFF94A3B8),
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              user.fullName,
                              style: const TextStyle(
                                fontFamily: 'Poppins',
                                fontSize: 15,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                              overflow: TextOverflow.ellipsis,
                            ),
                          ],
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: const Color(0xFF8B5CF6).withOpacity(0.2),
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: const Color(0xFF8B5CF6).withOpacity(0.4)),
                        ),
                        child: const Text(
                          'MANAGER W5',
                          style: TextStyle(
                            fontFamily: 'JetBrains Mono',
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFFA78BFA),
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),

                  // Total Janjang & Target
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            '14.850 Janjang',
                            style: TextStyle(
                              fontFamily: 'JetBrains Mono',
                              fontSize: 24,
                              fontWeight: FontWeight.w900,
                              color: Colors.white,
                              letterSpacing: -0.5,
                            ),
                          ),
                          const SizedBox(height: 2),
                          Row(
                            children: [
                              Container(
                                width: 6,
                                height: 6,
                                decoration: const BoxDecoration(
                                  color: Color(0xFF34D399),
                                  shape: BoxShape.circle,
                                ),
                              ),
                              const SizedBox(width: 6),
                              const Text(
                                '274.7 Ton TBS • Target 92.8%',
                                style: TextStyle(
                                  fontFamily: 'Inter',
                                  fontSize: 12,
                                  fontWeight: FontWeight.w500,
                                  color: Color(0xFF34D399),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      Container(
                        width: 44,
                        height: 44,
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.08),
                          borderRadius: BorderRadius.circular(14),
                        ),
                        child: const Icon(Icons.analytics_rounded, color: Colors.white, size: 22),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),

                  // EUDR Export Button
                  SizedBox(
                    width: double.infinity,
                    height: 44,
                    child: ElevatedButton.icon(
                      icon: const Icon(Icons.download_rounded, size: 16),
                      label: const Text(
                        'Ekspor Sertifikat EUDR (GeoJSON)',
                        style: TextStyle(
                          fontFamily: 'Poppins',
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF7C3AED),
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        elevation: 0,
                      ),
                      onPressed: () {
                        HapticFeedback.heavyImpact();
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            backgroundColor: Color(0xFF7C3AED),
                            content: Text(
                              '📄 File GeoJSON EUDR WGS84 Berhasil Diunduh untuk Audit Buyer!',
                              style: TextStyle(fontWeight: FontWeight.bold, fontFamily: 'Inter'),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // ==================== 2. AFDELING BREAKDOWN ====================
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: AppColors.cardBackground,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppColors.slateBorder),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Produksi per Afdeling Hari Ini',
                        style: TextStyle(
                          fontFamily: 'Poppins',
                          fontSize: 13,
                          fontWeight: FontWeight.bold,
                          color: AppColors.textPrimary,
                        ),
                      ),
                      Text(
                        '4 Afdeling',
                        style: TextStyle(
                          fontFamily: 'Inter',
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          color: AppColors.textSecondary,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),

                  _buildAfdelingRow('Afdeling Alpha', '3.820 Jjg', '70.6 Ton', 0.95, const Color(0xFF10B981)),
                  const Divider(color: AppColors.slateBorder, height: 16),
                  _buildAfdelingRow('Afdeling Beta', '4.150 Jjg', '76.8 Ton', 1.04, const Color(0xFF06B6D4)),
                  const Divider(color: AppColors.slateBorder, height: 16),
                  _buildAfdelingRow('Afdeling Gamma', '3.410 Jjg', '63.1 Ton', 0.85, const Color(0xFFF59E0B)),
                  const Divider(color: AppColors.slateBorder, height: 16),
                  _buildAfdelingRow('Afdeling Delta', '3.470 Jjg', '64.2 Ton', 0.87, const Color(0xFF8B5CF6)),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // ==================== 3. AUDIT TRAIL LOG KONSENSUS ====================
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: AppColors.cardBackground,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppColors.slateBorder),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Audit Trail Konsensus Server',
                        style: TextStyle(
                          fontFamily: 'Poppins',
                          fontSize: 13,
                          fontWeight: FontWeight.bold,
                          color: AppColors.textPrimary,
                        ),
                      ),
                      Icon(Icons.verified_user_rounded, size: 16, color: Color(0xFF7C3AED)),
                    ],
                  ),
                  const SizedBox(height: 12),

                  _buildAuditItem(
                    badge: 'ACCEPTED_OVERWRITE',
                    title: 'TPH-01 di-override Asisten (W3) over Krani (W1)',
                    desc: 'Prioritas Score: 3.72T > 1.72T • 110 Janjang',
                    badgeColor: const Color(0xFF16A34A),
                    timeAgo: '12 menit lalu',
                  ),
                  const Divider(color: AppColors.slateBorder, height: 16),
                  _buildAuditItem(
                    badge: 'REJECTED_STALE',
                    title: 'Payload Krani TPH-01 ditolak otomatis oleh Konflik Engine',
                    desc: 'Prioritas Score: 1.72T < 3.72T (Stale Mutasi)',
                    badgeColor: const Color(0xFFDC2626),
                    timeAgo: '25 menit lalu',
                  ),
                  const Divider(color: AppColors.slateBorder, height: 16),
                  _buildAuditItem(
                    badge: 'ACCEPTED_NEW',
                    title: 'Pencatatan Baru TPH-04 diverifikasi masuk PostGIS',
                    desc: 'Prioritas Score: 1.72T • 140 Janjang',
                    badgeColor: const Color(0xFF16A34A),
                    timeAgo: '1 jam lalu',
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  static Widget _buildAfdelingRow(String name, String janjang, String ton, double ratio, Color color) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              name,
              style: const TextStyle(
                fontFamily: 'Inter',
                fontSize: 12,
                fontWeight: FontWeight.bold,
                color: AppColors.textPrimary,
              ),
            ),
            Text(
              '$janjang ($ton)',
              style: const TextStyle(
                fontFamily: 'JetBrains Mono',
                fontSize: 11,
                fontWeight: FontWeight.bold,
                color: AppColors.textSecondary,
              ),
            ),
          ],
        ),
        const SizedBox(height: 6),
        ClipRRect(
          borderRadius: BorderRadius.circular(4),
          child: LinearProgressIndicator(
            value: (ratio / 1.1).clamp(0.0, 1.0),
            backgroundColor: const Color(0xFFF1F5F9),
            valueColor: AlwaysStoppedAnimation<Color>(color),
            minHeight: 5,
          ),
        ),
      ],
    );
  }

  static Widget _buildAuditItem({
    required String badge,
    required String title,
    required String desc,
    required Color badgeColor,
    required String timeAgo,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
              decoration: BoxDecoration(
                color: badgeColor.withOpacity(0.12),
                borderRadius: BorderRadius.circular(6),
              ),
              child: Text(
                badge,
                style: TextStyle(
                  color: badgeColor,
                  fontSize: 9,
                  fontWeight: FontWeight.bold,
                  fontFamily: 'JetBrains Mono',
                ),
              ),
            ),
            Text(
              timeAgo,
              style: const TextStyle(
                fontFamily: 'Inter',
                color: AppColors.textSecondary,
                fontSize: 10,
              ),
            ),
          ],
        ),
        const SizedBox(height: 4),
        Text(
          title,
          style: const TextStyle(
            fontFamily: 'Inter',
            color: AppColors.textPrimary,
            fontWeight: FontWeight.w600,
            fontSize: 12,
          ),
        ),
        const SizedBox(height: 2),
        Text(
          desc,
          style: const TextStyle(
            fontFamily: 'JetBrains Mono',
            color: AppColors.textSecondary,
            fontSize: 10,
          ),
        ),
      ],
    );
  }
}
