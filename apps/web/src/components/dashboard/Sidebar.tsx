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
  Share2,
  ShieldAlert,
  BarChart3,
  FileText,
  HelpCircle,
  Settings,
  MessageSquare,
  Search,
  PanelLeftClose,
  ChevronsUpDown,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { useRouter } from 'next/navigation';
import { initials } from '@/lib/format';

interface SidebarProps {
  currentView?: string;
  onViewChange?: (view: string) => void;
  onSearchClick?: () => void;
}

export function Sidebar({ currentView = 'overview', onViewChange, onSearchClick }: SidebarProps) {
  const [isPanenExpanded, setIsPanenExpanded] = useState(true);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const navClass = (viewKey: string) =>
    `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
      currentView === viewKey
        ? 'bg-[#E8F5E9] dark:bg-[#064E3B]/40 text-[#2E7D32] dark:text-[#34D399] border border-[#A7F3D0]/60 dark:border-[#059669]/40 shadow-xs'
        : 'text-[#475467] dark:text-[#94A3B8] hover:bg-[#F9FAFB] dark:hover:bg-[#1E293B] hover:text-[#101828] dark:hover:text-[#F8FAFC]'
    }`;

  const subNavClass = (viewKey: string, isDanger = false) =>
    `w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
      currentView === viewKey
        ? isDanger 
          ? 'bg-[#FEF3F2] dark:bg-[#7F1D1D]/40 text-[#B42318] dark:text-[#F87171] font-bold' 
          : 'bg-[#E8F5E9] dark:bg-[#064E3B]/40 text-[#2E7D32] dark:text-[#34D399] font-bold'
        : isDanger 
          ? 'text-[#D92D20] dark:text-[#F87171] hover:bg-[#FEF3F2] dark:hover:bg-[#7F1D1D]/30' 
          : 'text-[#475467] dark:text-[#94A3B8] hover:text-[#101828] dark:hover:text-[#F8FAFC] hover:bg-[#F9FAFB] dark:hover:bg-[#1E293B]'
    }`;

  return (
    <aside className="w-64 bg-white dark:bg-[#111827] border-r border-[#EAECF0] dark:border-[#1F2937] flex flex-col h-screen shrink-0 font-sans select-none z-10 transition-colors">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-[#EAECF0] dark:border-[#1F2937]">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onViewChange?.('overview')}
          className="flex items-center gap-2.5 cursor-pointer text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#2E7D32] to-[#10B981] flex items-center justify-center text-white font-black text-sm shadow-sm">
            <Sprout className="w-4 h-4" />
          </div>
          <div>
            <span className="text-base font-extrabold text-[#101828] dark:text-[#F8FAFC] tracking-tight font-sans">
              Sawit<span className="text-[#2E7D32] dark:text-[#34D399]">Go</span>
            </span>
          </div>
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Collapse sidebar"
          onClick={() => onViewChange?.('overview')}
          className="w-7 h-7 rounded-md hover:bg-[#F2F4F7] dark:hover:bg-[#1E293B] text-[#98A2B3] dark:text-[#64748B] hover:text-[#344054] dark:hover:text-[#E2E8F0] flex items-center justify-center transition-colors cursor-pointer"
        >
          <PanelLeftClose className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Search Input (with ⌘K Trigger) */}
      <div className="p-4 pb-2">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSearchClick}
          className="w-full relative flex items-center bg-[#F8F9FB] dark:bg-[#1E293B] hover:bg-[#F2F4F7] dark:hover:bg-[#334155] border border-[#EAECF0] dark:border-[#334155] rounded-xl pl-9 pr-10 py-2 text-xs text-[#667085] dark:text-[#94A3B8] hover:text-[#101828] dark:hover:text-[#F8FAFC] text-left transition-all cursor-pointer"
        >
          <Search className="w-4 h-4 text-[#98A2B3] dark:text-[#64748B] absolute left-3 pointer-events-none" />
          <span>Search anything</span>
          <span className="absolute right-2.5 text-[10px] font-semibold text-[#98A2B3] dark:text-[#64748B] bg-white dark:bg-[#0F172A] border border-[#EAECF0] dark:border-[#334155] px-1.5 py-0.5 rounded font-mono shadow-xs">
            ⌘ K
          </span>
        </motion.button>
      </div>

      {/* Nav Scroll Area */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
        {/* Group 1: MAIN NAVIGATION */}
        <div className="space-y-1">
          <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#98A2B3] dark:text-[#64748B]">
            Main Navigation
          </div>

          {/* Dashboard Page */}
          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewChange?.('overview')}
            className={navClass('overview')}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Page</span>
          </motion.button>

          {/* Panen & TPH (Expandable Tree) */}
          <div className="space-y-0.5">
            <motion.button
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsPanenExpanded(!isPanenExpanded)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-[#475467] dark:text-[#94A3B8] hover:bg-[#F9FAFB] dark:hover:bg-[#1E293B] hover:text-[#101828] dark:hover:text-[#F8FAFC] transition-all cursor-pointer"
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
                  onClick={() => onViewChange?.('tph-queue')}
                  className={subNavClass('tph-queue')}
                >
                  All / TPH Queue
                </motion.button>
                <motion.button
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onViewChange?.('restan-risk')}
                  className={subNavClass('restan-risk', true)}
                >
                  <span>Restan Risk &gt;24h</span>
                  <span className="w-2 h-2 rounded-full bg-[#D92D20] animate-pulse"></span>
                </motion.button>
                <motion.button
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onViewChange?.('conflict')}
                  className={subNavClass('conflict')}
                >
                  Escalations &amp; Conflict
                </motion.button>
              </div>
            )}
          </div>

          {/* Kemandoran & Pemanen */}
          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewChange?.('pemanen')}
            className={navClass('pemanen')}
          >
            <Users className="w-4 h-4" />
            <span>Kemandoran &amp; Tim</span>
          </motion.button>

          {/* P2P Data Mule & Truk */}
          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewChange?.('p2p')}
            className={navClass('p2p')}
          >
            <Truck className="w-4 h-4" />
            <span>P2P Data Mule</span>
          </motion.button>

          {/* Peta Spasial EUDR */}
          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewChange?.('eudr')}
            className={navClass('eudr')}
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4" />
              <span>Peta Spasial EUDR</span>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#E8F5E9] dark:bg-[#064E3B]/60 text-[#2E7D32] dark:text-[#34D399]">
              WGS84
            </span>
          </motion.button>

          {/* Integrasi PKS & ERP */}
          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewChange?.('integrations')}
            className={navClass('integrations')}
          >
            <Share2 className="w-4 h-4" />
            <span>Integrasi Pabrik</span>
          </motion.button>
        </div>

        {/* Group 2: ANALYTICS & INSIGHTS */}
        <div className="space-y-1">
          <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#98A2B3] dark:text-[#64748B]">
            Analytics &amp; Insights
          </div>

          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewChange?.('sla-ffa')}
            className={navClass('sla-ffa')}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>SLA Restan &amp; FFA</span>
          </motion.button>

          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewChange?.('bjr-cpo')}
            className={navClass('bjr-cpo')}
          >
            <BarChart3 className="w-4 h-4" />
            <span>BJR &amp; Rendemen CPO</span>
          </motion.button>

          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewChange?.('audit-trail')}
            className={navClass('audit-trail')}
          >
            <FileText className="w-4 h-4" />
            <span>Audit Trail Konsensus</span>
          </motion.button>
        </div>

        {/* Group 3: SUPPORT */}
        <div className="space-y-1">
          <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#98A2B3] dark:text-[#64748B]">
            Support
          </div>

          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewChange?.('feedback')}
            className={navClass('feedback')}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Feedback</span>
          </motion.button>

          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewChange?.('help')}
            className={navClass('help')}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Help &amp; Support</span>
          </motion.button>

          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewChange?.('settings')}
            className={navClass('settings')}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </motion.button>
        </div>
      </div>

      {/* Bottom User Card */}
      <div className="p-3 border-t border-[#EAECF0] dark:border-[#1F2937] bg-white dark:bg-[#111827]">
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
                {user?.fullName ?? 'Belum Login'}
              </div>
              <div className="text-[11px] text-[#667085] dark:text-[#94A3B8] truncate">
                {user ? `${user.email}` : 'Silakan masuk'}
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
          <span>Keluar dari Dashboard</span>
        </motion.button>
      </div>
    </aside>
  );
}
