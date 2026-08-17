import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
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
        backgroundColor: Color(0xFF06B6D4),
        content: Text(
          '⚖️ Koreksi Asisten Berhasil Diterapkan! Score 3.72T Menang Mutlak atas Krani (1.72T).',
          style: TextStyle(fontWeight: FontWeight.bold, color: Colors.black),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // 1. HERO OVERRIDE CARD (Cyan Theme)
          Container(
            padding: const EdgeInsets.all(22),
            decoration: BoxDecoration(
              color: const Color(0xFF0D1612),
              borderRadius: BorderRadius.circular(32),
              border: Border.all(color: const Color(0xFF06B6D4).withOpacity(0.4)),
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
                          'Inspeksi & Koreksi TPH-01',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 16,
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                        SizedBox(height: 2),
                        Text(
                          'Otoritas Asisten Afdeling (Bobot W3)',
                          style: TextStyle(
                            color: Color(0xFF06B6D4),
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                      decoration: BoxDecoration(
                        color: const Color(0xFF06B6D4).withOpacity(0.15),
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: const Color(0xFF06B6D4).withOpacity(0.4)),
                      ),
                      child: const Text(
                        'W3 OVERRULE',
                        style: TextStyle(
                          color: Color(0xFF06B6D4),
                          fontSize: 10,
                          fontWeight: FontWeight.w900,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 18),

                // BEFORE vs AFTER COMPARISON
                Row(
                  children: [
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.05),
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: const Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Data Krani TPH (W1)',
                              style: TextStyle(color: Colors.white60, fontSize: 10),
                            ),
                            SizedBox(height: 4),
                            Text(
                              '120 Jjg',
                              style: TextStyle(
                                color: Colors.white70,
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                                decoration: TextDecoration.lineThrough,
                              ),
                            ),
                            Text('Score: 1.72T (Kalah)', style: TextStyle(color: Colors.redAccent, fontSize: 9)),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: const Color(0xFF06B6D4).withOpacity(0.15),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: const Color(0xFF06B6D4).withOpacity(0.4)),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'Koreksi Asisten (W3)',
                              style: TextStyle(color: Color(0xFF06B6D4), fontSize: 10, fontWeight: FontWeight.bold),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              '$_overrideJanjang Jjg',
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 18,
                                fontWeight: FontWeight.w900,
                              ),
                            ),
                            const Text('Score: 3.72T (Menang Mutlak)', style: TextStyle(color: Color(0xFF06B6D4), fontSize: 9)),
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
                      'Ubah Jumlah Fisik:',
                      style: TextStyle(color: Colors.white70, fontSize: 12, fontWeight: FontWeight.bold),
                    ),
                    Row(
                      children: [
                        IconButton.filled(
                          icon: const Icon(Icons.remove),
                          style: IconButton.styleFrom(backgroundColor: Colors.white.withOpacity(0.1)),
                          onPressed: () {
                            HapticFeedback.lightImpact();
                            setState(() => _overrideJanjang = (_overrideJanjang - 5).clamp(0, 999));
                          },
                        ),
                        const SizedBox(width: 8),
                        Text(
                          '$_overrideJanjang',
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 20,
                            fontWeight: FontWeight.w900,
                            fontFamily: 'monospace',
                          ),
                        ),
                        const SizedBox(width: 8),
                        IconButton.filled(
                          icon: const Icon(Icons.add),
                          style: IconButton.styleFrom(backgroundColor: const Color(0xFF06B6D4)),
                          onPressed: () {
                            HapticFeedback.lightImpact();
                            setState(() => _overrideJanjang = (_overrideJanjang + 5).clamp(0, 999));
                          },
                        ),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 16),

                // OVERRIDE EXECUTE BUTTON
                SizedBox(
                  width: double.infinity,
                  height: 52,
                  child: ElevatedButton(
                    onPressed: _executeAsistenOverride,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF06B6D4),
                      foregroundColor: Colors.black,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                    ),
                    child: Text(
                      _isOverrideSaved ? '✓ OVERRIDE BERHASIL DITERAPKAN' : 'EKSEKUSI OVERRIDE DATA (W3 MENANG)',
                      style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 13),
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // 2. SOFT PEACH CARD: RESTAN DISPATCH ACTION
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: const Color(0xFFFFF4E6),
              borderRadius: BorderRadius.circular(28),
              border: Border.all(color: const Color(0xFFFED7AA)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'DISPATCH TRUK EVAKUASI RESTAN',
                      style: TextStyle(
                        color: Color(0xFF9A3412),
                        fontSize: 11,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                    Icon(Icons.emergency_rounded, size: 16, color: Color(0xFFEA580C)),
                  ],
                ),
                const SizedBox(height: 10),
                const Text(
                  'TPH-03 (Blok B014) telah menumpuk 26 Jam (FFA > 4.5%). Prioritas dispatch unit truk:',
                  style: TextStyle(color: Color(0xFF7C2D12), fontSize: 12),
                ),
                const SizedBox(height: 14),
                SizedBox(
                  width: double.infinity,
                  height: 48,
                  child: ElevatedButton.icon(
                    icon: const Icon(Icons.local_shipping_rounded, size: 18),
                    label: const Text('DISPATCH TRUK DT-08 KE TPH-03', style: TextStyle(fontWeight: FontWeight.w900, fontSize: 12)),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFFEA580C),
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                    ),
                    onPressed: () {
                      HapticFeedback.heavyImpact();
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          backgroundColor: Color(0xFFEA580C),
                          content: Text('🚛 Instruksi Dispatch Dikirim ke Unit Truk DT-08!'),
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
    );
  }
}
