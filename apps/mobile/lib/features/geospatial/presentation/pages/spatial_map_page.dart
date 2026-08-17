import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../../core/constants/app_colors.dart';
import '../../../auth/domain/models/user_model.dart';

class SpatialMapPage extends StatefulWidget {
  final UserModel user;

  const SpatialMapPage({
    super.key,
    required this.user,
  });

  @override
  State<SpatialMapPage> createState() => _SpatialMapPageState();
}

class _SpatialMapPageState extends State<SpatialMapPage> {
  String _selectedTph = 'TPH-01 (Blok B012)';
  String _selectedStatus = '🟢 Normal • Selesai Panen';
  int _selectedJanjang = 125;
  String _selectedGps = '0.53775 N, 101.44520 E';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.appBackground,
      appBar: AppBar(
        backgroundColor: AppColors.cardBackground,
        elevation: 0,
        scrolledUnderElevation: 0,
        title: const Text(
          'Peta Spasial EUDR & TPH',
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
            // 1. HERO MAP CONTAINER (Simulated PostGIS Vector Map)
            Container(
              height: 280,
              decoration: BoxDecoration(
                color: const Color(0xFF0F172A),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppColors.primaryPalm.withOpacity(0.4)),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.1),
                    blurRadius: 16,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: Stack(
                children: [
                  // Grid Vector Lines
                  CustomPaint(
                    size: const Size(double.infinity, 280),
                    painter: _EstateMapPainter(),
                  ),

                  // Top Floating Badge: EUDR WGS84
                  Positioned(
                    top: 14,
                    left: 14,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                      decoration: BoxDecoration(
                        color: Colors.black.withOpacity(0.7),
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: AppColors.eudrCyan.withOpacity(0.4)),
                      ),
                      child: const Row(
                        children: [
                          Icon(Icons.public_rounded, size: 12, color: AppColors.eudrCyan),
                          SizedBox(width: 6),
                          Text(
                            'EUDR WGS84 VALIDATED',
                            style: TextStyle(
                              fontFamily: 'Inter',
                              color: AppColors.eudrCyan,
                              fontSize: 9,
                              fontWeight: FontWeight.bold,
                              letterSpacing: 0.5,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),

                  // TPH PINS ON MAP
                  _buildTphPin(
                    top: 80,
                    left: 70,
                    name: 'TPH-01',
                    color: AppColors.statusSynced,
                    onTap: () {
                      HapticFeedback.lightImpact();
                      setState(() {
                        _selectedTph = 'TPH-01 (Blok B012)';
                        _selectedStatus = '🟢 Normal • Selesai Panen';
                        _selectedJanjang = 125;
                        _selectedGps = '0.53775 N, 101.44520 E';
                      });
                    },
                  ),
                  _buildTphPin(
                    top: 140,
                    left: 190,
                    name: 'TPH-03',
                    color: AppColors.statusRestan,
                    onTap: () {
                      HapticFeedback.lightImpact();
                      setState(() {
                        _selectedTph = 'TPH-03 (Blok B014)';
                        _selectedStatus = '🔴 RESTAN 26 JAM (FFA 4.8%)';
                        _selectedJanjang = 98;
                        _selectedGps = '0.53810 N, 101.44630 E';
                      });
                    },
                  ),
                  _buildTphPin(
                    top: 200,
                    left: 110,
                    name: 'TPH-04',
                    color: AppColors.statusPending,
                    onTap: () {
                      HapticFeedback.lightImpact();
                      setState(() {
                        _selectedTph = 'TPH-04 (Blok B012)';
                        _selectedStatus = '🟡 Menunggu Angkut Truk';
                        _selectedJanjang = 65;
                        _selectedGps = '0.53790 N, 101.44580 E';
                      });
                    },
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // 2. TPH DETAIL CARD
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
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        _selectedTph,
                        style: const TextStyle(
                          fontFamily: 'Poppins',
                          color: AppColors.textPrimary,
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: AppColors.palmLight,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: const Text(
                          'Afdeling Alpha',
                          style: TextStyle(
                            fontFamily: 'Inter',
                            color: AppColors.palmDark,
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),

                  Text(
                    'Status: $_selectedStatus',
                    style: const TextStyle(
                      fontFamily: 'Inter',
                      color: AppColors.textPrimary,
                      fontWeight: FontWeight.w600,
                      fontSize: 12,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'Jumlah Panen: $_selectedJanjang Janjang (${(_selectedJanjang * 18.5 / 1000).toStringAsFixed(2)} Ton)',
                    style: const TextStyle(
                      fontFamily: 'Inter',
                      color: AppColors.textSecondary,
                      fontSize: 12,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'Koordinat: $_selectedGps',
                    style: const TextStyle(
                      fontFamily: 'JetBrains Mono',
                      color: AppColors.textSecondary,
                      fontSize: 11,
                    ),
                  ),
                  const SizedBox(height: 16),

                  SizedBox(
                    width: double.infinity,
                    height: 46,
                    child: ElevatedButton.icon(
                      icon: const Icon(Icons.navigation_rounded, size: 16),
                      label: const Text(
                        'NAVIGASI KE LOKASI TPH',
                        style: TextStyle(
                          fontFamily: 'Poppins',
                          fontWeight: FontWeight.bold,
                          fontSize: 12,
                        ),
                      ),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primaryPalm,
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                      ),
                      onPressed: () {
                        HapticFeedback.mediumImpact();
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            backgroundColor: AppColors.primaryPalm,
                            content: Text('🧭 Navigasi kompas dimulai menuju $_selectedTph'),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }

  Widget _buildTphPin({
    required double top,
    required double left,
    required String name,
    required Color color,
    required VoidCallback onTap,
  }) {
    return Positioned(
      top: top,
      left: left,
      child: GestureDetector(
        onTap: onTap,
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
              decoration: BoxDecoration(
                color: Colors.black.withOpacity(0.8),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: color),
              ),
              child: Text(
                name,
                style: TextStyle(
                  fontFamily: 'JetBrains Mono',
                  color: color,
                  fontSize: 9,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            Icon(Icons.location_on_rounded, color: color, size: 24),
          ],
        ),
      ),
    );
  }
}

class _EstateMapPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final linePaint = Paint()
      ..color = Colors.white.withOpacity(0.06)
      ..strokeWidth = 1;

    for (double i = 0; i < size.width; i += 30) {
      canvas.drawLine(Offset(i, 0), Offset(i, size.height), linePaint);
    }
    for (double j = 0; j < size.height; j += 30) {
      canvas.drawLine(Offset(0, j), Offset(size.width, j), linePaint);
    }

    final blockPaint = Paint()
      ..color = AppColors.primaryPalm.withOpacity(0.2)
      ..style = PaintingStyle.fill;

    final blockBorder = Paint()
      ..color = AppColors.primaryPalm.withOpacity(0.6)
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke;

    final path = Path()
      ..moveTo(40, 50)
      ..lineTo(160, 40)
      ..lineTo(180, 180)
      ..lineTo(50, 200)
      ..close();

    canvas.drawPath(path, blockPaint);
    canvas.drawPath(path, blockBorder);

    final path2 = Path()
      ..moveTo(170, 60)
      ..lineTo(320, 50)
      ..lineTo(310, 210)
      ..lineTo(190, 190)
      ..close();

    canvas.drawPath(path2, blockPaint);
    canvas.drawPath(path2, blockBorder);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
