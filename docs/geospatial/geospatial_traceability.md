# SPESIFIKASI STANDAR GEOSPATIAL & KETERTELUSURAN (EUDR/RSPO/ISPO)
## Proyek: SawitGO (AgriSync) - PostGIS & GeoJSON Spatial Verification
**Versi:** 1.0.0  
**Status:** Single Source of Truth (SSOT) - Fase 0  
**Tanggal:** 17 Agustus 2026

---

## 1. Latar Belakang Regulasi Ketertelusuran

Regulasi Deforestasi Uni Eropa (**EUDR - European Union Deforestation Regulation No 2023/1115**) serta sertifikasi **ISPO** dan **RSPO** mewajibkan setiap kilogram TBS dan minyak sawit (CPO) yang diperdagangkan dapat ditelusuri (*traceable*) hingga ke tingkat persil petak lahan asal panen (*plot level*).

### Ketentuan Teknis EUDR untuk Kelapa Sawit:
1. **Lahan $\ge$ 4 Hektar**: Wajib menyediakan **Poligon Batas Koordinat (Polygon Geolocation)** dengan minimal 6 titik desimal lintang/bujur (WGS84 / EPSG:4326).
2. **Lahan < 4 Hektar**: Diperkenankan menggunakan **Titik Pusat Koordinat (Point Geolocation)**.
3. **Tempat Pengumpulan Hasil (TPH)**: Setiap janjang TBS yang ditumpuk di TPH harus memiliki koordinat GPS tercatat dengan tingkat toleransi kesalahan akurasi **$\le$ 5.0 meter**.

---

## 2. Standar Format GeoJSON & PostGIS SRID 4326

### A. Poligon Batas Blok Panen (GeoJSON Polygon)
Disimpan di tabel PostgreSQL `blocks.boundary` dengan tipe `GEOMETRY(Polygon, 4326)`.

```json
{
  "type": "Feature",
  "id": "block-b012-uuid",
  "properties": {
    "estateCode": "EST-CWE-01",
    "afdelingCode": "AFD-A",
    "blockCode": "B012",
    "plantingYear": 2017,
    "palmVariety": "DxP Socfindo",
    "totalPalms": 2860,
    "areaHectares": 20.45,
    "isCertifiedRSPO": true,
    "isCertifiedISPO": true
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [101.445012, 0.537810],
        [101.449850, 0.537810],
        [101.449850, 0.534200],
        [101.445012, 0.534200],
        [101.445012, 0.537810]
      ]
    ]
  }
}
```

### B. Titik Koordinat TPH (GeoJSON Point)
Disimpan di tabel PostgreSQL `tph.location` dengan tipe `GEOMETRY(Point, 4326)`.

```json
{
  "type": "Feature",
  "id": "tph-b012-01-uuid",
  "properties": {
    "tphNumber": "TPH-01",
    "blockCode": "B012",
    "qrCode": "QR-CWE-EST01-B012-TPH01",
    "isActive": true
  },
  "geometry": {
    "type": "Point",
    "coordinates": [101.445200, 0.537750]
  }
}
```

---

## 3. Algoritma Validasi Spasial (*Point-in-Polygon & Proximity Check*)

Aplikasi mobile dan backend mengeksekusi validasi spasial sebelum data panen disahkan:

```mermaid
flowchart TD
    START([Input Data Panen di Lapangan]) --> GET_GPS[Flutter Geolocator baca Lat/Long]
    GET_GPS --> CHECK_ACC{Akurasi GPS <= 5.0m?}
    
    CHECK_ACC -- Tidak --> REJECT_ACC[Peringatan: Akurasi Lemah. Geser ke area terbuka] --> GET_GPS
    CHECK_ACC -- Ya --> CHECK_BLOCK{Apakah Titik Koordinat berada di dalam Poligon Blok terpilih?}
    
    CHECK_BLOCK -- Tidak (Di luar Blok) --> DIST_CALC[Hitung Jarak ke Batas Blok Terdekat]
    DIST_CALC --> CHECK_TOL{Jarak <= 15 meter toleransi buffer?}
    CHECK_TOL -- Tidak --> ALERT_FRAUD[Peringatan Anomali Lokasi: Input Ditolak!]
    CHECK_TOL -- Ya --> FLAG_WARN[Tandai Flag: 'BORDER_HARVEST']
    
    CHECK_BLOCK -- Ya (Valid di dalam Blok) --> PASS[Validasi Spasial Sukses (EUDR Verified)]
    FLAG_WARN --> PASS
    PASS --> SAVE[(Simpan Transaksi)]
```

### Query SQL PostGIS untuk Verifikasi Point-in-Polygon:
```sql
-- Validasi apakah titik GPS pencatatan (ST_SetSRID(ST_MakePoint(lng, lat), 4326))
-- berada di dalam poligon blok yang diklaim (ST_Contains)
SELECT 
    b.id AS block_id,
    b.block_code,
    ST_Contains(b.boundary, ST_SetSRID(ST_Point(:longitude, :latitude), 4326)) AS is_inside_block,
    ST_Distance(
        ST_Transform(b.boundary, 3857), 
        ST_Transform(ST_SetSRID(ST_Point(:longitude, :latitude), 4326), 3857)
    ) AS distance_meters_from_boundary
FROM blocks b
WHERE b.id = :claimed_block_id;
```
