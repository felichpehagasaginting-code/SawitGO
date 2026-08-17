import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../auth/domain/models/user_model.dart';

class ManagerAuditPage extends StatelessWidget {
  final UserModel user;

  const ManagerAuditPage({
    super.key,
    required this.user,
  });

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // 1. HERO EXECUTIVE CARD (Royal Purple Theme)
          Container(
            padding: const EdgeInsets.all(22),
            decoration: BoxDecoration(
              color: const Color(0xFF0D1612),
              borderRadius: BorderRadius.circular(32),
              border: Border.all(color: const Color(0xFFA855F7).withOpacity(0.4)),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.6),
                  blurRadius: 25,
                  offset: const Offset(0, 8),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Executive Estate Cockpit',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 16,
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                        SizedBox(height: 2),
                        Text(
                          'Otoritas Tertinggi (Manager Bobot W5)',
                          style: TextStyle(
                            color: Color(0xFFA855F7),
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                      decoration: BoxDecoration(
                        color: const Color(0xFFA855F7).withOpacity(0.15),
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: const Color(0xFFA855F7).withOpacity(0.4)),
                      ),
                      child: const Text(
                        'W5 SUPREME',
                        style: TextStyle(
                          color: Color(0xFFA855F7),
                          fontSize: 10,
                          fontWeight: FontWeight.w900,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 18),

                // Multi-Afdeling Total
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Total Kebun Hari Ini',
                          style: TextStyle(color: Colors.white60, fontSize: 11),
                        ),
                        const SizedBox(height: 2),
                        const Text(
                          '14.850 Janjang',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 26,
                            fontWeight: FontWeight.w900,
                            fontFamily: 'monospace',
                          ),
                        ),
                        Text(
                          'Target: 16.000 (92.8%)',
                          style: TextStyle(color: const Color(0xFFA855F7).withOpacity(0.9), fontSize: 11, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                    Container(
                      width: 50,
                      height: 50,
                      decoration: BoxDecoration(
                        color: const Color(0xFFA855F7).withOpacity(0.2),
                        borderRadius: BorderRadius.circular(18),
                      ),
                      child: const Icon(Icons.account_balance_rounded, color: Color(0xFFA855F7)),
                    ),
                  ],
                ),
                const SizedBox(height: 18),

                // EUDR EXPORT ACTION
                SizedBox(
                  width: double.infinity,
                  height: 52,
                  child: ElevatedButton.icon(
                    icon: const Icon(Icons.file_download_rounded, size: 18),
                    label: const Text('EKSPOR SERTIFIKAT EUDR (GEOJSON WGS84)', style: TextStyle(fontWeight: FontWeight.w900, fontSize: 12)),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFFA855F7),
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                    ),
                    onPressed: () {
                      HapticFeedback.heavyImpact();
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          backgroundColor: Color(0xFFA855F7),
                          content: Text('📄 GeoJSON FeatureCollection WGS84 Berhasil Diekspor untuk Audit Buyer!'),
                        ),
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // 2. SOFT LAVENDER CARD: AUDIT TRAIL LOG SINKRONISASI
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: const Color(0xFFF3E8FF),
              borderRadius: BorderRadius.circular(28),
              border: Border.all(color: const Color(0xFFDDD6FE)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'AUDIT LOG KONSENSUS RBAC (POSTGRESQL)',
                      style: TextStyle(
                        color: Color(0xFF5B21B6),
                        fontSize: 11,
                        fontWeight: FontWeight.w900,
                        letterSpacing: 0.5,
                      ),
                    ),
                    Icon(Icons.gavel_rounded, size: 16, color: Color(0xFF7C3AED)),
                  ],
                ),
                const SizedBox(height: 14),

                _buildAuditItem(
                  'ACCEPTED_OVERWRITE',
                  'TPH-01 di-override Asisten (W3) over Krani (W1)',
                  'Score: 3.72T > 1.72T • 110 Jjg',
                  const Color(0xFF047857),
                ),
                const Divider(color: Color(0xFFE9D5FF), height: 16),
                _buildAuditItem(
                  'REJECTED_STALE',
                  'Payload Krani TPH-01 ditolak otomatis oleh Conflict Engine',
                  'Score: 1.72T < 3.72T (Stale Data)',
                  const Color(0xFFB91C1C),
                ),
                const Divider(color: Color(0xFFE9D5FF), height: 16),
                _buildAuditItem(
                  'ACCEPTED_NEW',
                  'Pencatatan Baru TPH-04 diverifikasi masuk DB',
                  'Score: 1.72T • 140 Jjg',
                  const Color(0xFF047857),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),
        ],
      ),
    );
  }

  Widget _buildAuditItem(String badge, String title, String desc, Color badgeColor) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
              decoration: BoxDecoration(
                color: badgeColor.withOpacity(0.15),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                badge,
                style: TextStyle(
                  color: badgeColor,
                  fontSize: 9,
                  fontWeight: FontWeight.w900,
                  fontFamily: 'monospace',
                ),
              ),
            ),
            const Text(
              'Hari Ini • 12:00',
              style: TextStyle(color: Color(0xFF6D28D9), fontSize: 10),
            ),
          ],
        ),
        const SizedBox(height: 4),
        Text(
          title,
          style: const TextStyle(
            color: Color(0xFF4C1D95),
            fontWeight: FontWeight.w800,
            fontSize: 12,
          ),
        ),
        Text(
          desc,
          style: TextStyle(
            color: const Color(0xFF6D28D9).withOpacity(0.8),
            fontSize: 10,
            fontFamily: 'monospace',
          ),
        ),
      ],
    );
  }
}
