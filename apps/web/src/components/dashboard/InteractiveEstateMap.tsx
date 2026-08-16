'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ShieldCheck, AlertTriangle, Layers } from 'lucide-react';

export function InteractiveEstateMap() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#0B1C15]/90 border border-[#10B981]/30 p-6 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#10B981]" />
            <h2 className="text-lg font-bold text-white tracking-wide">
              Live GIS Estate Map & EUDR Traceability (SRID 4326)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Kebun Percontohan Politeknik CWE — Afdeling Alpha (Blok B012: 20.45 Ha)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-xs font-semibold text-[#34D399]">
            <ShieldCheck className="w-4 h-4" />
            <span>EUDR Verified</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs font-semibold text-amber-300">
            <AlertTriangle className="w-4 h-4" />
            <span>1 TPH Restan Warning</span>
          </div>
        </div>
      </div>

      {/* SVG Interactive Farm Grid Vector Visualizer */}
      <div className="relative w-full h-80 rounded-2xl bg-[#06110D] border border-white/5 flex items-center justify-center p-4 overflow-hidden">
        <svg viewBox="0 0 600 300" className="w-full h-full">
          {/* Background Grid Pattern */}
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </pattern>
            <linearGradient id="polyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Block B012 EUDR Polygon */}
          <polygon
            points="80,50 520,50 500,240 100,240"
            fill="url(#polyGrad)"
            stroke="#10B981"
            strokeWidth="2.5"
            strokeDasharray="6 4"
            className="animate-pulse"
          />

          {/* Polygon Label */}
          <text x="110" y="80" fill="#34D399" fontSize="13" fontWeight="bold" fontFamily="monospace">
            BLOK B012 (TM 2017 - DxP Marihat)
          </text>
          <text x="110" y="100" fill="#94A3B8" fontSize="11">
            Area: 20.45 Ha | 2.860 Pohon | 100% RSPO Traceable
          </text>

          {/* TPH-01: Normal Green Point */}
          <g transform="translate(180, 160)" className="cursor-pointer">
            <circle r="12" fill="#10B981" fillOpacity="0.3" className="animate-ping" />
            <circle r="7" fill="#10B981" />
            <text x="14" y="4" fill="#FFFFFF" fontSize="11" fontWeight="bold">TPH-01 (120 Janjang - Fresh)</text>
          </g>

          {/* TPH-02: Restan Warning Amber Point */}
          <g transform="translate(390, 180)" className="cursor-pointer">
            <circle r="14" fill="#F59E0B" fillOpacity="0.4" className="animate-ping" />
            <circle r="8" fill="#F59E0B" />
            <text x="16" y="4" fill="#FCD34D" fontSize="11" fontWeight="bold">TPH-02 (85 Janjang - 14h Warning)</text>
          </g>
        </svg>

        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[11px] text-slate-300">
          WGS84 Lat: 0.537810° N | Long: 101.445012° E
        </div>
      </div>
    </div>
  );
}
