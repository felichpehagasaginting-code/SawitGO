import 'package:equatable/equatable.dart';

abstract class SyncEvent extends Equatable {
  const SyncEvent();
  @override
  List<Object?> get props => [];
}

class TriggerAutoSyncEvent extends SyncEvent {
  final String deviceId;
  const TriggerAutoSyncEvent(this.deviceId);

  @override
  List<Object?> get props => [deviceId];
}

class ManualSyncRequestedEvent extends SyncEvent {
  final String deviceId;
  const ManualSyncRequestedEvent(this.deviceId);

  @override
  List<Object?> get props => [deviceId];
}
