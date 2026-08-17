import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../../core/constants/app_colors.dart';
import '../../../auth/domain/models/user_model.dart';
import '../../../auth/presentation/bloc/auth_bloc.dart';
import '../../../auth/presentation/bloc/auth_event.dart';
import '../../../geospatial/presentation/pages/spatial_map_page.dart';
import '../../../harvest/data/repositories/harvest_repository.dart';
import '../../../harvest/presentation/pages/asisten_override_page.dart';
import '../../../harvest/presentation/pages/harvest_input_page.dart';
import '../../../harvest/presentation/pages/harvest_stats_page.dart';
import '../../../harvest/presentation/pages/manager_audit_page.dart';
import '../../../harvest/presentation/pages/mobile_home_page.dart';
import '../../../sync/presentation/pages/p2p_mesh_page.dart';

class MainNavigationPage extends StatefulWidget {
  final HarvestRepository harvestRepository;
  final UserModel user;

  const MainNavigationPage({
    super.key,
    required this.harvestRepository,
    required this.user,
  });

  @override
  State<MainNavigationPage> createState() => _MainNavigationPageState();
}

class _MainNavigationPageState extends State<MainNavigationPage> {
  int _currentIndex = 0;

  void _showProfileModal() {
    HapticFeedback.mediumImpact();
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (ctx) => Container(
        padding: const EdgeInsets.all(24),
        decoration: const BoxDecoration(
          color: AppColors.cardBackground,
          borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  width: 48,
                  height: 48,
                  decoration: const BoxDecoration(
                    color: AppColors.palmLight,
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(Icons.person, color: AppColors.primaryPalm, size: 24),
                ),
                const SizedBox(width: 14),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      widget.user.fullName,
                      style: const TextStyle(
                        fontFamily: 'Poppins',
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: AppColors.textPrimary,
                      ),
                    ),
                    Text(
                      '${widget.user.role} (Bobot W${widget.user.roleWeight}) • NIP: ${widget.user.nip}',
                      style: const TextStyle(
                        fontFamily: 'Inter',
                        fontSize: 12,
                        color: AppColors.textSecondary,
                      ),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppColors.appBackground,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: AppColors.slateBorder),
              ),
              child: Text(
                'Hierarki Priority Score: (${widget.user.roleWeight} × 10¹²) + Timestamp_ms',
                style: const TextStyle(
                  fontFamily: 'JetBrains Mono',
                  fontSize: 11,
                  color: AppColors.textSecondary,
                ),
              ),
            ),
            const SizedBox(height: 20),
            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton.icon(
                icon: const Icon(Icons.logout_rounded, size: 18),
                label: const Text('Keluar Akun', style: TextStyle(fontWeight: FontWeight.bold)),
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.statusRestan,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                ),
                onPressed: () {
                  Navigator.pop(ctx);
                  context.read<AuthBloc>().add(const AuthLogoutRequested());
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final int weight = widget.user.roleWeight;

    // 4 Fixed Bottom Navigation Views (Disesuaikan Peran Pengguna)
    final List<Widget> pages = [
      MobileHomePage(
        repository: widget.harvestRepository,
        user: widget.user,
        onNavigateToHistory: () => setState(() => _currentIndex = 1),
        onNavigateToInput: () {
          if (weight >= 5) {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => ManagerAuditPage(user: widget.user)),
            );
          } else if (weight == 3) {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => AsistenOverridePage(
                  repository: widget.harvestRepository,
                  user: widget.user,
                ),
              ),
            );
          } else if (weight == 2 || weight == 4) {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => HarvestStatsPage(
                  repository: widget.harvestRepository,
                  user: widget.user,
                ),
              ),
            );
          } else {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => HarvestInputPage(
                  repository: widget.harvestRepository,
                  user: widget.user,
                ),
              ),
            );
          }
        },
      ),
      P2pMeshPage(
        repository: widget.harvestRepository,
        user: widget.user,
      ),
      SpatialMapPage(
        user: widget.user,
      ),
      weight >= 5
          ? ManagerAuditPage(user: widget.user)
          : HarvestStatsPage(
              repository: widget.harvestRepository,
              user: widget.user,
            ),
    ];

    return Scaffold(
      backgroundColor: AppColors.appBackground,
      body: SafeArea(
        bottom: false,
        child: IndexedStack(
          index: _currentIndex.clamp(0, pages.length - 1),
          children: pages,
        ),
      ),

      // Fixed Bottom Navigation Bar
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: AppColors.cardBackground,
          border: const Border(
            top: BorderSide(color: AppColors.slateBorder, width: 1),
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.04),
              blurRadius: 10,
              offset: const Offset(0, -2),
            ),
          ],
        ),
        child: SafeArea(
          top: false,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildNavItem(
                  index: 0,
                  icon: Icons.home_rounded,
                  label: 'Home',
                  isActive: _currentIndex == 0,
                ),
                _buildNavItem(
                  index: 1,
                  icon: Icons.sync_rounded,
                  label: 'Sync',
                  isActive: _currentIndex == 1,
                  hasBadge: true,
                ),
                _buildNavItem(
                  index: 2,
                  icon: Icons.map_rounded,
                  label: 'Peta',
                  isActive: _currentIndex == 2,
                ),
                _buildNavItem(
                  index: 3,
                  icon: Icons.person_rounded,
                  label: 'Profil',
                  isActive: _currentIndex == 3,
                  onTapOverride: _showProfileModal,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem({
    required int index,
    required IconData icon,
    required String label,
    required bool isActive,
    bool hasBadge = false,
    VoidCallback? onTapOverride,
  }) {
    return GestureDetector(
      onTap: () {
        HapticFeedback.lightImpact();
        if (onTapOverride != null) {
          onTapOverride();
        } else {
          setState(() => _currentIndex = index);
        }
      },
      behavior: HitTestBehavior.opaque,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Stack(
              clipBehavior: Clip.none,
              children: [
                Icon(
                  icon,
                  size: 22,
                  color: isActive ? AppColors.primaryPalm : AppColors.textSecondary,
                ),
                if (hasBadge)
                  Positioned(
                    top: -2,
                    right: -4,
                    child: Container(
                      width: 7,
                      height: 7,
                      decoration: const BoxDecoration(
                        color: AppColors.statusPending,
                        shape: BoxShape.circle,
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: TextStyle(
                fontFamily: 'Inter',
                fontSize: 10,
                fontWeight: isActive ? FontWeight.bold : FontWeight.w500,
                color: isActive ? AppColors.primaryPalm : AppColors.textSecondary,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
