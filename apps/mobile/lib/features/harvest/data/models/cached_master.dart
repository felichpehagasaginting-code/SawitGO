import 'package:isar/isar.dart';

part 'cached_master.g.dart';

@collection
class CachedBlock {
  Id localId = Isar.autoIncrement;

  @Index(unique: true)
  late String blockId;

  late String blockCode;
  late String afdelingCode;
  late int plantingYear;
  late String polygonGeoJson;
}

@collection
class CachedTPH {
  Id localId = Isar.autoIncrement;

  @Index(unique: true)
  late String tphId;

  @Index()
  late String blockId;

  late String tphNumber;
  late double latitude;
  late double longitude;
  late String qrCode;
}
