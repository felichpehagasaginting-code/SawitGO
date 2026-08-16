import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/core/constants/role_weights.dart';

void main() {
  group('RoleWeights & Priority Score Tests', () {
    test('Role weights harus sesuai hierarki 5 jenjang perkebunan', () {
      expect(RoleWeights.getWeight('MANAGER'), equals(5));
      expect(RoleWeights.getWeight('ASKEP'), equals(4));
      expect(RoleWeights.getWeight('ASISTEN'), equals(3));
      expect(RoleWeights.getWeight('MANDOR'), equals(2));
      expect(RoleWeights.getWeight('KRANI'), equals(1));
    });

    test('Priority Score harus menghasilkan nilai deterministik', () {
      const timestamp = 1723850000000;
      final kraniScore = RoleWeights.calculatePriorityScore(1, timestamp);
      final asistenScore = RoleWeights.calculatePriorityScore(3, timestamp);

      expect(kraniScore, equals(1000000 + timestamp));
      expect(asistenScore, equals(3000000 + timestamp));
      expect(asistenScore > kraniScore, isTrue);
    });
  });
}
