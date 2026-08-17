# API CONTRACT & OPENAPI 3.1 SPECIFICATION (SSOT)
## Proyek: SawitGO (AgriSync) - Offline-First Mobile & Cloud Gateway
**Versi:** 1.1.0  
**Status:** Single Source of Truth (SSOT) - Fase 0  
**Tanggal:** 17 Agustus 2026

---

## 1. Daftar Endpoint API Utama

| Modul | Method | Endpoint Path | Role Allowed | Deskripsi & Kegunaan |
|---|---|---|---|---|
| **Auth** | `POST` | `/api/v1/auth/login` | Public | Login pengguna via NIP & Password / PIN |
| **Auth** | `POST` | `/api/v1/auth/google-login` | Manager (W5), Askep (W4) | Login Google OAuth Firebase (Dibatasi khusus level manajemen W4/W5) |
| **Auth** | `POST` | `/api/v1/auth/refresh` | Public | Refresh token JWT |
| **Auth** | `GET` | `/api/v1/auth/profile` | All Roles | Mengambil data sesi pengguna & assigned Afdeling/Estate |
| **Master** | `GET` | `/api/v1/master/blocks` | All Roles | Download master polygon blok & varietas sawit (offline cache) |
| **Master** | `GET` | `/api/v1/master/tph` | All Roles | Download master titik koordinat TPH & QR Code |
| **Sync** | `POST` | `/api/v1/sync/batch` | All Roles | Ingestion batch data panen offline (Core Store-and-Forward) |
| **Harvest** | `GET` | `/api/v1/harvest/daily` | All Roles | Mengambil rekapitulasi panen harian per TPH / Afdeling |
| **Harvest** | `PUT` | `/api/v1/harvest/:id/verify`| Asisten, Askep, Manager | Verifikasi dan approval resmi data panen lapangan |
| **Restan** | `GET` | `/api/v1/restan/warnings` | All Roles (JWT) | Monitoring daftar TPH dengan potensi restan > 12h / > 24h |
| **Restan** | `POST`| `/api/v1/restan/:id/pickup` | Mandor, Asisten, Krani (JWT) | Update status buah telah diangkut truk ke PKS |
| **Export** | `GET` | `/api/v1/analytics/eudr-geojson`| Askep, Manager (JWT) | Export GeoJSON polygon & koordinat panen untuk audit EUDR/RSPO |
| **Analytics** | `GET` | `/api/v1/analytics/kpi-metrics` | All Roles (JWT) | KPI eksekutif real: total janjang, tonase estimasi, BJR rata-rata, SLA sync, FFA rata-rata, restan overdue |
| **Analytics** | `GET` | `/api/v1/analytics/volume-trend?days=7` | All Roles (JWT) | Tren volume panen harian: `[{ date, transactions, totalJanjang, totalBrondolanKg, estimatedTonaseKg, tonaseTon, bjrAvgKg }]` |
| **Analytics** | `GET` | `/api/v1/analytics/activity-feed?limit=15&category=all|conflict` | All Roles (JWT) | Feed aktivitas sync terbaru (INSERT/UPDATE_OVERWRITE/REJECT_STALE); `category=conflict` memfilter konflik saja |
| **Analytics** | `GET` | `/api/v1/analytics/tph-status` | All Roles (JWT) | Status real-time semua TPH: harvest terakhir, elapsed hours, stage restan (NORMAL/WARNING_12H/CRITICAL_20H/RESTAN_OVERDUE), estimasi FFA |

> **Catatan keamanan:** Seluruh endpoint modul `analytics/*` dan `restan/*` dilindungi `JwtAuthGuard` (header `Authorization: Bearer <token>` dari `POST /auth/login`). Endpoint `master/*` dan `sync/batch` sengaja **tidak** dilindungi untuk mendukung mobile offline & stress test.

---

## 2. Format Amplop Standard Respons API (Envelope Response)

