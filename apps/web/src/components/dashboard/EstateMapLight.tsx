'use client';

import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Layers,
  MapPin,
  Clock,
  Flame,
  Inbox,
  Loader2,
  Navigation
} from 'lucide-react';
import { apiEndpoints } from '@/lib/api/endpoints';
import { formatNumber, formatDecimal } from '@/lib/format';
import type { GeoJsonFeatureCollection, TphStatusItem } from '@/lib/api/types';

type LayerFilter = 'ALL' | 'POLYGON' | 'RESTAN';

interface Bounds {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

interface PinColor {
  fill: string;
  glow: string;
  label: string;
}

function getPinColor(stage: string | undefined, hasData: boolean): PinColor {
  if (!hasData) {
    return { fill: '#98A2B3', glow: 'rgba(152, 162, 179, 0.3)', label: '#94A3B8' };
  }
  switch (stage) {
    case 'RESTAN_OVERDUE':
      return { fill: '#EF4444', glow: 'rgba(239, 68, 68, 0.4)', label: '#F87171' };
    case 'CRITICAL_20H':
      return { fill: '#F97316', glow: 'rgba(249, 115, 22, 0.4)', label: '#FB923C' };
    case 'WARNING_12H':
      return { fill: '#F59E0B', glow: 'rgba(245, 158, 11, 0.4)', label: '#FCD34D' };
    default:
      return { fill: '#10B981', glow: 'rgba(16, 185, 129, 0.3)', label: '#34D399' };
  }
}

const VIEWBOX = { width: 700, height: 360 };
const PADDING = 55;

type Ring = [number, number][];

function asRing(coordinates: unknown): Ring {
  if (Array.isArray(coordinates) && Array.isArray(coordinates[0])) {
    return coordinates[0] as Ring;
  }
  return [];
}

export function EstateMapLight() {
  const [activeLayer, setActiveLayer] = useState<LayerFilter>('ALL');
  const [selectedTphId, setSelectedTphId] = useState<string | null>(null);

  const geojsonQuery = useQuery<GeoJsonFeatureCollection>({
    queryKey: ['eudr-geojson'],
    queryFn: apiEndpoints.getEudrGeoJson,
  });
  const tphQuery = useQuery<TphStatusItem[]>({
    queryKey: ['tph-status'],
    queryFn: apiEndpoints.getTphStatus,
  });

  const isPending = geojsonQuery.isPending || tphQuery.isPending;
  const isError = geojsonQuery.isError || tphQuery.isError;

  const polygons = useMemo(() => {
    return (geojsonQuery.data?.features ?? []).filter(
      (f) => f.geometry?.type === 'Polygon',
    );
  }, [geojsonQuery.data]);

  const tphList = tphQuery.data ?? [];

  const bounds = useMemo<Bounds | null>(() => {
    let minLat = Infinity;
    let maxLat = -Infinity;
    let minLng = Infinity;
    let maxLng = -Infinity;
    for (const feature of polygons) {
      for (const [lng, lat] of asRing(feature.geometry?.coordinates)) {
        minLat = Math.min(minLat, lat);
        maxLat = Math.max(maxLat, lat);
        minLng = Math.min(minLng, lng);
        maxLng = Math.max(maxLng, lng);
      }
    }
    if (!Number.isFinite(minLat)) {
      return null;
    }
    return { minLat, maxLat, minLng, maxLng };
  }, [polygons]);

  const project = (lng: number, lat: number) => {
    if (!bounds) {
      return { x: VIEWBOX.width / 2, y: VIEWBOX.height / 2 };
    }
    const spanLng = Math.max(bounds.maxLng - bounds.minLng, 1e-6);
    const spanLat = Math.max(bounds.maxLat - bounds.minLat, 1e-6);
    const x =
      PADDING + ((lng - bounds.minLng) / spanLng) * (VIEWBOX.width - PADDING * 2);
    const y =
      PADDING + ((bounds.maxLat - lat) / spanLat) * (VIEWBOX.height - PADDING * 2);
    return { x, y };
  };

  const blockCentroid = (coordinates: unknown): [number, number] => {
    const ring = asRing(coordinates);
    if (ring.length === 0) {
      return [0, 0];
    }
    const sum = ring.reduce(
      (acc, [lng, lat]) => ({ lng: acc.lng + lng, lat: acc.lat + lat }),
      { lng: 0, lat: 0 },
    );
    return [sum.lng / ring.length, sum.lat / ring.length];
  };

  const selectedTph = tphList.find((t) => t.tphId === selectedTphId) ?? null;
  const showPins = activeLayer === 'ALL' || activeLayer === 'RESTAN';
  const showPolygons = activeLayer === 'ALL' || activeLayer === 'POLYGON';

  const stageLabel = (stage: string | undefined): string => {
    switch (stage) {
      case 'RESTAN_OVERDUE':
        return 'RESTAN OVERDUE';
      case 'CRITICAL_20H':
        return 'KRITIS 20H';
      case 'WARNING_12H':
        return 'WARNING 12H';
      default:
        return 'SEGAR';
    }
  };

  return (
    <div className="bg-white dark:bg-[#0A0F1D] rounded-2xl p-6 border border-[#EAECF0] dark:border-[#1E293B] shadow-xs flex flex-col font-sans transition-colors">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAECF0] dark:border-[#1E293B] pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#2E7D32] dark:text-[#34D399]" />
            <h2 className="text-base font-bold text-[#101828] dark:text-[#F8FAFC] font-sans">
              Peta GIS Estate &amp; Status TPH Real-Time
            </h2>
          </div>
          <p className="text-xs text-[#667085] dark:text-[#94A3B8] mt-1 font-sans">
            Poligon blok dari PostGIS (ST_AsGeoJSON, EPSG:4326) • status tumpukan TBS &amp; FFA
          </p>
        </div>

        {/* Layer Filter Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {(
            [
              { key: 'ALL', label: 'Semua' },
              { key: 'POLYGON', label: 'Poligon Blok' },
              { key: 'RESTAN', label: 'Status Restan' },
            ] as const
          ).map((layer) => (
            <button
              key={layer.key}
              onClick={() => setActiveLayer(layer.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                activeLayer === layer.key
                  ? 'bg-[#101828] dark:bg-white text-white dark:text-[#101828] shadow-sm'
                  : 'bg-[#F8F9FB] dark:bg-[#1E293B] text-[#667085] dark:text-[#94A3B8] hover:bg-[#F2F4F7] dark:hover:bg-[#334155]'
              }`}
            >
              {layer.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map Canvas */}
      <div className="relative w-full h-96 rounded-2xl bg-[#F8F9FB] dark:bg-[#0F172A] border border-[#EAECF0] dark:border-[#1E293B] flex items-center justify-center overflow-hidden">
        {isPending && (
          <div className="flex flex-col items-center gap-2 text-xs text-[#667085] dark:text-[#94A3B8]">
            <Loader2 className="w-5 h-5 animate-spin text-[#2E7D32]" />
            Memuat data geospasial…
          </div>
        )}

        {!isPending && isError && (
          <div className="flex flex-col items-center gap-2 text-xs text-[#667085] dark:text-[#94A3B8] px-6 text-center">
            <MapPin className="w-5 h-5 text-[#98A2B3] dark:text-[#64748B]" />
            Peta tidak tersedia — backend tidak terhubung.
          </div>
        )}

        {!isPending && !isError && !bounds && (
          <div className="flex flex-col items-center gap-2 text-xs text-[#667085] px-6 text-center">
            <Inbox className="w-5 h-5 text-[#98A2B3]" />
            Belum ada poligon blok tersedia dari backend. Sinkronkan data dari aplikasi mobile.
          </div>
        )}

        {!isPending && !isError && bounds && (
          <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} className="w-full h-full select-none">
            <defs>
              <pattern id="estate-grid-light" width="35" height="35" patternUnits="userSpaceOnUse">
                <path d="M 35 0 L 0 0 0 35" fill="none" stroke="rgba(16, 185, 129, 0.08)" strokeWidth="1" />
              </pattern>
              <linearGradient id="blockGradA" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.04" />
              </linearGradient>
              <linearGradient id="blockGradB" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#0891B2" stopOpacity="0.04" />
              </linearGradient>
            </defs>

            <rect width="100%" height="100%" fill="url(#estate-grid-light)" />

            {/* Decorative road */}
            <path
              d="M 40,190 Q 200,180 360,195 T 660,185"
              fill="none"
              stroke="rgba(16, 185, 129, 0.15)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 40,190 Q 200,180 360,195 T 660,185"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="1.5"
              strokeDasharray="8 6"
            />

            {/* Block Polygons */}
            {showPolygons &&
              polygons.map((feature, idx) => {
                const ring = asRing(feature.geometry?.coordinates);
                if (ring.length === 0) {
                  return null;
                }
                const points = ring
                  .map(([lng, lat]) => {
                    const p = project(lng, lat);
                    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
                  })
                  .join(' ');
                const [clng, clat] = blockCentroid(feature.geometry?.coordinates);
                const center = project(clng, clat);
                const props = feature.properties as Record<string, unknown>;
                return (
                  <g key={feature.id ?? `poly-${idx}`}>
                    <polygon
                      points={points}
                      fill={idx % 2 === 0 ? 'url(#blockGradA)' : 'url(#blockGradB)'}
                      stroke={idx % 2 === 0 ? '#10B981' : '#06B6D4'}
                      strokeWidth="2"
                      strokeDasharray="4 2"
                    />
                    <text
                      x={center.x}
                      y={center.y - 8}
                      textAnchor="middle"
                      fill="#047857"
                      fontSize="12"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {String(props.blockCode ?? 'BLOK')}
                    </text>
                    <text
                      x={center.x}
                      y={center.y + 10}
                      textAnchor="middle"
                      fill="#94A3B8"
                      fontSize="10"
                      fontFamily="monospace"
                    >
                      {Number(props.areaHectares ?? 0).toFixed(2)} Ha • TM {String(props.plantingYear ?? '-')}
                    </text>
                  </g>
                );
              })}

            {/* TPH Pins */}
            {showPins &&
              tphList.map((tph) => {
                const color = getPinColor(tph.latest?.stage, tph.latest !== null);
                const p = project(tph.longitude, tph.latitude);
                const isSelected = selectedTphId === tph.tphId;
                const radius = tph.latest === null ? 7 : tph.latest.stage === 'RESTAN_OVERDUE' ? 12 : 9;
                return (
                  <g
                    key={tph.tphId}
                    transform={`translate(${p.x.toFixed(1)}, ${p.y.toFixed(1)})`}
                    onClick={() => setSelectedTphId(isSelected ? null : tph.tphId)}
                    className="cursor-pointer"
                  >
                    {tph.latest !== null && tph.latest.stage !== 'NORMAL' && (
                      <circle r={radius + 8} fill={color.glow} className="animate-ping" />
                    )}
                    <circle
                      r={radius}
                      fill={color.fill}
                      stroke={isSelected ? '#101828' : 'white'}
                      strokeWidth={isSelected ? 3 : 2}
                    />
                    <circle r={3} fill="#FFFFFF" />
                    <text
                      x={16}
                      y={4}
                      fill={color.label}
                      fontSize="11"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {tph.tphNumber}
                      {tph.latest
                        ? ` (${formatNumber(tph.latest.janjangCount)} Jjg)`
                        : ' (kosong)'}
                    </text>
                  </g>
                );
              })}
          </svg>
        )}

        {/* GPS Stamp */}
        {bounds && (
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl border border-[#EAECF0] text-[11px] text-[#475467] flex items-center gap-2 font-mono shadow-xs">
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>
              PostGIS EPSG:4326 | {bounds.minLat.toFixed(5)}°–{bounds.maxLat.toFixed(5)}° S
            </span>
          </div>
        )}
      </div>

      {/* Selected TPH Detail Drawer */}
      {selectedTph && (
        <div className="mt-4 p-4 rounded-2xl bg-[#F8F9FB] dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-2xl ${
                selectedTph.latest?.stage === 'RESTAN_OVERDUE'
                  ? 'bg-[#FEF3F2] dark:bg-[#7F1D1D]/30 text-[#B42318] dark:text-[#F87171] border border-[#FECDCA] dark:border-[#DC2626]/40'
                  : selectedTph.latest && selectedTph.latest.stage !== 'NORMAL'
                  ? 'bg-[#FFFAEB] dark:bg-[#78350F]/30 text-[#B54708] dark:text-[#FBBF24] border border-[#FEDF89] dark:border-[#D97706]/40'
                  : 'bg-[#ECFDF3] dark:bg-[#064E3B]/30 text-[#027A48] dark:text-[#34D399] border border-[#A6F4C5] dark:border-[#059669]/40'
              }`}
            >
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-bold text-base font-mono text-[#101828] dark:text-[#F8FAFC]">
                  {selectedTph.tphNumber} ({selectedTph.blockCode})
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-white dark:bg-[#0F172A] text-[#475467] dark:text-[#E2E8F0] border-[#EAECF0] dark:border-[#334155]">
                  {selectedTph.latest ? stageLabel(selectedTph.latest.stage) : 'BELUM ADA PANEN'}
                </span>
                <span className="text-[10px] text-[#98A2B3] dark:text-[#64748B] font-mono">
                  [{selectedTph.qrCode}]
                </span>
              </div>
              <p className="text-xs text-[#667085] dark:text-[#94A3B8] mt-0.5">
                {selectedTph.latest ? (
                  <>
                    <strong className="text-[#101828] dark:text-[#F8FAFC] font-mono">
                      {formatNumber(selectedTph.latest.janjangCount)}
                    </strong>{' '}
                    Janjang • Brondolan{' '}
                    <strong className="text-[#101828] dark:text-[#F8FAFC] font-mono">
                      {formatDecimal(selectedTph.latest.brondolanWeightKg)} Kg
                    </strong>{' '}
                    • {formatDecimal(selectedTph.latest.estimatedWeightKg / 1000)} Ton TBS
                  </>
                ) : (
                  'Belum ada pencatatan panen pada TPH ini.'
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {selectedTph.latest && (
              <div className="text-right">
                <div className="flex items-center gap-1.5 text-xs text-[#667085] dark:text-[#94A3B8] justify-end">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Tertumpuk:</span>
                  <strong
                    className={`font-mono ${
                      selectedTph.latest.elapsedHours >= 24 ? 'text-[#D92D20] dark:text-[#F87171]' : 'text-[#101828] dark:text-[#F8FAFC]'
                    }`}
                  >
                    {formatDecimal(selectedTph.latest.elapsedHours)} Jam
                  </strong>
                </div>
                <div className="flex items-center gap-1.5 text-xs mt-0.5 justify-end">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[#667085] dark:text-[#94A3B8]">Estimasi FFA:</span>
                  <strong className="font-mono text-[#B93815] dark:text-[#FB923C]">
                    {formatDecimal(selectedTph.latest.ffaEstimate, 2)}%
                  </strong>
                </div>
              </div>
            )}

            {selectedTph.latest?.stage === 'RESTAN_OVERDUE' && (
              <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D92D20] to-[#B42318] text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5">
                <Navigation className="w-4 h-4" />
                <span>Dispatch Truk Cepat</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-3 flex items-center gap-4 flex-wrap text-[11px] text-[#667085] dark:text-[#94A3B8]">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" /> Segar (&lt;12 jam)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" /> Warning (12–20 jam)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" /> Kritis (20–24 jam)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" /> Restan (&gt;24 jam)
        </span>
      </div>
    </div>
  );
}