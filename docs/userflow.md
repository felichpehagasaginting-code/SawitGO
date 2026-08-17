# SPESIFIKASI ALUR PENGGUNA & OPERASIONAL KEBUN (USER FLOW SSOT)

## Proyek: SawitGO (AgriSync) — Offline-First Multi-Role Plantation Ecosystem

**Dokumen:** Master User Journeys, Sequence Diagrams, State Machines & Fail-Safe Workflows  
**Versi:** 2.0.0 (Enterprise / FAANG-Grade)  
**Status:** Approved SSOT (Single Source of Truth)  
**Tanggal:** 17 Agustus 2026  
**Penulis:** Felich Pehagasa Ginting (Technical Lead & System Architect)

---

## 1. Ekosistem Pengguna & Matriks Peran 5 Jenjang

SawitGO dirancang untuk mencakup seluruh rantai komando operasional perkebunan kelapa sawit dari titik fisik penumpukan buah di tengah hutan (*TPH*) hingga evaluasi eksekutif di kantor direksi dan gerbang timbang Pabrik Kelapa Sawit (PKS).

```text
   ┌────────────────────────────────────────────────────────────────────────┐
   │                  STRUKTUR HIRARKI RBAC 5 JENJANG SAWITGO               │
   ├───────┬───────────────────┬──────────────┬─────────────────────────────┤
   │ Level │ Role / Jabatan    │ Bobot ($W_r$)│ Lingkup Tanggung Jawab      │
   ├───────┼───────────────────┼──────────────┼─────────────────────────────┤
   │ 1     │ Estate Manager    │ 5 (Tertinggi)│ Seluruh Kebun & Ekspor EUDR │
   │ 2     │ Asisten Kepala    │ 4            │ Rayon (Multi-Afdeling)      │
   │ 3     │ Asisten Afdeling  │ 3            │ 1 Afdeling (~600–1000 Ha)   │
   │ 4     │ Mandor Panen      │ 2            │ 1 Kemandoran (15–25 Pemanen)│
   │ 5     │ Krani TPH         │ 1            │ Titik TPH (Input Lapangan)  │
   └───────┴───────────────────┴──────────────┴─────────────────────────────┘
```

---

## 2. Peta Alur Peran 1: Krani TPH (Weight 1) — Field Ingestion di Area Blankspot

Krani bertugas mencatat hasil panen fisik secara cepat dan akurat di area kebun yang tidak memiliki sinyal seluler (*100% blankspot*).

### A. Diagram Alir Krani TPH (Mermaid Flowchart)

```mermaid
flowchart TD
    START([Mulai Tugas Lapangan di Kantor/Pos]) --> AUTH[Login / Masukkan PIN Cepat 6-Digit]
    AUTH --> PRE_SYNC[Download Offline Master Cache:<br/>Poligon Blok, Master TPH & QR Code]
    PRE_SYNC --> GO_FIELD[Berangkat ke Areal Blok Blankspot]
    
    GO_FIELD --> ARRIVE_TPH[Tiba di Tempat Pengumpulan Hasil / TPH]
    ARRIVE_TPH --> SCAN_TPH{Identifikasi TPH}
    
    SCAN_TPH -- Scan QR Code --> QR_OK[Auto-Select Afdeling, Blok & Nomor TPH]
    SCAN_TPH -- Manual Search --> MANUAL_OK[Pilih Blok dari Cache Offline]
    
    QR_OK --> GPS_LOCK[Aktifkan GPS Hardware Terkalibrasi]
    MANUAL_OK --> GPS_LOCK
    
    GPS_LOCK --> CHECK_ACC{Akurasi Satelit <= 5.0m?}
    CHECK_ACC -- Tidak (> 5.0m) --> CALIB_UI[Tampilkan Radar Kuning:<br/>Pindah ke Pasar Pikul Terbuka] --> GPS_LOCK
    CHECK_ACC -- Ya (<= 5.0m) --> PIP_CHECK{Titik di Dalam Poligon Blok?}
    
    PIP_CHECK -- Tidak (> 15m Buffer) --> REJECT_FRAUD[Peringatan Lokasi Palsu / Fraud] --> GPS_LOCK
    PIP_CHECK -- Ya (Valid EUDR) --> INPUT_UI[Buka Layar Giant Stepper Input]
    
    INPUT_UI --> STEP_JJG[Input Janjang TBS:<br/>Gunakan Chip +1, +5, +10, +50]
    STEP_JJG --> STEP_BRD[Input Timbangan Brondolan Kg]
    STEP_BRD --> STEP_MUTU[Grading Mutu: Masak, Mentah, Lewat Masak, Tangkai Panjang]
    
    STEP_MUTU --> COMPUTE_LOCAL[Hitung Otomatis:<br/>1. Estimasi Tonase = Janjang * BJR + Brondolan<br/>2. Priority Score = 1*10¹² + ClientTimestampMs<br/>3. Generate Idempotency SHA-256]
    
    COMPUTE_LOCAL --> SAVE_LOCAL[(Enkripsi AES-256 & Simpan ke Isar DB)]
    SAVE_LOCAL --> QUEUE_PENDING[(Enqueue ke PendingSyncQueue)]
    QUEUE_PENDING --> HAPTIC_OK[Trigger Haptic HeavyThud + UI Badge 'Tersimpan Offline']
    
    HAPTIC_OK --> NEXT_TPH{Ada TPH Lain Hari Ini?}
    NEXT_TPH -- Ya --> ARRIVE_TPH
    NEXT_TPH -- Selesai --> WAIT_CONN[Otomatis Dipantau Sync Worker Tiap 30 Detik]
```

