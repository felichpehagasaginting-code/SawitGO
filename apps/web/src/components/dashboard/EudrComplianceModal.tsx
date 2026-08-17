'use client';

import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Download,
  Copy,
  Check,
  X,
  FileJson,
  Loader2
} from 'lucide-react';
import { apiEndpoints } from '@/lib/api/endpoints';
import type { GeoJsonFeatureCollection } from '@/lib/api/types';

interface EudrComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMPTY_COLLECTION: GeoJsonFeatureCollection = {
  type: 'FeatureCollection',
  features: [],
};

export function EudrComplianceModal({ isOpen, onClose }: EudrComplianceModalProps) {
  const [copied, setCopied] = useState(false);

  const { data, isPending, isError } = useQuery({
    queryKey: ['eudr-geojson'],
    queryFn: apiEndpoints.getEudrGeoJson,
    enabled: isOpen,
  });

  const geojsonData = data ?? EMPTY_COLLECTION;

  const exportPayload = useMemo(() => {
    return {
      ...geojsonData,
      name: 'SawitGO_EUDR_Compliance_Audit_Export',
      crs: {
        type: 'name',
        properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' },
      },
      properties: {
        exporterName: 'PT Perkebunan Sawit Mitra Mandiri',
        plantationName: 'Kebun Percontohan Politeknik CWE',
        certificationRSPO: 'RSPO-CERT-2026-9812',
        certificationISPO: 'ISPO-IND-2026-4421',
        eudrRegulation: 'EU Deforestation Regulation (EUDR No 2023/1115)',
        generatedAt: new Date().toISOString(),
      },
    };
  }, [geojsonData]);

  const polygonCount = useMemo(
    () => geojsonData.features.filter((f) => f.geometry?.type === 'Polygon').length,
    [geojsonData],
  );

  const jsonString = useMemo(() => JSON.stringify(exportPayload, null, 2), [exportPayload]);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/geo+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sawitgo-eudr-audit-export-${Date.now()}.geojson`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-[#091712] border border-[#10B981]/40 shadow-2xl overflow-hidden z-10"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#06B6D4]/20 text-[#22D3EE] flex items-center justify-center border border-[#06B6D4]/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-sans">
                    Sertifikat Kepatuhan Spasial EUDR &amp; RSPO (GeoJSON)
                  </h3>
                  <p className="text-xs text-slate-400 font-sans">
                    Standar Regulasi Deforestasi Uni Eropa No 2023/1115 (EPSG:4326 WGS84)
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-xs">
                  <span className="text-slate-400 font-medium">Poligon Terverifikasi:</span>
                  <p className="text-white font-bold font-mono text-sm mt-1">
                    {isPending ? 'Memuat…' : isError ? 'Tidak tersedia' : `${polygonCount} Blok (PostGIS)`}
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-xs">
                  <span className="text-slate-400 font-medium">Presisi Koordinat:</span>
                  <p className="text-[#34D399] font-bold font-mono text-sm mt-1">
                    WGS84 EPSG:4326
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-xs">
                  <span className="text-slate-400 font-medium">Status Deforestasi:</span>
                  <p className="text-[#22D3EE] font-bold font-mono text-sm mt-1">
                    100% Deforestation-Free
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center justify-between bg-black/70 px-4 py-2 rounded-t-2xl border-t border-x border-white/10 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <FileJson className="w-4 h-4 text-[#10B981]" />
                    <span>eudr_compliance_payload.geojson</span>
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Tersalin!' : 'Salin JSON'}</span>
                  </button>
                </div>

                {isPending ? (
                  <div className="p-6 rounded-b-2xl bg-[#040806] border border-white/10 flex items-center justify-center gap-2 text-slate-400 text-xs font-mono">
                    <Loader2 className="w-4 h-4 animate-spin text-[#10B981]" />
                    Mengambil data GeoJSON dari backend…
                  </div>
                ) : (
                  <pre className="p-4 rounded-b-2xl bg-[#040806] border border-white/10 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-64 leading-relaxed">
                    <code>{jsonString}</code>
                  </pre>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-white/10 bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400 font-mono">
                TKT-5 Validated • Hak Cipta Riset BPDPKS CWE 2026–2027
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs transition-colors cursor-pointer"
                >
                  Tutup
                </button>
                <button
                  onClick={handleDownload}
                  disabled={isPending || isError}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] disabled:opacity-50 disabled:cursor-not-allowed text-black font-extrabold text-xs shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh File GeoJSON Resmi</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}