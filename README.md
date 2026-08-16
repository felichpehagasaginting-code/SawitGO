# SawitGO (AgriSync) — Offline-First Palm Plantation Management & Traceability System

[![Research Grant](https://img.shields.io/badge/Riset-BPDPKS%202026--2027-green.svg)](file:///f:/Projects/SawitGO/PROPOSAL%20PENELITIAN%20%20RISET%20BPDP%202026-2027%20(1).pdf)
[![Architecture](https://img.shields.io/badge/Architecture-Offline--First%20%2B%20Store--and--Forward-blue.svg)](file:///f:/Projects/SawitGO/docs/architecture/system_architecture.md)
[![Database](https://img.shields.io/badge/Database-PostgreSQL%2016%20%2B%20PostGIS%20%7C%20Isar%20DB-orange.svg)](file:///f:/Projects/SawitGO/docs/database/database_schema.md)
[![Security](https://img.shields.io/badge/Security-AES--256%20%2B%20TLS%201.3-red.svg)](file:///f:/Projects/SawitGO/docs/architecture/security_protocol.md)

SawitGO (AgriSync) adalah platform manajemen operasional perkebunan kelapa sawit terintegrasi yang dirancang untuk menangani kendala konektivitas *blankspot*, menekan potensi keterlambatan pengangkutan TBS (*restan*), dan memenuhi standar kepatuhan ketertelusuran global (**EUDR, ISPO, RSPO**).

---

## 📚 Dokumen Konteks & Desain Arsitektur (SSOT - Single Source of Truth)

Seluruh dokumen teknis dan spesifikasi formal **Fase 0** telah disusun secara komprehensif:

1. 🏛️ **[System Architecture Document (SAD)](file:///f:/Projects/SawitGO/docs/architecture/system_architecture.md)**
   - Topologi 4-Tier: *Flutter Offline Client*, *Secure Network Layer*, *NestJS Gateway*, *PostGIS & Redis Layer*.
   - Detail *Clean Architecture* Flutter dan *Modular Monolith* NestJS.
   - Sequence Diagram *Store-and-Forward Sync Pipeline*.

2. 🗄️ **[Database Schema & ERD Specification](file:///f:/Projects/SawitGO/docs/database/database_schema.md)**
   - Relasi Entity Relationship Diagram (ERD) PostgreSQL + PostGIS (Spatial Polygon Blok & Point TPH).
   - Skema DDL SQL lengkap dengan indeks geospasial GiST dan audit trail.
   - Definisi model *Isar DB Dart* lokal untuk penyimpanan offline di mobile.

3. ⚖️ **[RBAC 5-Tier & Conflict Resolution Algorithm](file:///f:/Projects/SawitGO/docs/algorithms/conflict_resolution.md)**
   - Matriks Otoritas 5 Jenjang: *Manager (5), Askep (4), Asisten (3), Mandor (2), Krani (1)*.
   - Formulasi Matematis: $\text{Priority Score} = (\text{Role Weight} \times 1.000.000) + \text{Timestamp (ms)}$.
   - Pseudocode TypeScript resolusi konflik terdistribusi (*Weighted CRDT-inspired*).

4. 🔌 **[API Contract & OpenAPI 3.1 Specification](file:///f:/Projects/SawitGO/docs/api/api_contract.md)**
   - Spesifikasi REST API untuk Ingestion Batch (`/api/v1/sync/batch`), Restan Warning, dan EUDR GeoJSON Export.
   - OpenAPI 3.1 YAML schema definition.

5. 📊 **[Diagram Alir, DFD & Flowcharts](file:///f:/Projects/SawitGO/diagrams/flowcharts_and_dfd.md)**
   - **DFD Level 0 (Context Diagram)** & **DFD Level 1**.
   - **Flowchart Local Sync Engine** (Flutter Store-and-Forward loop).
   - **Flowchart Conflict Resolution Server** (NestJS).
   - **State Machine Diagram** Lifecycle Transaksi Panen & Deteksi Restan (>12 Jam & >24 Jam).

6. 🗺️ **[Geospatial & Traceability Standards](file:///f:/Projects/SawitGO/docs/geospatial/geospatial_traceability.md)**
   - Format standar GeoJSON Polygon (Blok) & Point (TPH) SRID 4326.
   - Algoritma validasi *Point-in-Polygon* & *Buffer Proximity Check* (< 5m akurasi GPS) untuk kepatuhan audit EUDR/RSPO/ISPO.

7. 🔒 **[Security & Offline Encryption Protocol](file:///f:/Projects/SawitGO/docs/architecture/security_protocol.md)**
   - Spesifikasi enkripsi *AES-256-CBC* dengan kunci yang tersimpan di *Hardware Android Keystore*.
   - Protokol anti-replay & *idempotency keys* pada transaksi batch sync.

8. 🧪 **[Test Matrix, Blankspot Simulation & SUS Protocol](file:///f:/Projects/SawitGO/docs/testing/test_matrix_and_sus.md)**
   - Matriks uji laboratorium & simulasi blankspot (*Zero Data Loss*, *Sync Rate $\ge 98\%$*).
   - Instrumen 10 butir pertanyaan kuesioner *System Usability Scale* (SUS) beserta formula matematis perhitungan skor.

9. 📦 **[Mock Data & Test Scenario Seed](file:///f:/Projects/SawitGO/mock_data/initial_seed_data.json)**
   - Data awal JSON berisi master pengguna, afdeling, blok sawit berpoligon, TPH, dan simulasi skenario benturan data.

---

## 👥 Tim Peneliti (Politeknik Citra Widya Edukasi)
- **Felich Pehagasa Ginting** (Ketua Tim / System Architect & Tech Lead)
- **Ahmad Zulkifli** (Lead Mobile Developer)
- **Ahmad Sukron Yusuf** (Lead Backend & Analytics)
- **Rifki Hakim Pradana** (UI/UX & Field Test Coordinator)
- **Dika Prasetyawan** (QA Tester & Data Security Specialist)
- **Dosen Pembimbing:** Sylvia Madusari, S.Si., M.Si., Ph.D
