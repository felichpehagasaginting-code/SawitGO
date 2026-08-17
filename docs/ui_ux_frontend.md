# UI/UX & FRONTEND ENGINEERING SPECIFICATION (SSOT)

## Proyek: SawitGO (AgriSync) — Tactile Neo-Modern Mobile & Command Center System

**Dokumen:** Spesifikasi Sistem Desain, Visual Aesthetics, Ergonomi Lapangan & Rekayasa Frontend  
**Versi:** 2.1.0 (Neo-Tactile Modernist / FAANG & Top-Tier Consumer Agritech Standard)  
**Status:** Approved SSOT (Single Source of Truth)  
**Tanggal:** 17 Agustus 2026  
**Penulis:** Felich Pehagasa Ginting (Technical Lead & System Architect)

---

## 1. Filosofi Desain: "Tactile Minimalist Agritech"

Mengadopsi bahasa desain **Neo-Tactile Consumer-Industrial** (perpaduan estetika *Apple Fitness / WHOOP / Linear Mobile / DJI Enterprise*):

- **Kartu Squircle Tebal (*Chunky Squircle 28–36px*)**: Sudut membulat organik yang ramah jempol dan nyaman dipandang.
- **Kontras Dual-Tone (Dark Obsidian & Soft Tinted Pastels)**:
  - Kartu kontrol utama menggunakan *Dark Charcoal / Obsidian* (`#121815`) dengan *glow gradient* lembut.
  - Kartu metrik & analitik menggunakan blok warna *Pastel Tinted Containers* (Soft Mint/Sage `#E8F8F0`, Soft Lavender `#F3E8FF`, Soft Peach `#FFF4E6`, Soft Sky `#E0F2FE`).
- **Segmented Pill Controls**: Tab filter berbentuk kapsul dengan animasi geser halus (*Smooth Pill Tabs*).
- **Slide-to-Confirm Bottom Pill**: Tombol aksi utama dengan mekanisme geser (*Slide-to-Action*) `[ 🌾 Geser untuk Simpan >> ]` untuk mencegah salah pencet di lapangan.
- **Timeline Checkpoint Stream**: Garis linier vertikal dengan bulatan status yang menghubungkan siklus panen dari TPH $\rightarrow$ Truk Mule $\rightarrow$ Pabrik PKS.
- **Donut Progress Rings & Tabular Pills**: Indikator target panen melingkar dan grafik batang kapsul (*vertical pill bars*).

