'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Lock, AlertCircle, Loader2, Eye, EyeOff, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { ApiError } from '@/lib/api/client';

const DEMO_ACCOUNTS = [
  { label: 'Manager', nip: 'MGR-001', weight: 'W5', role: 'Estate Manager' },
  { label: 'Asisten', nip: 'AST-010', weight: 'W3', role: 'Asisten Afdeling' },
  { label: 'Krani', nip: 'KRN-102', weight: 'W1', role: 'Krani TPH' },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [nip, setNip] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!nip.trim() || !password) {
      setError('NIP dan password wajib diisi.');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(nip.trim(), password);
      router.push('/');
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Gagal masuk. Pastikan backend berjalan lalu coba lagi.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickFill = (accountNip: string) => {
    setNip(accountNip);
    setPassword('RahasiaKebun2026!');
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB] p-4 font-sans relative overflow-hidden">
      {/* Decorative Animated Background Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#A7F3D0]/40 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#FDE68A]/40 blur-3xl pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo & Heading */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col items-center mb-8"
        >
          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 rounded-2xl bg-[#101828] flex items-center justify-center shadow-xl border border-white/10"
          >
            <Sprout className="w-8 h-8 text-[#10B981]" />
          </motion.div>
          <h1 className="text-2xl font-extrabold text-[#101828] tracking-tight mt-4 text-center">
            SawitGO Command Center
          </h1>
          <p className="text-xs sm:text-sm text-[#667085] mt-1 text-center">
            Masuk ke dashboard operasional perkebunan
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-2xl border border-[#EAECF0] shadow-xl p-6 sm:p-8 backdrop-blur-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* NIP Field */}
            <div>
              <label htmlFor="nip" className="block text-xs font-semibold text-[#344054] mb-1.5">
                NIP / Nomor Pegawai
              </label>
              <input
                id="nip"
                type="text"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                placeholder="contoh: MGR-001"
                autoComplete="username"
                className="w-full bg-[#F8F9FB] border border-[#EAECF0] rounded-xl px-3.5 py-2.5 text-sm text-[#101828] placeholder-[#98A2B3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32] transition-all"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-[#344054] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#98A2B3] absolute left-3.5 top-3 pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password anda"
                  autoComplete="current-password"
                  className="w-full bg-[#F8F9FB] border border-[#EAECF0] rounded-xl pl-10 pr-11 py-2.5 text-sm text-[#101828] placeholder-[#98A2B3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-2.5 text-[#98A2B3] hover:text-[#344054] cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message with AnimatePresence */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FEF3F2] border border-[#FECDCA] text-xs text-[#B42318]"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="flex-1">{error}</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-sm font-bold shadow-md shadow-[#2E7D32]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memverifikasi Sesi…</span>
                </>
              ) : (
                <>
                  <span>Masuk ke Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Quick Demo Fill Buttons */}
          <div className="mt-6 pt-5 border-t border-[#EAECF0]">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#98A2B3]">
                Akun Demo Cepat:
              </span>
              <span className="text-[10px] text-[#667085] font-mono">PIN: RahasiaKebun2026!</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <motion.button
                  key={acc.nip}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => handleQuickFill(acc.nip)}
                  className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#F8F9FB] hover:bg-[#E8F5E9] hover:border-[#A7F3D0] border border-[#EAECF0] text-xs font-semibold text-[#344054] hover:text-[#2E7D32] transition-all cursor-pointer group"
                >
                  <span className="font-bold group-hover:text-[#2E7D32]">{acc.label}</span>
                  <span className="text-[10px] text-[#98A2B3] font-mono">{acc.nip}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center text-xs text-[#98A2B3] flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
          <span>Sesi diamankan dengan Enkripsi JWT &amp; Priority Consensus</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
