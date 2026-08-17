import 'package:flutter_test/flutter_test.dart';
import 'package:encrypt/encrypt.dart' as enc;
import 'dart:convert';
import 'dart:typed_data';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  group('AES-256 Local Encryption Tests (Fase 4 Security)', () {
    final key = enc.Key.fromSecureRandom(32); // 256-bit Key
    final encrypter = enc.Encrypter(enc.AES(key, mode: enc.AESMode.cbc));

    test('Data panen plaintext harus terenkripsi menjadi ciphertext tidak terbaca', () {
      const plainText = '{"tph":"TPH-01","janjang":120,"brondolan":45.0,"mutu":{"masak":115,"mentah":2}}';
      final iv = enc.IV.fromSecureRandom(16);

      final encrypted = encrypter.encrypt(plainText, iv: iv);
      final combined = iv.bytes + encrypted.bytes;
      final cipherBase64 = base64Encode(combined);

      expect(cipherBase64, isNot(contains('TPH-01')));
      expect(cipherBase64, isNot(contains('120')));
      expect(cipherBase64.isNotEmpty, isTrue);

      // Decryption verification
      final allBytes = base64Decode(cipherBase64);
      final ivBytes = allBytes.sublist(0, 16);
      final cipherBytes = allBytes.sublist(16);

      final decrypted = encrypter.decrypt(
        enc.Encrypted(Uint8List.fromList(cipherBytes)),
        iv: enc.IV(Uint8List.fromList(ivBytes)),
      );

      expect(decrypted, equals(plainText));
    });

    test('Ciphertext tidak boleh terdekripsi jika key salah (Zero Data Leak)', () {
      const plainText = 'CONFIDENTIAL_HARVEST_RECORD';
      final iv = enc.IV.fromSecureRandom(16);
      final encrypted = encrypter.encrypt(plainText, iv: iv);

      final wrongKey = enc.Key.fromSecureRandom(32);
      final wrongEncrypter = enc.Encrypter(enc.AES(wrongKey, mode: enc.AESMode.cbc));

      expect(
        () => wrongEncrypter.decrypt(encrypted, iv: iv),
        throwsA(isA<ArgumentError>()),
      );
    });
  });
}
