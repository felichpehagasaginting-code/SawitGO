# DATABASE SCHEMA & ERD SPECIFICATION (SSOT)
## Proyek: SawitGO (AgriSync) - PostGIS & Isar DB Schemas
**Versi:** 1.0.0  
**Status:** Single Source of Truth (SSOT) - Fase 0  
**Tanggal:** 17 Agustus 2026

---

## 1. Entity Relationship Diagram (ERD) - Cloud PostgreSQL

```mermaid
erDiagram
    ROLES ||--o{ USERS : "assigned to"
    ESTATES ||--o{ AFDELINGS : "contains"
    AFDELINGS ||--o{ BLOCKS : "contains"
    BLOCKS ||--o{ TPH : "contains"
    USERS ||--o{ HARVEST_LOGS : "recorded by"
    USERS ||--o{ HARVEST_LOGS : "verified by"
    TPH ||--o{ HARVEST_LOGS : "harvest collected at"
    HARVEST_LOGS ||--o{ SYNC_AUDIT_TRAILS : "audits"
    HARVEST_LOGS ||--o{ RESTAN_TRACKERS : "monitored by"

    ROLES {
        int id PK
        string role_name "MANAGER, ASKEP, ASISTEN, MANDOR, KRANI"
        int role_weight "5, 4, 3, 2, 1"
        string description
        timestamp created_at
    }

    USERS {
        uuid id PK
        int role_id FK
        string nip UK "Nomor Induk Pegawai"
        string full_name
        string email UK
        string password_hash
        string phone_number
        uuid assigned_estate_id
        uuid assigned_afdeling_id
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }

    ESTATES {
        uuid id PK
        string code UK "e.g. EST-01"
        string name "Kebun Inti / Plasma"
        geometry boundary "PostGIS POLYGON / MULTIPOLYGON SRID 4326"
        float total_area_hectares
        timestamp created_at
    }

    AFDELINGS {
        uuid id PK
        uuid estate_id FK
        string code "e.g. AFD-A"
        string name "Afdeling Alpha"
        geometry boundary "PostGIS POLYGON SRID 4326"
        timestamp created_at
    }

    BLOCKS {
        uuid id PK
        uuid afdeling_id FK
        string block_code "e.g. B012"
        int planting_year "Tahun Tanam, misal 2015"
        string palm_variety "e.g. Marihat, Dami Mas"
        int total_palms "Jumlah Pohon"
        float area_hectares
        geometry boundary "PostGIS POLYGON SRID 4326 (EUDR Standard)"
        timestamp created_at
        timestamp updated_at
    }

    TPH {
        uuid id PK
        uuid block_id FK
        string tph_number "e.g. TPH-01"
        geometry location "PostGIS POINT(longitude, latitude) SRID 4326"
        float latitude
        float longitude
        string qr_code_identifier UK
        boolean is_active
        timestamp created_at
    }

    HARVEST_LOGS {
        uuid id PK "Generated Client-Side (UUIDv4)"
        uuid tph_id FK
        uuid block_id FK
        uuid user_id FK "Recorder (Krani/Mandor)"
        uuid verified_by_user_id FK "Nullable (Asisten/Askep)"
        date harvest_date
        int janjang_count "Jumlah Tandan Buah Segar"
        float brondolan_weight_kg "Berat Brondolan (Kg)"
        float estimated_weight_kg "Estimasi Total Kg (BJR)"
        int mentah_count "Buah Mentah / Unripe"
        int masak_count "Buah Masak / Ripe"
        int lewat_masak_count "Buah Lewat Masak / Overripe"
        int tangkai_panjang_count "Tangkai Panjang Penalty"
        string status "PENDING, VERIFIED, TRANSPORTED, RESTAN"
        bigint client_timestamp_ms "Epoch ms"
        bigint priority_score "(Role_Weight * 1.000.000) + client_timestamp_ms"
        geometry gps_coordinate_recorded "PostGIS POINT recorded at field"
        float gps_accuracy_meters "Harus < 5.0m"
        string idempotency_key UK
        timestamp created_at
        timestamp updated_at
    }

    SYNC_AUDIT_TRAILS {
        uuid id PK
        uuid harvest_log_id FK
        uuid user_id FK
        int user_role_weight
        bigint client_timestamp_ms
        bigint calculated_priority_score
        string sync_action "INSERT, UPDATE_OVERWRITE, REJECT_STALE"
        jsonb payload_snapshot
        string conflict_reason
        string ip_address
        string device_info
        timestamp created_at
    }

    RESTAN_TRACKERS {
        uuid id PK
        uuid harvest_log_id FK UK
        timestamp harvest_time
        timestamp pickup_time "Nullable"
        int duration_hours "Computed diff"
        boolean is_restan "True jika > 24 jam belum terangkut"
        float estimated_ffa_percentage "Base 1.5% + (0.15% per jam setelah 24h)"
        string status "NORMAL, WARNING_12H, CRITICAL_20H, RESTAN_OVERDUE"
        timestamp updated_at
    }
```

