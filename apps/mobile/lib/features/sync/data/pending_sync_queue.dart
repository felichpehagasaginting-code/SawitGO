import 'package:isar/isar.dart';

part 'pending_sync_queue.g.dart';

@collection
class PendingSyncQueue {
  Id localId = Isar.autoIncrement;

  @Index(unique: true)
  late String harvestLogServerId;

  late String httpMethod; // 'POST' or 'PUT'
  late String endpoint; // '/api/v1/sync/batch'

  late String payloadJson; // AES-256 Encrypted on disk

  int retryCount = 0;
  String? lastErrorMessage;
  DateTime createdAt = DateTime.now();
  DateTime? lastAttemptAt;
}
