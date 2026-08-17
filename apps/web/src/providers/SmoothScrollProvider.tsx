'use client';

import React, { type ReactNode } from 'react';

/**
 * SmoothScrollProvider
 * Menggunakan native smooth scrolling terakselerasi hardware tanpa pembajakan event wheel,
 * sehingga scroll wheel mouse, touchpad gesture, dan keyboard navigation berfungsi 100% normal.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