```text
   ┌──────────────────────────────────────────────────────────────────────────┐
   │            ANATOMI VISUAL SAWITGO NEO-TACTILE MODERNIST                  │
   ├──────────────────────────────────────────────────────────────────────────┤
   │                                                                          │
   │   (←)                       13:13                          (📅) (👤)     │
   │                                                                          │
   │   Pencatatan Panen Lapangan                                              │
   │   [ ( Panen )     ( Statistik )     ( P2P Mesh ) ]   <- SEGMENTED PILLS  │
   │                                                                          │
   │   +----------------------------------------------+                       │
   │   |  Terminal TPH-04 (Blok B012)        [ 📷 QR ]|                       │
   │   |                                              |                       │
   │   |    + 125                                     | <- DARK HERO CARD     │
   │   |    JANJANG TBS                               |    (Obsidian + Glow)  │
   │   |    Est: 2.312 Kg                             |                       │
   │   +----------------------------------------------+                       │
   │                                                                          │
   │   |●|  Afdeling Alpha — Hari Ini                 |                       │
   │   | |  +--------------------------------------+  |                       │
   │   | |  | 🟢 Mutu Prima (95.2% Masak)    2.3 Ton|  | <- SOFT MINT PASTEL  │
   │   | |  | [||||||||||||||||||||.....]           |  |    CONTAINER CARD    │
   │   | |  +--------------------------------------+  |                       │
   │   |                                              |                       │
   │   |○|  Blok B014 — Restan Warning 14 Jam         |                       │
   │   |    +--------------------------------------+  |                       │
   │   |    | 🟡 85 Janjang Belum Diangkut    1.6 Ton |  | <- SOFT PEACH PASTEL │
   │   |    +--------------------------------------+  |    CONTAINER CARD     │
   │                                                                          │
   │   +----------------------------------------------+                       │
   │   |  ( 🌾 )   Geser untuk Simpan Data Panen >>   | <- SLIDE-TO-ACTION    │
   │   +----------------------------------------------+    BOTTOM PILL        │
   └──────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Palet Warna & Design Tokens (Neo-Tactile Palette)

```css
:root {
  /* --- BASE SURFACES --- */
  --surface-app-bg: #F8FAF9;          /* Crisp Clean Light Background */
  --surface-dark-card: #0D1612;       /* Charcoal Obsidian Inset Card */
  --surface-dark-hover: #14221C;
  --surface-white-card: #FFFFFF;      /* Clean White Elevated Surface */
  
  /* --- SOFT TINTED PASTEL CONTAINERS --- */
  --pastel-mint-bg: #E8F8F0;          /* Fresh Panen / Selesai Diangkut */
  --pastel-mint-border: #A7F3D0;
  --pastel-mint-text: #065F46;

  --pastel-lavender-bg: #F3E8FF;      /* Statistik & Ringkasan Kemandoran */
  --pastel-lavender-border: #DDD6FE;
  --pastel-lavender-text: #5B21B6;

  --pastel-peach-bg: #FFF4E6;         /* Peringatan Restan 12–14 Jam */
  --pastel-peach-border: #FED7AA;
  --pastel-peach-text: #9A3412;

  --pastel-coral-bg: #FEE2E2;         /* Restan Kritis > 24 Jam */
  --pastel-coral-border: #FECACA;
  --pastel-coral-text: #991B1B;

  --pastel-sky-bg: #E0F2FE;           /* EUDR & RSPO Spasial Terverifikasi */
  --pastel-sky-border: #BAE6FD;
  --pastel-sky-text: #075985;

  /* --- BRAND ACCENTS & CONTRAST --- */
  --brand-emerald: #10B981;           /* Neon Emerald Highlight */
  --brand-emerald-dark: #064E3B;
  --brand-charcoal: #18181B;          /* Deep Black Controls */
  --brand-amber: #F59E0B;             /* Warning State */
  --brand-crimson: #EF4444;           /* Alert State */

  /* --- TYPOGRAPHY SCALES --- */
  --text-headline-dark: #0F172A;      /* Slate 900 for Light Containers */
  --text-body-dark: #334155;          /* Slate 700 */
  --text-muted-dark: #64748B;         /* Slate 500 */
  --text-headline-light: #FFFFFF;     /* Pure White for Dark Hero Cards */
  --text-body-light: #CBD5E1;

  /* --- SQUIRCLE BORDER RADIUS TOKENS --- */
  --radius-pill: 9999px;              /* Full Pill Controls */
  --radius-card-lg: 32px;             /* Hero & Container Cards */
  --radius-card-md: 24px;             /* Inner Metric Cards */
  --radius-button: 20px;              /* Action Buttons */
  --radius-chip: 14px;                /* Quick Counters */
}
```

---

## 3. Spesifikasi Komponen Inti (Mobile & Web)

### A. Segmented Pill Tab Bar

- **Anatomi**: Baris kapsul horizontal berlatar abu-abu lembut (`#F1F5F9` atau `#1A2621`).
- **Pill Aktif**: Berwarna hitam solid (`#18181B`) atau Emerald Neon (`#10B981`) dengan teks putih tebal dan bayangan halus (*soft elevation*).
- **Pill Inaktif**: Berlatar transparan dengan teks abu-abu medium (`#64748B`), berganti warna saat di-hover/tap.

### B. Dark Hero Card dengan Viewfinder QR & Counter Besar

