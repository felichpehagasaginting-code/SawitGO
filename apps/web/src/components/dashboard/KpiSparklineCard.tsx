'use client';

import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface KpiSparklineCardProps {
  title: string;
  value: string;
  unit?: string;
  trend: string;
  isPositive: boolean;
  tagIcon?: LucideIcon;
  sparklineVariant?: 'green' | 'teal' | 'red' | 'amber';
}

export function KpiSparklineCard({
  title,
  value,
  unit,
  trend,
  isPositive,
  tagIcon: TagIcon,
  sparklineVariant = 'green',
}: KpiSparklineCardProps) {
  // Generate sparkline SVG paths
  const getSparklineColor = () => {
    switch (sparklineVariant) {
      case 'red':
        return { stroke: '#EF4444', fill: 'url(#redGradient)' };
      case 'teal':
        return { stroke: '#06B6D4', fill: 'url(#tealGradient)' };
      case 'amber':
        return { stroke: '#F59E0B', fill: 'url(#amberGradient)' };
      case 'green':
      default:
        return { stroke: '#10B981', fill: 'url(#greenGradient)' };
    }
  };

  const colors = getSparklineColor();

  return (
    <div className="bg-white dark:bg-[#151D2C] rounded-2xl p-5 border border-[#EAECF0] dark:border-[#1E293B] shadow-xs hover:shadow-md dark:hover:border-[#334155] transition-all duration-200 flex flex-col justify-between">
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
              className={`inline-flex items-center text-xs font-bold ${
                isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'
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

        {/* Mini Sparkline SVG */}
        <div className="w-24 h-12 shrink-0">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
            <defs>
              <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EF4444" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#EF4444" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {sparklineVariant === 'green' && (
              <>
                <path
                  d="M0,35 Q20,32 35,22 T70,12 T100,5 L100,40 L0,40 Z"
                  fill={colors.fill}
                />
                <path
                  d="M0,35 Q20,32 35,22 T70,12 T100,5"
                  fill="none"
                  stroke={colors.stroke}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </>
            )}

            {sparklineVariant === 'teal' && (
              <>
                <path
                  d="M0,30 Q25,38 45,20 T75,16 T100,8 L100,40 L0,40 Z"
                  fill={colors.fill}
                />
                <path
                  d="M0,30 Q25,38 45,20 T75,16 T100,8"
                  fill="none"
                  stroke={colors.stroke}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </>
            )}

            {sparklineVariant === 'red' && (
              <>
                <path
                  d="M0,10 Q25,8 50,22 T80,28 T100,36 L100,40 L0,40 Z"
                  fill={colors.fill}
                />
                <path
                  d="M0,10 Q25,8 50,22 T80,28 T100,36"
                  fill="none"
                  stroke={colors.stroke}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}
