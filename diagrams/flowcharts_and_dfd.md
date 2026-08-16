# DIAGRAM ALIR LENGKAP SAWITGO (AGRISYNC)
## DFD Level 0, DFD Level 1, Flowchart Sync & Conflict Resolution, State Chart
**Versi:** 1.0.0  
**Status:** Single Source of Truth (SSOT) - Fase 0  
**Tanggal:** 17 Agustus 2026

---

## 1. Data Flow Diagram (DFD) Level 0 / Context Diagram

```mermaid
graph TD
    KRANI["Krani TPH / Mandor Panen"]
    ASISTEN["Asisten Afdeling / Askep / Manager"]
    SYSTEM(("SAWITGO / AGRISYNC\nMANAGEMENT SYSTEM"))
    AUDIT["Auditor Regulasi / Pabrik PKS\n(EUDR / ISPO / RSPO)"]

    KRANI -- "1. Input Hasil Panen (Janjang, Brondolan, Mutu)\n2. Koordinat GPS Presisi & Waktu Lokal" --> SYSTEM
    SYSTEM -- "3. Status Antrian & Konfirmasi Sinkronisasi" --> KRANI

    ASISTEN -- "4. Verifikasi & Approval Panen\n5. Koreksi / Override Data Lapangan" --> SYSTEM
    SYSTEM -- "6. Rekapitulasi Real-Time, Peta GIS Blok,\n& Alert Peringatan Restan TBS" --> ASISTEN

    SYSTEM -- "7. Laporan Ketertelusuran Poligon Lahan (GeoJSON),\nAudit Log & Estimasi FFA TBS" --> AUDIT
```

---

## 2. Data Flow Diagram (DFD) Level 1

```mermaid
graph TB
    subgraph ENTITIES ["External Entities"]
        ACTOR_FIELD["Mandor / Krani (Mobile)"]
        ACTOR_EXEC["Asisten / Manager (Web Dashboard)"]
    end

    subgraph PROCESSES ["Core System Processes"]
        P1["1.0 Autentikasi & Validasi RBAC"]
        P2["2.0 Local Persistence & Enkripsi (Offline)"]
        P3["3.0 Sync Engine & Ingestion Gateway"]
        P4["4.0 Domain-Specific Conflict Resolution"]
        P5["5.0 Restan Tracking & FFA Warning Engine"]
        P6["6.0 GIS Geospatial & EUDR Compliance Generator"]
    end

    subgraph STORES ["Data Stores"]
        D_LOCAL[("D1: Isar Local DB (Mobile AES-256)")]
        D_USERS[("D2: Users & Roles DB")]
        D_SPATIAL[("D3: Estates, Blocks & TPH (PostGIS)")]
        D_HARVEST[("D4: Harvest Logs & Restan Tracker")]
        D_AUDIT[("D5: Sync Audit Trails")]
    end

    ACTOR_FIELD -->|"NIP & PIN / Pass"| P1
    ACTOR_EXEC -->|"Login Web Admin"| P1
    P1 <-->|"Verify Creds & Role Weight"| D_USERS

    ACTOR_FIELD -->|"Input Panen + GPS"| P2
    P2 <-->|"Read/Write Offline Records & Queue"| D_LOCAL

    D_LOCAL -->|"Batch Sync Payload (Online Event)"| P3
    P3 -->|"Check Existing UUID & Scores"| P4
    P4 <-->|"Compare Priority Score"| D_HARVEST
    P4 -->|"Log Overwrite / Reject Result"| D_AUDIT
    P4 -->|"Update Winning Data"| D_HARVEST

    D_HARVEST -->|"Calculate Elapsed Time (>12h, >24h)"| P5
    P5 -->|"Restan & FFA Alert"| ACTOR_EXEC

    D_SPATIAL & D_HARVEST -->|"Merge Coordinates & Yield"| P6
    P6 -->|"Export Traceability Map & GeoJSON"| ACTOR_EXEC
```

---

## 3. Flowchart: End-to-End Local Sync & Store-and-Forward Engine (Flutter)

