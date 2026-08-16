# SawitGO (AgriSync) — Offline-First Palm Plantation Management & Traceability System

[![Research Grant](https://img.shields.io/badge/Riset-BPDPKS%202026--2027-green.svg)](file:///f:/Projects/SawitGO/PROPOSAL%20PENELITIAN%20%20RISET%20BPDP%202026-2027%20(1).pdf)
[![PRD](https://img.shields.io/badge/PRD-Product%20Requirements%20Document-blue.svg)](file:///f:/Projects/SawitGO/docs/PRD.md)
[![Architecture](https://img.shields.io/badge/Architecture-Offline--First%20%2B%20Store--and--Forward-blue.svg)](file:///f:/Projects/SawitGO/docs/system_architecture.md)
[![Database](https://img.shields.io/badge/Database-PostgreSQL%2016%20%2B%20PostGIS%20%7C%20Isar%20DB-orange.svg)](file:///f:/Projects/SawitGO/docs/database_schema.md)

SawitGO (AgriSync) adalah platform manajemen operasional perkebunan kelapa sawit terintegrasi yang dirancang untuk menangani kendala konektivitas *blankspot*, menekan potensi keterlambatan pengangkutan TBS (*restan*), dan memenuhi standar kepatuhan ketertelusuran global (**EUDR, ISPO, RSPO**).

---

## 📚 Pusat Dokumentasi Teknis (SSOT - Folder `docs/`)

Seluruh dokumen teknis, diagram alir, dan spesifikasi formal Fase 0 telah dikonsolidasi menjadi **11 dokumen inti yang esensial & non-redundan**:

| No | Dokumen Spesifikasi | Deskripsi & Cakupan Teknis |
|:---:|---|---|
| 1 | 📄 **[PRD.md](file:///f:/Projects/SawitGO/docs/PRD.md)** | Product Requirements Document, Epics (1–5), User Personas, Target Metrik & Roadmap |
| 2 | 🏛️ **[system_architecture.md](file:///f:/Projects/SawitGO/docs/system_architecture.md)** | SAD 4-Tier, Clean Architecture, Enkripsi AES-256, Android Keystore & Idempotency Key |
| 3 | 🗄️ **[database_schema.md](file:///f:/Projects/SawitGO/docs/database_schema.md)** | DDL SQL PostgreSQL 16 + PostGIS (Polygon & Point), ERD Diagram & Isar DB Dart Models |
| 4 | ⚖️ **[conflict_resolution.md](file:///f:/Projects/SawitGO/docs/conflict_resolution.md)** | Matriks RBAC 5 Jenjang, Formula Priority Score & Algoritma Weighted CRDT-Inspired |
| 5 | 🔌 **[api_contract.md](file:///f:/Projects/SawitGO/docs/api_contract.md)** | OpenAPI 3.1 Contract, Batch Ingestion Endpoint, Envelope Schema & Error Catalog |
| 6 | 📊 **[flowcharts_and_dfd.md](file:///f:/Projects/SawitGO/docs/flowcharts_and_dfd.md)** | DFD Level 0/1, Flowchart Local Sync, Flowchart Conflict Engine & State Machine Restan |
| 7 | 🗺️ **[geospatial_traceability.md](file:///f:/Projects/SawitGO/docs/geospatial_traceability.md)** | Format GeoJSON SRID 4326, Algoritma Point-in-Polygon & Validasi Audit EUDR/ISPO/RSPO |
| 8 | 🌾 **[business_domain_logic.md](file:///f:/Projects/SawitGO/docs/business_domain_logic.md)** | Formula Bisnis Kebun: Berat Janjang Rata-rata (BJR), Model Degradasi FFA Restan & Mutu |
| 9 | 🎨 **[field_design_system.md](file:///f:/Projects/SawitGO/docs/field_design_system.md)** | Design System Lapangan: Palet Warna High-Contrast, Tombol $\ge 56$dp & Sync Badge |
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
