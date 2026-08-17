'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Sprout,
  ChevronDown,
  ChevronRight,
  Users,
  Truck,
  MapPin,
  ShieldAlert,
  BarChart3,
  FileText,
  HelpCircle,
  Settings,
  Search,
  PanelLeftClose,
  ChevronsUpDown,
  LogOut,
  Lock,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { useRouter } from 'next/navigation';
import { initials } from '@/lib/format';

interface SidebarProps {
  currentView?: string;
  onViewChange?: (view: string) => void;
  onSearchClick?: () => void;
  onLockedClick?: (minWeight: number, moduleName: string) => void;
}

export function Sidebar({ currentView = 'overview', onViewChange, onSearchClick, onLockedClick }: SidebarProps) {
  const [isPanenExpanded, setIsPanenExpanded] = useState(true);
  const { user, logout } = useAuth();
  const router = useRouter();

  const userWeight = user?.roleWeight ?? 1;

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const handleItemClick = (viewKey: string, minWeight: number, moduleName: string) => {
    if (userWeight < minWeight) {
      onLockedClick?.(minWeight, moduleName);
    } else {
      onViewChange?.(viewKey);
    }
  };

  const navClass = (viewKey: string, minWeight = 1) => {
    const isLocked = userWeight < minWeight;
    if (isLocked) {
      return 'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-[#98A2B3] dark:text-[#475467] hover:bg-[#F2F4F7] dark:hover:bg-[#1E293B]/50 transition-all cursor-not-allowed opacity-75';
    }
    return `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
      currentView === viewKey
        ? 'bg-[#0F172A] text-white border border-[#0F172A] dark:bg-white dark:text-[#030712] dark:border-white shadow-xs font-bold'
        : 'text-[#475467] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#111827] hover:text-[#0F172A] dark:hover:text-white'
    }`;
  };

  const subNavClass = (viewKey: string, isDanger = false, minWeight = 1) => {
    const isLocked = userWeight < minWeight;
    if (isLocked) {
      return 'w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-xs font-medium text-[#98A2B3] dark:text-[#475467] hover:bg-[#F2F4F7] dark:hover:bg-[#1E293B]/50 transition-all cursor-not-allowed opacity-75';
    }
    return `w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
      currentView === viewKey
        ? isDanger 
          ? 'bg-[#FEF3F2] dark:bg-[#7F1D1D]/40 text-[#B42318] dark:text-[#F87171] font-bold' 
          : 'bg-[#0F172A] text-white border border-[#0F172A] dark:bg-white dark:text-[#030712] dark:border-white font-bold'
        : isDanger 
          ? 'text-[#D92D20] dark:text-[#F87171] hover:bg-[#FEF3F2] dark:hover:bg-[#7F1D1D]/30' 
          : 'text-[#475467] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-[#111827]'
    }`;
  };

  return (
    <aside className="w-64 bg-white dark:bg-[#050811] border-r border-[#EAECF0] dark:border-[#1E293B] flex flex-col h-screen shrink-0 font-sans select-none z-10 transition-colors">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-[#EAECF0] dark:border-[#1E293B]">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onViewChange?.('overview')}
          className="flex items-center gap-2.5 cursor-pointer text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-[#0F172A] text-white dark:bg-white dark:text-[#030712] flex items-center justify-center font-black text-sm shadow-sm">
            <Sprout className="w-4 h-4" />
          </div>
          <div>
            <span className="text-base font-extrabold text-[#0F172A] dark:text-white tracking-tight font-sans">
              Sawit<span className="text-[#0F172A] dark:text-white font-black">Go</span>
            </span>
          </div>
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Tutup menu samping"
          onClick={() => onViewChange?.('overview')}
          className="w-7 h-7 rounded-md hover:bg-[#F2F4F7] dark:hover:bg-[#1E293B] text-[#98A2B3] dark:text-[#64748B] hover:text-[#344054] dark:hover:text-[#E2E8F0] flex items-center justify-center transition-colors cursor-pointer"
        >
          <PanelLeftClose className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Role Weight Badge Card */}
      <div className="px-4 pt-3">
        <div className="p-2.5 rounded-xl bg-[#F8F9FB] dark:bg-[#0A0F1D] border border-[#EAECF0] dark:border-[#1E293B] flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <Scale className="w-4 h-4 text-[#0F172A] dark:text-white shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] text-[#667085] dark:text-[#94A3B8] font-medium leading-none">Otoritas RBAC</p>
              <p className="text-xs font-bold text-[#101828] dark:text-[#F8FAFC] truncate mt-0.5">
                {user?.role ?? 'Krani'} (W{userWeight})
              </p>
            </div>
          </div>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#0F172A] text-white dark:bg-white dark:text-[#030712] border border-[#0F172A] dark:border-white">
            {userWeight}×10¹²
          </span>
        </div>
      </div>

      {/* Search Input (with ⌘K Trigger) */}
      <div className="p-4 pb-2">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSearchClick}
          className="w-full relative flex items-center bg-[#F8F9FB] dark:bg-[#0A0F1D] hover:bg-[#F2F4F7] dark:hover:bg-[#1E293B] border border-[#EAECF0] dark:border-[#1E293B] rounded-xl pl-9 pr-10 py-2 text-xs text-[#667085] dark:text-[#94A3B8] hover:text-[#101828] dark:hover:text-[#F8FAFC] text-left transition-all cursor-pointer"
        >
          <Search className="w-4 h-4 text-[#98A2B3] dark:text-[#64748B] absolute left-3 pointer-events-none" />
          <span>Cari data &amp; modul...</span>
          <span className="absolute right-2.5 text-[10px] font-semibold text-[#98A2B3] dark:text-[#64748B] bg-white dark:bg-[#0F172A] border border-[#EAECF0] dark:border-[#334155] px-1.5 py-0.5 rounded font-mono shadow-xs">
            ⌘ K
          </span>
        </motion.button>
      </div>

      {/* Nav Scroll Area */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-5">
        {/* Group 1: MAIN NAVIGATION */}
        <div className="space-y-1">
          <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#98A2B3] dark:text-[#64748B]">
            Navigasi Utama
          </div>

          {/* Dashboard Page */}
          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewChange?.('overview')}
            className={navClass('overview', 1)}
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-4 h-4" />
              <span>Halaman Utama Dashboard</span>
            </div>
          </motion.button>

          {/* Panen & TPH (Expandable Tree) */}
          <div className="space-y-0.5">
            <motion.button
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsPanenExpanded(!isPanenExpanded)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#475467] dark:text-[#94A3B8] hover:bg-[#F9FAFB] dark:hover:bg-[#1E293B] hover:text-[#101828] dark:hover:text-[#F8FAFC] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Sprout className="w-4 h-4 text-[#667085] dark:text-[#94A3B8]" />
                <span>Panen &amp; TPH</span>
              </div>
              {isPanenExpanded ? (
                <ChevronDown className="w-3.5 h-3.5 text-[#98A2B3] dark:text-[#64748B]" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-[#98A2B3] dark:text-[#64748B]" />
              )}
            </motion.button>

            {isPanenExpanded && (
              <div className="pl-6 pr-2 py-1 space-y-1 border-l-2 border-[#EAECF0] dark:border-[#1F2937] ml-5">
                <motion.button
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleItemClick('tph-queue', 1, 'Data Transaksi Panen')}
                  className={subNavClass('tph-queue', false, 1)}
                >
                  <span>Data Transaksi Panen</span>
                </motion.button>

                <motion.button
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleItemClick('restan-risk', 3, 'Risiko Restan (W3+)')}
                  className={subNavClass('restan-risk', true, 3)}
                >
                  <div className="flex items-center gap-1.5">
                    <span>Risiko Restan &gt;24 Jam</span>
                    {userWeight < 3 && <Lock className="w-3 h-3 text-[#98A2B3]" />}
                  </div>
                  {userWeight >= 3 && <span className="w-2 h-2 rounded-full bg-[#D92D20] animate-pulse"></span>}
                </motion.button>

                <motion.button
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleItemClick('conflict', 3, 'Resolusi Konflik (W3+)')}
                  className={subNavClass('conflict', false, 3)}
                >
                  <div className="flex items-center gap-1.5">
                    <span>Eskalasi &amp; Resolusi Konflik</span>
                    {userWeight < 3 && <Lock className="w-3 h-3 text-[#98A2B3]" />}
                  </div>
                </motion.button>
              </div>
            )}
          </div>

          {/* Kemandoran & Pemanen */}
          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleItemClick('pemanen', 2, 'Kemandoran & Regu (W2+)')}
            className={navClass('pemanen', 2)}
          >
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4" />
              <span>Kemandoran &amp; Regu Panen</span>
            </div>
            {userWeight < 2 && <Lock className="w-3.5 h-3.5 text-[#98A2B3]" />}
          </motion.button>

          {/* P2P Data Mule */}
          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleItemClick('p2p', 1, 'Data Mule P2P')}
            className={navClass('p2p', 1)}
          >
            <div className="flex items-center gap-3">
              <Truck className="w-4 h-4" />
              <span>Jalur Data Mule (P2P Truk)</span>
            </div>
          </motion.button>

          {/* Peta Spasial EUDR */}
          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleItemClick('eudr', 4, 'Peta Spasial EUDR (W4+)')}
            className={navClass('eudr', 4)}
          >
            <div className="flex items-center gap-3 min-w-0">
              <MapPin className="w-4 h-4 shrink-0 text-[#2E7D32] dark:text-[#34D399]" />
              <span className="truncate">Peta Spasial &amp; EUDR</span>
            </div>
            {userWeight >= 4 ? (
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#E8F5E9] dark:bg-[#064E3B]/60 text-[#2E7D32] dark:text-[#34D399] border border-[#A7F3D0] dark:border-[#059669]/40 font-mono">
                WGS84
              </span>
            ) : (
              <Lock className="w-3.5 h-3.5 text-[#98A2B3]" />
            )}
          </motion.button>
        </div>

        {/* Group 2: ANALYTICS & INSIGHTS */}
        <div className="space-y-1">
          <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#98A2B3] dark:text-[#64748B]">
            Analitik &amp; Performa Kebun
          </div>

          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleItemClick('sla-ffa', 3, 'SLA Restan & FFA (W3+)')}
            className={navClass('sla-ffa', 3)}
          >
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-4 h-4" />
              <span>Monitoring SLA Restan &amp; ALB</span>
            </div>
            {userWeight < 3 && <Lock className="w-3.5 h-3.5 text-[#98A2B3]" />}
          </motion.button>

          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleItemClick('bjr-cpo', 3, 'BJR & Rendemen (W3+)')}
            className={navClass('bjr-cpo', 3)}
          >
            <div className="flex items-center gap-3">
              <BarChart3 className="w-4 h-4" />
              <span>Tren BJR &amp; Rendemen CPO</span>
            </div>
            {userWeight < 3 && <Lock className="w-3.5 h-3.5 text-[#98A2B3]" />}
          </motion.button>

          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleItemClick('audit-trail', 5, 'Audit Trail Global (W5 Manager)')}
            className={navClass('audit-trail', 5)}
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4" />
              <span>Jejak Audit Konsensus Server</span>
            </div>
            {userWeight >= 5 ? (
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-[#98A2B3]" />
            )}
          </motion.button>
        </div>

        {/* Group 3: SUPPORT */}
        <div className="space-y-1">
          <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#98A2B3] dark:text-[#64748B]">
            Pusat Bantuan &amp; Pengaturan
          </div>

          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewChange?.('help')}
            className={navClass('help', 1)}
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-4 h-4" />
              <span>Buku Panduan &amp; SOP Lapangan</span>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewChange?.('settings')}
            className={navClass('settings', 1)}
          >
            <div className="flex items-center gap-3">
              <Settings className="w-4 h-4" />
              <span>Pengaturan Kebun &amp; Sistem</span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Bottom User Card */}
      <div className="p-3 border-t border-[#EAECF0] dark:border-[#1F2937] bg-white dark:bg-[#050811]">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onViewChange?.('settings')}
          className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-[#F9FAFB] dark:hover:bg-[#1E293B] transition-colors cursor-pointer border border-transparent hover:border-[#EAECF0] dark:hover:border-[#334155] text-left"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#E8F5E9] dark:bg-[#064E3B]/60 text-[#2E7D32] dark:text-[#34D399] border border-[#A7F3D0] dark:border-[#059669] flex items-center justify-center font-bold text-xs shrink-0">
              {user ? initials(user.fullName) : '?'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-[#101828] dark:text-[#F8FAFC] truncate">
                {user?.fullName ?? 'Belum Masuk'}
              </div>
              <div className="text-[11px] text-[#667085] dark:text-[#94A3B8] truncate">
                {user ? `${user.role} (W${userWeight})` : 'Silakan masuk'}
              </div>
            </div>
          </div>
          <ChevronsUpDown className="w-4 h-4 text-[#98A2B3] dark:text-[#64748B] shrink-0" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="mt-1.5 w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-[#B42318] dark:text-[#F87171] hover:bg-[#FEF3F2] dark:hover:bg-[#7F1D1D]/30 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar dari Akun</span>
        </motion.button>
      </div>
    </aside>
  );
}