---

## 2. Definisi Skema PostgreSQL + PostGIS (DDL SQL)

```sql
-- Enable PostGIS & UUID Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 1. Table Roles (Weighted RBAC 5 Jenjang)
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_weight INTEGER UNIQUE NOT NULL, -- Manager=5, Askep=4, Asisten=3, Mandor=2, Krani=1
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (role_name, role_weight, description) VALUES
('MANAGER', 5, 'Estate Manager - Otoritas tertinggi kebun'),
('ASKEP', 4, 'Kepala Kebun / Assistant Kepala'),
('ASISTEN', 3, 'Asisten Afdeling Lapangan'),
('MANDOR', 2, 'Mandor Panen Lapangan'),
('KRANI', 1, 'Krani TPH / Pencatat Hasil Panen');

-- 2. Table Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_id INTEGER NOT NULL REFERENCES roles(id),
    nip VARCHAR(30) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    assigned_estate_id UUID,
    assigned_afdeling_id UUID,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Table Estates
CREATE TABLE estates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(30) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    boundary GEOMETRY(MultiPolygon, 4326),
    total_area_hectares NUMERIC(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Table Afdelings
CREATE TABLE afdelings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    estate_id UUID NOT NULL REFERENCES estates(id) ON DELETE CASCADE,
    code VARCHAR(30) NOT NULL,
    name VARCHAR(100) NOT NULL,
    boundary GEOMETRY(Polygon, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_estate_afdeling UNIQUE (estate_id, code)
);

-- 5. Table Blocks (EUDR Polygon Boundary)
CREATE TABLE blocks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    afdeling_id UUID NOT NULL REFERENCES afdelings(id) ON DELETE CASCADE,
    block_code VARCHAR(30) NOT NULL,
    planting_year INTEGER NOT NULL,
    palm_variety VARCHAR(100) DEFAULT 'DxP Standard',
    total_palms INTEGER NOT NULL DEFAULT 0,
    area_hectares NUMERIC(8, 2) NOT NULL,
    boundary GEOMETRY(Polygon, 4326) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_afdeling_block UNIQUE (afdeling_id, block_code)
);

-- 6. Table TPH (Tempat Pengumpulan Hasil)
CREATE TABLE tph (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    block_id UUID NOT NULL REFERENCES blocks(id) ON DELETE CASCADE,
    tph_number VARCHAR(30) NOT NULL,
    location GEOMETRY(Point, 4326) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    qr_code_identifier VARCHAR(100) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_block_tph UNIQUE (block_id, tph_number)
);

-- Spatial Indexes
CREATE INDEX idx_estates_boundary ON estates USING GIST(boundary);
CREATE INDEX idx_afdelings_boundary ON afdelings USING GIST(boundary);
CREATE INDEX idx_blocks_boundary ON blocks USING GIST(boundary);
CREATE INDEX idx_tph_location ON tph USING GIST(location);

-- 7. Table Harvest Logs (Core Offline Sync Entity)
CREATE TABLE harvest_logs (
    id UUID PRIMARY KEY, -- Client-generated UUIDv4
    tph_id UUID NOT NULL REFERENCES tph(id),
    block_id UUID NOT NULL REFERENCES blocks(id),
    user_id UUID NOT NULL REFERENCES users(id),
    verified_by_user_id UUID REFERENCES users(id),
    harvest_date DATE NOT NULL,
    janjang_count INTEGER NOT NULL CHECK (janjang_count >= 0),
    brondolan_weight_kg NUMERIC(8, 2) NOT NULL DEFAULT 0.00,
    estimated_weight_kg NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    mentah_count INTEGER NOT NULL DEFAULT 0,
    masak_count INTEGER NOT NULL DEFAULT 0,
    lewat_masak_count INTEGER NOT NULL DEFAULT 0,
    tangkai_panjang_count INTEGER NOT NULL DEFAULT 0,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING', -- PENDING, VERIFIED, TRANSPORTED, RESTAN
    client_timestamp_ms BIGINT NOT NULL,
    priority_score BIGINT NOT NULL,
    gps_coordinate_recorded GEOMETRY(Point, 4326),
    gps_accuracy_meters NUMERIC(5, 2),
    idempotency_key VARCHAR(128) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_harvest_logs_tph_date ON harvest_logs(tph_id, harvest_date);
CREATE INDEX idx_harvest_logs_priority ON harvest_logs(priority_score);
CREATE INDEX idx_harvest_logs_status ON harvest_logs(status);

-- 8. Table Sync Audit Trails
CREATE TABLE sync_audit_trails (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    harvest_log_id UUID NOT NULL REFERENCES harvest_logs(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id),
    user_role_weight INTEGER NOT NULL,
    client_timestamp_ms BIGINT NOT NULL,
    calculated_priority_score BIGINT NOT NULL,
    sync_action VARCHAR(50) NOT NULL, -- 'INSERT', 'UPDATE_OVERWRITE', 'REJECT_STALE'
    payload_snapshot JSONB NOT NULL,
    conflict_reason TEXT,
    ip_address VARCHAR(45),
    device_info VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Table Restan Trackers
CREATE TABLE restan_trackers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    harvest_log_id UUID UNIQUE NOT NULL REFERENCES harvest_logs(id) ON DELETE CASCADE,
    harvest_time TIMESTAMP WITH TIME ZONE NOT NULL,
    pickup_time TIMESTAMP WITH TIME ZONE,
    duration_hours INTEGER DEFAULT 0,
    is_restan BOOLEAN DEFAULT FALSE,
    estimated_ffa_percentage NUMERIC(5, 2) DEFAULT 1.50,
    status VARCHAR(30) DEFAULT 'NORMAL',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 3. Skema Basis Data Lokal Mobile (Isar DB Dart Models)

Di sisi client Flutter, Isar DB digunakan sebagai database lokal terenkripsi (*AES-256*):

```dart
// harvest_log_local.dart
import 'package:isar/isar.dart';