### B. Diagram Sekuensial: Krani Menyimpan Data Offline & Auto-Sync saat Online

```mermaid
sequenceDiagram
    autonumber
    actor Krani as Krani TPH (Di Tengah Kebun)
    participant UI as Flutter Mobile UI
    participant Haptic as Hardware Haptic Engine
    participant Crypto as AES-256 Cryptor
    participant Isar as Isar DB (Local Flash)
    participant Worker as Background Sync Worker
    participant Cloud as Cloud Gateway (NestJS)

    Krani->>UI: Ketuk [+50] [+10] [+5] (Total 65 Janjang)
    UI->>Haptic: Trigger LightClick (12ms @ 50Hz)
    Krani->>UI: Ketuk "Simpan Data Panen"
    UI->>Crypto: Enkripsi Payload Transaksi (AES-256-CBC)
    Crypto-->>Isar: Tulis ke Koleksi LocalHarvestLog & PendingSyncQueue
    Isar-->>UI: Write Confirmed (Latensi < 3ms)
    UI->>Haptic: Trigger HeavyThud (45ms @ 100Hz)
    UI-->>Krani: Feedback Visual: "65 Janjang Tersimpan Aman (Menunggu Sinyal)"

    Note over Krani,Worker: Sore Hari: Krani Bergerak ke Pos Timbang / Mendapat 4G
    Worker->>Worker: ConnectivityObserver deteksi Internet Aktif
    Worker->>Isar: Baca Batch 50 Record dari PendingSyncQueue
    Worker->>Cloud: POST /api/v1/sync/batch (Bearer JWT, Payload JSON)
    Cloud-->>Worker: HTTP 201 Created (Batch Ingestion Success)
    Worker->>Isar: Hapus Record dari PendingSyncQueue & Update isSynced = true
    Worker->>UI: Update Status Bar: "Semua Data Berhasil Disinkronkan (100%)"
```

---

## 3. Peta Alur Peran 2: Mandor Panen (Weight 2) — Supervisi & P2P Data Mule Sync

Mandor bertanggung jawab atas mutu panen 1 kemandoran (15–25 pemanen) dan memfasilitasi pertukaran data secara offline menggunakan armada truk angkut (*Data Mule*).

### A. Diagram Alir Mandor & P2P Data Mule (Mermaid Flowchart)