- **Anatomi**:
  - Latar belakang: *Charcoal Obsidian* (`#0D1612`) dengan sudut membulat $32\text{px}$.
  - Header: Nama TPH & Blok (Font Plus Jakarta Sans 16px Bold).
  - Counter Utama: **`+ 125`** (Font JetBrains Mono / Space Grotesk 48sp Black, Tabular Numbers).
  - Sisi Kanan: Mini viewfinder scanner QR TPH berlatar gradien lembut dengan sudut laser siku.
  - Footer: Indikator pagination dots (`● ○ ○ ○ ○`).

### C. Pastel Timeline Container Cards

- **Garis Timeline Vertikal**: Garis berketebalan 2px yang menghubungkan titik-titik panen harian.
- **Node Bulat (*Checkpoint Node*)**:
  - `[ ✓ ]` Hitam/Hijau: Transaksi panen di TPH selesai dicatat & terverifikasi.
  - `[ ||| ]` Biru/Mint: Sesi panen sedang aktif berlangsung.
  - `[ ○ ]` Abu-abu: Titik TPH berikutnya dalam rute.
- **Kartu Pastel**:
  - *Soft Mint Card*: Menampilkan total janjang buah masak & tonase estimasi.
  - *Soft Lavender Card*: Menampilkan durasi pencatatan, grafik batang jam panen, dan BJR.
  - *Soft Peach Card*: Menampilkan status restan TBS dengan waktu tunggu armada truk.

### D. Slide-to-Action Bottom Slider (Geser untuk Konfirmasi)

- **Mekanisme**:
  - Drag handle bundar berisi ikon (`🌾` atau `🚀`) di sisi kiri kapsul.
  - Pengguna menggeser handle ke arah kanan hingga $100\%$ lebar track untuk mengeksekusi simpan/sinkronisasi.
  - Memicu getaran haptic `HeavyImpact` saat penggeseran tuntas, mencegah *accidental tap* di medan kebun bergelombang.

### E. Donut Progress Ring & Vertical Battery/GPS Sliders

- **Donut Ring**: Menampilkan persentase pencapaian target harian (misal: 14.850 / 16.000 janjang = 92.8%) dengan stroke gradien neon.
- **Vertical Pill Slider**: Menampilkan indikator akurasi GPS satelit (Hijau 2.1m) dan status baterai terminal.

---

## 4. Spesifikasi Executive Command Center (Next.js 14)

Dashboard web mengadopsi bahasa visual yang sama dalam skala desktop/layar besar:

1. **Top Nav Bar**: Header mengambang (*floating pill bar*) dengan logo SawitGO, tab navigasi kapsul (`[ Peta Kebun ] [ Live Ingestion ] [ EUDR Audit ]`), dan avatar pengguna.
2. **Modular Bento Grid dengan Soft Pastels & Dark Obsidian Cards**:
   - Kartu Metrik Janjang (Dark Charcoal Hero Card dengan Donut Target Ring).
   - Kartu Tonase BJR (Soft Mint Container dengan Grafik Batang Kapsul).
   - Kartu Rendemen CPO (Soft Lavender Container dengan Rasio Mutu Buah).
   - Kartu Restan Alert (Soft Peach / Soft Coral Container dengan Animasi Pulse Restan).
3. **Interactive PostGIS Map & Timeline Stream**: Peta GIS berlatar gelap kontras tinggi yang terintegrasi dengan timeline transaksi real-time di sisi kanan.

---

## 5. Ringkasan Kesiapan & Standar Kualitas

- [x] **100% Mengadopsi Bahasa Desain Neo-Tactile Modernist** (Chunky squircle 32px, dual-tone contrast, soft pastel containers, slide-to-confirm, donut rings).
- [x] **Inklusif & Tahan Medan Ekstrem** (One-Thumb reach zone, haptic feedback, anti-glare).
- [x] **Konsisten di Seluruh Ekosistem** (Flutter Mobile & Next.js Web Command Center).
