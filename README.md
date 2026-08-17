<div align="center">

  <img src="assets/branding/sawitgo_logo.svg" alt="SawitGO Logo" width="140" height="140" />

  # 🌴 SawitGO (AgriSync)

  ### *Offline-First Palm Plantation Management & High-Precision Geospatial Traceability System*

  <p align="center">
    <strong>Sistem Cerdas Manajemen Panen Kelapa Sawit Berbasis Arsitektur Terdistribusi <em>Store-and-Forward</em>, Konsensus Hirarkis (Weighted RBAC), dan Ketertelusuran Spasial Standar Global (EUDR / RSPO / ISPO).</strong>
  </p>

  <p align="center">
    <a href="PROPOSAL%20PENELITIAN%20%20RISET%20BPDP%202026-2027%20(1).pdf"><img src="https://img.shields.io/badge/Grant-BPDPKS%202026--2027-10B981?style=for-the-badge&logo=googlescholar&logoColor=white" alt="BPDPKS Grant" /></a>
    <a href="docs/PRD.md"><img src="https://img.shields.io/badge/TKT%20Level-TKT%205%20(Validated)-3B82F6?style=for-the-badge&logo=checkmarx&logoColor=white" alt="TKT 5" /></a>
    <a href="docs/system_architecture.md"><img src="https://img.shields.io/badge/Architecture-Offline--First%20%2B%20P2P%20Mesh-8B5CF6?style=for-the-badge&logo=diagramsdotnet&logoColor=white" alt="Architecture" /></a>
    <a href="docs/database_schema.md"><img src="https://img.shields.io/badge/Database-PostGIS%203.6%20%7C%20Isar%20DB-F59E0B?style=for-the-badge&logo=postgresql&logoColor=white" alt="Database" /></a>
    <img src="https://img.shields.io/badge/Next.js-16.3%20Turbopack-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 16" />
    <img src="https://img.shields.io/badge/Flutter-3.24%2B%20BLoC-02569B?style=for-the-badge&logo=flutter&logoColor=white" alt="Flutter" />
    <img src="https://img.shields.io/badge/Tailwind-CSS%20v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
    <img src="https://img.shields.io/badge/Dark%20Mode-OLED%20Slate-6366F1?style=for-the-badge&logo=moonshot&logoColor=white" alt="Dark Mode" />
  </p>

  <p align="center">
    <img src="assets/stickers/sticker_offline_ready.svg" width="110" height="110" alt="Offline Ready" />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <img src="assets/stickers/sticker_eudr_traceable.svg" width="110" height="110" alt="EUDR Traceable" />
  </p>

</div>

---

## 📖 Ringkasan Eksekutif Riset

Di sebagian besar perkebunan kelapa sawit Indonesia, **kendala ketiadaan sinyal seluler (*blankspot*)** di areal blok perkebunan menyebabkan keterlambatan rekapitulasi data panen. Hal ini berdampak langsung pada penumpukan buah di TPH (**Restan $> 24$ jam**), yang memicu lonjakan kadar **Asam Lemak Bebas (FFA $> 5\%$)** dan mendegradasi harga jual Tandan Buah Segar (TBS) serta rendemen CPO pabrik kelapa sawit. Di sisi lain, regulasi internasional seperti **EU Deforestation Regulation (EUDR No 2023/1115)** mewajibkan bukti poligon geospasial persil lahan berakurasi tinggi ($< 5.0$ meter).

**SawitGO (AgriSync)** hadir sebagai solusi *cyber-physical* komprehensif yang menggabungkan:
1. **Mobile Ingestion App (*Offline-First*)**: Penyimpanan lokal terenkripsi Isar DB + AES-256, *Reactive Fast Sync*, dan sinkronisasi nirkabel P2P Data Mule via armada truk.
2. **Backend Conflict Engine (*NestJS + PostGIS*)**: Algoritma konsensus deterministik berbasis bobot hirarki 5 jenjang jabatan perkebunan (*Weighted RBAC*) dengan multiplier $10^{12}$.
3. **Executive Web Command Center (*Next.js 16 + Lenis + Framer Motion*)**: Dashboard analitik real-time high-density dengan modul independen tanpa kebocoran data (*Zero Data Leak*), kurva sparkline dinamis real time-series, pemantau status backend 3-state, dan ekspor instan sertifikat EUDR GeoJSON.

