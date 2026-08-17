'use client';

import React, { useState } from 'react';
import { Settings, X, Database, Shield, Radio, Check, Save, Sun, Moon } from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { useTheme } from '@/providers/ThemeProvider';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [autoSyncInterval, setAutoSyncInterval] = useState('15');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans">
      <div 
        className="w-full max-w-xl bg-white dark:bg-[#0A0F1D] rounded-2xl shadow-2xl border border-[#EAECF0] dark:border-[#1E293B] overflow-hidden animate-in fade-in zoom-in-95 duration-150 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAECF0] dark:border-[#1E293B]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F2F4F7] dark:bg-[#1E293B] text-[#344054] dark:text-[#E2E8F0] flex items-center justify-center font-bold">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#101828] dark:text-[#F8FAFC]">Pengaturan Sistem &amp; Estate</h2>
              <p className="text-xs text-[#667085] dark:text-[#94A3B8]">Konfigurasi konektivitas gateway, tema &amp; profil kebun</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#F2F4F7] dark:hover:bg-[#1E293B] text-[#98A2B3] dark:text-[#64748B] hover:text-[#344054] dark:hover:text-[#F8FAFC] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4 text-xs">
          {/* Theme Preferences */}
          <div>
            <label className="block text-xs font-bold text-[#344054] dark:text-[#E2E8F0] mb-1.5">
              Tema Tampilan
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'light' as const, label: 'Mode Terang', icon: Sun },
                { id: 'dark' as const, label: 'Mode Gelap', icon: Moon },
                { id: 'system' as const, label: 'Sistem', icon: Settings },
              ].map((t) => {
                const Icon = t.icon;
                const isActive = theme === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTheme(t.id)}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#E8F5E9] dark:bg-[#064E3B]/50 border-[#2E7D32] dark:border-[#34D399] text-[#2E7D32] dark:text-[#34D399]'
                        : 'bg-[#F8F9FB] dark:bg-[#1E293B] border-[#EAECF0] dark:border-[#334155] text-[#667085] dark:text-[#94A3B8] hover:text-[#101828] dark:hover:text-[#F8FAFC]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#344054] dark:text-[#E2E8F0] mb-1">Pengguna &amp; Hak Akses</label>
            <div className="p-3 bg-[#F8F9FB] dark:bg-[#1E293B] rounded-xl border border-[#EAECF0] dark:border-[#334155] text-[#475467] dark:text-[#94A3B8] flex items-center justify-between">
              <div>
                <span className="font-semibold text-[#101828] dark:text-[#F8FAFC]">{user?.fullName ?? 'Guest'}</span>
                <span className="text-[#667085] dark:text-[#94A3B8] ml-2">({user?.email})</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#E8F5E9] dark:bg-[#064E3B]/40 text-[#2E7D32] dark:text-[#34D399] font-bold text-[11px] border border-[#A7F3D0] dark:border-[#059669]/40">
                {user?.role ?? 'User'} (Weight: {user?.roleWeight ?? 1})
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#344054] dark:text-[#E2E8F0] mb-1">Gateway API Backend NestJS</label>
            <input 
              type="text"
              readOnly
              value="http://localhost:3000/api/v1"
              className="w-full bg-[#F8F9FB] dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] rounded-xl p-2.5 font-mono text-[#101828] dark:text-[#F8FAFC]"
            />
            <p className="text-[11px] text-[#667085] dark:text-[#94A3B8] mt-1">Menggunakan adapter REST API v1.1.0 dengan JWT Bearer Token</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#344054] dark:text-[#E2E8F0] mb-1">Interval Polling Sync Data Mule</label>
            <select
              value={autoSyncInterval}
              onChange={(e) => setAutoSyncInterval(e.target.value)}
              className="w-full bg-white dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] rounded-xl p-2.5 text-[#101828] dark:text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-[#2E7D32]"
            >
              <option value="10">Setiap 10 Detik (Tinggi / Real-time)</option>
              <option value="15">Setiap 15 Detik (Rekomendasi Operasional)</option>
              <option value="30">Setiap 30 Detik (Hemat Bandwidth)</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#EAECF0] dark:border-[#1E293B] bg-[#F8F9FB] dark:bg-[#050811] flex items-center justify-between">
          <span className="text-[11px] text-[#98A2B3] dark:text-[#64748B]">Semua perubahan tersimpan di local configuration</span>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Tersimpan!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Pengaturan</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
