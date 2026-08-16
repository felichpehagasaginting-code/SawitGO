# DESIGN SYSTEM & UI GUIDELINES (FIELD HIGH-CONTRAST MODE)
## Proyek: SawitGO (AgriSync) - Palm Plantation Field UI
**Versi:** 1.0.0  
**Tanggal:** 17 Agustus 2026

---

## 1. Tantangan Ergonomi Penggunaan di Lapangan
Kondisi operasional kebun kelapa sawit memiliki tantangan ekstrem:
1. **Silau Matahari Terik (*Sunlight Glare*)**: Layar smartphone sulit terbaca jika kontras rendah atau warna pastel.
2. **Keringat, Sarung Tangan & Tangan Kotor**: Target sentuh harus besar dan jarak antar tombol memadai.
3. **Status Sinyal Dinamis**: Harus ada indikator visual mencolok terkait status offline/online dan antrean sync.

---

## 2. Palet Warna Kontras Tinggi (*High-Contrast Color Palette*)

| Token Name | Hex Code | Contoh Warna | Penggunaan UI |
|---|:---:|:---:|---|
| `Primary Palm` | `#1B4D3E` | 🟩 Hijau Gelap | App Bar, Header, Tombol Utama |
| `Safety Amber` | `#FF8F00` | 🟧 Oranye Terang | Badge Peringatan, Indikator Sync Berjalan |
| `Restan Red` | `#D32F2F` | 🟥 Merah Tegas | Peringatan Restan >24 Jam, Konflik Ditolak, Akurasi GPS Buruk |
| `Success Green` | `#2E7D32` | 🟢 Hijau Sukses | Status Tersinkronisasi, Akurasi GPS Bagus (<5m) |
| `Field Surface` | `#F8FAF9` | ⬜ Putih Terang | Latar belakang aplikasi |
| `High Contrast Text` | `#121A16` | ⬛ Hitam Pekat | Teks label dan data angka janjang |
| `Card Border` | `#D1DCD6` | 🔲 Abu-Abu Garis | Border kartu data panen (Ketebalan 1.5dp) |

---

## 3. Standar Tipografi & Target Sentuh (Ergonomi Lapangan)

- **Ukuran Tombol Aksi (CTA)**: Minimal tinggi **56 dp**, lebar **100%** atau minimal **120 dp**.
- **Touch Target Padding**: Minimal jarak antar tombol **12 dp** untuk menghindari *mis-tap*.
- **Ukuran Font Angka Input**: Input Janjang & Brondolan menggunakan ukuran **32 sp - Bold** agar terbaca dari jarak 50 cm di bawah sinar matahari.
- **Label Lapangan**: Minimal font size **16 sp - Medium** (dilarang menggunakan font < 12 sp di aplikasi mobile lapangan).

---

## 4. Komponen Visual Status Sinkronisasi (Sync Status Banner)

```
+-------------------------------------------------------------+
|  🔴 OFFLINE MODE | Antrean Sync: 12 Record (Isar Encrypted) |
+-------------------------------------------------------------+
|  🟡 MENYINKRONKAN... | Mengirim Batch 1 dari 2 (50%)         |
+-------------------------------------------------------------+
|  🟢 ONLINE & TERKONEKSI | Seluruh Data Panen Sudah Sinkron  |
+-------------------------------------------------------------+
```