```mermaid
flowchart TD
    START([Mulai Input Data Panen]) --> INPUT[User Input: TPH, Blok, Janjang, Brondolan, Mutu]
    INPUT --> GPS[Ambil Titik GPS Hardware]
    GPS --> CHECK_ACC{Akurasi GPS < 5 meter?}
    
    CHECK_ACC -- Tidak --> WARN_GPS[Tampilkan Warning Akurasi Rendah / Kalibrasi Ulang] --> GPS
    CHECK_ACC -- Ya --> COMPUTE[Hitung Priority Score Lokal:<br/>Score = RoleWeight * 1.000.000 + TimestampMs]
    
    COMPUTE --> SAVE_LOCAL[(Simpan Record ke Isar DB Terenkripsi AES-256)]
    SAVE_LOCAL --> ENQUEUE[(Masukkan ke Koleksi PendingSyncQueue)]
    ENQUEUE --> UI_READY[Update UI: Badge 'Tersimpan Offline - Menunggu Sinyal']
    
    UI_READY --> TIMER[Background Connectivity Observer Loop (Tiap 30 Detik)]
    TIMER --> CHECK_NET{Internet Terkoneksi?}
    
    CHECK_NET -- Tidak (Blankspot) --> IDLE[Tetap di Antrian Lokal / Standby] --> TIMER
    CHECK_NET -- Ya (Online) --> BATCH[Ambil 50 Record dari PendingSyncQueue]
    
    BATCH --> SEND_API[Kirim POST /api/v1/sync/batch via Dio Client]
    SEND_API --> HTTP_RES{HTTP Response Code?}
    
    HTTP_RES -- 200 / 201 Success --> DEQUEUE[Hapus dari PendingSyncQueue]
    DEQUEUE --> MARK_SYNCED[Set is_synced = true di Isar DB]
    MARK_SYNCED --> NOTIF_OK[Tampilkan Notifikasi 'Sinkronisasi Berhasil']
    
    HTTP_RES -- 409 Conflict (Stale Data) --> AUDIT_LOCAL[Tandai Status Lokal: 'DITOLAK - DATA SERVER LEBIH TINGGI']
    AUDIT_LOCAL --> DEQUEUE
    
    HTTP_RES -- 500 / Network Error --> RETRY[Tambah Retry Count, Exponential Backoff]
    RETRY --> TIMER
```

---

## 4. Flowchart: Server-Side Domain-Specific Conflict Resolution Engine (NestJS)

```mermaid
flowchart TD
    START_SYNC([Menerima Payload Record Sync]) --> VALIDATE_JWT[Validasi JWT Token & Role Pengirim]
    VALIDATE_JWT --> CHECK_DB{Apakah ID Transaksi<br/>Sudah Ada di PostgreSQL?}
    
    CHECK_DB -- Belum Ada (Record Baru) --> INSERT_NEW[(INSERT into harvest_logs)]
    INSERT_NEW --> AUDIT_NEW[(INSERT sync_audit_trails: Status 'ACCEPTED_NEW')]
    AUDIT_NEW --> RES_201[Return HTTP 201: Accepted]
    
    CHECK_DB -- Sudah Ada (Konflik / Update) --> CALC[Ambil Priority Score Server vs Incoming Score]
    CALC --> COMPARE{Incoming Score > Existing Server Score?}
    
    COMPARE -- Ya (Otoritas Lebih Tinggi / Lebih Baru) --> OVERWRITE[(UPDATE harvest_logs dengan Incoming Data)]
    OVERWRITE --> AUDIT_OVER[(INSERT sync_audit_trails: Status 'UPDATE_OVERWRITE')]
    AUDIT_OVER --> RES_200[Return HTTP 200: Overwrite Success]
    
    COMPARE -- Sama (Idempotency Retry) --> RES_IDEMP[Return HTTP 200: Idempotent Success]
    
    COMPARE -- Tidak (Incoming Kalah / Stale) --> REJECT[(INSERT sync_audit_trails: Status 'REJECT_STALE')]
    REJECT --> RES_409[Return HTTP 409: Conflict Rejected + Winning Data]
```

---

## 5. State Machine Diagram: Lifecycle Transaksi Panen & Restan TBS

```mermaid
stateDiagram-v2
    [*] --> DRAFT_OFFLINE: Krani Input Data di TPH (Blankspot)
    DRAFT_OFFLINE --> QUEUED_IN_DEVICE: Tersimpan di Isar DB & Antrian Sync
    
    QUEUED_IN_DEVICE --> SYNCING: Koneksi Internet Terdeteksi
    SYNCING --> REJECTED_STALE: Ditolak Server (Priority Score Rendah)
    SYNCING --> PENDING_VERIFICATION: Sukses Masuk Server (HTTP 201)
    
    PENDING_VERIFICATION --> VERIFIED: Diverifikasi Asisten Afdeling / Askep
    
    PENDING_VERIFICATION --> WARNING_12H: Belum Diangkut > 12 Jam
    VERIFIED --> WARNING_12H: Belum Diangkut > 12 Jam
    
    WARNING_12H --> RESTAN_CRITICAL: Belum Diangkut > 24 Jam (FFA Mulai Naik > 5%)
    
    WARNING_12H --> TRANSPORTED_TO_PKS: Truk Mengangkut Buah ke Pabrik
    RESTAN_CRITICAL --> TRANSPORTED_TO_PKS: Truk Angkut Buah Restan (Kena Pinalti Mutu)
    
    TRANSPORTED_TO_PKS --> ARCHIVED_COMPLETED: TBS Ditimbang & Diproses di Mill (PKS)
    ARCHIVED_COMPLETED --> [*]
```
