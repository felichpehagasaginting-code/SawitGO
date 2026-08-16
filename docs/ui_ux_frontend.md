# UI/UX & FRONTEND ENGINEERING SPECIFICATION
## Proyek: SawitGO (AgriSync) — Executive Web Dashboard & Field Mobile Interface
**Versi:** 1.2.0  
**Status:** Approved SSOT - Anti-AI Slop, Eye-Catchy, Multi-Generational UI & 100% Vector SVG Standard  
**Tanggal:** 17 Agustus 2026  
**Penulis:** Felich Pehagasa Ginting (Technical Lead & System Architect)

---

## 1. Standar Mandatori Visual: 100% Format Vector SVG

> [!IMPORTANT]
> **ATURAN MANDATORI ASET GRAFIS:**
> Seluruh logo resmi, stiker verifikasi, lencana sertifikasi (*badges*), dan ikon antarmuka di proyek SawitGO **WAJIB menggunakan format Scalable Vector Graphics (SVG)**. 
> Dilarang menggunakan format raster bitmap (*PNG, JPG, JPEG, GIF*) untuk elemen branding dan ikon guna menjamin ketajaman visual di semua resolusi layar (Mobile FHD+, Tablet, Layar Monitor 4K Command Center), hemat memori RAM, dan mendukung manipulasi animasi interaktif berbasis GSAP/CSS.

