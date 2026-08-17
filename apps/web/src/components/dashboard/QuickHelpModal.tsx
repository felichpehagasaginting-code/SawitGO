'use client';

import React from 'react';
import { X, BookOpen, ShieldCheck, Wifi, CheckCircle2 } from 'lucide-react';

interface QuickHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickHelpModal({ isOpen, onClose }: QuickHelpModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-[#0A0F1D] rounded-2xl shadow-2xl border border-[#EAECF0] dark:border-[#1E293B] overflow-hidden animate-in fade-in zoom-in-95 duration-150 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAECF0] dark:border-[#1E293B]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E8F5E9] dark:bg-[#064E3B]/40 text-[#2E7D32] dark:text-[#34D399] flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#101828] dark:text-[#F8FAFC]">Panduan Operasional &amp; Bantuan SawitGO</h2>
              <p className="text-xs text-[#667085] dark:text-[#94A3B8]">Standard Operating Procedure (SOP) Offline-First &amp; Konsensus</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#F2F4F7] dark:hover:bg-[#1E293B] text-[#98A2B3] dark:text-[#64748B] hover:text-[#344054] dark:hover:text-[#F8FAFC] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-5 text-xs text-[#344054] dark:text-[#E2E8F0]">
          <div className="p-4 rounded-xl bg-[#F8F9FB] dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-[#101828] dark:text-[#F8FAFC]">
              <ShieldCheck className="w-4 h-4 text-[#2E7D32] dark:text-[#34D399]" />
              <span>1. Alur Prioritas Resolusi Konflik (Priority Score)</span>
            </div>
            <p className="leading-relaxed text-[#475467] dark:text-[#94A3B8]">
              Sistem menggunakan formula deterministik: <code className="bg-white dark:bg-[#0F172A] px-1.5 py-0.5 rounded border border-[#EAECF0] dark:border-[#334155] font-mono text-[#2E7D32] dark:text-[#34D399]">PriorityScore = (RoleWeight × 10¹²) + Timestamp_MS</code>.
              Data dari Asisten (W3) akan otomatis meng-overwrite data Mandor (W2) atau Krani (W1) secara konsisten dan transparan.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F8F9FB] dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-[#101828] dark:text-[#F8FAFC]">
              <Wifi className="w-4 h-4 text-[#F9A825]" />
              <span>2. Mode Offline &amp; P2P Data Mule</span>
            </div>
            <p className="leading-relaxed text-[#475467] dark:text-[#94A3B8]">
              Saat berada di blank spot tanpa sinyal internet, Krani tetap dapat mencatat hasil panen ke database lokal Isar DB di perangkat. Data akan di-relay secara otomatis ketika truk pengangkut yang dilengkapi Wi-Fi Direct melintasi TPH.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F8F9FB] dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-[#101828] dark:text-[#F8FAFC]">
              <CheckCircle2 className="w-4 h-4 text-[#027A48] dark:text-[#34D399]" />
              <span>3. Kepatuhan EUDR &amp; Geofencing</span>
            </div>
            <p className="leading-relaxed text-[#475467] dark:text-[#94A3B8]">
              Setiap pencatatan panen diverifikasi secara otomatis menggunakan PostGIS untuk memastikan koordinat berada tepat di dalam poligon blok perkebunan sawit terdaftar (WGS84).
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#EAECF0] dark:border-[#1E293B] bg-[#F8F9FB] dark:bg-[#050811] flex items-center justify-between">
          <span className="text-[11px] text-[#98A2B3] dark:text-[#64748B]">SawitGO Knowledge Base • v1.1</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
}
