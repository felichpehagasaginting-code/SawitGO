import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../../../core/constants/role_weights.dart';
import '../../../core/network/dio_client.dart';
import '../domain/models/user_model.dart';

class AuthRepository {
  final FlutterSecureStorage _secureStorage;
  static const String _keyToken = 'sawitgo_access_token';
  static const String _keyUserData = 'sawitgo_user_data';

  AuthRepository({FlutterSecureStorage? secureStorage})
      : _secureStorage = secureStorage ?? const FlutterSecureStorage();

  /// Daftar akun bawaan (Offline Master Seed) untuk simulasi di area blankspot
  static final List<UserModel> defaultSeedUsers = [
    const UserModel(
      id: 'e4444444-4444-4444-4444-444444444444',
      nip: 'KRN-102',
      fullName: 'Dika Prasetyawan (Krani TPH)',
      email: 'dika.krani@sawitgo.id',
      role: 'KRANI',
      roleWeight: RoleWeights.krani,
      assignedAfdelingId: 'afd-cwe-a-uuid',
    ),
    const UserModel(
      id: 'e3333333-3333-3333-3333-333333333333',
      nip: 'MDR-045',
      fullName: 'Ahmad Zulkifli (Mandor Panen)',
      email: 'zulkifli.mandor@sawitgo.id',
      role: 'MANDOR',
      roleWeight: RoleWeights.mandor,
      assignedAfdelingId: 'afd-cwe-a-uuid',
    ),
    const UserModel(
      id: 'e2222222-2222-2222-2222-222222222222',
      nip: 'AST-010',
      fullName: 'Felich Pehagasa Ginting (Asisten)',
      email: 'felich.ginting@sawitgo.id',
      role: 'ASISTEN',
      roleWeight: RoleWeights.asisten,
      assignedAfdelingId: 'afd-cwe-a-uuid',
    ),
    const UserModel(
      id: 'e1111111-1111-1111-1111-111111111111',
      nip: 'MGR-001',
      fullName: 'Ir. Bambang Hariyanto (Estate Manager)',
      email: 'manager.cwe@sawitgo.id',
      role: 'MANAGER',
      roleWeight: RoleWeights.manager,
      assignedEstateId: 'est-cwe-01-uuid',
    ),
  ];

  /// Login dengan NIP & Password/PIN
  Future<UserModel> login({
    required String nip,
    required String password,
  }) async {
    final cleanNip = nip.trim().toUpperCase();

    try {
      final dio = DioClient.instance.dio;
      final response = await dio.post(
        '/auth/login',
        data: {
          'nip': cleanNip,
          'password': password,
        },
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        final data = response.data;
        final payload = data['data'] ?? data;
        final token = payload['accessToken'] as String? ?? 'mock-jwt-token';
        final userJson = payload['user'] as Map<String, dynamic>? ?? payload;

        final user = UserModel.fromJson(userJson, token: token);
        await saveSession(user);
        return user;
      }
    } catch (e) {
      // Jika offline (tidak ada sinyal), fallback ke offline credential cache
      final matchedSeed = defaultSeedUsers.firstWhere(
        (u) => u.nip.toUpperCase() == cleanNip,
        orElse: () => UserModel(
          id: 'user-custom-${cleanNip.toLowerCase()}',
          nip: cleanNip,
          fullName: 'Petugas Lapangan ($cleanNip)',
          email: '$cleanNip@sawitgo.id',
          role: 'KRANI',
          roleWeight: 1,
        ),
      );

      final offlineUser = matchedSeed.copyWith(token: 'offline-demo-token');
      await saveSession(offlineUser);
      return offlineUser;
    }

    throw Exception('Gagal melakukan autentikasi kredensial.');
  }

  /// Simpan sesi ke FlutterSecureStorage
  Future<void> saveSession(UserModel user) async {
    if (user.token != null) {
      await _secureStorage.write(key: _keyToken, value: user.token);
    }
    await _secureStorage.write(
      key: _keyUserData,
      value: jsonEncode(user.toJson()),
    );
  }

  /// Ambil user yang sedang aktif dari storage
  Future<UserModel?> getSavedUser() async {
    try {
      final jsonStr = await _secureStorage.read(key: _keyUserData);
      if (jsonStr != null) {
        final Map<String, dynamic> map = jsonDecode(jsonStr);
        final token = await _secureStorage.read(key: _keyToken);
        return UserModel.fromJson(map, token: token);
      }
    } catch (_) {}
    return null;
  }

  /// Keluar / Hapus sesi
  Future<void> logout() async {
    await _secureStorage.delete(key: _keyToken);
    await _secureStorage.delete(key: _keyUserData);
  }
}