```mermaid
flowchart TD
    START([Mandor Patroli Keliling Blok]) --> AUDIT_TPH[Inspeksi Fisik TPH Hasil Panen Pemanen]
    AUDIT_TPH --> CHECK_QUALITY{Mutu Buah Sesuai Standar?}
    
    CHECK_QUALITY -- Ada Buah Mentah / Salah Hitung --> EDIT_RECORD[Buka Record TPH di Aplikasi Mobile]
    EDIT_RECORD --> REVISE_DATA[Koreksi Jumlah Janjang / Mutu Buah]
    REVISE_DATA --> COMPUTE_MANDOR[Hitung Priority Score Mandor:<br/>Score = 2*10¹² + ClientTimestampMs]
    COMPUTE_MANDOR --> SAVE_MANDOR[(Simpan Revisi ke Isar DB)]
    
    CHECK_QUALITY -- Mutu Sempurna --> TRUCK_ARRIVE[Truk Pengangkut Tiba di TPH]
    SAVE_MANDOR --> TRUCK_ARRIVE
    
    TRUCK_ARRIVE --> P2P_DISCOVER[Aplikasi Deteksi Hotspot BLE / Wi-Fi Direct Truk]
    P2P_DISCOVER --> P2P_HANDSHAKE{Handshake Nirkabel Berhasil?}
    
    P2P_HANDSHAKE -- Ya --> P2P_TRANSFER[Kirim Batch Data Panen Terenkripsi ke Unit Truk]
    P2P_TRANSFER --> MULE_RECEIVE[(Truk Simpan Data sebagai Kurir / Data Mule)]
    MULE_RECEIVE --> TRUCK_LOAD[Truk Muat Janjang TBS & Berangkat ke Pabrik PKS]
    
    TRUCK_LOAD --> PKS_GATE[Truk Tiba di PKS / Mendapat Sinyal Wi-Fi Pabrik]
    PKS_GATE --> PKS_INGEST[(Unit Truk Sync Otomatis Seluruh Data ke Cloud Server)]
```

---

## 4. Peta Alur Peran 3: Asisten Afdeling (Weight 3) — Inspeksi, Resolusi Konflik & Restan Alert

Asisten Afdeling mengawasi 1 afdeling (~600–1000 Ha), memiliki wewenang mengoreksi data mandor/krani (*Priority Override*), serta mencegah penumpukan buah restan.

### A. Diagram Alir Asisten Afdeling & Resolusi Restan

```mermaid
flowchart TD
    START([Asisten Login di Mobile / Tablet]) --> DASH_AFD[Dashboard Afdeling: Monitor Progres Panen & Restan]
    DASH_AFD --> RESTAN_CHECK{Ada TPH Restan >= 12 Jam?}
    
    RESTAN_CHECK -- Ya (Kuning / Oranye) --> DISPATCH_TRUCK[Kirim Instruksi Dispatch Truk Terdekat ke TPH Tersebut]
    DISPATCH_TRUCK --> TRACK_PICKUP[Pantau Waktu Muat Truk]
    
    RESTAN_CHECK -- Tidak --> FIELD_INSPECT[Inspeksi Lapangan ke Blok Tertentu]
    FIELD_INSPECT --> FOUND_ERROR{Ditemukan Koreksi Data Panen?}
    
    FOUND_ERROR -- Ya --> INPUT_OVERRIDE[Asisten Input Koreksi Data di TPH]
    INPUT_OVERRIDE --> CALC_ASISTEN[Hitung Score Asisten: 3*10¹² + Timestamp]
    CALC_ASISTEN --> SYNC_SERVER[(Kirim ke Server)]
    
    SYNC_SERVER --> SERVER_CONFLICT{Server Bandingkan Score Asisten vs Krani/Mandor}
    SERVER_CONFLICT --> WIN_ASISTEN[Data Asisten Menang Mutlak (3.72T > 1.72T)]
    WIN_ASISTEN --> DB_UPDATE[(Database Server Di-Overwrite)]
    DB_UPDATE --> AUDIT_LOG[(Tercatat di sync_audit_trails: 'UPDATE_OVERWRITE')]
    
    FOUND_ERROR -- Tidak --> APPROVE_PANEN[Asisten Verifikasi Data Harian Afdeling]
    APPROVE_PANEN --> END([Selesai])
```

---

## 5. Peta Alur Peran 4 & 5: Askep & Estate Manager (Executive Command Center)

Estate Manager dan Askep memantau operasional seluruh kebun melalui Web Command Center Next.js, mengontrol risiko degradasi FFA, dan mengekspor dokumen audit kepatuhan EUDR.

### A. Diagram Alir Executive Command Center & Ekspor EUDR

