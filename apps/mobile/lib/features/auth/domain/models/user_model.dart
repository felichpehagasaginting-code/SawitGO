import 'package:equatable/equatable.dart';

class UserModel extends Equatable {
  final String id;
  final String nip;
  final String fullName;
  final String email;
  final String role;
  final int roleWeight;
  final String? assignedEstateId;
  final String? assignedAfdelingId;
  final String? token;

  const UserModel({
    required this.id,
    required this.nip,
    required this.fullName,
    required this.email,
    required this.role,
    required this.roleWeight,
    this.assignedEstateId,
    this.assignedAfdelingId,
    this.token,
  });

  factory UserModel.fromJson(Map<String, dynamic> json, {String? token}) {
    return UserModel(
      id: json['id'] as String? ?? '',
      nip: json['nip'] as String? ?? '',
      fullName: json['fullName'] as String? ?? (json['full_name'] as String? ?? ''),
      email: json['email'] as String? ?? '',
      role: json['role'] as String? ?? (json['role_name'] as String? ?? 'KRANI'),
      roleWeight: (json['roleWeight'] as num?)?.toInt() ?? 
                  (json['role_weight'] as num?)?.toInt() ?? 1,
      assignedEstateId: json['assignedEstateId'] as String? ?? json['assigned_estate_id'] as String?,
      assignedAfdelingId: json['assignedAfdelingId'] as String? ?? json['assigned_afdeling_id'] as String?,
      token: token ?? json['token'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nip': nip,
      'fullName': fullName,
      'email': email,
      'role': role,
      'roleWeight': roleWeight,
      'assignedEstateId': assignedEstateId,
      'assignedAfdelingId': assignedAfdelingId,
      'token': token,
    };
  }

  UserModel copyWith({
    String? id,
    String? nip,
    String? fullName,
    String? email,
    String? role,
    int? roleWeight,
    String? assignedEstateId,
    String? assignedAfdelingId,
    String? token,
  }) {
    return UserModel(
      id: id ?? this.id,
      nip: nip ?? this.nip,
      fullName: fullName ?? this.fullName,
      email: email ?? this.email,
      role: role ?? this.role,
      roleWeight: roleWeight ?? this.roleWeight,
      assignedEstateId: assignedEstateId ?? this.assignedEstateId,
      assignedAfdelingId: assignedAfdelingId ?? this.assignedAfdelingId,
      token: token ?? this.token,
    );
  }

  @override
  List<Object?> get props => [
        id,
        nip,
        fullName,
        email,
        role,
        roleWeight,
        assignedEstateId,
        assignedAfdelingId,
        token,
      ];
}
