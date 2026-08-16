import 'package:geolocator/geolocator.dart';

class LocationResult {
  final double latitude;
  final double longitude;
  final double accuracy;
  final bool isAccuracyValid; // true jika <= 5.0 meter
  final String? errorMessage;

  LocationResult({
    required this.latitude,
    required this.longitude,
    required this.accuracy,
    required this.isAccuracyValid,
    this.errorMessage,
  });
}

class LocationService {
  static const double maxAllowedAccuracyMeters = 5.0;

  static Future<LocationResult> getCurrentHighAccuracyPosition() async {
    bool serviceEnabled;
    LocationPermission permission;

    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      return LocationResult(
        latitude: 0.0,
        longitude: 0.0,
        accuracy: 999.0,
        isAccuracyValid: false,
        errorMessage: 'Layanan GPS di perangkat dinonaktifkan. Silakan aktifkan GPS.',
      );
    }

    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        return LocationResult(
          latitude: 0.0,
          longitude: 0.0,
          accuracy: 999.0,
          isAccuracyValid: false,
          errorMessage: 'Izin akses lokasi GPS ditolak.',
        );
      }
    }

    if (permission == LocationPermission.deniedForever) {
      return LocationResult(
        latitude: 0.0,
        longitude: 0.0,
        accuracy: 999.0,
        isAccuracyValid: false,
        errorMessage: 'Izin lokasi GPS ditolak permanen di pengaturan HP.',
      );
    }

    try {
      final position = await Geolocator.getCurrentPosition(
        locationSettings: const LocationSettings(
          accuracy: LocationAccuracy.best,
          timeLimit: Duration(seconds: 10),
        ),
      );

      final isValid = position.accuracy <= maxAllowedAccuracyMeters;

      return LocationResult(
        latitude: position.latitude,
        longitude: position.longitude,
        accuracy: position.accuracy,
        isAccuracyValid: isValid,
        errorMessage: isValid
            ? null
            : 'Akurasi GPS (${position.accuracy.toStringAsFixed(1)}m) melebihi batas 5.0m. Pindah ke area terbuka.',
      );
    } catch (e) {
      return LocationResult(
        latitude: 0.0,
        longitude: 0.0,
        accuracy: 999.0,
        isAccuracyValid: false,
        errorMessage: 'Gagal mengunci sinyal GPS satelit: $e',
      );
    }
  }
}