```mermaid
flowchart TD
    START([Manager Buka Web Command Center]) --> AUTH_WEB[Autentikasi JWT & Role Check: MANAGER (Weight 5)]
    AUTH_WEB --> LOAD_BENTO[Render Bento Grid KPI:<br/>Total Tonase, BJR Rata², Restan %, Estimasi FFA %]
    
    LOAD_BENTO --> RENDER_MAP[Render PostGIS WebGL GIS Map Engine]
    RENDER_MAP --> LAYER_CONTROL{Pilih Layer Tampilan}
    
    LAYER_CONTROL -- Poligon Blok & Sertifikasi --> SHOW_POLY[Tampilkan Batas Blok Hijau RSPO/ISPO/EUDR]
    LAYER_CONTROL -- Heatmap Restan TBS --> SHOW_HEATMAP[Tampilkan Titik TPH: Hijau Normal, Kuning 12h, Merah >24h]
    LAYER_CONTROL -- Posisi Truk Angkut --> SHOW_TRUCKS[Tampilkan Vektor Lokasi Truk & Muatan Tonase]
    
    SHOW_HEATMAP --> DETECT_RESTAN{Ada TPH Restan > 24 Jam?}
    DETECT_RESTAN -- Ya (FFA > 5%) --> CRITICAL_MODAL[Tampilkan Peringatan Kritis Pinalti Rendemen CPO]
    CRITICAL_MODAL --> ESCALATE_ACTION[Hubungi Asisten Afdeling & Koordinator Transport]
    
    SHOW_POLY --> EXPORT_EUDR[Klik Tombol 'Ekspor Sertifikat Kepatuhan EUDR']
    EXPORT_EUDR --> GEN_GEOJSON[Backend Generate GeoJSON FeatureCollection WGS84 WGS:4326]
    GEN_GEOJSON --> DOWNLOAD_FILE[Unduh Dokumen Audit Resmi untuk Buyer Eropa / RSPO]
```

---

## 6. Skenario Khusus & Penanganan Kasus Ekstrem (Fail-Safe Workflows)

### Skenario A: Perangkat Mati Mendadak / Habis Baterai Saat Input di Tengah Hutan

```mermaid
sequenceDiagram
    autonumber
    actor Krani as Krani TPH
    participant App as Flutter Mobile App
    participant WAL as Isar DB Write-Ahead Log
    participant Flash as Android Encrypted Flash Storage

    Krani->>App: Input 120 Janjang di TPH-05
    App->>WAL: Tulis Transaksi ke Write-Ahead Log Buffer
    Note over Krani,Flash: Baterai HP Drop 0% & Mati Mendadak (Sudden Power Cut)
    Note over Krani,Flash: Krani Menghidupkan HP Kembali (Reboot)
    Krani->>App: Buka Aplikasi SawitGO
    App->>WAL: Inisialisasi DB & Deteksi Uncommitted Buffer Recovery
    WAL->>Flash: Commit Transaksi yang Tertunda
    App-->>Krani: Notifikasi Dialog: "Data TPH-05 Berhasil Dipulihkan (120 Janjang)"
```

### Skenario B: Kalibrasi GPS di Bawah Kanopi Sawit Rapat (Forest Canopy Multipath)

```mermaid
flowchart TD
    START_GPS([Krani Berdiri di Dekat Batang Sawit Tua]) --> READ_GPS[Flutter Geolocator Membaca Sinyal Satelit]
    READ_GPS --> CHECK_ACC{Akurasi Satelit <= 5.0 Meter?}
    
    CHECK_ACC -- Ya --> LOCK_GREEN[Radar Hijau: GPS Terkunci Sempurna]
    
    CHECK_ACC -- Tidak (Akurasi 12-25 Meter Terhalang Pelepah) --> WARN_RADAR[Radar Kuning Berdenyut: Sinyal Satelit Terhalang]
    WARN_RADAR --> SHOW_GUIDE[Tampilkan Animasi Panduan:<br/>1. Bergeser 5 langkah ke arah Pasar Pikul / Gawangan Mati<br/>2. Gerakkan HP membentuk angka 8 untuk kalibrasi kompas]
    SHOW_GUIDE --> RETRY_GPS[Geolocator Baca Ulang Setelah Bergeser]
    RETRY_GPS --> CHECK_ACC
```

### Skenario C: Konflik Data Sinkronisasi Krani vs Asisten (Simultaneous Offline Edit)

