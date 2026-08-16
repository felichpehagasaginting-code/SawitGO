# 10 REKOMENDASI PERSIAPAN FASE 0 (PRIORITAS TINGGI KE RENDAH)
## Proyek: SawitGO (AgriSync) - Riset BPDPKS 2026-2027
**Versi:** 1.0.0  
**Tanggal:** 17 Agustus 2026  
**Penulis:** Felich Pehagasa Ginting (Technical Lead & System Architect)

---

Berikut adalah **10 Rekomendasi Persiapan Fase 0** yang diurutkan berdasarkan skala prioritas tertinggi (kritis) hingga pendukung, untuk memastikan fondasi riset dan rekayasa perangkat lunak bebas halusinasi dan siap diaudit:

---

### 🔴 PRIORITAS 1: KRITIS (Fondasi Teknis & Lingkungan Kerja)

#### 1. Keputusan Struktur Repositori (*Monorepo vs Multi-Repo*) & Konvensi Branching
- **Urgensi**: Kritis sebelum scaffolding dimulai.
- **Rekomendasi**: Gunakan pendekatan **Monorepo** dalam satu repo `SawitGO` dengan struktur folder terpisah:
  - `/apps/mobile` (Flutter Android)
  - `/apps/backend` (NestJS API & PostGIS)
  - `/apps/web` (Executive Dashboard Next.js / React)
  - `/packages/shared-types` (DTO & Enum RBAC bersama)
- **Konvensi Git**: Gunakan *Git Flow* standar (`main`, `develop`, `feature/*`, `fix/*`) dan *Conventional Commits* (`feat:`, `fix:`, `docs:`, `test:`).

#### 2. Matriks Kompatibilitas Versi Dependensi (*Dependency Lockfile & Tech Stack Matrix*)
- **Urgensi**: Mencegah *breaking changes* dan *dependency hell* saat tim multi-developer menginstal library.
- **Rekomendasi**: Kunci versi spesifik:
  - **Flutter SDK**: 3.22.x / 3.24.x + **Dart**: 3.4.x / 3.5.x
  - **Isar DB**: `v3.1.0+1` (dengan `isar_flutter_libs` & `path_provider`)
  - **Node.js**: `v20 LTS (Iron)` + **NestJS**: `v10.x`
  - **PostgreSQL**: `16.x` + **PostGIS Extension**: `3.4.x`
  - **TypeORM**: `0.3.x`

#### 3. Standar Format Payload JSON, Kode Error HTTP & Respon Global (*API Error Catalog*)
- **Urgensi**: Mencegah miskomunikasi data antara mobile client dan server saat sinyal putus-nyambung.
- **Rekomendasi**: Standarisasi format respon JSON seragam:
  - Format Sukses: `{ "success": true, "statusCode": 200, "data": {...}, "timestamp": 1723850000000 }`
  - Format Gagal/Konflik: `{ "success": false, "statusCode": 409, "errorCode": "ERR_CONFLICT_STALE_SCORE", "message": "...", "conflictDetails": {...} }`
  - Buat katalog tabel kode error: `ERR_GPS_ACCURACY_LOW`, `ERR_IDEMPOTENT_DUPLICATE`, `ERR_ROLE_UNAUTHORIZED`.

---

### 🟡 PRIORITAS 2: SANGAT TINGGI (Desain Antarmuka & Skenario Lapangan)

#### 4. Design System, Design Tokens & UI Wireframe Lapangan (*High-Contrast Mode*)
- **Urgensi**: Kondisi lapangan perkebunan sawit memiliki tantangan terik sinar matahari (*sunlight glare*), debu, dan pengguna ber-sarung tangan.
- **Rekomendasi**:
  - Warna: Gunakan palet kontras tinggi (Dark Green `#1B4D3E`, Safety Orange `#FF6F00`, Warning Red `#D32F2F`, White Card `#FFFFFF`).
  - Tipografi & Target Sentuh: Minimal font size `16sp` dan ukuran tombol minimal `48x48 dp` agar mudah ditekan oleh Mandor/Krani di lapangan.
  - Sediakan status badge visual yang jelas: 🔴 *Offline (Antrean: 5)*, 🟡 *Menyinkronkan...*, 🟢 *Tersinkronisasi*.

