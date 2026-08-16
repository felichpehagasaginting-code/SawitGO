'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  decimals?: number;
  suffix?: string;
  subtitle: string;
  badgeText: string;
  icon: LucideIcon;
  isAlert?: boolean;
}

export function MetricBentoCard({
  title,
  value,
  decimals = 0,
  suffix = '',
  subtitle,
  badgeText,
  icon: Icon,
  isAlert = false,
}: MetricCardProps) {
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!numberRef.current) return;
    const targetObj = { val: 0 };

    gsap.to(targetObj, {
      val: value,
      duration: 2.2,
      ease: 'power3.out',
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.innerText = decimals > 0 
            ? targetObj.val.toFixed(decimals) 
            : Math.floor(targetObj.val).toLocaleString('id-ID');
        }
      },
    });
  }, [value, decimals]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden rounded-3xl p-6 backdrop-blur-xl border ${
        isAlert
          ? 'bg-[#1E1114]/80 border-rose-500/40 shadow-[0_0_30px_-5px_rgba(244,63,94,0.3)]'
          : 'bg-[#0E241B]/70 border-[#10B981]/25 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)]'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div className={`p-2.5 rounded-2xl ${isAlert ? 'bg-rose-500/20 text-rose-400' : 'bg-[#10B981]/20 text-[#10B981]'}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span
          ref={numberRef}
          className="text-4xl font-extrabold tracking-tight font-mono text-white"
        >
          0
        </span>
        {suffix && <span className="text-lg font-bold text-slate-300">{suffix}</span>}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
        <span className="text-xs text-slate-400 font-medium">{subtitle}</span>
        <span
          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
            isAlert
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              : 'bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/30'
          }`}
        >
          {badgeText}
        </span>
      </div>
    </motion.div>
  );
}
