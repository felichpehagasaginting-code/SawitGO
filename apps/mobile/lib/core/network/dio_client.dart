import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class DioClient {
  static DioClient? _instance;
  late final Dio dio;

  DioClient._internal() {
    String baseUrl = 'http://10.0.2.2:3000/api/v1';
    try {
      if (dotenv.isInitialized) {
        baseUrl = dotenv.env['API_BASE_URL'] ?? baseUrl;
      }
    } catch (_) {
      // Fallback default baseUrl if dotenv is not loaded
    }

    dio = Dio(
      BaseOptions(
        baseUrl: baseUrl,
        connectTimeout: const Duration(seconds: 15),
        receiveTimeout: const Duration(seconds: 15),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      ),
    );
  }

  static DioClient get instance {
    _instance ??= DioClient._internal();
    return _instance!;
  }
}