---

## 🏛️ Arsitektur Sistem 4-Tier

```mermaid
graph TB
    subgraph FIELD_TIER ["📱 Field & Ingestion Tier (Flutter Mobile)"]
        MOBILE_UI["High-Contrast Field UI\n(Steppers, Big Numbers, Haptics)"]
        LOCAL_CRYPT["Local AES-256-CBC Crypto\n(Hardware Keystore / Secure Storage)"]
        ISAR_DB[("Isar DB Local Storage\n(Harvest Logs & Pending Queue)")]
        SYNC_WORKER["Reactive Fast Sync Engine\n(Instant Connectivity Listener)"]
        P2P_ENGINE["P2P Offline Mesh Sync\n(Wi-Fi Direct / BLE Data Mule)"]

        MOBILE_UI <--> LOCAL_CRYPT
        LOCAL_CRYPT <--> ISAR_DB
        ISAR_DB <--> SYNC_WORKER
        ISAR_DB <--> P2P_ENGINE
    end

    subgraph SECURITY_TIER ["🛡️ Network & Gateway Tier"]
        TLS_GATEWAY["TLS 1.3 / HTTPS REST Gateway"]
        AUTH_JWT["JWT Bearer Authentication\n+ Device Idempotency Guard"]
    end

    subgraph BACKEND_TIER ["⚙️ Cloud & Analytics Tier (NestJS 11 Engine)"]
        RBAC_GUARD["5-Tier Weighted RBAC Guard\n(Manager to Krani)"]
        CONFLICT_ENGINE["Priority Score Conflict Engine\n(Wr × 10¹² + Timestamp_ms)"]
        GEO_ENGINE["PostGIS Geospatial Engine\n(ST_Contains Point-in-Polygon)"]
        RESTAN_ENGINE["Restan & FFA Degradation Engine\n(FFA = 2.0% + 0.1% × Δt)"]
    end

    subgraph DATA_TIER ["🗄️ Enterprise Data Tier"]
        PG_DB[("PostgreSQL 18 + PostGIS 3.6\n(Blocks Polygon, TPH Point, Harvest, Audit)")]
    end

    subgraph WEB_TIER ["💻 Executive Web Tier (Next.js 16 Dashboard)"]
        COMMAND_CENTER["Executive Command Center & Isolated Pages\n(High-Density Overview + Dynamic Bézier Sparklines)"]
    end

    SYNC_WORKER --> TLS_GATEWAY
    TLS_GATEWAY --> AUTH_JWT
    AUTH_JWT --> RBAC_GUARD
    RBAC_GUARD --> CONFLICT_ENGINE
    RBAC_GUARD --> GEO_ENGINE
    RBAC_GUARD --> RESTAN_ENGINE
    CONFLICT_ENGINE <--> PG_DB
    GEO_ENGINE <--> PG_DB
    RESTAN_ENGINE <--> PG_DB
    COMMAND_CENTER <--> TLS_GATEWAY
```

---

## ⚡ 6 Fitur Inti Keunggulan Riset (TKT-5)

### 1. 📴 Offline-First Store-and-Forward Ingestion & Reactive Fast Sync
- **Operasional 100% Offline**: Pencatatan janjang, brondolan, dan grading mutu buah (mentah, masak, lewat masak, tangkai panjang) tersimpan instan ke **Isar DB** lokal tanpa ketergantungan koneksi internet.
- **Hardware-Level Encryption**: Payload transaksi dienkripsi secara lokal menggunakan **AES-256-CBC** dengan manajemen kunci aman.
- **Reactive Fast Sync**: Listener konektivitas mendengarkan perubahan status jaringan secara *real-time*. Begitu perangkat mendeteksi sinyal internet (Wi-Fi/4G/Data Mule), antrean data langsung disinkronkan seketika ke server.

