import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../../core/constants/app_colors.dart';
import '../../../auth/domain/models/user_model.dart';
import '../../../geospatial/location_service.dart';
import '../../data/repositories/harvest_repository.dart';
import 'qr_scanner_page.dart';

class HarvestInputPage extends StatefulWidget {
  final HarvestRepository repository;
  final UserModel user;

  const HarvestInputPage({
    super.key,
    required this.repository,
    required this.user,
  });

  @override
  State<HarvestInputPage> createState() => _HarvestInputPageState();
}

class _HarvestInputPageState extends State<HarvestInputPage> {
  int _janjangCount = 125;
  final double _brondolanWeightKg = 45.0;
  final int _mentahCount = 3;
  int _masakCount = 120;
  final int _lewatMasakCount = 2;
  final int _tangkaiPanjangCount = 0;

  String _tphNumber = 'TPH-01';
  final String _blockCode = 'B012';
  bool _isQrScanned = true;

  LocationResult? _location;
  bool _isLocating = false;
  bool _isSaving = false;

  @override
  void initState() {
    super.initState();
    _fetchGpsLocation();
  }

  Future<void> _fetchGpsLocation() async {
    setState(() => _isLocating = true);
    final loc = await LocationService.getCurrentHighAccuracyPosition();
    if (mounted) {
      setState(() {
        _location = loc;
        _isLocating = false;
      });
      if (loc.isAccuracyValid) {
        HapticFeedback.mediumImpact();
      }
    }
  }

  void _adjustJanjang(int delta) {
    HapticFeedback.lightImpact();
    setState(() {
      _janjangCount = (_janjangCount + delta).clamp(0, 9999);
      _masakCount = (_janjangCount - _mentahCount - _lewatMasakCount).clamp(0, _janjangCount);
    });
  }

  Future<void> _scanQrCode() async {
    HapticFeedback.mediumImpact();
    final scanned = await Navigator.push<String>(
      context,
      MaterialPageRoute(builder: (context) => const QRScannerPage()),
    );
    if (scanned != null && mounted) {
      setState(() {
        _tphNumber = scanned;
        _isQrScanned = true;
      });
    }
  }