part 'harvest_log_local.g.dart';

@collection
class LocalHarvestLog {
  Id localId = Isar.autoIncrement;

  @Index(unique: true, replace: true)
  late String serverId; // UUIDv4 generated on device

  @Index()
  late String tphId;

  late String blockId;
  late String blockCode;
  late String tphNumber;
  
  late String userId;
  late String userName;
  late int userRoleWeight; // 1 to 5

  late DateTime harvestDate;
  late int janjangCount;
  late double brondolanWeightKg;
  late double estimatedWeightKg;
  
  late int mentahCount;
  late int masakCount;
  late int lewatMasakCount;
  late int tangkaiPanjangCount;

  late double latitude;
  late double longitude;
  late double gpsAccuracy;

  @Index()
  late int clientTimestampMs; // BigInt representation in ms

  @Index()
  late int priorityScore; // (userRoleWeight * 1000000) + clientTimestampMs

  late String idempotencyKey;

  @Index()
  late bool isSynced; // false: in queue, true: sent to server

  late String syncStatus; // 'QUEUED', 'SYNCED', 'CONFLICT_RESOLVED', 'REJECTED'
  
  late DateTime createdAt;
  late DateTime updatedAt;
}

// pending_sync_queue.dart
@collection
class PendingSyncQueue {
  Id localId = Isar.autoIncrement;

  @Index(unique: true)
  late String harvestLogServerId;

  late String httpMethod; // 'POST' or 'PUT'
  late String endpoint;   // '/api/v1/sync/harvest'
  
  late String payloadJson; // AES-256 Encrypted in disk
  
  late int retryCount;
  late String? lastErrorMessage;
  late DateTime createdAt;
  late DateTime? lastAttemptAt;
}

// master_block_cache.dart & master_tph_cache.dart (Cached for offline picker)
@collection
class CachedBlock {
  Id localId = Isar.autoIncrement;
  @Index(unique: true)
  late String blockId;
  late String blockCode;
  late String afdelingCode;
  late int plantingYear;
  late String polygonGeoJson;
}

@collection
class CachedTPH {
  Id localId = Isar.autoIncrement;
  @Index(unique: true)
  late String tphId;
  @Index()
  late String blockId;
  late String tphNumber;
  late double latitude;
  late double longitude;
  late String qrCode;
}
```
