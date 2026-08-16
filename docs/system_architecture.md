# SYSTEM ARCHITECTURE DOCUMENT (SAD)
## Proyek: SawitGO (AgriSync) - Offline-First Palm Plantation Management & Traceability System
**Versi:** 1.0.0  
**Status:** Single Source of Truth (SSOT) - Fase 0  
**Tanggal:** 17 Agustus 2026  
**Penulis/Arsitek:** Felich Pehagasa Ginting (Technical Lead & System Architect)

---

## 1. Ringkasan Eksekutif & Prinsip Desain
SawitGO (AgriSync) dirancang khusus untuk memecahkan problem operasional kebun kelapa sawit di area *blankspot* ekstrem, keterlambatan pelaporan panen yang memicu restan TBS (Tandan Buah Segar), degradasi FFA (*Free Fatty Acid*), dan audit ketertelusuran standar global (**EUDR, ISPO, RSPO**).

### Prinsip Utama Arsitektur:
1. **Offline-First & Local Persistence**: Aplikasi mobile berjalan 100% tanpa internet menggunakan local database (*Isar DB*) dengan enkripsi *AES-256*.
2. **Store-and-Forward Sync Engine**: Setiap transaksi lokal diantrekan secara terstruktur (*pending sync queue*) dan dikirim otomatis ketika sinyal terdeteksi.
3. **P2P Realtime Offline Mesh (Ad-Hoc Sync)**: Mendukung sinkronisasi peer-to-peer antar-perangkat di lapangan via Wi-Fi Direct / BLE dan kurir data bergerak (*Data Mule* truk panen).
4. **Domain-Specific Conflict Resolution**: Menyelesaikan benturan data (*data conflict*) dengan memprioritaskan hirarki manajerial perkebunan (*Weighted RBAC*) dan presisi stempel waktu milidetik (*BigInt Timestamp*).
5. **Native Geospatial Traceability**: Pencatatan koordinat GPS batas poligon blok dan titik TPH (*Tempat Pengumpulan Hasil*) berakurasi tinggi (< 5 meter) berbasis standar PostGIS & GeoJSON.

---

## 2. Diagram Arsitektur Tingkat Tinggi (High-Level Architecture)

```mermaid
graph TB
    subgraph FIELD_TIER ["Field & Mobile Layer (Offline-First Device)"]
        UI["Flutter UI (Presentation Layer)\n(BLoC Pattern)"]
        BLOC["Business Logic Component (BLoC)"]
        REPO["Repository & Local Data Source"]
        ISAR[("Isar DB (AES-256 Encrypted)\n- HarvestLog Collection\n- Block & TPH Master\n- Pending Sync Queue")]
        SYNC_CLIENT["Flutter Local Sync Engine\n(Connectivity Monitor & Dio Client)"]
        P2P_MESH["P2P Offline Mesh Sync Engine\n(Wi-Fi Direct / BLE Peer Discovery)"]
        
        UI <--> BLOC
        BLOC <--> REPO
        REPO <--> ISAR
        SYNC_CLIENT <--> ISAR
        P2P_MESH <--> ISAR
    end

    subgraph NETWORK_TIER ["Network & Security Layer"]
        TLS["HTTPS / TLS 1.3\n(REST API Gateway)"]
        AUTH_HEADER["JWT Bearer Authentication\n+ Device Signature"]
    end

    subgraph CLOUD_TIER ["Cloud & Backend Services (NestJS Engine)"]
        GATEWAY["API Gateway / Ingress Controller"]
        AUTH_SVC["Auth & RBAC Middleware\n(5-Tier Role Verifier)"]
        SYNC_SVC["Sync Ingestion Service\n(Batch Processor & Conflict Resolver)"]
        GEO_SVC["Geospatial & Traceability Service\n(EUDR/RSPO Validator)"]
        RESTAN_SVC["Restan & Harvest Analytics Service"]
        
        GATEWAY --> AUTH_SVC
        AUTH_SVC --> SYNC_SVC
        AUTH_SVC --> GEO_SVC
        AUTH_SVC --> RESTAN_SVC
    end

    subgraph DATA_TIER ["Enterprise Data Layer"]
        PG[("PostgreSQL 16 + PostGIS Extension\n- users, roles, blocks (POLYGON)\n- tph (POINT), harvest_logs\n- sync_audit_trails")]
        REDIS[("Redis Caching & Lock Manager\n(Distributed Idempotency Keys)")]
        
        SYNC_SVC <--> PG
        SYNC_SVC <--> REDIS
        GEO_SVC <--> PG
        RESTAN_SVC <--> PG
    end

    subgraph WEB_TIER ["Executive Web Dashboard Layer"]
        DASH_UI["React / Next.js Dashboard\n- Real-Time GIS Heatmap\n- Restan Warning Alert System\n- Conflict & Audit Log Viewer"]
        DASH_UI <--> GATEWAY
    end

    SYNC_CLIENT -- "Store-and-Forward Sync Payload" --> TLS
    TLS --> AUTH_HEADER
    AUTH_HEADER --> GATEWAY
```