  Future<void> _saveHarvestRecord() async {
    HapticFeedback.heavyImpact();
    setState(() => _isSaving = true);

    try {
      final lat = _location?.latitude ?? 0.53775;
      final lng = _location?.longitude ?? 101.44520;
      final acc = _location?.accuracy ?? 2.8;
      final estKg = (_janjangCount * 18.5) + _brondolanWeightKg;

      await widget.repository.createOfflineHarvest(
        tphId: 'TPH-$_blockCode-$_tphNumber',
        blockId: 'BLK-$_blockCode',
        blockCode: _blockCode,
        tphNumber: _tphNumber,
        userId: widget.user.id,
        userName: widget.user.fullName,
        userRoleWeight: widget.user.roleWeight,
        harvestDate: DateTime.now(),
        janjangCount: _janjangCount,
        brondolanWeightKg: _brondolanWeightKg,
        estimatedWeightKg: estKg,
        mentahCount: _mentahCount,
        masakCount: _masakCount,
        lewatMasakCount: _lewatMasakCount,
        tangkaiPanjangCount: _tangkaiPanjangCount,
        latitude: lat,
        longitude: lng,
        gpsAccuracy: acc,
      );

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            backgroundColor: AppColors.primaryPalm,
            content: Text(
              '✅ Data Panen Berhasil Disimpan (Terenkripsi AES-256)!',
              style: TextStyle(fontWeight: FontWeight.bold, fontFamily: 'Inter'),
            ),
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(backgroundColor: AppColors.statusRestan, content: Text('Error: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isSaving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final estimatedWeightKg = (_janjangCount * 18.5) + _brondolanWeightKg;

    return Scaffold(
      backgroundColor: AppColors.appBackground,
      appBar: AppBar(
        backgroundColor: AppColors.cardBackground,
        elevation: 0,
        scrolledUnderElevation: 0,
        title: const Text(
          'Pencatatan Panen TPH',
          style: TextStyle(
            fontFamily: 'Poppins',
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: AppColors.textPrimary,
          ),
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.textPrimary, size: 18),
          onPressed: () => Navigator.pop(context),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.qr_code_scanner_rounded, color: AppColors.primaryPalm),
            onPressed: _scanQrCode,
          ),
        ],
      ),
      body: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // ==================== 1. TPH & BLOCK CARD ====================
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppColors.cardBackground,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppColors.slateBorder),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.03),
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
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            '$_tphNumber (Blok $_blockCode)',
                            style: const TextStyle(
                              fontFamily: 'Poppins',
                              color: AppColors.textPrimary,
                              fontSize: 17,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 2),
                          const Text(
                            'Afdeling Alpha • TM 2017 (Tanam 2017)',
                            style: TextStyle(
                              fontFamily: 'Inter',
                              color: AppColors.textSecondary,
                              fontSize: 12,
                            ),
                          ),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: _isQrScanned ? const Color(0xFFECFDF5) : const Color(0xFFFFFBEB),
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(
                            color: _isQrScanned ? const Color(0xFFA7F3D0) : const Color(0xFFFDE68A),
                          ),
                        ),
                        child: Text(
                          _isQrScanned ? '✓ QR LOCKED' : 'MANUAL',
                          style: TextStyle(
                            fontFamily: 'Inter',
                            color: _isQrScanned ? AppColors.statusSynced : AppColors.statusPending,
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),

                  // Giant Janjang Number Counter
                  Center(
                    child: Column(
                      children: [
                        const Text(
                          'TOTAL JANJANG PANEN',
                          style: TextStyle(
                            fontFamily: 'Inter',
                            color: AppColors.textSecondary,
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 0.8,
                          ),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          '$_janjangCount',
                          style: const TextStyle(
                            fontFamily: 'JetBrains Mono',
                            color: AppColors.textPrimary,
                            fontSize: 64,
                            fontWeight: FontWeight.w900,
                            letterSpacing: -2,
                          ),
                        ),
                        Text(
                          'Est: ${(estimatedWeightKg / 1000).toStringAsFixed(2)} Ton • BJR 18.5 Kg',
                          style: const TextStyle(
                            fontFamily: 'Inter',
                            color: AppColors.primaryPalm,
                            fontSize: 13,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 20),

                  // Stepper Adjusters
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      _buildPillButton('-10', () => _adjustJanjang(-10), isNegative: true),
                      const SizedBox(width: 8),
                      _buildPillButton('-1', () => _adjustJanjang(-1), isNegative: true),
                      const SizedBox(width: 14),
                      _buildPillButton('+1', () => _adjustJanjang(1)),
                      const SizedBox(width: 8),
                      _buildPillButton('+5', () => _adjustJanjang(5)),
                      const SizedBox(width: 8),
                      _buildPillButton('+10', () => _adjustJanjang(10)),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // ==================== 2. GPS TELEMETRY CARD ====================
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.cardBackground,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.slateBorder),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        width: 38,
                        height: 38,
                        decoration: const BoxDecoration(
                          color: AppColors.palmLight,
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(Icons.satellite_alt_rounded, color: AppColors.primaryPalm, size: 18),
                      ),
                      const SizedBox(width: 12),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Satelit GPS EUDR (WGS84)',
                            style: TextStyle(
                              fontFamily: 'Poppins',
                              fontWeight: FontWeight.bold,
                              fontSize: 13,
                              color: AppColors.textPrimary,
                            ),
                          ),
                          Text(
                            _location != null
                                ? 'Akurasi ${_location!.accuracy.toStringAsFixed(1)}m (Toleransi <5.0m)'
                                : 'Mencari sinyal GPS satelit...',
                            style: const TextStyle(
                              fontFamily: 'Inter',
                              fontSize: 11,
                              color: AppColors.textSecondary,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  IconButton(
                    icon: _isLocating
                        ? const SizedBox(
                            width: 16,
                            height: 16,
                            child: CircularProgressIndicator(strokeWidth: 2, color: AppColors.primaryPalm),
                          )
                        : const Icon(Icons.refresh_rounded, color: AppColors.primaryPalm, size: 20),
                    onPressed: _fetchGpsLocation,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // ==================== 3. SAVE BUTTON (PALM GREEN) ====================
            SizedBox(
              height: 52,
              child: ElevatedButton.icon(
                icon: _isSaving
                    ? const SizedBox(
                        width: 20,
                        height: 20,
                        child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2.5),
                      )
                    : const Icon(Icons.save_rounded, size: 20),
                label: Text(
                  _isSaving ? 'MENYIMPAN KE ISAR DB...' : 'SIMPAN DATA PANEN (OFFLINE)',
                  style: const TextStyle(
                    fontFamily: 'Poppins',
                    fontWeight: FontWeight.bold,
                    fontSize: 14,
                    letterSpacing: 0.5,
                  ),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primaryPalm,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  elevation: 2,
                ),
                onPressed: _isSaving ? null : _saveHarvestRecord,
              ),
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _buildPillButton(String label, VoidCallback onTap, {bool isNegative = false}) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: BoxDecoration(
          color: isNegative ? const Color(0xFFFEF2F2) : AppColors.palmLight,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isNegative ? const Color(0xFFFECACA) : const Color(0xFFA7F3D0),
          ),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontFamily: 'JetBrains Mono',
            fontWeight: FontWeight.bold,
            fontSize: 13,
            color: isNegative ? AppColors.statusRestan : AppColors.palmDark,
          ),
        ),
      ),
    );
  }
}
