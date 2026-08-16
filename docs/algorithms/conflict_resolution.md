# RBAC 5 JENJANG & ALGORITMA RESOLUSI KONFLIK (SSOT)
## Proyek: SawitGO (AgriSync) - Weighted CRDT-Inspired Conflict Resolution
**Versi:** 1.0.0  
**Status:** Single Source of Truth (SSOT) - Fase 0  
**Tanggal:** 17 Agustus 2026

---

## 1. Matriks Hak Akses RBAC 5 Jenjang (Role Matrix)

Sistem operasi perkebunan kelapa sawit memiliki garis komando militeristik/hirarkis yang ketat. Oleh karena itu, bobot otoritas data (*Role Weight*) dimodelkan sebagai berikut:

| Level | Role Name | Role Weight ($W_r$) | Scope / Lingkup Kerja | Hak Akses Utama (Create/Read/Update/Verify/Delete) |
|---|---|:---:|---|---|
| **1** | **Manager** | **5** | Seluruh Kebun (Estate) | Full Access: Override data konflik, audit executive report, export EUDR/RSPO compliance |
| **2** | **Askep** (Asisten Kepala) | **4** | Multi-Afdeling (Rayon) | Verifikasi & approval data panen lintas afdeling, koreksi data asisten |
| **3** | **Asisten Afdeling** | **3** | 1 Afdeling (~600-1000 Ha) | Verifikasi lapangan, revisi data mandor/krani, monitor restan TPH per blok |
| **4** | **Mandor Panen** | **2** | 1–2 Kemandoran Panen | Input & koreksi hasil panen harian, pengecekan mutu buah (mentah/masak) |
| **5** | **Krani TPH** | **1** | Titik TPH Afdeling | Input awal pencatatan janjang & timbang brondolan di lapangan |

---

## 2. Formulasi Matematis Domain-Specific Conflict Resolution

Dalam kondisi *blankspot*, terdapat skenario di mana Krani mencatat di TPH-01 pada jam 08:00 (offline). Kemudian pada jam 09:30 saat inspeksi lapangan, Asisten Afdeling menemukan kesalahan hitung dan merevisi data tersebut (juga offline). Ketika kedua perangkat bertemu koneksi internet (misalnya di pos timbang/kantor afdeling), sistem harus menentukan data mana yang menjadi pemenang (*winning record*) tanpa menimpa data yang lebih valid secara sewenang-wenang.

### Rumus Perhitungan Nilai Prioritas (*Priority Score*):

$$\mathbf{Priority\ Score} = (W_r \times 1.000.000) + T_{ms}$$

Di mana:
- $W_r \in \{1, 2, 3, 4, 5\}$: Bobot Peran (*Role Weight*).
- $T_{ms}$: Unix Epoch Timestamp dalam satuan milidetik (*milliseconds*) saat transaksi dibuat/diedit di perangkat client ($T_{ms} \in \mathbb{Z}^+$, format `BigInt` 64-bit).
- Pengali $1.000.000$: Memastikan bobot hirarki peran menjadi penentu utama (*major component*), sedangkan timestamp menjadi penentu sekunder saat terjadi konflik antar-peran yang sama (*tie-breaker*).

---

## 3. Logika & Pseudocode Algoritma Resolusi

