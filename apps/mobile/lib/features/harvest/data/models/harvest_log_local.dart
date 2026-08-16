import 'package:isar/isar.dart';

part 'harvest_log_local.g.dart';

@collection
class LocalHarvestLog {
  Id localId = Isar.autoIncrement;

  @Index(unique: true, replace: true)
  late String serverId; // UUIDv4 generated on client

  @Index()
  late String tphId;

  late String blockId;
  late String blockCode;
  late String tphNumber;

  late String userId;
  late String userName;
  late int userRoleWeight; // 1 to 5

  late DateTime harvestDate;
  late int janjangCount;
  late double brondolanWeightKg;
  late double estimatedWeightKg;

  late int mentahCount;
  late int masakCount;
  late int lewatMasakCount;
  late int tangkaiPanjangCount;

  late double latitude;
  late double longitude;
  late double gpsAccuracy;

  @Index()
  late int clientTimestampMs;

  @Index()
  late int priorityScore;

  late String idempotencyKey;

  @Index()
  late bool isSynced; // false: in queue, true: sent to server

  late String syncStatus; // 'QUEUED', 'SYNCED', 'CONFLICT_RESOLVED', 'REJECTED'

  late DateTime createdAt;
  late DateTime updatedAt;
}
