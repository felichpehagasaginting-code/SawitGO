import 'dart:convert';
import 'dart:typed_data';
import 'package:encrypt/encrypt.dart' as enc;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class LocalCryptoService {
  static const _storage = FlutterSecureStorage();
  static const _keyAlias = 'SAWITGO_LOCAL_MASTER_KEY_V1';
  static String? _memoryFallbackKey;

  static Future<enc.Key> getOrCreateMasterKey() async {
    try {
      String? base64Key = await _storage.read(key: _keyAlias);
      if (base64Key == null) {
        final key = enc.Key.fromSecureRandom(32);
        try {
          await _storage.write(key: _keyAlias, value: key.base64);
        } catch (_) {
          _memoryFallbackKey = key.base64;
        }
        return key;
      }
      return enc.Key.fromBase64(base64Key);
    } catch (_) {
      // Fallback in-memory jika platform storage tidak tersedia (e.g. Windows dev / web)
      _memoryFallbackKey ??= enc.Key.fromSecureRandom(32).base64;
      return enc.Key.fromBase64(_memoryFallbackKey!);
    }
  }

  static Future<String> encryptPayload(String plainText) async {
    final key = await getOrCreateMasterKey();
    final iv = enc.IV.fromSecureRandom(16);
    final encrypter = enc.Encrypter(enc.AES(key, mode: enc.AESMode.cbc));

    final encrypted = encrypter.encrypt(plainText, iv: iv);
    final combined = iv.bytes + encrypted.bytes;
    return base64Encode(combined);
  }

  static Future<String> decryptPayload(String base64Combined) async {
    final key = await getOrCreateMasterKey();
    final allBytes = base64Decode(base64Combined);
    final ivBytes = allBytes.sublist(0, 16);
    final cipherBytes = allBytes.sublist(16);

    final iv = enc.IV(Uint8List.fromList(ivBytes));
    final encrypter = enc.Encrypter(enc.AES(key, mode: enc.AESMode.cbc));

    return encrypter.decrypt(enc.Encrypted(Uint8List.fromList(cipherBytes)), iv: iv);
  }
}
