import 'package:equatable/equatable.dart';
import '../../domain/models/user_model.dart';

abstract class AuthEvent extends Equatable {
  const AuthEvent();

  @override
  List<Object?> get props => [];
}

class AuthCheckRequested extends AuthEvent {
  const AuthCheckRequested();
}

class AuthLoginSubmitted extends AuthEvent {
  final String nip;
  final String password;

  const AuthLoginSubmitted({
    required this.nip,
    required this.password,
  });

  @override
  List<Object?> get props => [nip, password];
}

class AuthQuickRoleSelected extends AuthEvent {
  final UserModel user;

  const AuthQuickRoleSelected(this.user);

  @override
  List<Object?> get props => [user];
}

class AuthLogoutRequested extends AuthEvent {
  const AuthLogoutRequested();
}