#### 5. Dokumen Formula Perhitungan Bisnis Kebun Sawit (*Business Domain Logic Spec*)
- **Urgensi**: Menghindari kesalahan rumus estimasi panen dan kenaikan Asam Lemak Bebas (FFA).
- **Rekomendasi**: Rumuskan secara tertulis:
  - **Berat Janjang Rata-Rata (BJR)**: $\text{Estimasi Tonase (Kg)} = \text{Jumlah Janjang} \times \text{BJR Blok}$ (misal BJR tahun tanam 2017 = 18.5 kg).
  - **Formula Degradasi FFA Restan**: $\text{FFA}_{\text{est}} = \text{FFA}_{\text{base}} (1.5\%) + (0.15\% \times \max(0, \text{Waktu Jam} - 24))$.
  - **Pinalti Mutu Buah**: Ambang batas toleransi buah mentah $\le 2\%$, tangkai panjang $\le 1\%$.

#### 6. Manajemen Kredensial, Template Environment & Secret Management (`.env.example`)
- **Urgensi**: Keamanan kunci API dan konfigurasi database sebelum kode dibagikan ke anggota tim atau GitHub publik.
- **Rekomendasi**:
  - Buat `.env.example` untuk backend (DB Port, JWT Secret, Master Salt, PostGIS Host).
  - Buat `lib/config/env.dart` di Flutter menggunakan `flutter_dotenv` untuk environment *dev*, *staging*, dan *production*.
  - Pastikan kunci enkripsi AES tidak pernah ditulis di `.env` melainkan di-generate langsung ke *Android Keystore*.

---

### 🟢 PRIORITAS 3: PENDUKUNG RISET & TKT 5 (Validasi, Legalitas & Kesiapan Publikasi)

#### 7. Perjanjian Akses Lahan Kebun Mitra & Surat Izin Pengambilan Data (*MoU/LoI Mitra CWE*)
- **Urgensi**: Fondasi legalitas pengujian lapangan (TKT 5) dan etika penelitian riset BPDPKS.
- **Rekomendasi**:
  - Siapkan draf *Letter of Intent (LoI)* atau surat izin pengambilan data kebun contoh Politeknik CWE / Kebun Mitra (Bekasi/Riau).
  - Siapkan *Informed Consent Form* (Persetujuan Responden) untuk 20 responden UAT (Manager, Askep, Asisten, Mandor, Krani) sesuai etika riset ilmiah.

#### 8. Skrip Mock Generator Data Transaksi Panen Skala Besar (*Synthetic Data Generator*)
- **Urgensi**: Uji performa algoritma resolusi konflik sebelum terjun ke kebun fisik.
- **Rekomendasi**:
  - Buat skrip Python sederhana (`scripts/generate_mock_harvest.py`) yang mampu menghasilkan 1.000 hingga 10.000 baris data simulasi transaksi panen beserta koordinat GPS acak di dalam poligon blok CWE untuk pengujian beban (*stress testing*).

#### 9. Pipeline CI/CD Dasar & Standard Linter / Formatter (*Quality Gate*)
- **Urgensi**: Menjaga kualitas kode 5 anggota mahasiswa periset agar seragam dan bebas bug sintaks.
- **Rekomendasi**:
  - Backend: Setup `eslint`, `prettier`, dan script `npm run test` di GitHub Actions.
  - Mobile: Setup `flutter_lints` / `very_good_analysis` dan `flutter analyze`.

#### 10. Template Artikel Ilmiah Jurnal SINTA & Logbook Riset 6 Bulan
- **Urgensi**: Memastikan luaran wajib artikel SINTA 3/4 dan laporan kemajuan BPDPKS tersusun paralel sejak hari pertama.
- **Rekomendasi**:
  - Siapkan folder `/docs/publication/` berisi template IMRAD (*Introduction, Method, Result, and Discussion*).
  - Buat template logbook mingguan riset untuk mencatat metrik latensi, sync success rate, dan kalkulasi skor SUS per sprint.
