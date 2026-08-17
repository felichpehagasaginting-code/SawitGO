class RoleWeights {
  static const int manager = 5;
  static const int askep = 4;
  static const int kepalaAfdeling = 4;
  static const int asisten = 3;
  static const int mandor = 2;
  static const int krani = 1;

  static const int roleMultiplier = 1000000000000; // 10^12

  static int getWeight(String role) {
    switch (role.toUpperCase()) {
      case 'MANAGER':
        return manager;
      case 'ASKEP':
      case 'KEPALA_AFDELING':
        return askep;
      case 'ASISTEN':
        return asisten;
      case 'MANDOR':
        return mandor;
      case 'KRANI':
      default:
        return krani;
    }
  }

  static int calculatePriorityScore(int roleWeight, int timestampMs) {
    return (roleWeight * roleMultiplier) + timestampMs;
  }
}
