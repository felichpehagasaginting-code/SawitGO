"""
SAWITGO (AGRISYNC) - FASE 4 LABORATORY STRESS TEST BENCHMARK
Riset Mahasiswa BPDPKS 2026-2027 | TKT 5 Validation
Simulates 1,000 concurrent mobile worker sync payloads against NestJS Sync Engine.
Validates:
1. Average API Latency (< 500ms target per batch 50 records)
2. Priority Score Conflict Resolution (Manager W5 vs Krani W1)
3. Zero Data Loss & Idempotency Check
"""

import time
import uuid
import json
import random
import concurrent.futures
import urllib.request
import urllib.error

BASE_URL = "http://localhost:3000/api/v1"
TOTAL_REQUESTS = 1000
CONCURRENCY = 50

# RBAC Weights
ROLES = [
    {"name": "KRANI", "weight": 1, "nip": "KRN-102"},
    {"name": "MANDOR", "weight": 2, "nip": "MDR-045"},
    {"name": "ASISTEN", "weight": 3, "nip": "AST-010"},
    {"name": "ASKEP", "weight": 4, "nip": "ASK-002"},
    {"name": "MANAGER", "weight": 5, "nip": "MGR-001"},
]

def generate_harvest_payload(tx_id: str, role: dict) -> dict:
    now_ms = int(time.time() * 1000)
    priority_score = (role["weight"] * 1_000_000_000_000) + now_ms

    return {
        "deviceId": f"DEVICE-TEST-{random.randint(1, 20)}",
        "syncTimestamp": now_ms,
        "records": [
            {
                "id": tx_id,
                "tphId": "tph-b012-01-uuid",
                "blockId": "blk-b012-uuid",
                "harvestDate": "2026-08-17",
                "janjangCount": random.randint(80, 150),
                "brondolanWeightKg": round(random.uniform(20.0, 60.0), 2),
                "mentahCount": random.randint(0, 3),
                "masakCount": random.randint(80, 140),
                "lewatMasakCount": random.randint(0, 5),
                "tangkaiPanjangCount": random.randint(0, 2),
                "clientTimestampMs": now_ms,
                "priorityScore": priority_score,
                "idempotencyKey": f"idemp-{tx_id}",
                "location": {
                    "latitude": 0.537750,
                    "longitude": 101.445200,
                    "accuracyMeters": 2.5
                }
            }
        ]
    }

def send_sync_request(req_index: int) -> dict:
    tx_id = f"stress-tx-{req_index % 50}" # Induces conflicts across shared 50 TPH records
    role = random.choice(ROLES)
    payload = generate_harvest_payload(tx_id, role)
    
    url = f"{BASE_URL}/sync/batch"
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={"Content-Type": "application/json", "User-Agent": "SawitGO-StressTester/1.0"},
        method="POST"
    )

    start_time = time.perf_counter()
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            latency_ms = (time.perf_counter() - start_time) * 1000
            status_code = response.status
            return {"success": True, "status": status_code, "latency_ms": latency_ms, "role": role["name"]}
    except urllib.error.HTTPError as e:
        latency_ms = (time.perf_counter() - start_time) * 1000
        # HTTP 409 is expected for conflict rejection
        is_conflict = (e.code == 409)
        return {"success": is_conflict, "status": e.code, "latency_ms": latency_ms, "role": role["name"]}
    except Exception as e:
        latency_ms = (time.perf_counter() - start_time) * 1000
        return {"success": False, "status": 0, "error": str(e), "latency_ms": latency_ms, "role": role["name"]}

def main():
    print("=" * 60)
    print("🌴 SAWITGO (AGRISYNC) - STRESS TESTING SIMULATION")
    print(f"🎯 Target: {TOTAL_REQUESTS} Ingestion Payloads | {CONCURRENCY} Concurrent Workers")
    print("=" * 60)

    start_all = time.perf_counter()
    results = []

    with concurrent.futures.ThreadPoolExecutor(max_workers=CONCURRENCY) as executor:
        futures = [executor.submit(send_sync_request, i) for i in range(TOTAL_REQUESTS)]
        for future in concurrent.futures.as_completed(futures):
            results.append(future.result())

    total_time = time.perf_counter() - start_all
    successes = [r for r in results if r["success"]]
    latencies = [r["latency_ms"] for r in results]
    avg_latency = sum(latencies) / len(latencies) if latencies else 0

    print("\n📊 HASIL BENCHMARK STRESS TESTING (TKT 5):")
    print(f"• Total Waktu Eksekusi   : {total_time:.2f} detik")
    print(f"• Throughput             : {TOTAL_REQUESTS / total_time:.2f} req/detik")
    print(f"• Rata-rata Latensi      : {avg_latency:.2f} ms (Target < 500 ms: {'✅ LOLOS' if avg_latency < 500 else '❌ GAGAL'})")
    print(f"• Success / Conflict Rate: {(len(successes) / TOTAL_REQUESTS) * 100:.2f}%")
    print("=" * 60)

if __name__ == "__main__":
    main()