```typescript
/**
 * Resolusi Konflik Sinkronisasi Transaksi Panen
 * Berbasis Weighted RBAC & High-Resolution Millisecond Timestamp
 */

interface HarvestPayload {
  id: string;                    // UUIDv4 Transaksi
  tphId: string;
  blockId: string;
  userId: string;
  userRoleWeight: number;        // 1 to 5
  clientTimestampMs: bigint;     // BigInt ms
  janjangCount: number;
  brondolanWeightKg: number;
  mutuBuah: {
    mentah: number;
    masak: number;
    lewatMasak: number;
    tangkaiPanjang: number;
  };
}

function calculatePriorityScore(roleWeight: number, timestampMs: bigint): bigint {
  const ROLE_MULTIPLIER = 1_000_000n;
  return (BigInt(roleWeight) * ROLE_MULTIPLIER) + timestampMs;
}

async function resolveHarvestConflict(
  incomingData: HarvestPayload, 
  existingData: HarvestRecord | null
): Promise<SyncResolutionResult> {
  
  const incomingScore = calculatePriorityScore(
    incomingData.userRoleWeight, 
    incomingData.clientTimestampMs
  );

  // Skenario 1: Record belum pernah ada di database server (Insert Baru)
  if (!existingData) {
    await database.harvestLogs.insert({
      ...incomingData,
      priorityScore: incomingScore,
      status: 'PENDING_VERIFICATION'
    });
    
    await logAuditTrail(incomingData.id, incomingData.userId, 'INSERT', incomingScore, 'New Record');
    return { status: 'ACCEPTED_NEW', code: 201 };
  }

  // Skenario 2: Record sudah ada di database, bandingkan Priority Score
  const existingScore = existingData.priorityScore;

  if (incomingScore > existingScore) {
    // Incoming data memiliki prioritas peran lebih tinggi atau timestamp lebih baru pada peran yang sama
    await database.harvestLogs.update(existingData.id, {
      ...incomingData,
      priorityScore: incomingScore,
      updatedAt: new Date()
    });

    await logAuditTrail(
      incomingData.id, 
      incomingData.userId, 
      'UPDATE_OVERWRITE', 
      incomingScore, 
      `Overwrote existing record (Score: ${existingScore} replaced by ${incomingScore})`
    );

    return { 
      status: 'ACCEPTED_OVERWRITE', 
      code: 200, 
      previousScore: existingScore, 
      newScore: incomingScore 
    };

  } else if (incomingScore === existingScore) {
    // Idempotency: Transaksi identik dikirim ulang karena retry network
    return { status: 'IGNORED_IDEMPOTENT', code: 200 };

  } else {
    // Incoming data kalah (misal Krani mencoba menimpa data yang sudah diedit Asisten/Manager)
    await logAuditTrail(
      incomingData.id, 
      incomingData.userId, 
      'REJECT_STALE', 
      incomingScore, 
      `Rejected lower priority score (${incomingScore} vs existing ${existingScore})`
    );

    return { 
      status: 'REJECTED_STALE', 
      code: 409, 
      serverWinningData: existingData 
    };
  }
}
```

---

## 4. Contoh Kasus Nyata di Lapangan (Test Scenario)

| Kasus | Aktor 1 (Lokal) | Aktor 2 (Lokal) | Waktu Sync Server | Pemenang (Winning Record) | Penjelasan Teknis |
|---|---|---|---|---|---|
| **Kasus A: Hirarki Berbeda** | **Krani (Weight 1)** menginput 100 Janjang pada $T_1 = 1723850000000$ ($Score = 1723851000000$) | **Asisten (Weight 3)** mengkoreksi 90 Janjang pada $T_2 = 1723850060000$ ($Score = 3723850060000$) | Krani sync duluan jam 12:00, Asisten sync jam 12:05 | **Data Asisten (90 Janjang)** | Bobot Asisten ($3$) menghasilkan score 3.72T > score Krani 1.72T. Data server langsung di-*overwrite*. |
| **Kasus B: Sinyal Terbalik** | **Asisten (Weight 3)** edit data $T_2 = 1723850060000$ | **Krani (Weight 1)** input awal $T_1 = 1723850000000$ | Asisten sync duluan jam 12:00, Krani baru dapat sinyal jam 14:00 | **Data Asisten tetap menang** | Server menerima sync Krani, mendeteksi score Krani (1.72T) lebih kecil dari data tersimpan (3.72T), server menolak payload Krani dengan status 409 (Conflict/Stale). |
| **Kasus C: Role Sama (Tie-Breaker)** | **Mandor A (Weight 2)** input pada $T_1 = 1723850000000$ ($Score = 2000000 + T_1$) | **Mandor B (Weight 2)** update pada $T_2 = 1723850010000$ ($Score = 2000000 + T_2$) | Keduanya sync bersamaan | **Mandor B (Data Lebih Baru)** | Bobot sama ($W=2$), nilai $T_2 > T_1$ (selisih 10.000 ms), sehingga transaksi Mandor B yang mutakhir memenangkan konsensus. |
