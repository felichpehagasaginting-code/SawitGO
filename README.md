# SawitGO (AgriSync) — Offline-First Palm Plantation Management & Traceability System

[![Research Grant](https://img.shields.io/badge/Riset-BPDPKS%202026--2027-green.svg)](file:///f:/Projects/SawitGO/PROPOSAL%20PENELITIAN%20%20RISET%20BPDP%202026-2027%20(1).pdf)
[![Status](https://img.shields.io/badge/Status-Fase%201--3%20Completed%20(TKT--5)-emerald.svg)](file:///f:/Projects/SawitGO/docs/PRD.md)
[![PRD](https://img.shields.io/badge/PRD-Product%20Requirements%20Document-blue.svg)](file:///f:/Projects/SawitGO/docs/PRD.md)
[![UI/UX](https://img.shields.io/badge/UI%2FUX-GSAP%20%2B%20Lenis%20%2B%20Framer-purple.svg)](file:///f:/Projects/SawitGO/docs/ui_ux_frontend.md)
[![Architecture](https://img.shields.io/badge/Architecture-Offline--First%20%2B%20P2P%20Mesh%20%2B%20Store--and--Forward-blue.svg)](file:///f:/Projects/SawitGO/docs/system_architecture.md)
[![Database](https://img.shields.io/badge/Database-PostgreSQL%2018%20%2B%20PostGIS%203.6%20%7C%20Isar%20DB-orange.svg)](file:///f:/Projects/SawitGO/docs/database_schema.md)

**SawitGO (AgriSync)** adalah platform enterprise manajemen operasional perkebunan kelapa sawit terintegrasi yang dirancang khusus untuk memecahkan kendala konektivitas *blankspot*, menekan potensi keterlambatan pengangkutan TBS (*restan*), dan memenuhi standar kepatuhan ketertelusuran global (**EUDR No 2023/1115, ISPO, RSPO**).

---

## 🏗️ Struktur Arsitektur Monorepo

```text
SawitGO/
├── apps/
│   ├── backend/       # NestJS 11 + TypeORM + PostGIS 3.6 (RBAC 5-Tier, Restan Engine, EUDR API)
│   ├── mobile/        # Flutter 3.24+ Clean Architecture + Isar DB + AES-256 (Offline Ingestion)
│   └── web/           # Next.js 14 App Router + GSAP + Lenis + Framer Motion (Command Center)
├── assets/            # 100% Vector SVG Assets (Logo, Stickers, Icons)
├── docs/              # Single Source of Truth (SSOT) — 11 Dokumen Spesifikasi Formal
├── mock_data/         # Initial Master Data (Poligon Blok, Koordinat TPH, User Seed)
└── packages/          # Shared TypeScript/Dart Models & Types
```

---

## 🚀 Fitur Utama Sistem (TKT 5)

1. **Offline-First & Store-and-Forward Sync Engine**:
   - Pencatatan panen di tengah kebun 100% berjalan tanpa internet menggunakan database lokal **Isar DB**.
   - Keamanan data terjamin dengan enkripsi **AES-256-CBC** dan kunci tersimpan di *Hardware Android Keystore*.
   - Sinkronisasi background otomatis memantau konektivitas setiap 30 detik (`connectivity_plus`).
2. **Domain-Specific Conflict Resolution (Weighted RBAC)**:
   - Resolusi benturan data offline-to-online deterministik berbasis formula:
     $$\mathbf{Priority\ Score} = (\text{Role Weight} \times 1.000.000.000.000) + \text{Timestamp (ms)}$$
   - Mengakomodasi 5 jenjang wewenang: *Manager (5), Askep (4), Asisten (3), Mandor (2), Krani (1)*.
3. **P2P Realtime Offline Mesh Synchronization**:
   - Pertukaran data nirkabel ad-hoc di lapangan (Wi-Fi Direct / BLE) dan konsep *Data Mule* via truk pengangkut TBS.
4. **Geospatial Traceability (EUDR / RSPO Compliant)**:
   - Filter GPS presisi tinggi ($\le 5.0$ meter).
   - Validasi spasial *Point-in-Polygon* batas blok menggunakan query PostGIS native `ST_Contains` (SRID 4326).
   - Ekspor GeoJSON FeatureCollection untuk kebutuhan audit sertifikasi internasional.
5. **Restan & FFA Degradation Tracker**:
   - Deteksi dini buah tertahan di TPH: `Warning (≥12h)`, `Critical (≥20h)`, dan `Overdue (>24h)`.
   - Estimasi kenaikan asam lemak bebas ($\text{FFA} = 1.50\% + 0.15\% \times \Delta t$).
6. **Executive Web Command Center**:
   - Antarmuka modern anti-AI slop dengan *Lenis Smooth Scroll*, *GSAP Odometer Counting*, dan *Bento Grid*.

---

## 🛠️ Panduan Menjalankan Sistem

### 1. Backend Service (NestJS + PostGIS)
```bash
cd apps/backend
# Konfigurasi database di .env (sudah terhubung ke PostgreSQL 18 localhost:5432)
npm install
npm run start:dev
# Swagger OpenAPI aktif di: http://localhost:3000/docs
```

### 2. Mobile Client (Flutter)
```bash
cd apps/mobile
flutter pub get
flutter run
```

### 3. Executive Web Dashboard (Next.js)
```bash
cd apps/web
npm install
npm run dev
# Dashboard aktif di: http://localhost:3000
```

---

## 📚 Pusat Dokumentasi Teknis (SSOT - Folder `docs/`)

| No | Dokumen Spesifikasi | Deskripsi & Cakupan Teknis |
|:---:|---|---|
| 1 | 📄 **[PRD.md](file:///f:/Projects/SawitGO/docs/PRD.md)** | Product Requirements Document, Epics (1–5), User Personas, Target Metrik & Roadmap |
| 2 | 🎨 **[ui_ux_frontend.md](file:///f:/Projects/SawitGO/docs/ui_ux_frontend.md)** | Anti-AI Slop UI/UX: GSAP + Lenis + Framer Motion, Bento Grid, Haptics & Ergonomi Lapangan |
| 3 | 🏛️ **[system_architecture.md](file:///f:/Projects/SawitGO/docs/system_architecture.md)** | SAD 4-Tier, Clean Architecture, Enkripsi AES-256, Android Keystore & Idempotency Key |
| 4 | 🗄️ **[database_schema.md](file:///f:/Projects/SawitGO/docs/database_schema.md)** | DDL SQL PostgreSQL 18 + PostGIS 3.6 (Polygon & Point), ERD & Isar DB Models |
| 5 | ⚖️ **[conflict_resolution.md](file:///f:/Projects/SawitGO/docs/conflict_resolution.md)** | Matriks RBAC 5 Jenjang, Formula Priority Score & Algoritma Weighted CRDT-Inspired |
| 6 | 🔌 **[api_contract.md](file:///f:/Projects/SawitGO/docs/api_contract.md)** | OpenAPI 3.1 Contract, Batch Ingestion Endpoint, Envelope Schema & Error Catalog |
| 7 | 📊 **[flowcharts_and_dfd.md](file:///f:/Projects/SawitGO/docs/flowcharts_and_dfd.md)** | DFD Level 0/1, Flowchart Local Sync, Flowchart Conflict Engine & State Machine Restan |
| 8 | 🗺️ **[geospatial_traceability.md](file:///f:/Projects/SawitGO/docs/geospatial_traceability.md)** | Format GeoJSON SRID 4326, Algoritma Point-in-Polygon & Validasi Audit EUDR/ISPO/RSPO |
| 9 | 🌾 **[business_domain_logic.md](file:///f:/Projects/SawitGO/docs/business_domain_logic.md)** | Formula Bisnis Kebun: Berat Janjang Rata-rata (BJR), Model Degradasi FFA Restan & Mutu |
| 10 | 📦 **[monorepo_and_git_conventions.md](file:///f:/Projects/SawitGO/docs/monorepo_and_git_conventions.md)** | Struktur Monorepo (`apps/mobile`, `apps/backend`, `apps/web`), Git Flow & Branching |
| 11 | 🧪 **[test_matrix_and_sus.md](file:///f:/Projects/SawitGO/docs/test_matrix_and_sus.md)** | Matriks Uji Lab Blankspot & Instrumen 10 Butir Kuesioner System Usability Scale (SUS) |

---

## 👥 Tim Peneliti (Politeknik Citra Widya Edukasi)
- **Felich Pehagasa Ginting** (Ketua Tim / System Architect & Tech Lead)
- **Ahmad Zulkifli** (Lead Mobile Developer)
- **Ahmad Sukron Yusuf** (Lead Backend & Analytics)
- **Rifki Hakim Pradana** (UI/UX & Field Test Coordinator)
- **Dika Prasetyawan** (QA Tester & Data Security Specialist)
- **Dosen Pembimbing:** Sylvia Madusari, S.Si., M.Si., Ph.D