### 2. ⚖️ Domain-Specific Conflict Resolution (Weighted RBAC 5 Jenjang)
- Menyelesaikan tabrakan data (*data collision*) saat multi-aktor mengedit TPH yang sama dalam kondisi offline:
  $$\mathbf{Priority\ Score} = (\text{Role Weight} \times 1.000.000.000.000) + \text{Timestamp (ms)}$$
- **Hierarki 5 Jenjang Perkebunan**:
  - `Manager (Weight 5)`: Otoritas tertinggi audit eksekutif dan konsensus server.
  - `Askep (Weight 4)`: Supervisi lintas afdeling, monitoring SLA restan, dan kepatuhan poligon EUDR.
  - `Asisten (Weight 3)`: Verifikasi lapangan, mode override transaksi, dan dispatch armada truk.
  - `Mandor (Weight 2)`: Manajemen kemandoran regu pemanen dan grading kualitas petik buah.
  - `Krani (Weight 1)`: Pencatatan fisik cepat di Tempat Pengumpulan Hasil (TPH) via Scan QR Barcode.
- **Audit Trail Imutabel**: Seluruh aksi konsensus (`INSERT`, `UPDATE_OVERWRITE`, `REJECT_STALE`) tercatat lengkap di tabel `sync_audit_trails`.

### 3. 📡 Realtime Offline P2P Mesh Synchronization
- Pertukaran data antar-perangkat di tengah kebun menggunakan konektivitas lokal **Wi-Fi Direct / Bluetooth Low Energy (BLE)** tanpa memerlukan kuota internet.
- Mengadopsi pola **Data Mule**: Truk pengangkut TBS dan motor mandor bertindak sebagai kurir data nirkabel yang membawa data dari TPH terisolasi ke Pos Timbang Pabrik (PKS).

### 4. 🛰️ Geospatial Traceability (EUDR & RSPO Standard)
- **High-Precision GPS Lock**: Filter hardware GPS satelit memastikan pencatatan hanya sah jika akurasi $\le 5.0$ meter.
- **Point-in-Polygon Validation**: Backend secara otomatis memverifikasi apakah koordinat TPH berada di dalam poligon blok panen menggunakan fungsi spasial PostGIS native `ST_Contains` (WGS84 SRID 4326).
- **Ekspor Kepatuhan**: Mendukung ekspor data ketertelusuran persil ke format resmi **GeoJSON FeatureCollection (EPSG:4326)**.

### 5. ⏳ Restan Warning & FFA Degradation Tracker
- Sistem memantau waktu tumpuk TBS sejak waktu panen fisik:
  - $\ge 12$ Jam: *Stage 1 Warning (Kuning)*
  - $\ge 20$ Jam: *Stage 2 Critical Alert (Oranye)*
  - $> 24$ Jam: *Restan Overdue (Merah)* dengan estimasi kenaikan asam lemak bebas:
    $$\text{FFA}_{\text{est}} = 2.0\% + (0.1\% \times \Delta t)$$
- **Aksi Cepat**: Tombol *Dispatch Truk* langsung di Web Dashboard & Mobile Notification Drawer.

### 6. 📊 Executive Web Command Center & Modul Independen
- **Dashboard High-Density & Minimalis**: Menampilkan ringkasan eksekutif menyeluruh dengan navigasi cepat (*Quick Links*) ke modul detail.
- **Halaman Mandiri (Zero Data Leak)**: Pemisahan tegas antarmuka antara Data Panen, Kemandoran, Monitoring Restan, Peta Spasial EUDR, Jejak Audit Konsensus, dan Analitik BJR.
- **Visualisasi Dinamis Riil**: Kurva sparkline dihitung menggunakan interpolasi Bézier langsung dari deret data historis (*time-series*).
- **Indikator Koneksi Backend 3-State**: Status visual elegan (Terhubung 🟢 / Terputus 🔴 / Menghubungkan 🟡) dilengkapi tombol *Instant Data Refresh*.

---

## 🔑 Akun Demo Pengujian

Seluruh peran operasional telah disiapkan untuk pengujian end-to-end:

