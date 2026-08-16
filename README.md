# SawitGO (AgriSync) — Offline-First Palm Plantation Management & Traceability System

[![Research Grant](https://img.shields.io/badge/Riset-BPDPKS%202026--2027-green.svg)](file:///f:/Projects/SawitGO/PROPOSAL%20PENELITIAN%20%20RISET%20BPDP%202026-2027%20(1).pdf)
[![PRD](https://img.shields.io/badge/PRD-Product%20Requirements%20Document-blue.svg)](file:///f:/Projects/SawitGO/docs/PRD.md)
[![Architecture](https://img.shields.io/badge/Architecture-Offline--First%20%2B%20Store--and--Forward-blue.svg)](file:///f:/Projects/SawitGO/docs/system_architecture.md)
[![Database](https://img.shields.io/badge/Database-PostgreSQL%2016%20%2B%20PostGIS%20%7C%20Isar%20DB-orange.svg)](file:///f:/Projects/SawitGO/docs/database_schema.md)
[![Security](https://img.shields.io/badge/Security-AES--256%20%2B%20TLS%201.3-red.svg)](file:///f:/Projects/SawitGO/docs/security_protocol.md)

SawitGO (AgriSync) adalah platform manajemen operasional perkebunan kelapa sawit terintegrasi yang dirancang untuk menangani kendala konektivitas *blankspot*, menekan potensi keterlambatan pengangkutan TBS (*restan*), dan memenuhi standar kepatuhan ketertelusuran global (**EUDR, ISPO, RSPO**).

---

## 📚 Pusat Dokumentasi Teknis (SSOT - Folder `docs/`)

Seluruh dokumen teknis, diagram alir, dan spesifikasi formal Fase 0 telah disatukan secara rapi di dalam subfolder **[`docs/`](file:///f:/Projects/SawitGO/docs/)**:

| No | Dokumen Spesifikasi | Deskripsi & Isi Dokumen |
|:---:|---|---|
| 1 | 📄 **[PRD.md](file:///f:/Projects/SawitGO/docs/PRD.md)** | Product Requirements Document, Epics (1–5), KPIs, User Personas & 6-Bulan Roadmap |
| 2 | 🏛️ **[system_architecture.md](file:///f:/Projects/SawitGO/docs/system_architecture.md)** | System Architecture Document (SAD), Topologi 4-Tier, Sequence & Clean Architecture |
| 3 | 🗄️ **[database_schema.md](file:///f:/Projects/SawitGO/docs/database_schema.md)** | Skema DDL PostgreSQL + PostGIS (Spatial Polygon & Point), ERD & Isar DB Models |
| 4 | ⚖️ **[conflict_resolution.md](file:///f:/Projects/SawitGO/docs/conflict_resolution.md)** | Matriks RBAC 5 Jenjang, Rumus Priority Score & Algoritma Weighted Resolusi Konflik |
| 5 | 🔌 **[api_contract.md](file:///f:/Projects/SawitGO/docs/api_contract.md)** | OpenAPI 3.1 Contract, Endpoint Ingestion Batch (`/api/v1/sync/batch`) & Restan Alerts |
| 6 | 📊 **[flowcharts_and_dfd.md](file:///f:/Projects/SawitGO/docs/flowcharts_and_dfd.md)** | DFD Level 0, DFD Level 1, Flowchart Local Sync, Flowchart Conflict Engine, State Machine |
| 7 | 🗺️ **[geospatial_traceability.md](file:///f:/Projects/SawitGO/docs/geospatial_traceability.md)** | Format GeoJSON SRID 4326, Algoritma Point-in-Polygon & Validasi Audit EUDR/ISPO/RSPO |
| 8 | 🔒 **[security_protocol.md](file:///f:/Projects/SawitGO/docs/security_protocol.md)** | Protokol Enkripsi AES-256-CBC, Hardware Android Keystore, & Anti-Replay Idempotency |
| 9 | 🌾 **[business_domain_logic.md](file:///f:/Projects/SawitGO/docs/business_domain_logic.md)** | Formula Bisnis Kebun: Berat Janjang Rata-rata (BJR), Model Degradasi FFA Restan & Mutu |
| 10 | 🎨 **[field_design_system.md](file:///f:/Projects/SawitGO/docs/field_design_system.md)** | Design System Lapangan: Palet Warna High-Contrast, Tombol $\ge 56$dp & Sync Badge |
| 11 | 📦 **[monorepo_and_git_conventions.md](file:///f:/Projects/SawitGO/docs/monorepo_and_git_conventions.md)** | Struktur Monorepo (`apps/mobile`, `apps/backend`, `apps/web`), Git Flow & Branching |
| 12 | 🔒 **[dependency_matrix.md](file:///f:/Projects/SawitGO/docs/dependency_matrix.md)** | Matriks Kompatibilitas Versi Stack (Node.js 20, NestJS 10, Flutter 3.24, Isar 3.1) |
| 13 | 🚨 **[api_error_catalog.md](file:///f:/Projects/SawitGO/docs/api_error_catalog.md)** | Format Envelope Respons API Seragam & Tabel Kode Error Domain Perkebunan |
| 14 | 🧪 **[test_matrix_and_sus.md](file:///f:/Projects/SawitGO/docs/test_matrix_and_sus.md)** | Matriks Uji Lab Blankspot & Instrumen 10 Butir Kuesioner System Usability Scale (SUS) |
| 15 | 📝 **[recommendations_phase0.md](file:///f:/Projects/SawitGO/docs/recommendations_phase0.md)** | 10 Rekomendasi Persiapan Fase 0 Berdasarkan Skala Prioritas |

---

## 👥 Tim Peneliti (Politeknik Citra Widya Edukasi)
- **Felich Pehagasa Ginting** (Ketua Tim / System Architect & Tech Lead)
- **Ahmad Zulkifli** (Lead Mobile Developer)
- **Ahmad Sukron Yusuf** (Lead Backend & Analytics)
- **Rifki Hakim Pradana** (UI/UX & Field Test Coordinator)
- **Dika Prasetyawan** (QA Tester & Data Security Specialist)
- **Dosen Pembimbing:** Sylvia Madusari, S.Si., M.Si., Ph.D
