'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Download,
  ShieldCheck,
  Globe2,
  Layers,
  CheckCircle2,
  FileCode,
  ExternalLink,
  Compass
} from 'lucide-react';
import { EstateMapLight } from '../EstateMapLight';
import { EudrComplianceModal } from '../EudrComplianceModal';
import { apiEndpoints } from '@/lib/api/endpoints';

export function EudrSpatialPage() {
  const [isEudrModalOpen, setIsEudrModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadGeoJson = async () => {
    try {
      setIsDownloading(true);
      const geoJson = await apiEndpoints.getEudrGeoJson();
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(geoJson, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `SawitGO_EUDR_Polygons_${new Date().toISOString().split('T')[0]}.geojson`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      console.error('Gagal mengunduh GeoJSON:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-5 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-[#151D2C] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B] shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] dark:bg-[#064E3B]/40 text-[#2E7D32] dark:text-[#34D399] flex items-center justify-center font-bold shadow-xs">
            <Globe2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#101828] dark:text-[#F8FAFC]">
              Peta Spasial &amp; Kepatuhan Regulasi EUDR / RSPO
            </h1>
            <p className="text-xs text-[#667085] dark:text-[#94A3B8] mt-0.5">
              Visualisasi batas poligon konsesi WGS84, verifikasi koordinat panen ST_Contains, dan sertifikat bebas deforestasi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isDownloading}
            onClick={handleDownloadGeoJson}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#EAECF0] dark:border-[#334155] bg-white dark:bg-[#1E293B] text-xs font-semibold text-[#344054] dark:text-[#E2E8F0] hover:bg-[#F9FAFB] cursor-pointer shadow-xs"
          >
            <FileCode className="w-3.5 h-3.5 text-[#2E7D32]" />
            <span>{isDownloading ? 'Mengunduh...' : 'Unduh GeoJSON'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsEudrModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Sertifikat Kepatuhan EUDR</span>
          </motion.button>
        </div>
      </div>

      {/* Spasial Info Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-[#151D2C] border border-[#EAECF0] dark:border-[#1E293B] flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-[#667085] dark:text-[#94A3B8]">Sistem Koordinat Acuan</span>
            <p className="text-base font-extrabold text-[#101828] dark:text-[#F8FAFC] mt-0.5">
              EPSG:4326 (WGS84)
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#151D2C] border border-[#EAECF0] dark:border-[#1E293B] flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-[#667085] dark:text-[#94A3B8]">Batas Deforestasi (EUDR Cut-off)</span>
            <p className="text-base font-extrabold text-[#2E7D32] dark:text-[#34D399] mt-0.5">
              31 Desember 2020 (Bebas)
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#EFF8FF] text-[#175CD3] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#151D2C] border border-[#EAECF0] dark:border-[#1E293B] flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-[#667085] dark:text-[#94A3B8]">Toleransi Deviasi Kanopi</span>
            <p className="text-base font-extrabold text-[#101828] dark:text-[#F8FAFC] mt-0.5">
              ST_Distance &le; 15 Meter
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#F4F3FF] text-[#5925DC] flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Wide Estate Map Component */}
      <EstateMapLight />

      {/* EUDR Compliance Modal */}
      <EudrComplianceModal
        isOpen={isEudrModalOpen}
        onClose={() => setIsEudrModalOpen(false)}
      />
    </div>
  );
}