---

## 3. Topologi Aliran Data (Data Flow Pipeline)

Aliran data dari saat mandor/krani menginput data panen di kebun sawit hingga tersimpan di PostgreSQL server pusat:

```mermaid
sequenceDiagram
    autonumber
    actor User as Krani / Mandor (Offline)
    participant UI as Flutter App (UI)
    participant LocalDB as Isar DB (Local)
    participant SyncClient as Local Sync Engine
    participant API as Backend API (NestJS)
    participant ConflictEng as Conflict Resolution Engine
    participant DB as PostgreSQL + PostGIS

    User->>UI: Input Data Panen (TPH, Jml Janjang, Brondolan, GPS)
    UI->>LocalDB: Generate UUIDv4, Calculate Priority Score, Save to Isar DB
    UI->>LocalDB: Enqueue to pending_syncs
    UI-->>User: Feedback Visual: "Tersimpan Lokal (Menunggu Sinyal)"

    Note over User,LocalDB: Sinyal Internet Kembali Tersedia (Online Event)

    SyncClient->>LocalDB: Query batch pending_syncs (Limit 50 records)
    SyncClient->>API: POST /api/v1/sync/batch (Bearer JWT, Payload JSON)
    
    API->>API: Validasi Token & Role Signature
    API->>ConflictEng: Periksa UUID & Hash Data terhadap DB
    
    alt Tidak Ada Konflik (Data Baru)
        ConflictEng->>DB: INSERT into harvest_logs & log audit trail
        ConflictEng-->>API: Status 201 (Created)
    else Ada Konflik (Data Sudah Pernah Diupdate Oleh User Lain)
        ConflictEng->>ConflictEng: Hitung: Priority_Score = (Role_Weight * 1.000.000) + Timestamp
        alt Incoming Score > Existing Score (Peran Lebih Tinggi / Lebih Baru)
            ConflictEng->>DB: UPDATE harvest_logs & INSERT sync_audit_trails (Status: OVERWRITTEN)
            ConflictEng-->>API: Status 200 (Updated via Priority Override)
        else Incoming Score <= Existing Score
            ConflictEng->>DB: REJECT Payload & INSERT sync_audit_trails (Status: REJECTED_STALE)
            ConflictEng-->>API: Status 409 (Conflict Rejected with Server State)
        end
    end

    API-->>SyncClient: Response JSON (Success list, Conflict list)
    SyncClient->>LocalDB: Dequeue / Hapus record yang sukses dari pending_syncs
    SyncClient->>LocalDB: Update status sync flag is_synced = true
    SyncClient-->>UI: Notifikasi Sinkronisasi Berhasil
```

---

## 4. Pola Arsitektur Mobile (Clean Architecture Flutter)

Aplikasi mobile SawitGO mengimplementasikan Clean Architecture 3-Layer untuk memisahkan UI, logika bisnis, dan mekanisme database lokal:

```
apps/mobile/
├── lib/
│   ├── core/
│   │   ├── constants/         # Role weights, API endpoints, error strings
│   │   ├── crypto/            # AES-256 encryption helper for Isar & secure storage
│   │   ├── network/           # Dio client, Interceptors, Network Connectivity Observer
│   │   └── utils/             # Geolocation parser (GeoJSON), Date/Timestamp parser
│   ├── features/
│   │   ├── auth/              # Login, PIN Authentication, Secure Token Storage
│   │   ├── harvest/           # Input Panen, TPH Selector, Brondolan Tracker
│   │   │   ├── data/          # Isar Harvest Collection, Remote DataSource, Repositories
│   │   │   ├── domain/        # HarvestLog Entity, UseCases (SaveHarvest, GetLocalSummary)
│   │   │   └── presentation/  # BLoC, Pages, Widgets (TPH Dropdown, GPS Lock Button)
│   │   ├── sync/              # Background Sync Worker, Queue Handler, Retry Policy
│   │   │   ├── data/          # SyncQueue Collection, Sync Remote API
│   │   │   ├── domain/        # SyncEngine UseCase, Conflict Resolution Callback
│   │   │   └── presentation/  # Sync Status Banner, Manual Sync Trigger Widget
│   │   └── geospatial/        # Offline Map Tile Cache, Boundary Verification Widget
│   └── main.dart
```

