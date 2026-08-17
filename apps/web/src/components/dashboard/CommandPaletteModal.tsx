'use client';

import React, { useEffect, useState } from 'react';
import {
  Search,
  LayoutDashboard,
  Sprout,
  Truck,
  MapPin,
  ShieldAlert,
  BarChart3,
  FileText,
  Settings,
  HelpCircle,
  X,
  ArrowRight
} from 'lucide-react';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectView: (view: string) => void;
}

interface CommandItem {
  id: string;
  title: string;
  description: string;
  category: 'Views' | 'Actions' | 'TPH & Kebun';
  icon: typeof LayoutDashboard;
  viewTarget?: string;
  action?: () => void;
}

export function CommandPaletteModal({ isOpen, onClose, onSelectView }: CommandPaletteModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands: CommandItem[] = [
    {
      id: 'c-overview',
      title: 'Buka Dashboard Page',
      description: 'Kembali ke ringkasan eksekutif KPI dan tren volume',
      category: 'Views',
      icon: LayoutDashboard,
      viewTarget: 'overview',
    },
    {
      id: 'c-tph',
      title: 'Antrean TPH (TPH Queue)',
      description: 'Lihat daftar transaksi seluruh TPH dan status pengangkutan',
      category: 'Views',
      icon: Sprout,
      viewTarget: 'tph-queue',
    },
    {
      id: 'c-restan',
      title: 'Risiko Restan >24 Jam',
      description: 'Monitoring buah menumpuk dan kenaikan FFA',
      category: 'Views',
      icon: ShieldAlert,
      viewTarget: 'restan-risk',
    },
    {
      id: 'c-conflict',
      title: 'Resolusi Konflik & Priority Score',
      description: 'Audit trail konsensus multi-device offline',
      category: 'Views',
      icon: FileText,
      viewTarget: 'conflict',
    },
    {
      id: 'c-p2p',
      title: 'P2P Data Mule & Telemetri Truk',
      description: 'Relay data panen via truk penampung',
      category: 'Views',
      icon: Truck,
      viewTarget: 'p2p',
    },
    {
      id: 'c-eudr',
      title: 'Peta Spasial EUDR & PostGIS',
      description: 'Visualisasi poligon blok kebun dan ekspor GeoJSON',
      category: 'Views',
      icon: MapPin,
      viewTarget: 'eudr',
    },
    {
      id: 'c-bjr',
      title: 'BJR & Rendemen CPO',
      description: 'Simulasi berat rata-rata dan OER pabrik',
      category: 'Views',
      icon: BarChart3,
      viewTarget: 'bjr-cpo',
    },
    {
      id: 'c-help',
      title: 'Bantuan & SOP Operasional',
      description: 'Lihat formula Priority Score dan SOP restan',
      category: 'Actions',
      icon: HelpCircle,
      viewTarget: 'help',
    },
    {
      id: 'c-settings',
      title: 'Pengaturan & Gateway API',
      description: 'Konfigurasi URL backend NestJS dan hak akses pengguna',
      category: 'Actions',
      icon: Settings,
      viewTarget: 'settings',
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const text = `${cmd.title} ${cmd.description} ${cmd.category}`.toLowerCase();
    return text.includes(query.toLowerCase());
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs font-sans">
      <div 
        className="w-full max-w-xl bg-white dark:bg-[#151D2C] rounded-2xl shadow-2xl border border-[#EAECF0] dark:border-[#1E293B] overflow-hidden animate-in fade-in zoom-in-95 duration-150 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#EAECF0] dark:border-[#1E293B] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#98A2B3] dark:text-[#64748B] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari modul, aksi, atau fitur... (tekan Esc untuk batal)"
            className="w-full text-sm text-[#101828] dark:text-[#F8FAFC] placeholder-[#98A2B3] dark:placeholder-[#64748B] bg-transparent focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#F2F4F7] dark:hover:bg-[#1E293B] text-[#98A2B3] dark:text-[#64748B] hover:text-[#344054] dark:hover:text-[#F8FAFC] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command Results */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#98A2B3] dark:text-[#64748B]">
              Tidak ada perintah yang sesuai dengan kata kunci &quot;{query}&quot;
            </div>
          ) : (
            filteredCommands.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={() => {
                    if (cmd.viewTarget) {
                      onSelectView(cmd.viewTarget);
                    }
                    if (cmd.action) {
                      cmd.action();
                    }
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#F8F9FB] dark:hover:bg-[#1E293B] transition-colors text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#F2F4F7] dark:bg-[#1E293B] text-[#475467] dark:text-[#94A3B8] group-hover:bg-[#E8F5E9] dark:group-hover:bg-[#064E3B]/40 group-hover:text-[#2E7D32] dark:group-hover:text-[#34D399] flex items-center justify-center shrink-0 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#101828] dark:text-[#F8FAFC] group-hover:text-[#2E7D32] dark:group-hover:text-[#34D399] transition-colors truncate">
                        {cmd.title}
                      </div>
                      <div className="text-[11px] text-[#667085] dark:text-[#94A3B8] truncate">
                        {cmd.description}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D0D5DD] dark:text-[#475467] group-hover:text-[#2E7D32] dark:group-hover:text-[#34D399] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div className="p-3 border-t border-[#EAECF0] dark:border-[#1E293B] bg-[#F8F9FB] dark:bg-[#111827] flex items-center justify-between text-[11px] text-[#98A2B3] dark:text-[#64748B]">
          <div className="flex items-center gap-3">
            <span>
              Navigasi: <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] font-mono text-[10px] text-[#344054] dark:text-[#E2E8F0]">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] font-mono text-[10px] text-[#344054] dark:text-[#E2E8F0]">↓</kbd>
            </span>
            <span>
              Pilih: <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] font-mono text-[10px] text-[#344054] dark:text-[#E2E8F0]">Enter</kbd>
            </span>
          </div>
          <span>
            Tutup: <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] font-mono text-[10px] text-[#344054] dark:text-[#E2E8F0]">ESC</kbd>
          </span>
        </div>
      </div>
    </div>
  );
}
