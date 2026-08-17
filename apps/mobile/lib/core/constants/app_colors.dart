import 'package:flutter/material.dart';

/// Design System & Colors untuk SawitGo Mobile (Offline-First Palm Oil App)
/// Sesuai Standar SSOT Spesifikasi Desain Mobile
class AppColors {
  // App Canvas & Card Surfaces (Clean Slate-50 Theme)
  static const Color appBackground = Color(0xFFF8FAFC); // Slate-50
  static const Color cardBackground = Color(0xFFFFFFFF); // Pure White
  static const Color slateBorder = Color(0xFFE2E8F0);
  static const Color slateHover = Color(0xFFF1F5F9);

  // Brand Accents
  static const Color primaryPalm = Color(0xFF2E7D32); // Palm Green
  static const Color palmDark = Color(0xFF1B5E20);
  static const Color palmLight = Color(0xFFE8F5E9);
  static const Color secondaryGold = Color(0xFFF9A825); // CPO Gold (Quick Action)
  static const Color cpoDark = Color(0xFFF57F17);
  static const Color cpoLight = Color(0xFFFFF9C4);

  // Status Colors
  static const Color statusPending = Color(0xFFFF9800); // Orange (Offline/Pending)
  static const Color statusSynced = Color(0xFF4CAF50); // Green (Online/Synced)
  static const Color statusRestan = Color(0xFFD32F2F); // Red (Restan/Critical)
  static const Color statusConflict = Color(0xFFD32F2F);

  // Typography Scales
  static const Color textPrimary = Color(0xFF0F172A); // Slate-900
  static const Color textSecondary = Color(0xFF64748B); // Slate-500
  static const Color textMuted = Color(0xFF94A3B8); // Slate-400
  static const Color textWhite = Color(0xFFFFFFFF);

  // Compatibility Aliases
  static const Color backgroundDark = Color(0xFF0F172A);
  static const Color surfaceCanvas = Color(0xFFF8FAFC);
  static const Color surfaceCard = Color(0xFFFFFFFF);
  static const Color surfaceCardHover = Color(0xFFF1F5F9);
  static const Color surfaceMatte = Color(0xFFE2E8F0);
  static const Color primaryEmerald = Color(0xFF2E7D32);
  static const Color emeraldGlow = Color(0xFF4CAF50);
  static const Color forestDark = Color(0xFF1B5E20);
  static const Color signalAmber = Color(0xFFF9A825);
  static const Color amberGlow = Color(0xFFFF9800);
  static const Color restanRed = Color(0xFFD32F2F);
  static const Color crimsonGlow = Color(0xFFEF4444);
  static const Color eudrCyan = Color(0xFF06B6D4);
  static const Color p2pIndigo = Color(0xFF6366F1);
  static const Color successGreen = Color(0xFF4CAF50);
  static const Color borderSubtle = Color(0xFFE2E8F0);
  static const Color borderGlow = Color(0xFF2E7D32);
  static const Color borderWarning = Color(0xFFFF9800);
  static const Color borderCritical = Color(0xFFD32F2F);
}
