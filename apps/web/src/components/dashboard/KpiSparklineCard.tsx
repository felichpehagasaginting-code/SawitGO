'use client';

import React, { useId, useMemo } from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface KpiSparklineCardProps {
  title: string;
  value: string;
  unit?: string;
  trend: string;
  isPositive: boolean;
  tagIcon?: LucideIcon;
  sparklineVariant?: 'green' | 'teal' | 'red' | 'amber';
  dataSeries?: number[];
}

/**
 * Menghasilkan SVG path kurva halus (smooth cubic bezier) berdasarkan data array riil.
 */
function generateDynamicSparkline(
  data: number[] | undefined,
  isPositive: boolean,
  width = 100,
  height = 40,
) {
  // Jika ada data array minimal 2 titik
  if (data && data.length >= 2) {
    const minVal = Math.min(...data);
    const maxVal = Math.max(...data);
    const range = maxVal - minVal === 0 ? 1 : maxVal - minVal;

    const points = data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      // Normalisasi y: 0 di atas, height di bawah. Beri margin 6px atas-bawah
      const normalized = (val - minVal) / range;
      const y = height - 6 - normalized * (height - 12);
      return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
    });

    // Buat smooth curve path
    let linePath = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cp1x = p0.x + (p1.x - p0.x) / 2;
      const cp1y = p0.y;
      const cp2x = p0.x + (p1.x - p0.x) / 2;
      const cp2y = p1.y;
      linePath += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p1.x},${p1.y}`;
    }

    const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;
    return { linePath, areaPath };
  }

  // Fallback kurva parametrik realistis sesuai arah trend isPositive
  if (isPositive) {
    // Kurva Naik
    const linePath = `M 0,${height - 8} Q 25,${height - 12} 50,${height * 0.5} T 100,6`;
    const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;
    return { linePath, areaPath };
  } else {
    // Kurva Turun
    const linePath = `M 0,8 Q 30,12 55,${height * 0.55} T 100,${height - 6}`;
    const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;
    return { linePath, areaPath };
  }
}

export function KpiSparklineCard({
  title,
  value,
  unit,
  trend,
  isPositive,
  tagIcon: TagIcon,
  sparklineVariant = 'green',
  dataSeries,
}: KpiSparklineCardProps) {
  const gradientId = useId();

  const getColors = () => {
    switch (sparklineVariant) {
      case 'red':
        return { stroke: '#EF4444', stop: '#EF4444' };
      case 'teal':
        return { stroke: '#06B6D4', stop: '#06B6D4' };
      case 'amber':
        return { stroke: '#F59E0B', stop: '#F59E0B' };
      case 'green':
      default:
        return { stroke: '#10B981', stop: '#10B981' };
    }
  };

  const colors = getColors();
  const { linePath, areaPath } = useMemo(
    () => generateDynamicSparkline(dataSeries, isPositive, 100, 40),
    [dataSeries, isPositive],
  );

  return (
    <div className="bg-white dark:bg-[#0A0F1D] rounded-2xl p-5 border border-[#EAECF0] dark:border-[#1E293B] shadow-xs hover:shadow-md dark:hover:border-[#334155] transition-all duration-200 flex flex-col justify-between">
      {/* Header with Title and Icon */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#475467] dark:text-[#94A3B8] tracking-tight">
          {title}
        </span>
        {TagIcon && (
          <div className="w-6 h-6 rounded-lg bg-[#F8F9FB] dark:bg-[#1E293B] text-[#667085] dark:text-[#94A3B8] flex items-center justify-center">
            <TagIcon className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      {/* Main Metric with Sparkline */}
      <div className="flex items-end justify-between mt-4">
        <div>
          <div className="text-2xl lg:text-3xl font-extrabold text-[#101828] dark:text-[#F8FAFC] tracking-tight font-sans">
            {value} <span className="text-sm font-medium text-[#667085] dark:text-[#94A3B8]">{unit}</span>
          </div>

          {/* Micro Trend Badge */}
          <div className="flex items-center gap-1.5 mt-2">
            <span
              className={`inline-flex items-center text-xs font-bold ${isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'
                }`}
            >
              {isPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5" />
              )}
              {trend}
            </span>
          </div>
        </div>

        {/* Dynamic Real Sparkline SVG */}
        <div className="w-24 h-12 shrink-0">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
            <defs>
              <linearGradient id={`grad-${gradientId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors.stop} stopOpacity="0.35" />
                <stop offset="100%" stopColor={colors.stop} stopOpacity="0.0" />
              </linearGradient>
            </defs>

            <path d={areaPath} fill={`url(#grad-${gradientId})`} />
            <path
              d={linePath}
              fill="none"
              stroke={colors.stroke}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