```text
Kronologi Kejadian di Lapangan:
08:00 WIB (Offline) : Krani mencatat 120 Janjang di TPH-01 (Score: 1.723.850.000.000)
09:30 WIB (Offline) : Asisten inspeksi & koreksi menjadi 110 Janjang (Score: 3.723.855.400.000)
12:00 WIB (Online)  : Asisten tiba di kantor afdeling & sync duluan -> Server Simpan 110 Janjang (Score 3.72T)
14:00 WIB (Online)  : Krani baru dapat sinyal 4G di pos timbang & sync payload 120 Janjang (Score 1.72T)
```

```mermaid
sequenceDiagram
    autonumber
    actor Krani as Krani TPH (Sync Jam 14:00)
    participant Dio as Mobile Dio Client
    participant API as NestJS Gateway
    participant ConflictEng as Conflict Resolution Engine
    participant DB as PostgreSQL 16
    participant Audit as sync_audit_trails

    Krani->>Dio: Kirim Payload Sync TPH-01 (Score: 1.723.850.000.000)
    Dio->>API: POST /api/v1/sync/batch
    API->>ConflictEng: Evaluasi Record TPH-01
    ConflictEng->>DB: Query Current Record TPH-01
    DB-->>ConflictEng: Existing Score Server = 3.723.855.400.000 (Asisten)
    
    ConflictEng->>ConflictEng: Bandingkan: Incoming Score (1.72T) < Existing Server Score (3.72T)
    ConflictEng->>Audit: INSERT sync_audit_trails (Action: 'REJECT_STALE', Reason: 'Overruled by ASISTEN')
    ConflictEng-->>API: Conflict Stale Result (HTTP 409)
    API-->>Dio: Response 409 { winningData: { janjang: 110, verifiedBy: 'Asisten Afdeling' } }
    
    Dio->>Krani: Buka Bottom Sheet: "Data TPH-01 Telah Dikoreksi oleh Asisten Menjadi 110 Janjang"
    Krani->>Dio: Ketuk [ Terima & Perbarui Tampilan Lokal ]
```

---

## 7. Matriks State Transisi Layar & Indikator Visual

| Kondisi Sistem | Indikator Status Bar | Aksi Tombol Simpan | Respon Getar Hardware | Keterangan untuk Pengguna |
| :--- | :--- | :--- | :--- | :--- |
| **Online Sempurna** | 🟢 `ONLINE (4G/Wi-Fi)` | Aktif (Hijau Solid) | `HeavyThud` | Data langsung dikirim ke server dalam 500ms |
| **Blankspot Offline** | 🔴 `OFFLINE (Isar DB)` | Aktif (Hijau Disket) | `HeavyThud` | Data disimpan terenkripsi di memori ponsel |
| **Mule Terdeteksi** | 🔵 `P2P TRUK AKTIF` | Aktif (Biru Mesh) | `SuccessPulse` | Siap kirim data nirkabel ke truk pengangkut |
| **GPS Lemah (>5m)** | 🟡 `GPS KALIBRASI (8m)` | Disabled / Kuning | `WarningRumble` | Wajib bergeser ke area terbuka di pasar pikul |
| **Restan 12 Jam** | 🟡 `PERINGATAN 12 JAM` | Tampil di Dashboard | N/A | TPH masuk prioritas rute truk pengangkut |
| **Restan 24 Jam** | 🔴 `RESTAN KRITIS (FFA↑)` | Banner Merah Berkedip | `CriticalAlert` | Eskalasi darurat ke Asisten & Askep |
| **Data Di-Overwrite** | 🟠 `REVISI DITERIMA` | Sheet Konfirmasi | `DoubleBuzz` | Data lokal disesuaikan dengan hasil verifikasi |

---

## 8. Ringkasan & Standar Kualitas (Definition of Done)

- [x] **5 Peran Hirarkis Terpetakan Lengkap** (Manager, Askep, Asisten, Mandor, Krani).
- [x] **Model Store-and-Forward & P2P Data Mule** terintegrasi di setiap diagram sekuensial.
- [x] **Resolusi Konflik Matematis** konsisten dengan formula $W_r \times 10^{12} + T_{ms}$.
- [x] **Validasi Spasial EUDR & GPS Satelit $\le 5.0\text{ m}$** tertanam di langkah awal input lapangan.
- [x] **Manajemen Restan & FFA Degradasi** memiliki alur eskalasi otomatis multi-tahap.
