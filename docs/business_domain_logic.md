# SPESIFIKASI LOGIKA BISNIS & FORMULA OPERASIONAL KEBUN SAWIT
## Proyek: SawitGO (AgriSync) - Agronomy & Quality Calculations
**Versi:** 1.0.0  
**Tanggal:** 17 Agustus 2026

---

## 1. Perhitungan Estimasi Tonase TBS (Berat Janjang Rata-Rata / BJR)

Berat riil panen di kebun dihitung dengan mengalikan jumlah janjang panen fisik dengan standar BJR blok berdasarkan umur tanaman:

$$\mathbf{Estimasi\ Berat\ (Kg)} = \text{Jumlah Janjang} \times \text{BJR}_{\text{Blok}} + \text{Berat Brondolan (Kg)}$$

### Tabel Standar Acuan BJR Berdasarkan Umur Tanaman:
| Tahun Tanam | Kategori Tanaman | Umur (Tahun) | Standar BJR (Kg/Janjang) |
|:---:|---|:---:|:---:|
| **2021 - 2023** | Tanaman Belum Menghasilkan (TBM 3) / TM 1 | 3 - 5 | 6.0 – 9.5 kg |
| **2016 - 2020** | Tanaman Menghasilkan Remaja (TM Remaja) | 6 - 10 | 12.0 – 18.5 kg |
| **2008 - 2015** | Tanaman Menghasilkan Prima (TM Prima) | 11 - 18 | 20.0 – 26.0 kg |
| **< 2008** | Tanaman Menghasilkan Tua (TM Tua) | > 18 | 24.0 – 28.0 kg |

---

## 2. Model Matematis Degradasi Mutu Restan & Estimasi FFA (*Free Fatty Acid*)

Ketika TBS ditumpuk di TPH dan tidak diangkut ke Pabrik Kelapa Sawit (PKS) dalam batas toleransi 24 jam, enzim lipase aktif memecah trigliserida menjadi Asam Lemak Bebas (FFA).

### Formulasi Estimasi FFA:
$$\mathbf{FFA}_{\text{est}}(\%) = \begin{cases} 
\text{FFA}_{\text{base}} & \text{jika } t \le 24\text{ jam} \\
\text{FFA}_{\text{base}} + \left(\alpha \times (t - 24)\right) & \text{jika } t > 24\text{ jam}
\end{cases}$$

Di mana:
- $\text{FFA}_{\text{base}} = 1.50\%$ (Kadar FFA standar panen normal).
- $t$: Total durasi sejak waktu panen di TPH dalam satuan jam.
- $\alpha = 0.15\%$ per jam (Koefisien kenaikan FFA per jam setelah lewat 24 jam).
- **Threshold Peringatan Sistem**:
  - $t \ge 12\text{ jam}$: 🟡 *Warning Restan Tahap 1* (Notifikasi ke Mandor & Supir Truk).
  - $t \ge 20\text{ jam}$: 🟠 *Warning Kritis Tahap 2* (Eskalasi ke Asisten Afdeling).
  - $t > 24\text{ jam}$: 🔴 *Restan Overdue (FFA > 5% - Pinalti Harga Ekspor CPO)*.

---

## 3. Matriks Kategori Mutu Panen & Ambang Pinalti

| Kategori Mutu Buah | Kriteria Visual Lapangan | Ambang Batas Maksimal (Toleransi Kebun) | Konsekuensi Pelanggaran |
|---|---|:---:|---|
| **Buah Masak (Ripe)** | Minimal 5 brondolan lepas di piringan | Target: $\ge 90\%$ dari total | Kualitas prima (CPO Rendemen Tinggi) |
| **Buah Mentah (Unripe)** | Warna hitam pekat, < 1 brondolan lepas | Maksimal: $\le 2.0\%$ | Pinalti potongan upah pemanen / revisi mandor |
| **Buah Lewat Masak (Overripe)** | > 50% brondolan lepas / membusuk | Maksimal: $\le 5.0\%$ | Risiko FFA naik |
| **Tangkai Panjang** | Panjang tangkai buah > 2.5 cm (berbentuk V) | Maksimal: $\le 1.0\%$ | Menyerap minyak di PKS & merusak conveyor |
| **Brondolan Tertinggal** | Brondolan tercecer di piringan/pasar pikul | Wajib dikutip bersih (0 butir) | Kehilangan rendemen CPO hingga 8% |