### A. Respons Sukses (`HTTP 200 / 201`)
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operasi berhasil diproses.",
  "data": {},
  "meta": {
    "requestId": "req-98f98a87-1234",
    "timestamp": 1723850060000
  }
}
```

### B. Respons Error & Konflik (`HTTP 400 / 409 / 500`)
```json
{
  "success": false,
  "statusCode": 409,
  "errorCode": "ERR_CONFLICT_STALE_SCORE",
  "message": "Data transaksi ditolak karena data di server memiliki prioritas lebih tinggi.",
  "errorDetails": {
    "transactionId": "harv-trans-001-uuid",
    "incomingScore": "1723851000000",
    "serverWinningScore": "3723855400000",
    "winningRole": "ASISTEN"
  },
  "meta": {
    "requestId": "req-98f98a87-5678",
    "timestamp": 1723850060000
  }
}
```

---

## 3. Katalog Kode Error Domain Perkebunan

| Error Code | HTTP Status | Kategori | Keterangan & Tindakan Mobile Client |
|---|:---:|---|---|
| `ERR_AUTH_INVALID_CREDENTIALS` | 401 | Auth | NIP atau Password/PIN salah. Tampilkan alert di form login. |
| `ERR_AUTH_TOKEN_EXPIRED` | 401 | Auth | Token kadaluarsa. Picu auto refresh token atau redirect ke login. |
| `ERR_ROLE_UNAUTHORIZED` | 403 | RBAC | Role pengguna tidak memiliki wewenang untuk aksi ini. |
| `ERR_GPS_ACCURACY_LOW` | 422 | Geospatial | Akurasi GPS > 5.0 meter. Minta pengguna kalibrasi ulang. |
| `ERR_GPS_OUTSIDE_BOUNDARY` | 422 | Geospatial | Koordinat GPS berada di luar poligon blok terpilih (> toleransi 15m). |
| `ERR_CONFLICT_STALE_SCORE` | 409 | Sync | Priority score kalah dari data server. Mobile ubah status jadi stale. |
| `ERR_IDEMPOTENT_DUPLICATE` | 200 | Sync | Transaksi duplikat terdeteksi. Diterima sebagai acknowledged no-op. |
| `ERR_PAYLOAD_MALFORMED` | 400 | Validation | Tipe data JSON tidak valid / field wajib kosong. |
| `ERR_SERVER_DATABASE_FAIL` | 500 | Internal | Gagal database server. Client melakukan *Exponential Backoff Retry*. |

---

## 4. OpenAPI 3.1.0 Contract Definition (YAML)

```yaml
openapi: 3.1.0
info:
  title: SawitGO (AgriSync) Ingestion & Plantation Management API
  version: 1.0.0
  description: >
    API Contract untuk sinkronisasi offline-first, resolusi konflik RBAC 5 jenjang,
    monitoring restan TBS, dan ketertelusuran spasial EUDR/RSPO.
servers:
  - url: https://api.sawitgo.cwe.ac.id/api/v1
    description: Production Environment
  - url: http://localhost:3000/api/v1
    description: Development Environment

paths:
  /auth/login:
    post:
      summary: Login dan Autentikasi Pengguna
      tags: [Auth]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [nip, password]
              properties:
                nip:
                  type: string
                  example: "202515026"
                password:
                  type: string
                  example: "RahasiaKebun2026!"
      responses:
        '200':
          description: Login berhasil
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthSuccessResponse'
        '401':
          description: Kredensial tidak valid

  /sync/batch:
    post:
      summary: Ingestion Batch Sinkronisasi Data Panen Lapangan
      tags: [Sync Engine]
      security:
        - BearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [deviceId, syncTimestamp, records]
              properties:
                deviceId:
                  type: string
                  example: "SAMSUNG-A05-DEVICE-01"
                syncTimestamp:
                  type: integer
                  format: int64
                  example: 1723850060000
                records:
                  type: array
                  items:
                    $ref: '#/components/schemas/HarvestPayloadItem'
      responses:
        '200':
          description: Batch diproses
          content:
            application/json:
              schema:
                type: object
                properties:
                  totalReceived:
                    type: integer
                    example: 5
                  successCount:
                    type: integer
                    example: 4
                  conflictCount:
                    type: integer
                    example: 1
                  processedItems:
                    type: array
                    items:
                      $ref: '#/components/schemas/SyncItemResult'

components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  schemas:
    AuthSuccessResponse:
      type: object
      properties:
        accessToken:
          type: string
        user:
          type: object
          properties:
            id:
              type: string
              format: uuid
            nip:
              type: string
            fullName:
              type: string
            role:
              type: string
              enum: [MANAGER, ASKEP, ASISTEN, MANDOR, KRANI]
            roleWeight:
              type: integer
              example: 3
            assignedAfdelingId:
              type: string
              format: uuid

    HarvestPayloadItem:
      type: object
      required:
        - id
        - tphId
        - blockId
        - harvestDate
        - janjangCount
        - brondolanWeightKg
        - clientTimestampMs
        - priorityScore
        - idempotencyKey
        - location
      properties:
        id:
          type: string
          format: uuid
        tphId:
          type: string
          format: uuid
        blockId:
          type: string
          format: uuid
        harvestDate:
          type: string
          format: date
        janjangCount:
          type: integer
        brondolanWeightKg:
          type: number
        mentahCount:
          type: integer
        masakCount:
          type: integer
        lewatMasakCount:
          type: integer
        tangkaiPanjangCount:
          type: integer
        clientTimestampMs:
          type: integer
          format: int64
        priorityScore:
          type: integer
          format: int64
        idempotencyKey:
          type: string
        location:
          type: object
          properties:
            latitude:
              type: number
            longitude:
              type: number
            accuracy:
              type: number

    SyncItemResult:
      type: object
      properties:
        id:
          type: string
          format: uuid
        status:
          type: string
          enum: [ACCEPTED_NEW, ACCEPTED_OVERWRITE, REJECTED_STALE, IGNORED_IDEMPOTENT]
        httpStatus:
          type: integer
        message:
          type: string
        winningScore:
          type: integer
          format: int64
```
