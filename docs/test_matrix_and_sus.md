# MATRIKS PENGUJIAN, SIMULASI BLANKSPOT & SKENARIO UAT (SUS)
## Proyek: SawitGO (AgriSync) - QA Test Cases & Usability Verification
**Versi:** 1.0.0  
**Status:** Single Source of Truth (SSOT) - Fase 0  
**Tanggal:** 17 Agustus 2026

---

## 1. Matriks Kasus Uji Laboratorium (Lab & Stress Test Matrix)

| Test ID | Kategori | Skenario Pengujian | Input / Kondisi | Ekspektasi Hasil | Kriteria Lolos (Pass Target) |
|---|---|---|---|---|---|
| **TC-SYNC-01** | Offline Storage | Input panen saat Airplane Mode (No Sinyal) | 100 Record Panen | Tersimpan aman di Isar DB lokal terenkripsi, antrian `pending_syncs` bertambah 100 | Data Loss = 0% |
| **TC-SYNC-02** | Store & Forward | Mengaktifkan koneksi setelah 100 record diinput offline | Koneksi Wi-Fi ON | Sync engine otomatis mengirim batch (50 per payload) ke server | Sync Success Rate $\ge 98\%$, Latensi $< 5$s |
| **TC-CONF-01** | Conflict (Role) | Krani (Weight 1) & Asisten (Weight 3) mengedit record yang sama secara offline | Krani: 100 Janjang, Asisten: 95 Janjang | Server menerima keduanya, data Asisten menjadi pemenang (*Winning Data*) | Data Asisten tersimpan di DB, Krani mendapat status 409 |
| **TC-CONF-02** | Conflict (Time) | Dua Mandor (Weight 2) mengedit transaksi sama di selisih waktu 5 detik | Mandor A ($T_1$), Mandor B ($T_2 > T_1$) | Data Mandor B memenangkan konsensus (*Timestamp Tie-Breaker*) | Transaksi Mandor B tersimpan |
| **TC-GEO-01** | Geolocation | Input panen di luar batas poligon blok (> 15 meter) | Lat/Long di afdeling lain | Aplikasi menampilkan warning red zone / block boundary alert | Mencegah anomali EUDR |
| **TC-SEC-01** | Keamanan Data | Membaca file database Isar di storage flash tanpa master key | Root/File Explorer inspection | Seluruh teks transaksi terenkripsi ciphertext AES-256 | Plaintext kebocoran 0% |

---

## 2. Kuesioner System Usability Scale (SUS) Standar (20 Responden)

Target Pengujian: 20 Pengguna Riil Lapangan (1 Manager, 2 Askep, 3 Asisten Afdeling, 5 Mandor, 9 Krani).  
Target Skor: **$\ge 70$ (Kategori Good/Acceptable)**.

Skala: **1 = Sangat Tidak Setuju (STS)** hingga **5 = Sangat Setuju (SS)**.

| No | Pernyataan Kuesioner SUS (Bahasa Indonesia) | Tipe |
|:---:|---|:---:|
| 1 | Saya merasa akan sering menggunakan aplikasi SawitGO ini dalam pekerjaan harian di kebun. | Positif (+) |
| 2 | Saya merasa aplikasi ini terlalu rumit untuk digunakan di lapangan. | Negatif (-) |
| 3 | Saya merasa aplikasi ini mudah digunakan meskipun tanpa jaringan internet (blankspot). | Positif (+) |
| 4 | Saya merasa membutuhkan bantuan teknisi atau orang lain untuk dapat menggunakan aplikasi ini. | Negatif (-) |
| 5 | Saya merasa berbagai fitur (pencatatan panen, peta TPH, dan sinkronisasi) terintegrasi dengan sangat baik. | Positif (+) |
| 6 | Saya merasa ada terlalu banyak hal yang tidak konsisten dalam aplikasi ini. | Negatif (-) |
| 7 | Saya merasa para mandor dan krani dapat mempelajari aplikasi ini dengan sangat cepat. | Positif (+) |
| 8 | Saya merasa aplikasi ini sangat membingungkan saat digunakan di bawah terik matahari kebun. | Negatif (-) |
| 9 | Saya merasa sangat percaya diri menggunakan aplikasi ini saat mendata hasil panen sawit. | Positif (+) |
| 10 | Saya perlu membiasakan diri terlebih dahulu sebelum saya dapat menguasai aplikasi ini. | Negatif (-) |

### Formula Perhitungan Skor SUS:
- Untuk pertanyaan bernomor **ganjil** (1, 3, 5, 7, 9): $\text{Skor Item} = \text{Skor Responden} - 1$
- Untuk pertanyaan bernomor **genap** (2, 4, 6, 8, 10): $\text{Skor Item} = 5 - \text{Skor Responden}$
- Total Skor SUS Responden:
  $$\mathbf{Skor\ SUS} = \left(\sum_{i=1}^{10} \text{Skor Item}_i\right) \times 2.5$$
  *(Rentang nilai: 0 – 100)*.