---

## 5. Pola Arsitektur Backend (Modular NestJS & PostGIS)

Backend dirancang berbasis arsitektur modular (*micro-modular monolith*):

```
apps/backend/
├── src/
│   ├── common/
│   │   ├── decorators/        # @Roles(), @CurrentUser()
│   │   ├── guards/            # JwtAuthGuard, RolesGuard (5-Tier RBAC)
│   │   ├── interceptors/      # ResponseTransformInterceptor, LoggingInterceptor
│   │   └── filters/           # GlobalHttpExceptionFilter
│   ├── config/                # Database (PostGIS), Redis, JWT configuration
│   ├── database/
│   │   ├── migrations/        # TypeORM spatial migrations
│   │   └── seeds/             # Master Afdeling, Blok, TPH, & Role seeders
│   └── modules/
│       ├── auth/              # JWT issuance, refresh tokens, role resolution
│       ├── users/             # User entity, credential management
│       ├── blocks/            # Estate, Afdeling, & Block Polygons (PostGIS geometry)
│       ├── tph/               # Tempat Pengumpulan Hasil coordinates (PostGIS Point)
│       ├── sync/              # POST /api/v1/sync, Priority Score Engine, Idempotency Guard
│       ├── harvest/           # Harvest CRUD, Daily TPH Aggregator
│       ├── restan/            # Restan detection algorithm (>24h delay triggers)
│       └── analytics/         # Executive KPIs, EUDR compliance export (GeoJSON/Shapefile)
```

---

## 6. Protokol Keamanan & Proteksi Data (Security & Cryptography)

```mermaid
graph LR
    subgraph DEVICE ["Mobile Device (Offline)"]
        KEYSTORE["Hardware Keystore / Keyring\n(Android Keystore)"]
        SEC_STORE["Flutter Secure Storage\n(AES-256 Master Key)"]
        DATA_PLAIN["Plaintext Harvest Data"]
        CIPHER["AES-256-CBC Encryptor"]
        ISAR_ENC[("Isar DB File on Flash Storage\n(Encrypted Payload / DB)")]
        
        KEYSTORE --> SEC_STORE
        SEC_STORE --> CIPHER
        DATA_PLAIN --> CIPHER
        CIPHER --> ISAR_ENC
    end

    subgraph TRANSIT ["In-Transit (Store-and-Forward)"]
        DIO["Dio HTTP Client"]
        TLS_PIN["TLS 1.3 + SHA-256 Certificate Pinning"]
        DIO --> TLS_PIN
    end

    subgraph BACKEND ["Cloud Backend (NestJS)"]
        GATEWAY["API Gateway Ingress"]
        JWT_GUARD["JWT Guard (RS256 Signature)"]
        PG_DB[("PostgreSQL 16\n(Encrypted at Rest / TDE)")]
        
        TLS_PIN --> GATEWAY
        GATEWAY --> JWT_GUARD
        JWT_GUARD --> PG_DB
    end

    ISAR_ENC --> DIO
```

### A. At-Rest Encryption (Mobile AES-256-CBC)
- **Algoritma**: `AES-256` dalam mode `CBC` dengan padding `PKCS7`.
- **Master Key Security**: Kunci acak 256-bit dihasilkan via `Random.secure()` dan disimpan di *Hardware-backed Android Keystore* via `flutter_secure_storage` (tidak di-hardcode).
- **Dynamic IV**: Prefix 16-byte acak disisipkan di depan ciphertext `[IV_16_BYTES + CIPHERTEXT]`.

### B. In-Transit Security & TLS Pinning
- Komunikasi API mewajibkan protokol TLS 1.3 dengan *SHA-256 Certificate Pinning* di mobile client.

### C. Idempotency Key & Anti-Replay Guard
- Setiap transaksi pengiriman batch memiliki token unik:
  $$\text{idempotencyKey} = \text{SHA256}(\text{DeviceID} + \text{TransactionUUID} + \text{ClientTimestampMs})$$
- Backend memanfaatkan Redis & `sync_audit_trails` untuk mencegah duplikasi data jika koneksi putus di tengah jalan.
