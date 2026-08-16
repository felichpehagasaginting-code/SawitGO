# UI/UX & FRONTEND ENGINEERING SPECIFICATION
## Proyek: SawitGO (AgriSync) — Executive Web Dashboard & Field Mobile Interface
**Versi:** 1.0.0  
**Status:** Single Source of Truth (SSOT) - Anti-AI Slop Frontend Architecture  
**Tanggal:** 17 Agustus 2026  
**Penulis:** Felich Pehagasa Ginting (Technical Lead & System Architect)

---

## 1. Filosofi Desain: Anti-AI Slop & Premium Industrial Aesthetics

Mayoritas UI hasil template generic AI (*AI Slop UI*) memiliki penyakit umum: layout card serba mirip, font default sistem, warna ungu/biru gradien hampa, tanpa ritme tipografi (*typographic hierarchy*), dan animasi kaku atau berlebihan (*over-animated*).

SawitGO menerapkan filosofi **"Industrial Agritech Command Center"**:
1. **Curated Color Harmony**: Mengadopsi perpaduan warna tanah mineral dan daun sawit (*Deep Rainforest Slate `#0A1F18`*, *Tactical Forest Green `#143D30`*, *High-Contrast Signal Amber `#F59E0B`*, dan *OLED Carbon `#0B0F0E`*).
2. **Intentional Micro-Animations (GSAP 3 + Lenis + Framer Motion)**:
   - **Lenis**: Memberikan momentum *smooth inertial scrolling* 60fps tanpa lagging pada halaman analitik panjang.
   - **GSAP (GreenSock) + ScrollTrigger**: Digunakan untuk animasi kompleks *timeline SVG geospasial*, transformasi koordinat poligon, serta efek *counter number ticking* pada metrik tonase BJR dan degradasi FFA.
   - **Framer Motion**: Digunakan untuk transisi antar komponen mikro (modal drawer, swipeable cards, notification toast, status pill transition).
3. **Typography Authority**: Menggunakan font modern **Plus Jakarta Sans** (untuk antarmuka/data) dipadukan dengan font monospace **JetBrains Mono** (untuk ID transaksi UUID, nilai koordinat GPS, dan Priority Score).

---

## 2. Palet Warna & Design Tokens (Tailored Industrial Agritech)

```css
:root {
  /* Surface & Background Layers */
  --bg-app-dark: #070D0B;          /* Carbon OLED Primary Background */
  --bg-card-glass: rgba(14, 28, 23, 0.75); /* Frosted Glassmorphism Card */
  --bg-card-hover: rgba(22, 45, 37, 0.85);
  --border-subtle: rgba(46, 125, 50, 0.25);
  --border-glow: rgba(52, 211, 153, 0.4);

  /* Primary Brand Tokens */
  --color-primary: #10B981;        /* Emerald Active Glow */
  --color-forest: #143D30;         /* Base Brand Palm */
  --color-amber-harvest: #F59E0B;  /* Signal Harvest & Brondolan */
  --color-restan-critical: #EF4444;/* Red Alert >24h Overdue */
  --color-warning-12h: #FBBF24;    /* Yellow Warning 12h */

  /* Text & Data Contrast */
  --text-pure: #F8FAFC;            /* High Contrast Headings */
  --text-muted: #94A3B8;           /* Subtitle & Axis Labels */
  --text-data-mono: #6EE7B7;       /* Monospace Metric Ticking */

  /* Shadows & Glassmorphism Blur */
  --backdrop-blur: blur(16px);
  --shadow-elevation: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
  --shadow-glow-emerald: 0 0 25px -5px rgba(16, 185, 129, 0.3);
  --shadow-glow-red: 0 0 25px -5px rgba(239, 68, 68, 0.4);
}
```

---

## 3. Arsitektur Frontend Web Dashboard (Next.js 14 / React + Lenis + GSAP)

### A. Integrasi Lenis Smooth Scroll + GSAP ScrollTrigger
```tsx
// providers/SmoothScrollProvider.tsx
'use client';
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Sinkronisasi RAF Lenis dengan GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <div className="sawitgo-smooth-wrapper">{children}</div>;
}
```

