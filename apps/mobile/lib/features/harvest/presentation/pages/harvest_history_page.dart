import 'package:flutter/material.dart';
import '../../../../core/constants/app_colors.dart';
import '../../../auth/domain/models/user_model.dart';
import '../../data/repositories/harvest_repository.dart';

class HarvestHistoryPage extends StatelessWidget {
  final HarvestRepository repository;
  final UserModel user;

  const HarvestHistoryPage({
    super.key,
    required this.repository,
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
        title: const Text(
          'Riwayat Panen Regu',
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
      ),
      body: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Item 1: Blok A2 / TPH-04 (Menunggu)
            _buildHistoryItem(
              tph: 'Blok A2 / TPH-04',
              time: '10:45 AM • 65 Janjang',
              tonase: '1.2 Ton',
              status: 'Menunggu',
              score: '1.723.850.000.000 (Krani W1)',
              isSynced: false,
            ),
            const SizedBox(height: 10),

            // Item 2: Blok A1 / TPH-02 (Tersinkron)
            _buildHistoryItem(
              tph: 'Blok A1 / TPH-02',
              time: '09:15 AM • 45 Janjang',
              tonase: '0.8 Ton',
              status: 'Tersinkron',
              score: '1.723.845.000.000 (Tersinkron Server)',
              isSynced: true,
            ),
            const SizedBox(height: 10),

            // Item 3: Blok A1 / TPH-01 (Tersinkron)
            _buildHistoryItem(
              tph: 'Blok A1 / TPH-01',
              time: '08:00 AM • 35 Janjang',
              tonase: '0.6 Ton',
              status: 'Tersinkron',
              score: '1.723.840.000.000 (Tersinkron Server)',
              isSynced: true,
            ),
            const SizedBox(height: 10),

            // Item 4: Blok B1 / TPH-12 (Tersinkron)
            _buildHistoryItem(
              tph: 'Blok B1 / TPH-12',
              time: 'Kemarin • 80 Janjang',
              tonase: '1.5 Ton',
              status: 'Tersinkron',
              score: '2.723.800.000.000 (Mandor W2)',
              isSynced: true,
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }

  Widget _buildHistoryItem({
    required String tph,
    required String time,
    required String tonase,
    required String status,
    required String score,
    required bool isSynced,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.cardBackground,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.slateBorder),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.02),
            blurRadius: 6,
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
              Row(
                children: [
                  Container(
                    width: 38,
                    height: 38,
                    decoration: const BoxDecoration(
                      color: AppColors.palmLight,
                      shape: BoxShape.circle,
                    ),
                    child: const Icon(Icons.eco_rounded, color: AppColors.primaryPalm, size: 18),
                  ),
                  const SizedBox(width: 12),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        tph,
                        style: const TextStyle(
                          fontFamily: 'Poppins',
                          fontSize: 13,
                          fontWeight: FontWeight.bold,
                          color: AppColors.textPrimary,
                        ),
                      ),
                      Text(
                        time,
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
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    tonase,
                    style: const TextStyle(
                      fontFamily: 'Poppins',
                      fontSize: 13,
                      fontWeight: FontWeight.bold,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    decoration: BoxDecoration(
                      color: isSynced ? const Color(0xFFECFDF5) : const Color(0xFFFFFBEB),
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(
                        color: isSynced ? const Color(0xFFA7F3D0) : const Color(0xFFFDE68A),
                      ),
                    ),
                    child: Text(
                      status,
                      style: TextStyle(
                        fontFamily: 'Inter',
                        fontSize: 10,
                        fontWeight: FontWeight.bold,
                        color: isSynced ? AppColors.statusSynced : AppColors.statusPending,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 10),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
            decoration: BoxDecoration(
              color: AppColors.appBackground,
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: AppColors.slateBorder),
            ),
            child: Row(
              children: [
                const Icon(Icons.bolt_rounded, size: 12, color: AppColors.secondaryGold),
                const SizedBox(width: 6),
                Expanded(
                  child: Text(
                    score,
                    style: const TextStyle(
                      fontFamily: 'JetBrains Mono',
                      fontSize: 10,
                      color: AppColors.textSecondary,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
