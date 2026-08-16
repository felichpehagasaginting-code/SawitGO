import 'package:equatable/equatable.dart';

abstract class SyncState extends Equatable {
  const SyncState();
  @override
  List<Object?> get props => [];
}

class SyncIdleState extends SyncState {
  final int pendingCount;
  const SyncIdleState({this.pendingCount = 0});

  @override
  List<Object?> get props => [pendingCount];
}

class SyncInProgressState extends SyncState {
  final int totalRecords;
  const SyncInProgressState(this.totalRecords);

  @override
  List<Object?> get props => [totalRecords];
}

class SyncSuccessState extends SyncState {
  final int syncedCount;
  final int conflictCount;
  const SyncSuccessState({required this.syncedCount, required this.conflictCount});

  @override
  List<Object?> get props => [syncedCount, conflictCount];
}

class SyncFailureState extends SyncState {
  final String errorMessage;
  const SyncFailureState(this.errorMessage);

  @override
  List<Object?> get props => [errorMessage];
}