### B. Komponen Executive KPI Bento Grid (Framer Motion + GSAP Counter)
```tsx
// components/dashboard/MetricBentoCard.tsx
'use client';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

interface MetricCardProps {
  title: string;
  value: number;
  suffix?: string;
  trend: string;
  status: 'normal' | 'warning' | 'critical';
}

export function MetricBentoCard({ title, value, suffix = '', trend, status }: MetricCardProps) {
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (countRef.current) {
      gsap.fromTo(
        countRef.current,
        { innerText: 0 },
        {
          innerText: value,
          duration: 2.0,
          ease: 'power3.out',
          snap: { innerText: 1 },
          onUpdate: function () {
            if (countRef.current) {
              countRef.current.innerHTML = Number(this.targets()[0].innerText).toLocaleString('id-ID');
            }
          },
        }
      );
    }
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={`relative p-6 rounded-2xl border backdrop-blur-xl transition-colors ${
        status === 'critical'
          ? 'bg-red-950/20 border-red-500/30 shadow-glow-red'
          : 'bg-emerald-950/20 border-emerald-500/20 shadow-glow-emerald'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">{title}</h4>
        <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          {trend}
        </span>
      </div>

      <div className="flex items-baseline gap-2">
        <span ref={countRef} className="text-4xl font-bold font-mono tracking-tight text-slate-100">
          0
        </span>
        <span className="text-sm font-medium text-emerald-400">{suffix}</span>
      </div>
    </motion.div>
  );
}
```

---

## 4. Visualisasi Konflik Terdistribusi (Visual Conflict Flow Inspector)

Untuk kebutuhan audit ilmiah BPDPKS dan presentasi, dashboard web dilengkapi dengan **Interactive Conflict Timeline Inspector**:

```
+-----------------------------------------------------------------------------------------+
| CONFLICT RESOLUTION AUDIT INSPECTOR (TRANSACTION: #harv-b012-001)                        |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|  [DEVICE A: KRANI LAPANGAN]                  [DEVICE B: ASISTEN AFDELING]                |
|  Role Weight: 1 (Krani)                      Role Weight: 3 (Asisten)                    |
|  Input: 120 Janjang @ 08:00 (Offline)        Revisi: 110 Janjang @ 09:30 (Offline)       |
|  Score: 1.723.851.000.000                    Score: 3.723.855.400.000                    |
|             \                                              /                            |
|              \                                            /                             |
|               +------------------------------------------+                              |
|               |  GSAP ANIMATED SERVER CONSENSUS ENGINE   |                              |
|               |  Formula: (Weight * 1.000.000) + TimeMs  |                              |
|               +------------------------------------------+                              |
|                                    |                                                    |
|                                    v                                                    |
|                   [WINNING CONSENSUS: DATA ASISTEN]                                     |
|                   Status: 200 Overwrite Server Database                                 |
|                   Audit Log: sync_audit_trails ID: #audit-9921                          |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 5. Standar Ergonomi UI Mobile Lapangan (Flutter Client)

### A. Numpad Dial Pad Khusus (Zero-Mistake Field Stepper)
- Dilarang membuka keyboard sistem Android QWERTY penuh karena lambat dan rawan *mis-press*.
- Disediakan *Custom Bottom Sheet Number Stepper* dengan tombol cepat: `+1`, `+5`, `+10`, `+50` dan tombol `-1` untuk koreksi cepat.

### B. Dynamic Haptic Feedback Profile
- **Tick Ringan (Light Haptic)**: Tiap sentuhan tombol stepper janjang.
- **Getar Ganda (Medium Haptic)**: Saat berhasil mengunci koordinat GPS $<5$ meter.
- **Getar Sukses (Heavy Haptic + Chime)**: Saat QR Code TPH terverifikasi atau batch berhasil tersimpan lokal di Isar DB.
- **Getar Peringatan (Error Vibration)**: Saat akurasi GPS $>5$ meter atau koordinat terdeteksi di luar poligon blok.

---

## 6. Layout Wireframe Blueprint (ASCII Representation)

### A. Mobile Home & Ingestion Screen (Flutter)
```
+------------------------------------------+
|  SawitGO Mobile      [🔴 Offline: 5 Antre]
+------------------------------------------+
|  📍 BLOK: B012 | AFDELING: ALPHA         |
|  📌 TPH : TPH-04 (QR-VERIFIED ✅)         |
|  🛰️ GPS: 0.5378, 101.4450 (Akurasi 2.1m) |
+------------------------------------------+
|  JUMLAH JANJANG TBS                      |
|  [ - ]        [  125  ]         [ + ]    |
|  [ +1 ]      [ +5 ]     [ +10 ]  [ +50 ] |
+------------------------------------------+
|  BERAT BRONDOLAN (KG): [ 45.5 Kg ]       |
+------------------------------------------+
|  MUTU BUAH:                              |
|  Masak: 120 | Mentah: 3 | Lewat: 2       |
+------------------------------------------+
|  [ 💾 SIMPAN PANEN (ENCRYPT TO ISAR) ]   |
|  *Otomatis Dikirim saat Sinyal Terdeteksi |
+------------------------------------------+
```

### B. Executive Web Dashboard (Next.js)
```
+---------------------------------------------------------------------------------------+
| SawitGO Command Center   [Afdeling Alpha ▼]   [Auto-Refresh: 10s]   [👤 Manager Bambang] |
+---------------------------------------------------------------------------------------+
| [📦 Total Janjang]   [⚖️ Estimasi Tonase]   [⚠️ Potensi Restan]   [🧪 Rata-rata FFA]   |
|   14.850 Janjang         245.2 Ton             3 TPH (2.1%)           1.68% (Aman)    |
+---------------------------------------------------+-----------------------------------+
|  🗺️ GIS REAL-TIME RESTAN HEATMAP (POSTGIS MAP)    |  📋 LIVE INGESTION FEED (SYNC)    |
|  +---------------------------------------------+  |  [08:12] Krani TPH-01: 120 Janjang|
|  | [Blok B012] 🟢 Normal                       |  |  [08:15] Mandor TPH-04: 95 Janjang|
|  | [Blok B014] 🟡 Warning 12h (TPH-03)         |  |  [08:20] ⚖️ Conflict Resolved      |
|  | [Blok C002] 🔴 RESTAN CRITICAL (TPH-08)     |  |         Asisten overwrite Krani   |
|  |             Durasi: 26 Jam (FFA: 5.4%)      |  |  [08:25] Truk 04 Muat TPH-02      |
|  +---------------------------------------------+  |-----------------------------------|
|  [ 📥 EKSPOR EUDR GEOJSON ] [ 📄 LAPORAN TBS ]    |  [ 🔍 DETAIL AUDIT LOG TRAIL ]    |
+---------------------------------------------------+-----------------------------------+
```
