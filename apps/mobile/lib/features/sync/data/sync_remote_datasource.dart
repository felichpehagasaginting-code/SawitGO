import 'dart:convert';
import 'package:dio/dio.dart';
import '../../harvest/data/models/harvest_log_local.dart';

class SyncRemoteDataSource {
  final Dio dio;

  SyncRemoteDataSource(this.dio);

  Future<Map<String, dynamic>> sendBatchSync({
    required String deviceId,
    required List<LocalHarvestLog> items,
  }) async {
    final payload = {
      'deviceId': deviceId,
      'syncTimestamp': DateTime.now().millisecondsSinceEpoch,
      'records': items.map((item) => {
        'id': item.serverId,
        'tphId': item.tphId,
        'blockId': item.blockId,
        'userId': item.userId,
        'userRoleWeight': item.userRoleWeight,
        'harvestDate': item.harvestDate.toIso8601String().split('T')[0],
        'janjangCount': item.janjangCount,
        'brondolanWeightKg': item.brondolanWeightKg,
        'mentahCount': item.mentahCount,
        'masakCount': item.masakCount,
        'lewatMasakCount': item.lewatMasakCount,
        'tangkaiPanjangCount': item.tangkaiPanjangCount,
        'clientTimestampMs': item.clientTimestampMs,
        'priorityScore': item.priorityScore,
        'idempotencyKey': item.idempotencyKey,
        'location': {
          'latitude': item.latitude,
          'longitude': item.longitude,
          'accuracy': item.gpsAccuracy,
        },
      }).toList(),
    };

    final response = await dio.post('/sync/batch', data: payload);
    if (response.data is Map<String, dynamic>) {
      return response.data;
    }
    return jsonDecode(response.data.toString());
  }
}
