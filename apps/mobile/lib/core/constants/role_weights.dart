class RoleWeights {
  static const int manager = 5;
  static const int askep = 4;
  static const int asisten = 3;
  static const int mandor = 2;
  static const int krani = 1;

  static int getWeight(String role) {
    switch (role.toUpperCase()) {
      case 'MANAGER':
        return manager;
      case 'ASKEP':
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
    return (roleWeight * 1000000) + timestampMs;
  }
}