| Role | NIP | Bobot | Pemegang Akun | Level Otoritas | Password |
| :--- | :--- | :---: | :--- | :--- | :--- |
| **Estate Manager** | `MGR-001` | **W5** | **Felich Pehagasa Ginting** | Full Estate Audit & Executive Control | `RahasiaKebun2026!` |
| **Kepala Afdeling (Askep)** | `ASK-005` | **W4** | Rifki Hakim Pradana | Supervisi Lintas Afdeling & EUDR | `RahasiaKebun2026!` |
| **Asisten Afdeling** | `AST-010` | **W3** | Ahmad Sukron Yusuf | Verifikasi, Override & Dispatch Restan | `RahasiaKebun2026!` |
| **Mandor Panen** | `MDR-045` | **W2** | Ahmad Zulkifli | Pengawasan Kemandoran & Grading Mutu | `RahasiaKebun2026!` |
| **Krani TPH** | `KRN-102` | **W1** | Dika Prasetyawan | Input Cepat TPH & Scan QR Barcode | `RahasiaKebun2026!` |

---

## 🗂️ Struktur Monorepo Proyek

```text
SawitGO/
├── apps/
│   ├── backend/                 # NestJS 11 + TypeORM + PostGIS 3.6
│   │   ├── src/modules/auth/    # JWT Authentication & RBAC Guard
│   │   ├── src/modules/sync/    # Batch Ingestion, Entity Resolution & Conflict Engine
│   │   ├── src/modules/blocks/  # Geospatial PostGIS & Point-in-Polygon (ST_Contains)
│   │   ├── src/modules/restan/  # Restan Monitoring & Formula Asam Lemak Bebas (FFA)
│   │   └── src/modules/analytics/# EUDR GeoJSON Exporter, Volume Trend & KPI Metrics
│   ├── mobile/                  # Flutter 3.24+ Mobile App (BLoC + Isar)
│   │   ├── lib/core/crypto/     # AES-256 Encryption Provider dengan Secure Fallback
│   │   ├── lib/core/constants/  # Hierarki RoleWeights (Multiplier 10^12)
│   │   ├── lib/features/harvest/# Input Panen Cepat, Kemandoran & Mode Override
│   │   ├── lib/features/sync/   # Reactive Fast Sync & P2P Mesh Ingestion
│   │   └── lib/features/geospatial/# GPS Satelit High-Accuracy Filter & Peta Lahan
│   └── web/                     # Next.js 16 Web Command Center (Turbopack)
│       ├── src/providers/       # Lenis Smooth Scroll + Theme Provider
│       └── src/components/dashboard/
│           ├── pages/           # Modul Halaman Terisolasi (Panen, Restan, EUDR, Kemandoran, Analitik, Audit)
│           ├── TopNavbar.tsx    # Indikator 3-State Koneksi Backend & Tombol Refresh
│           ├── KpiSparklineCard.tsx # Kurva Sparkline Dinamis Bézier
│           └── VolumeTrendChart.tsx # Grafik Batang & Kalkulasi Tren Riil
├── assets/                      # 100% Vector SVG Brandings & Stickers
├── docs/                        # 12 Dokumen Spesifikasi Formal (SSOT)
└── mock_data/                   # Initial Seed Data (Poligon Blok, TPH, Users)
```

---

## 🚀 Panduan Memulai Cepat (Quick Start)

### Prasyarat Lingkungan
- **Node.js**: `v20.x` atau lebih baru
- **Flutter SDK**: `v3.24.x` / `v3.44.x`
- **PostgreSQL**: `v16+` / `v18+` dengan ekstensi **PostGIS** aktif

### 1. Menjalankan Backend NestJS
```bash
cd apps/backend
npm install
npm run start:dev
# Swagger OpenAPI Docs: http://localhost:3000/docs
```

### 2. Menjalankan Executive Web Dashboard (Next.js 16)
```bash
cd apps/web
npm install
npm run dev
# Buka di browser: http://localhost:3001
```

### 3. Menjalankan Mobile App (Flutter)
```bash
cd apps/mobile
flutter pub get
flutter run
```

---

## 🧪 Validasi & Pengujian Otomatis

Seluruh modul telah melalui pengujian unit dan verifikasi tipe secara menyeluruh:

