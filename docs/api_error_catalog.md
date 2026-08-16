# KATALOG STANDAR RESPONS API & KODE ERROR GLOBAL
## Proyek: SawitGO (AgriSync) - Unified API Error & Response Standards
**Versi:** 1.0.0  
**Tanggal:** 17 Agustus 2026

---

## 1. Format Standard Respons API (Envelope Schema)

Setiap endpoint HTTP di SawitGO mengembalikan amplop data yang seragam:

### A. Format Respons Sukses (`HTTP 200 / 201`)
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Sinkronisasi batch berhasil diproses.",
  "data": {
    "totalReceived": 2,
    "successCount": 2,
    "conflictCount": 0,
    "items": []
  },
  "meta": {
    "requestId": "req-98f98a87-1234",
    "timestamp": 1723850060000
  }
}
```

### B. Format Respons Error / Konflik (`HTTP 400 / 409 / 500`)
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

## 2. Katalog Kode Error Domain Perkebunan

| Error Code | HTTP Status | Kategori | Keterangan & Tindakan Mobile Client |
|---|:---:|---|---|
| `ERR_AUTH_INVALID_CREDENTIALS` | 401 | Auth | NIP atau Password/PIN salah. Tampilkan alert di form login. |
| `ERR_AUTH_TOKEN_EXPIRED` | 401 | Auth | Token kadaluarsa. Picu auto refresh token atau redirect ke login. |
| `ERR_ROLE_UNAUTHORIZED` | 403 | RBAC | Role pengguna tidak memiliki wewenang untuk aksi ini (misal Krani mencoba verifikasi). |
| `ERR_GPS_ACCURACY_LOW` | 422 | Geospatial | Akurasi GPS > 5.0 meter. Minta pengguna kalibrasi ulang atau ke area terbuka. |
| `ERR_GPS_OUTSIDE_BOUNDARY` | 422 | Geospatial | Koordinat GPS berada di luar poligon blok terpilih (> toleransi 15m). |
| `ERR_CONFLICT_STALE_SCORE` | 409 | Sync | Priority score kiriman kalah dari data server. Mobile mengupdate state lokal menjadi ditarik/stale. |
| `ERR_IDEMPOTENT_DUPLICATE` | 200 / 409 | Sync | Transaksi yang sama dikirim ulang. Diterima sebagai acknowledged no-op. |
| `ERR_PAYLOAD_MALFORMED` | 400 | Data Validation | Tipe data JSON tidak valid / field wajib kosong. |
| `ERR_SERVER_DATABASE_FAIL` | 500 | Internal | Kesalahan koneksi PostgreSQL. Client melakukan *Exponential Backoff Retry*. |
