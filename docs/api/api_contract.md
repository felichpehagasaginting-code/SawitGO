# API CONTRACT & OPENAPI 3.1 SPECIFICATION (SSOT)
## Proyek: SawitGO (AgriSync) - Offline-First Mobile & Cloud Gateway
**Versi:** 1.0.0  
**Status:** Single Source of Truth (SSOT) - Fase 0  
**Tanggal:** 17 Agustus 2026

---

## 1. Daftar Endpoint API Utama

| Modul | Method | Endpoint Path | Role Allowed | Deskripsi & Kegunaan |
|---|---|---|---|---|
| **Auth** | `POST` | `/api/v1/auth/login` | Public | Login pengguna via NIP & Password / PIN |
| **Auth** | `POST` | `/api/v1/auth/refresh` | Public | Refresh token JWT |
| **Auth** | `GET` | `/api/v1/auth/profile` | All Roles | Mengambil data sesi pengguna & assigned Afdeling/Estate |
| **Master** | `GET` | `/api/v1/master/blocks` | All Roles | Download master polygon blok & varietas sawit (offline cache) |
| **Master** | `GET` | `/api/v1/master/tph` | All Roles | Download master titik koordinat TPH & QR Code |
| **Sync** | `POST` | `/api/v1/sync/batch` | All Roles | Ingestion batch data panen offline (Core Store-and-Forward) |
| **Harvest** | `GET` | `/api/v1/harvest/daily` | All Roles | Mengambil rekapitulasi panen harian per TPH / Afdeling |
| **Harvest** | `PUT` | `/api/v1/harvest/:id/verify`| Asisten, Askep, Manager | Verifikasi dan approval resmi data panen lapangan |
| **Restan** | `GET` | `/api/v1/restan/warnings` | All Roles | Monitoring daftar TPH dengan potensi restan > 12h / > 24h |
| **Restan** | `POST`| `/api/v1/restan/:id/pickup` | Mandor, Asisten, Krani | Update status buah telah diangkut truk ke PKS |
| **Export** | `GET` | `/api/v1/analytics/eudr-geojson`| Askep, Manager | Export GeoJSON polygon & koordinat panen untuk audit EUDR/RSPO |

---

## 2. OpenAPI 3.1.0 Contract Definition (YAML)

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
          description: Login berhasil, menghasilkan JWT token & role profile
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthSuccessResponse'
        '401':
          description: Kredensial tidak valid

  /sync/batch:
    post:
      summary: Ingestion Batch Sinkronisasi Data Panen Lapangan
      description: >
        Endpoint utama penampung data offline dari Flutter Local Sync Engine.
        Mengevaluasi Priority Score untuk setiap record.
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
          description: Batch diproses. Berisi daftar record yang sukses dan konflik yang ditolak.
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

  /restan/warnings:
    get:
      summary: Ambil Data TPH dengan Potensi Restan TBS
      tags: [Restan Monitoring]
      security:
        - BearerAuth: []
      parameters:
        - name: estateId
          in: query
          required: false
          schema:
            type: string
            format: uuid
        - name: minHours
          in: query
          required: false
          schema:
            type: integer
            default: 12
      responses:
        '200':
          description: Daftar TPH yang belum terangkut dengan risiko kenaikan FFA

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
          example: "a8098c1a-f86e-11da-bd1a-00112444be1e"
        tphId:
          type: string
          format: uuid
        blockId:
          type: string
          format: uuid
        harvestDate:
          type: string
          format: date
          example: "2026-08-17"
        janjangCount:
          type: integer
          example: 120
        brondolanWeightKg:
          type: number
          format: float
          example: 45.5
        mentahCount:
          type: integer
          example: 2
        masakCount:
          type: integer
          example: 115
        lewatMasakCount:
          type: integer
          example: 3
        tangkaiPanjangCount:
          type: integer
          example: 0
        clientTimestampMs:
          type: integer
          format: int64
          example: 1723850000000
        priorityScore:
          type: integer
          format: int64
          example: 1723851000000
        idempotencyKey:
          type: string
          example: "IDEMP-UUID-1723850000000"
        location:
          type: object
          required: [latitude, longitude, accuracy]
          properties:
            latitude:
              type: number
              example: 0.5386
            longitude:
              type: number
              example: 101.4485
            accuracy:
              type: number
              example: 3.2

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
          example: 200
        message:
          type: string
        winningScore:
          type: integer
          format: int64
```