```bash
# 1. Validasi Flutter Mobile Tests
cd apps/mobile && flutter test
# Output: All 5 tests passed (AES-256 Crypto, 5-Tier Role Weights, Smoke Tests)

# 2. Validasi Backend NestJS Unit Tests
cd apps/backend && npm test
# Output: 4/4 Test Suites Passed, 9/9 Tests Passed

# 3. Validasi Next.js Web Typecheck
cd apps/web && npx tsc --noEmit
# Output: 0 Type Errors (Clean)
```

---

## 📚 Pusat Dokumentasi Teknis (SSOT - Folder `docs/`)

Seluruh dokumen teknis, diagram alir, dan matriks pengujian tersusun rapi di folder **[`docs/`](docs/)**:

| No | Dokumen | Ringkasan Konten |
| :---: | :--- | :--- |
| 1 | 📄 **[PRD.md](docs/PRD.md)** | Product Requirements Document, Epics (1–5), NFRs, dan Roadmap 6-Bulan Riset |
| 2 | 🎨 **[ui_ux_frontend.md](docs/ui_ux_frontend.md)** | Panduan Desain Anti-AI Slop: Lenis, Framer Motion, Dark Mode, Ergonomi Lapangan & 100% SVG |
| 3 | 🚶 **[userflow.md](docs/userflow.md)** | Master Alur Pengguna 5 Jenjang, P2P Data Mule, Sequence Ingestion Blankspot & Resolusi Konflik |
| 4 | 🏛️ **[system_architecture.md](docs/system_architecture.md)** | System Architecture Document (SAD), 4-Tier Topology, Clean Architecture, Enkripsi AES-256 |
| 5 | 🗄️ **[database_schema.md](docs/database_schema.md)** | DDL PostgreSQL + PostGIS (Polygon/Point SRID 4326), ERD, dan Isar DB Models |
| 6 | ⚖️ **[conflict_resolution.md](docs/conflict_resolution.md)** | Algoritma Resolusi Konflik, Formula Priority Score & Matriks RBAC 5 Jenjang |
| 7 | 🔌 **[api_contract.md](docs/api_contract.md)** | Spesifikasi OpenAPI 3.1, Endpoint `/api/v1/sync/batch`, Envelope Schema & Error Codes |
| 8 | 📊 **[flowcharts_and_dfd.md](docs/flowcharts_and_dfd.md)** | DFD Level 0/1, Flowchart Local Sync, Conflict Engine, dan State Machine Restan |
| 9 | 🗺️ **[geospatial_traceability.md](docs/geospatial_traceability.md)** | Standar GeoJSON WGS84, Algoritma Point-in-Polygon & Validasi Audit EUDR/RSPO/ISPO |
| 10 | 🌾 **[business_domain_logic.md](docs/business_domain_logic.md)** | Logika Bisnis Agronomi: BJR, Model Degradasi FFA, Toleransi Mutu Buah |
| 11 | 📦 **[monorepo_and_git_conventions.md](docs/monorepo_and_git_conventions.md)** | Tata Kelola Monorepo, Aturan Branching Git Flow, dan Conventional Commits |
| 12 | 🧪 **[test_matrix_and_sus.md](docs/test_matrix_and_sus.md)** | Matriks Uji Lab Blankspot (Latensi, Throttling) & Kuesioner SUS 10 Butir |

---

## 👥 Tim Peneliti & Pengembang (Politeknik Citra Widya Edukasi)

- **Felich Pehagasa Ginting** — Ketua Tim Peneliti / System Architect & Tech Lead
- **Ahmad Zulkifli** — Lead Mobile Developer
- **Ahmad Sukron Yusuf** — Lead Backend & Data Analytics
- **Rifki Hakim Pradana** — UI/UX Specialist & Field Test Coordinator
- **Dika Prasetyawan** — QA Tester & Data Security Specialist
- **Dosen Pembimbing:** Sylvia Madusari, S.Si., M.Si., Ph.D

---

<div align="center">
  <sub>Didanai oleh Badan Pengelola Dana Perkebunan Kelapa Sawit (BPDPKS) — Program Riset Sawit 2026–2027.</sub><br/>
  <sub>© 2026 SawitGO Team. Politeknik Citra Widya Edukasi (CWE). All rights reserved.</sub>
</div>
