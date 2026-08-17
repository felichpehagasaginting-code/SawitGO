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
  category: 'Halaman Modul' | 'Aksi Cepat' | 'TPH & Kebun';
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
      title: 'Buka Halaman Utama Dashboard',
      description: 'Kembali ke ringkasan eksekutif KPI dan tren volume panen',
      category: 'Halaman Modul',
      icon: LayoutDashboard,
      viewTarget: 'overview',
    },
    {
      id: 'c-tph',
      title: 'Antrean Seluruh TPH (TPH Queue)',
      description: 'Lihat daftar transaksi seluruh TPH dan status pengangkutan TBS',
      category: 'Halaman Modul',
      icon: Sprout,
      viewTarget: 'tph-queue',
    },
    {
      id: 'c-restan',
      title: 'Risiko Restan >24 Jam & ALB (FFA)',
      description: 'Monitoring buah menumpuk dan potensi penurunan mutu CPO',
      category: 'Halaman Modul',
      icon: ShieldAlert,
      viewTarget: 'restan-risk',
    },
    {
      id: 'c-conflict',
      title: 'Resolusi Konflik & Priority Score',
      description: 'Jejak audit konsensus multi-aktor saat sinkronisasi offline',
      category: 'Halaman Modul',
      icon: FileText,
      viewTarget: 'conflict',
    },
    {
      id: 'c-eudr',
      title: 'Peta Spasial & Ketertelusuran EUDR',
      description: 'Visualisasi poligon blok PostGIS dan verifikasi sertifikasi WGS84',
      category: 'Halaman Modul',
      icon: MapPin,
      viewTarget: 'eudr',
    },
    {
      id: 'c-sla',
      title: 'Monitoring SLA Pengangkutan Restan',
      description: 'Analisis kecepatan angkut truk dan pencegahan denda restan',
      category: 'Halaman Modul',
      icon: ShieldAlert,
      viewTarget: 'sla-ffa',
    },
    {
      id: 'c-bjr',
      title: 'Tren BJR & Rendemen CPO',
      description: 'Korelasi berat janjang rata-rata terhadap rendemen pabrik',
      category: 'Halaman Modul',
      icon: BarChart3,
      viewTarget: 'bjr-cpo',
    },
    {
      id: 'c-mule',
      title: 'Jalur Data Mule (P2P Truk)',
      description: 'Topologi sinkronisasi offline antar-perangkat saat blankspot',
      category: 'Halaman Modul',
      icon: Truck,
      viewTarget: 'p2p',
    },
    {
      id: 'c-settings',
      title: 'Pengaturan Kebun & Sistem',
      description: 'Konfigurasi tema tampilan, NIP pengguna, dan status database',
      category: 'Halaman Modul',
      icon: Settings,
      viewTarget: 'settings',
    },
    {
      id: 'c-help',
      title: 'Buku Panduan & SOP Lapangan',
      description: 'Dokumentasi standar operasional penulisan panen & konsensus RBAC',
      category: 'Halaman Modul',
      icon: HelpCircle,
      viewTarget: 'help',
    },
  ];

  const filteredCommands = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: CommandItem) => {
    if (item.viewTarget) {
      onSelectView(item.viewTarget);
    } else if (item.action) {
      item.action();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs font-sans">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-xl bg-white dark:bg-[#0A0F1D] rounded-2xl shadow-2xl border border-[#EAECF0] dark:border-[#1E293B] overflow-hidden z-10">
        {/* Search Header */}
        <div className="flex items-center px-4 border-b border-[#EAECF0] dark:border-[#1E293B]">
          <Search className="w-5 h-5 text-[#98A2B3] dark:text-[#64748B] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ketik nama modul, perintah, atau nomor TPH..."
            autoFocus
            className="w-full px-3 py-4 text-sm text-[#101828] dark:text-[#F8FAFC] placeholder-[#98A2B3] dark:placeholder-[#64748B] bg-transparent outline-hidden"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#98A2B3] hover:text-[#344054] dark:hover:text-[#F8FAFC] hover:bg-[#F2F4F7] dark:hover:bg-[#1E293B] cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#98A2B3] dark:text-[#64748B]">
              Tidak ditemukan modul atau perintah yang cocok dengan &quot;{query}&quot;.
            </div>
          ) : (
            filteredCommands.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F8F9FB] dark:hover:bg-[#1E293B] transition-colors text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#F2F4F7] dark:bg-[#1E293B] text-[#344054] dark:text-[#94A3B8] group-hover:bg-[#E8F5E9] dark:group-hover:bg-[#064E3B]/40 group-hover:text-[#2E7D32] dark:group-hover:text-[#34D399] flex items-center justify-center shrink-0 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#101828] dark:text-[#F8FAFC] truncate">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-[#667085] dark:text-[#94A3B8] truncate">
                        {item.description}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-semibold text-[#98A2B3] dark:text-[#64748B] bg-[#F2F4F7] dark:bg-[#0F172A] px-2 py-0.5 rounded-md">
                      {item.category}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#98A2B3] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Guide */}
        <div className="px-4 py-2.5 bg-[#F8F9FB] dark:bg-[#050811] border-t border-[#EAECF0] dark:border-[#1E293B] flex items-center justify-between text-[11px] text-[#667085] dark:text-[#94A3B8]">
          <span>Gunakan panah untuk navigasi &amp; tekan Enter untuk memilih</span>
          <span className="font-mono text-[10px] bg-white dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] px-1.5 py-0.5 rounded">
            ESC untuk menutup
          </span>
        </div>
      </div>
    </div>
  );
}
