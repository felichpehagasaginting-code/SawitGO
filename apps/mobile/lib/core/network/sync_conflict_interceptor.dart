import 'package:dio/dio.dart';

class SyncConflictInterceptor extends Interceptor {
  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    if (err.response?.statusCode == 409) {
      // 409 Conflict: Server menolak payload karena data server memiliki priority score lebih tinggi.
      // Ubah error menjadi response terkontrol agar sync engine dapat memperbarui state lokal
      final responseData = err.response?.data;
      final customResponse = Response(
        requestOptions: err.requestOptions,
        statusCode: 409,
        data: responseData,
        statusMessage: 'Conflict Resolved: Server winning data acknowledged',
      );
      return handler.resolve(customResponse);
    }
    super.onError(err, handler);
  }
}
