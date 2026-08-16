# MATRIKS DEPENDENSI & KOMPATIBILITAS TEKNOLOGI
## Proyek: SawitGO (AgriSync) - Dependency Version Lock
**Versi:** 1.0.0  
**Tanggal:** 17 Agustus 2026

---

## 1. Lingkungan Runtime & Server
| Komponen | Versi Terkunci | Rationale / Catatan Teknis |
|---|:---:|---|
| **Node.js** | `v20.15.x LTS (Iron)` | Long-term support, kompatibilitas stabil NestJS v10 |
| **Package Manager** | `pnpm` / `npm 10.x` | Cepat & efisien untuk manajemen dependensi workspace |
| **PostgreSQL** | `16.3` | Performa query JSONB dan indeks tinggi |
| **PostGIS Extension** | `3.4.2` | Dukungan fungsi geospasial `ST_Contains`, `ST_Point`, `ST_Distance` |
| **Redis** | `7.2.x` | Idempotency locking & short-term cache |

---

## 2. Backend Stack (`apps/backend`)
```json
{
  "dependencies": {
    "@nestjs/common": "^10.3.8",
    "@nestjs/core": "^10.3.8",
    "@nestjs/platform-express": "^10.3.8",
    "@nestjs/typeorm": "^10.0.2",
    "@nestjs/jwt": "^10.2.0",
    "@nestjs/passport": "^10.0.3",
    "@nestjs/swagger": "^7.3.1",
    "@nestjs/config": "^3.2.2",
    "typeorm": "^0.3.20",
    "pg": "^8.11.5",
    "bcrypt": "^5.1.1",
    "class-validator": "^0.14.1",
    "class-transformer": "^0.5.1",
    "ioredis": "^5.4.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.3.2",
    "@nestjs/testing": "^10.3.8",
    "@types/node": "^20.12.7",
    "typescript": "^5.4.5",
    "prettier": "^3.2.5",
    "eslint": "^8.57.0"
  }
}
```

---

## 3. Mobile Stack (`apps/mobile` - Flutter Android)
```yaml
environment:
  sdk: '>=3.4.0 <4.0.0'
  flutter: '>=3.22.0'

dependencies:
  flutter:
    sdk: flutter
  flutter_bloc: ^8.1.6
  equatable: ^2.0.5
  isar: 3.1.0+1
  isar_flutter_libs: 3.1.0+1
  path_provider: ^2.1.3
  dio: ^5.4.3+1
  connectivity_plus: ^6.0.3
  geolocator: ^12.0.0
  flutter_secure_storage: ^9.2.2
  encrypt: ^5.0.3
  uuid: ^4.4.0
  intl: ^0.19.0
  flutter_dotenv: ^5.1.0
  qr_code_scanner_plus: ^2.0.4

dev_dependencies:
  flutter_test:
    sdk: flutter
  isar_generator: 3.1.0+1
  build_runner: ^2.4.9
  flutter_lints: ^4.0.0
```
