import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../../core/constants/app_colors.dart';
import '../../../auth/domain/models/user_model.dart';
import '../../data/repositories/harvest_repository.dart';

class AsistenOverridePage extends StatefulWidget {
  final HarvestRepository repository;
  final UserModel user;

  const AsistenOverridePage({
    super.key,
    required this.repository,
    required this.user,
  });

  @override
  State<AsistenOverridePage> createState() => _AsistenOverridePageState();
}

class _AsistenOverridePageState extends State<AsistenOverridePage> {
  int _overrideJanjang = 110;
  bool _isOverrideSaved = false;

  void _executeAsistenOverride() {
    HapticFeedback.heavyImpact();
    setState(() => _isOverrideSaved = true);

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        backgroundColor: Color(0xFF0891B2),
        duration: Duration(seconds: 2),
        content: Text(
          '⚖️ Koreksi Asisten Berhasil Diterapkan! Skor Prioritas W3 Menang Mutlak atas Krani W1.',
          style: TextStyle(fontWeight: FontWeight.bold, fontFamily: 'Inter'),
        ),
      ),
    );
  }

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
          'Inspeksi & Override Lapangan',
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
              color: const Color(0xFFECFEFF),
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: const Color(0xFFA5F3FC)),
            ),
            child: const Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.verified_rounded, size: 12, color: Color(0xFF0891B2)),
                SizedBox(width: 4),
                Text(
                  'Bobot W3',
                  style: TextStyle(
                    fontFamily: 'JetBrains Mono',
                    fontSize: 10,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF0891B2),
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
            // ==================== 1. TPH TARGET OVERRIDE CARD ====================
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppColors.cardBackground,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppColors.slateBorder),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.02),
                    blurRadius: 10,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Inspeksi Mutu TPH-01',
                              style: TextStyle(
                                fontFamily: 'Poppins',
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                                color: AppColors.textPrimary,
                              ),
                              overflow: TextOverflow.ellipsis,
                            ),
                            SizedBox(height: 2),
                            Text(
                              'Blok B012 • Afdeling Alpha',
                              style: TextStyle(
                                fontFamily: 'Inter',
                                fontSize: 12,
                                color: AppColors.textSecondary,
                              ),
                            ),
                          ],
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: const Color(0xFFECFEFF),
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(color: const Color(0xFFA5F3FC)),
                        ),
                        child: const Text(
                          'KOREKSI ASISTEN',
                          style: TextStyle(
                            fontFamily: 'JetBrains Mono',
                            fontSize: 9,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFF0891B2),
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),

                  // BEFORE vs AFTER COMPARISON
                  Row(
                    children: [
                      // Krani TPH Card
                      Expanded(
                        child: Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: const Color(0xFFFEF2F2),
                            borderRadius: BorderRadius.circular(14),
                            border: Border.all(color: const Color(0xFFFEE2E2)),
                          ),
                          child: const Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Data Krani (W1)',
                                style: TextStyle(
                                  fontFamily: 'Inter',
                                  fontSize: 10,
                                  color: Color(0xFF991B1B),
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              SizedBox(height: 4),
                              Text(
                                '120 Jjg',
                                style: TextStyle(
                                  fontFamily: 'JetBrains Mono',
                                  color: Color(0xFF991B1B),
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  decoration: TextDecoration.lineThrough,
                                ),
                              ),
                              SizedBox(height: 2),
                              Text(
                                'Score 1.72T (Terkoreksi)',
                                style: TextStyle(
                                  fontFamily: 'Inter',
                                  color: Color(0xFFB91C1C),
                                  fontSize: 9,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      const SizedBox(width: 10),

                      // Asisten Correction Card
                      Expanded(
                        child: Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: const Color(0xFFECFEFF),
                            borderRadius: BorderRadius.circular(14),
                            border: Border.all(color: const Color(0xFFA5F3FC)),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'Koreksi Asisten (W3)',
                                style: TextStyle(
                                  fontFamily: 'Inter',
                                  fontSize: 10,
                                  color: Color(0xFF0891B2),
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                '$_overrideJanjang Jjg',
                                style: const TextStyle(
                                  fontFamily: 'JetBrains Mono',
                                  color: Color(0xFF0E7490),
                                  fontSize: 18,
                                  fontWeight: FontWeight.w900,
                                ),
                              ),
                              const SizedBox(height: 2),
                              const Text(
                                'Score 3.72T (Prioritas)',
                                style: TextStyle(
                                  fontFamily: 'Inter',
                                  color: Color(0xFF0891B2),
                                  fontSize: 9,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),

                  // ADJUST COUNTER
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        'Sesuaikan Fisik Aktual:',
                        style: TextStyle(
                          fontFamily: 'Inter',
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: AppColors.textPrimary,
                        ),
                      ),
                      Row(
                        children: [
                          _buildStepBtn(Icons.remove, () {
                            HapticFeedback.lightImpact();
                            setState(() => _overrideJanjang = (_overrideJanjang - 5).clamp(0, 9999));
                          }),
                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 12),
                            child: Text(
                              '$_overrideJanjang',
                              style: const TextStyle(
                                fontFamily: 'JetBrains Mono',
                                fontSize: 20,
                                fontWeight: FontWeight.w900,
                                color: AppColors.textPrimary,
                              ),
                            ),
                          ),
                          _buildStepBtn(Icons.add, () {
                            HapticFeedback.lightImpact();
                            setState(() => _overrideJanjang = (_overrideJanjang + 5).clamp(0, 9999));
                          }, isAdd: true),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),

                  // OVERRIDE EXECUTE BUTTON
                  SizedBox(
                    width: double.infinity,
                    height: 48,
                    child: ElevatedButton(
                      onPressed: _executeAsistenOverride,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF0891B2),
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                        elevation: 0,
                      ),
                      child: Text(
                        _isOverrideSaved ? '✓ DATA BERHASIL DI-OVERRIDE' : 'EKSEKUSI KOREKSI DATA (W3 MENANG)',
                        style: const TextStyle(
                          fontFamily: 'Poppins',
                          fontWeight: FontWeight.bold,
                          fontSize: 13,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // ==================== 2. RESTAN DISPATCH CARD ====================
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: const Color(0xFFFFFBEB),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: const Color(0xFFFDE68A)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Dispatch Truk Evakuasi Restan',
                        style: TextStyle(
                          fontFamily: 'Poppins',
                          fontSize: 13,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF92400E),
                        ),
                      ),
                      Icon(Icons.local_shipping_rounded, size: 18, color: Color(0xFFD97706)),
                    ],
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'TPH-03 (Blok B014) telah menumpuk > 24 Jam (FFA > 4.5%). Segera alokasikan unit transportasi.',
                    style: TextStyle(
                      fontFamily: 'Inter',
                      fontSize: 11,
                      color: Color(0xFF78350F),
                      height: 1.4,
                    ),
                  ),
                  const SizedBox(height: 12),
                  SizedBox(
                    width: double.infinity,
                    height: 44,
                    child: ElevatedButton.icon(
                      icon: const Icon(Icons.send_rounded, size: 16),
                      label: const Text(
                        'KIRIM DISPATCH TRUK DT-08 KE TPH-03',
                        style: TextStyle(
                          fontFamily: 'Poppins',
                          fontSize: 11,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFFD97706),
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        elevation: 0,
                      ),
                      onPressed: () {
                        HapticFeedback.heavyImpact();
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            backgroundColor: Color(0xFFD97706),
                            content: Text(
                              '🚛 Tiket Dispatch Berhasil Diterbitkan untuk Unit Truk DT-08!',
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
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  static Widget _buildStepBtn(IconData icon, VoidCallback onTap, {bool isAdd = false}) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 36,
        height: 36,
        decoration: BoxDecoration(
          color: isAdd ? const Color(0xFF0891B2) : const Color(0xFFF1F5F9),
          borderRadius: BorderRadius.circular(10),
          border: Border.all(
            color: isAdd ? const Color(0xFF0891B2) : const Color(0xFFE2E8F0),
          ),
        ),
        child: Icon(
          icon,
          size: 18,
          color: isAdd ? Colors.white : AppColors.textPrimary,
        ),
      ),
    );
  }
}