### Direktori Aset SVG Resmi:
- **`assets/branding/`**: Logo utama aplikasi, simbol monogram, dan maskot grafis dalam format `.svg` (contoh: [`assets/branding/sawitgo_logo.svg`](file:///f:/Projects/SawitGO/assets/branding/sawitgo_logo.svg)).
- **`assets/stickers/`**: Stiker status sertifikasi (*EUDR Verified*, *100% Offline Ready*) dalam format `.svg` (contoh: [`assets/stickers/sticker_offline_ready.svg`](file:///f:/Projects/SawitGO/assets/stickers/sticker_offline_ready.svg)).
- **`assets/icons/`**: Ikon kontrol teknis (*GPS radar*, *truk angkut*, *timbangan brondolan*, *TBS sawit*) dalam format `.svg`.

---

## 2. Filosofi Desain: "Eye-Catchy Modernity Meets Multi-Generational Inclusivity"

Desain SawitGO memadukan estetika *hyper-modern visual appeal* (yang memukau bagi juri riset/eksekutif muda) dengan *extreme readability & cognitive ease* (yang nyaman, ramah mata, dan intuitif bagi Mandor/Krani berusia 40–55+ tahun di lapangan).

### 4 Pilar Pengalaman Pengguna Lintas Generasi:
1. **Tipografi Premium & Super-Legible (Outfit + Space Grotesk + Plus Jakarta Sans)**:
   - **Outfit / Plus Jakarta Sans**: Font dengan geometri lingkaran terbuka (*high x-height*, *large counters*), membuat teks sangat mudah dibaca tanpa menyipitkan mata bagi pengguna usia lanjut.
   - **Space Grotesk / JetBrains Mono**: Tipografi angka janjang & data metrik yang tegas, modern, berkarakter, dan berdaya tarik visual tinggi (*eye-catchy*).
2. **Kombinasi Animasi Halus & Bermakna (Lenis + GSAP + Framer Motion)**:
   - **Lenis Smooth Scroll**: Sensasi scrolling berbobot halus tanpa patah-patah yang ramah bagi mata.
   - **GSAP + ScrollTrigger**: Efek *number counting odometer* pada tonase dan peta heatmap dinamis yang memanjakan mata eksekutif.
   - **Framer Motion**: Transisi kartu dan modal drawer yang mengalir natural tanpa gerakan mendadak (*no motion sickness*).
3. **Pembeda Visual Kuat Berbasis Tiga Sensorik (Warna + Ikon Simbol + Teks Jelas)**:
   - Tidak hanya mengandalkan warna: Setiap status kritis selalu dilengkapi **Ikon Tebal** dan **Label Teks Bahasa Indonesia Sehari-hari** (misal: "🔴 ⚠️ PERHATIAN: 24 JAM BELUM DIANGKUT").
4. **Ergonomi Sentuh Tanpa Salah Pencet (*Zero-Mistake Giant Touch Target*)**:
   - Tombol aksi utama dengan ketinggian **60 dp**, radius sudut melengkung ramah (*Squircle 16px*), dan jarak renggang agar nyaman bagi tangan pekerja kebun.

---

## 3. Palet Warna & Design Tokens (Eye-Catchy Palm Theme)

```css
:root {
  /* Surface & Background */
  --bg-app-dark: #070E0B;             /* Deep Emerald Carbon */
  --bg-card-glass: rgba(13, 27, 21, 0.85); /* Frosted Jade Glass */
  --bg-card-hover: rgba(20, 42, 33, 0.95);
  --border-subtle: rgba(52, 211, 153, 0.2);
  --border-glow: rgba(52, 211, 153, 0.45);

  /* Eye-Catchy Brand Accents */
  --color-primary-emerald: #10B981;   /* Neon Emerald Accent */
  --color-forest-rich: #064E3B;       /* Deep Rich Forest */
  --color-harvest-gold: #F59E0B;      /* Signal Gold & Amber */
  --color-restan-crimson: #EF4444;    /* Crimson Red Warning */
  --color-ocean-verified: #06B6D4;    /* Cyan EUDR Verified */

  /* High-Contrast Typography */
  --text-pure: #FFFFFF;               /* 100% White for Maximum Contrast */
  --text-soft: #CBD5E1;               /* Slate Light Gray */
  --text-muted: #94A3B8;              /* Secondary Label */
  --text-data-glow: #34D399;          /* Glowing Monospace Numbers */

  /* Shadows & Glassmorphism Blur */
  --backdrop-blur: blur(20px);
  --shadow-elevation: 0 12px 32px -8px rgba(0, 0, 0, 0.6);
  --shadow-glow-emerald: 0 0 30px -5px rgba(16, 185, 129, 0.35);
  --shadow-glow-crimson: 0 0 30px -5px rgba(239, 68, 68, 0.45);
}
```

---

## 4. Komponen Web Dashboard: Bento Grid & Smooth Animation

### A. Lenis Smooth Scroll Provider + GSAP Sync
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
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <div className="sawitgo-smooth-wrapper font-sans">{children}</div>;
}
```

### B. Eye-Catchy KPI Metric Bento Card (GSAP Odometer + Framer Motion)
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
  subtitle: string;
  badgeText: string;
  isAlert?: boolean;
}

export function MetricBentoCard({
  title,
  value,
  suffix = '',
  subtitle,
  badgeText,
  isAlert = false,
}: MetricCardProps) {
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (counterRef.current) {
      gsap.fromTo(
        counterRef.current,
        { innerText: 0 },
        {
          innerText: value,
          duration: 2.2,
          ease: 'power3.out',
          snap: { innerText: 1 },
          onUpdate: function () {
            if (counterRef.current) {
              counterRef.current.innerHTML = Number(this.targets()[0].innerText).toLocaleString('id-ID');
            }
          },
        }
      );
    }
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className={`relative p-6 rounded-3xl border backdrop-blur-2xl transition-all duration-300 ${
        isAlert
          ? 'bg-gradient-to-b from-red-950/40 to-black/60 border-red-500/40 shadow-glow-crimson'
          : 'bg-gradient-to-b from-emerald-950/30 to-black/50 border-emerald-500/25 shadow-glow-emerald'
      }`}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-bold tracking-wider uppercase text-slate-300 font-sans">
          {title}
        </span>
        <span
          className={`text-xs px-3 py-1 rounded-full font-bold font-mono tracking-wide ${
            isAlert
              ? 'bg-red-500/20 text-red-300 border border-red-500/30'
              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
          }`}
        >
          {badgeText}
        </span>
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span
          ref={counterRef}
          className="text-4xl lg:text-5xl font-black font-mono tracking-tight text-white"
        >
          0
        </span>
        <span className="text-lg font-bold text-emerald-400 font-sans">{suffix}</span>
      </div>

      <p className="text-sm font-medium text-slate-400 font-sans mt-2">{subtitle}</p>
    </motion.div>
  );
}
```

---

## 5. Antarmuka Mobile (Flutter) Ramah Mandor & Krani (Segala Usia)

### A. Fitur Aksesibilitas Khusus Semua Kalangan Usia:
1. **Super Giant Number Dial (+1, +5, +10, +50)**:
   - Mandor cukup mengetuk tombol chip besar tanpa perlu mengetik satu per satu.
2. **Ukuran Font Angka 36sp Bold**:
   - Angka hasil panen terlihat jelas dari jarak pandang lengan terbuka tanpa kacamata baca.
3. **Bahasa Operasional Sederhana & Ramah**:
   - Tidak menggunakan istilah asing yang membingungkan: Digunakan istilah kebun yang sudah akrab (*Janjang TBS, Brondolan, Buah Mentah, Buah Masak, Restan, Sinyal Hilang*).
4. **Vibrasi Getar Multimoda**:
   - Mandor tahu inputnya berhasil tersimpan lewat getaran mantap HP tanpa harus mengecek layar berulang kali.

---

## 6. Wireframe Layout Komprehensif

### A. Mobile Screen (Flutter Ingestion - Ramah Semua Usia)
```
+-------------------------------------------------------------+
|  🌾 SawitGO Mobile               [ 🔴 OFFLINE: 3 Antrean ]  |
+-------------------------------------------------------------+
|  📍 LOKASI KEBUN                                            |
|  Afdeling: ALPHA  |  Blok: B012 (TM 2017)                   |
|  TPH     : TPH-04 (Terpindai QR ✅)                         |
|  Sinyal  : 🛰️ GPS Presisi Tinggi (2.1m - Valid EUDR)        |
+-------------------------------------------------------------+
|  JUMLAH JANJANG SAWIT                                       |
|                                                             |
|             [  -  ]      125 Janjang      [  +  ]           |
|                                                             |
|    [ +1 Janjang ]   [ +5 Janjang ]   [ +10 ]   [ +50 ]      |
+-------------------------------------------------------------+
|  BERAT BRONDOLAN :  [  45.5 Kg  ]                           |
+-------------------------------------------------------------+
|  KONDISI BUAH (MUTU) :                                      |
|  🟢 Buah Masak : 120    |  🟡 Buah Mentah : 3               |
|  🟠 Lewat Masak: 2      |  🔴 Tangkai Pjg : 0               |
+-------------------------------------------------------------+
|                                                             |
|       [ 💾 SIMPAN DATA PANEN (AMAN TANPA SINYAL) ]          |
|                                                             |
+-------------------------------------------------------------+
```

### B. Web Dashboard (Command Center - Eye-Catchy Next.js)
```
+-----------------------------------------------------------------------------------------+
|  🌴 SawitGO Executive Command Center      [Kebun CWE ▼]  [Auto-Sync: 10s]  [👤 Mgr. Bambang] |
+-----------------------------------------------------------------------------------------+
| [📦 Total Janjang Hari Ini] [⚖️ Tonase Estimasi]  [⚠️ Potensi Buah Restan] [🧪 Mutu FFA Rata²]|
|      14.850 Janjang              245.2 Ton             3 TPH (2.1%)          1.68% (Aman)   |
|      ▲ +8.2% vs Kemarin         BJR 16.5 Kg/Jjg       🚨 1 TPH >24 Jam       Standar <5%    |
+----------------------------------------------------+------------------------------------+
|  🗺️ GIS REAL-TIME MAP (POSTGIS & HEATMAP RESTAN)   |  ⚡ LIVE SYNC INGESTION STREAM      |
|  +----------------------------------------------+  |  [08:12] Krani TPH-01: 120 Janjang |
|  | [Blok B012] 🟢 SELESAI (Semua Diangkut)      |  |  [08:18] Mandor TPH-04: 95 Janjang |
|  | [Blok B014] 🟡 PERINGATAN 12 JAM (TPH-03)    |  |  [08:24] ⚖️ Resolusi Konflik:      |
|  | [Blok C002] 🔴 RESTAN KRITIS 26 JAM (TPH-08) |  |         Asisten overwrite Krani    |
|  |             Truk Terdekat: Truk-02 (2.4 Km)  |  |  [08:30] Truk-01 Berangkat ke PKS  |
|  +----------------------------------------------+  |------------------------------------|
|  [ 📥 EKSPOR SERTIFIKAT EUDR ] [ 📄 REKAP AFDELING ]|  [ 🔍 AUDIT LOG TRAIL DETAIL ]     |
+----------------------------------------------------+------------------------------------+
```
