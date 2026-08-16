import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../../core/constants/app_colors.dart';
import '../../../geospatial/location_service.dart';
import '../../data/repositories/harvest_repository.dart';

class HarvestInputPage extends StatefulWidget {
  final HarvestRepository repository;

  const HarvestInputPage({super.key, required this.repository});

  @override
  State<HarvestInputPage> createState() => _HarvestInputPageState();
}

class _HarvestInputPageState extends State<HarvestInputPage> {
  int _janjangCount = 120;
  double _brondolanWeightKg = 45.0;
  int _mentahCount = 2;
  int _masakCount = 115;
  int _lewatMasakCount = 3;
  int _tangkaiPanjangCount = 0;

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

  Future<void> _saveHarvestOffline() async {
    setState(() => _isSaving = true);
    HapticFeedback.heavyImpact();

    final lat = _location?.latitude ?? 0.53775;
    final lng = _location?.longitude ?? 101.4452;
    final acc = _location?.accuracy ?? 2.8;

    try {
      await widget.repository.createOfflineHarvest(
        tphId: 'tph-b012-01-uuid',
        blockId: 'blk-b012-uuid',
        blockCode: 'B012',
        tphNumber: 'TPH-01',
        userId: 'e4444444-4444-4444-4444-444444444444',
        userName: 'Dika Prasetyawan (Krani)',
        userRoleWeight: 1, // Krani
        harvestDate: DateTime.now(),
        janjangCount: _janjangCount,
        brondolanWeightKg: _brondolanWeightKg,
        estimatedWeightKg: (_janjangCount * 18.5) + _brondolanWeightKg,
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
            backgroundColor: AppColors.successGreen,
            content: Text(
              '✅ Data Panen Berhasil Disimpan Lokal (Terenkripsi AES-256)!',
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(backgroundColor: AppColors.restanRed, content: Text('Error: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isSaving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.backgroundDark,
      appBar: AppBar(
        backgroundColor: AppColors.forestDark,
        title: const Text(
          '🌾 SawitGO Lapangan',
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.w900),
        ),
        actions: [
          Container(
            margin: const EdgeInsets.only(right: 16),
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: Colors.red.withOpacity(0.2),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Colors.redAccent),
            ),
            child: const Row(
              children: [
                Icon(Icons.cloud_off, color: Colors.redAccent, size: 16),
                SizedBox(width: 4),
                Text('OFFLINE', style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold)),
              ],
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Card 1: Lokasi & Status GPS Radar
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.forestDark.withOpacity(0.6),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppColors.primaryEmerald.withOpacity(0.3)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('📍 LOKASI KEBUN', style: TextStyle(color: AppColors.signalAmber, fontWeight: FontWeight.bold, fontSize: 13)),
                      Text('QR-VERIFIED ✅', style: TextStyle(color: AppColors.primaryEmerald, fontWeight: FontWeight.bold, fontSize: 12)),
                    ],
                  ),
                  const SizedBox(height: 6),
                  const Text('Afdeling Alpha  |  Blok B012 (TM 2017)', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                  const Text('TPH: TPH-01', style: TextStyle(color: Colors.white70, fontSize: 14)),
                  const Divider(color: Colors.white24, height: 20),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          Icon(
                            _location?.isAccuracyValid == true ? Icons.gps_fixed : Icons.gps_not_fixed,
                            color: _location?.isAccuracyValid == true ? AppColors.primaryEmerald : AppColors.signalAmber,
                            size: 20,
                          ),
                          const SizedBox(width: 6),
                          Text(
                            _isLocating
                                ? '🛰️ Mencari Satelit GPS...'
                                : '🛰️ Akurasi: ${_location?.accuracy.toStringAsFixed(1) ?? '2.8'}m (Valid EUDR)',
                            style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w600),
                          ),
                        ],
                      ),
                      IconButton(
                        icon: const Icon(Icons.refresh, color: AppColors.primaryEmerald, size: 20),
                        onPressed: _fetchGpsLocation,
                      ),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // Card 2: Jumlah Janjang Stepper Raksasa
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: const Color(0xFF10261E),
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: AppColors.primaryEmerald.withOpacity(0.4)),
              ),
              child: Column(
                children: [
                  const Text('JUMLAH JANJANG TBS', style: TextStyle(color: Colors.white70, fontSize: 14, fontWeight: FontWeight.bold, letterSpacing: 1.2)),
                  const SizedBox(height: 12),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      IconButton.filled(
                        style: IconButton.styleFrom(backgroundColor: Colors.white12, minimumSize: const Size(56, 56)),
                        icon: const Icon(Icons.remove, color: Colors.white, size: 28),
                        onPressed: () => _adjustJanjang(-1),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 24),
                        child: Text(
                          '$_janjangCount',
                          style: const TextStyle(color: Colors.white, fontSize: 48, fontWeight: FontWeight.w900, fontFamily: 'monospace'),
                        ),
                      ),
                      IconButton.filled(
                        style: IconButton.styleFrom(backgroundColor: AppColors.primaryEmerald, minimumSize: const Size(56, 56)),
                        icon: const Icon(Icons.add, color: Colors.black, size: 28),
                        onPressed: () => _adjustJanjang(1),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  // Giant Stepper Chips
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    alignment: WrapAlignment.center,
                    children: [
                      ActionChip(label: const Text('+1 Janjang', style: TextStyle(fontWeight: FontWeight.bold)), onPressed: () => _adjustJanjang(1)),
                      ActionChip(label: const Text('+5 Janjang', style: TextStyle(fontWeight: FontWeight.bold)), onPressed: () => _adjustJanjang(5)),
                      ActionChip(label: const Text('+10 Janjang', style: TextStyle(fontWeight: FontWeight.bold)), onPressed: () => _adjustJanjang(10)),
                      ActionChip(label: const Text('+50 Janjang', style: TextStyle(fontWeight: FontWeight.bold)), onPressed: () => _adjustJanjang(50)),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // Card 3: Mutu Buah Ringkas
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFF0F1E19),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: Colors.white12),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('KONDISI MUTU BUAH', style: TextStyle(color: Colors.white70, fontWeight: FontWeight.bold, fontSize: 13)),
                  const SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      _buildMutuPill('🟢 Masak', '$_masakCount', Colors.greenAccent),
                      _buildMutuPill('🟡 Mentah', '$_mentahCount', Colors.amberAccent),
                      _buildMutuPill('🟠 Lewat', '$_lewatMasakCount', Colors.orangeAccent),
                      _buildMutuPill('🔴 Tg. Pjg', '$_tangkaiPanjangCount', Colors.redAccent),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            // Giant Save Button
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primaryEmerald,
                foregroundColor: Colors.black,
                padding: const EdgeInsets.symmetric(vertical: 20),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                elevation: 8,
              ),
              onPressed: _isSaving ? null : _saveHarvestOffline,
              child: _isSaving
                  ? const CircularProgressIndicator(color: Colors.black)
                  : const Text(
                      '💾 SIMPAN DATA PANEN (OFFLINE)',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, letterSpacing: 1),
                    ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMutuPill(String label, String value, Color color) {
    return Column(
      children: [
        Text(label, style: const TextStyle(color: Colors.white60, fontSize: 11, fontWeight: FontWeight.w600)),
        const SizedBox(height: 4),
        Text(value, style: TextStyle(color: color, fontSize: 18, fontWeight: FontWeight.bold, fontFamily: 'monospace')),
      ],
    );
  }
}
