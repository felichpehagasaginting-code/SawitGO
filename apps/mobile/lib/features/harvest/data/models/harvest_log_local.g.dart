// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'harvest_log_local.dart';

// **************************************************************************
// IsarCollectionGenerator
// **************************************************************************

// coverage:ignore-file
// ignore_for_file: duplicate_ignore, non_constant_identifier_names, constant_identifier_names, invalid_use_of_protected_member, unnecessary_cast, prefer_const_constructors, lines_longer_than_80_chars, require_trailing_commas, inference_failure_on_function_invocation, unnecessary_parenthesis, unnecessary_raw_strings, unnecessary_null_checks, join_return_with_assignment, prefer_final_locals, avoid_js_rounded_ints, avoid_positional_boolean_parameters, always_specify_types

extension GetLocalHarvestLogCollection on Isar {
  IsarCollection<LocalHarvestLog> get localHarvestLogs => this.collection();
}

const LocalHarvestLogSchema = CollectionSchema(
  name: r'LocalHarvestLog',
  id: -6035917960572731317,
  properties: {
    r'blockCode': PropertySchema(
      id: 0,
      name: r'blockCode',
      type: IsarType.string,
    ),
    r'blockId': PropertySchema(
      id: 1,
      name: r'blockId',
      type: IsarType.string,
    ),
    r'brondolanWeightKg': PropertySchema(
      id: 2,
      name: r'brondolanWeightKg',
      type: IsarType.double,
    ),
    r'clientTimestampMs': PropertySchema(
      id: 3,
      name: r'clientTimestampMs',
      type: IsarType.long,
    ),
    r'createdAt': PropertySchema(
      id: 4,
      name: r'createdAt',
      type: IsarType.dateTime,
    ),
    r'estimatedWeightKg': PropertySchema(
      id: 5,
      name: r'estimatedWeightKg',
      type: IsarType.double,
    ),
    r'gpsAccuracy': PropertySchema(
      id: 6,
      name: r'gpsAccuracy',
      type: IsarType.double,
    ),
    r'harvestDate': PropertySchema(
      id: 7,
      name: r'harvestDate',
      type: IsarType.dateTime,
    ),
    r'idempotencyKey': PropertySchema(
      id: 8,
      name: r'idempotencyKey',
      type: IsarType.string,
    ),
    r'isSynced': PropertySchema(
      id: 9,
      name: r'isSynced',
      type: IsarType.bool,
    ),
    r'janjangCount': PropertySchema(
      id: 10,
      name: r'janjangCount',
      type: IsarType.long,
    ),
    r'latitude': PropertySchema(
      id: 11,
      name: r'latitude',
      type: IsarType.double,
    ),
    r'lewatMasakCount': PropertySchema(
      id: 12,
      name: r'lewatMasakCount',
      type: IsarType.long,
    ),
    r'longitude': PropertySchema(
      id: 13,
      name: r'longitude',
      type: IsarType.double,
    ),
    r'masakCount': PropertySchema(
      id: 14,
      name: r'masakCount',
      type: IsarType.long,
    ),
    r'mentahCount': PropertySchema(
      id: 15,
      name: r'mentahCount',
      type: IsarType.long,
    ),
    r'priorityScore': PropertySchema(
      id: 16,
      name: r'priorityScore',
      type: IsarType.long,
    ),
    r'serverId': PropertySchema(
      id: 17,
      name: r'serverId',
      type: IsarType.string,
    ),
    r'syncStatus': PropertySchema(
      id: 18,
      name: r'syncStatus',
      type: IsarType.string,
    ),
    r'tangkaiPanjangCount': PropertySchema(
      id: 19,
      name: r'tangkaiPanjangCount',
      type: IsarType.long,
    ),
    r'tphId': PropertySchema(
      id: 20,
      name: r'tphId',
      type: IsarType.string,
    ),
    r'tphNumber': PropertySchema(
      id: 21,
      name: r'tphNumber',
      type: IsarType.string,
    ),
    r'updatedAt': PropertySchema(
      id: 22,
      name: r'updatedAt',
      type: IsarType.dateTime,
    ),
    r'userId': PropertySchema(
      id: 23,
      name: r'userId',
      type: IsarType.string,
    ),
    r'userName': PropertySchema(
      id: 24,
      name: r'userName',
      type: IsarType.string,
    ),
    r'userRoleWeight': PropertySchema(
      id: 25,
      name: r'userRoleWeight',
      type: IsarType.long,
    )
  },
  estimateSize: _localHarvestLogEstimateSize,
  serialize: _localHarvestLogSerialize,
  deserialize: _localHarvestLogDeserialize,
  deserializeProp: _localHarvestLogDeserializeProp,
  idName: r'localId',
  indexes: {
    r'serverId': IndexSchema(
      id: -7950187970872907662,
      name: r'serverId',
      unique: true,
      replace: true,
      properties: [
        IndexPropertySchema(
          name: r'serverId',
          type: IndexType.hash,
          caseSensitive: true,
        )
      ],
    ),
    r'tphId': IndexSchema(
      id: -6337004884452333292,
      name: r'tphId',
      unique: false,
      replace: false,
      properties: [
        IndexPropertySchema(
          name: r'tphId',
          type: IndexType.hash,
          caseSensitive: true,
        )
      ],
    ),
    r'clientTimestampMs': IndexSchema(
      id: -1045875766244007606,
      name: r'clientTimestampMs',
      unique: false,
      replace: false,
      properties: [
        IndexPropertySchema(
          name: r'clientTimestampMs',
          type: IndexType.value,
          caseSensitive: false,
        )
      ],
    ),
    r'priorityScore': IndexSchema(
      id: 4870691634823532450,
      name: r'priorityScore',
      unique: false,
      replace: false,
      properties: [
        IndexPropertySchema(
          name: r'priorityScore',
          type: IndexType.value,
          caseSensitive: false,
        )
      ],
    ),
    r'isSynced': IndexSchema(
      id: -39763503327887510,
      name: r'isSynced',
      unique: false,
      replace: false,
      properties: [
        IndexPropertySchema(
          name: r'isSynced',
          type: IndexType.value,
          caseSensitive: false,
        )
      ],
    )
  },
  links: {},
  embeddedSchemas: {},
  getId: _localHarvestLogGetId,
  getLinks: _localHarvestLogGetLinks,
  attach: _localHarvestLogAttach,
  version: '3.1.0+1',
);

int _localHarvestLogEstimateSize(
  LocalHarvestLog object,
  List<int> offsets,
  Map<Type, List<int>> allOffsets,
) {
  var bytesCount = offsets.last;
  bytesCount += 3 + object.blockCode.length * 3;
  bytesCount += 3 + object.blockId.length * 3;
  bytesCount += 3 + object.idempotencyKey.length * 3;
  bytesCount += 3 + object.serverId.length * 3;
  bytesCount += 3 + object.syncStatus.length * 3;
  bytesCount += 3 + object.tphId.length * 3;
  bytesCount += 3 + object.tphNumber.length * 3;
  bytesCount += 3 + object.userId.length * 3;
  bytesCount += 3 + object.userName.length * 3;
  return bytesCount;
}

void _localHarvestLogSerialize(
  LocalHarvestLog object,
  IsarWriter writer,
  List<int> offsets,
  Map<Type, List<int>> allOffsets,
) {
  writer.writeString(offsets[0], object.blockCode);
  writer.writeString(offsets[1], object.blockId);
  writer.writeDouble(offsets[2], object.brondolanWeightKg);
  writer.writeLong(offsets[3], object.clientTimestampMs);
  writer.writeDateTime(offsets[4], object.createdAt);
  writer.writeDouble(offsets[5], object.estimatedWeightKg);
  writer.writeDouble(offsets[6], object.gpsAccuracy);
  writer.writeDateTime(offsets[7], object.harvestDate);
  writer.writeString(offsets[8], object.idempotencyKey);
  writer.writeBool(offsets[9], object.isSynced);
  writer.writeLong(offsets[10], object.janjangCount);
  writer.writeDouble(offsets[11], object.latitude);
  writer.writeLong(offsets[12], object.lewatMasakCount);
  writer.writeDouble(offsets[13], object.longitude);
  writer.writeLong(offsets[14], object.masakCount);
  writer.writeLong(offsets[15], object.mentahCount);
  writer.writeLong(offsets[16], object.priorityScore);
  writer.writeString(offsets[17], object.serverId);
  writer.writeString(offsets[18], object.syncStatus);
  writer.writeLong(offsets[19], object.tangkaiPanjangCount);
  writer.writeString(offsets[20], object.tphId);
  writer.writeString(offsets[21], object.tphNumber);
  writer.writeDateTime(offsets[22], object.updatedAt);
  writer.writeString(offsets[23], object.userId);
  writer.writeString(offsets[24], object.userName);
  writer.writeLong(offsets[25], object.userRoleWeight);
}

LocalHarvestLog _localHarvestLogDeserialize(
  Id id,
  IsarReader reader,
  List<int> offsets,
  Map<Type, List<int>> allOffsets,
) {
  final object = LocalHarvestLog();
  object.blockCode = reader.readString(offsets[0]);
  object.blockId = reader.readString(offsets[1]);
  object.brondolanWeightKg = reader.readDouble(offsets[2]);
  object.clientTimestampMs = reader.readLong(offsets[3]);
  object.createdAt = reader.readDateTime(offsets[4]);
  object.estimatedWeightKg = reader.readDouble(offsets[5]);
  object.gpsAccuracy = reader.readDouble(offsets[6]);
  object.harvestDate = reader.readDateTime(offsets[7]);
  object.idempotencyKey = reader.readString(offsets[8]);
  object.isSynced = reader.readBool(offsets[9]);
  object.janjangCount = reader.readLong(offsets[10]);
  object.latitude = reader.readDouble(offsets[11]);
  object.lewatMasakCount = reader.readLong(offsets[12]);
  object.localId = id;
  object.longitude = reader.readDouble(offsets[13]);
  object.masakCount = reader.readLong(offsets[14]);
  object.mentahCount = reader.readLong(offsets[15]);
  object.priorityScore = reader.readLong(offsets[16]);
  object.serverId = reader.readString(offsets[17]);
  object.syncStatus = reader.readString(offsets[18]);
  object.tangkaiPanjangCount = reader.readLong(offsets[19]);
  object.tphId = reader.readString(offsets[20]);
  object.tphNumber = reader.readString(offsets[21]);
  object.updatedAt = reader.readDateTime(offsets[22]);
  object.userId = reader.readString(offsets[23]);
  object.userName = reader.readString(offsets[24]);
  object.userRoleWeight = reader.readLong(offsets[25]);
  return object;
}

P _localHarvestLogDeserializeProp<P>(
  IsarReader reader,
  int propertyId,
  int offset,
  Map<Type, List<int>> allOffsets,
) {
  switch (propertyId) {
    case 0:
      return (reader.readString(offset)) as P;
    case 1:
      return (reader.readString(offset)) as P;
    case 2:
      return (reader.readDouble(offset)) as P;
    case 3:
      return (reader.readLong(offset)) as P;
    case 4:
      return (reader.readDateTime(offset)) as P;
    case 5:
      return (reader.readDouble(offset)) as P;
    case 6:
      return (reader.readDouble(offset)) as P;
    case 7:
      return (reader.readDateTime(offset)) as P;
    case 8:
      return (reader.readString(offset)) as P;
    case 9:
      return (reader.readBool(offset)) as P;
    case 10:
      return (reader.readLong(offset)) as P;
    case 11:
      return (reader.readDouble(offset)) as P;
    case 12:
      return (reader.readLong(offset)) as P;
    case 13:
      return (reader.readDouble(offset)) as P;
    case 14:
      return (reader.readLong(offset)) as P;
    case 15:
      return (reader.readLong(offset)) as P;
    case 16:
      return (reader.readLong(offset)) as P;
    case 17:
      return (reader.readString(offset)) as P;
    case 18:
      return (reader.readString(offset)) as P;
    case 19:
      return (reader.readLong(offset)) as P;
    case 20:
      return (reader.readString(offset)) as P;
    case 21:
      return (reader.readString(offset)) as P;
    case 22:
      return (reader.readDateTime(offset)) as P;
    case 23:
      return (reader.readString(offset)) as P;
    case 24:
      return (reader.readString(offset)) as P;
    case 25:
      return (reader.readLong(offset)) as P;
    default:
      throw IsarError('Unknown property with id $propertyId');
  }
}

Id _localHarvestLogGetId(LocalHarvestLog object) {
  return object.localId;
}

List<IsarLinkBase<dynamic>> _localHarvestLogGetLinks(LocalHarvestLog object) {
  return [];
}

void _localHarvestLogAttach(
    IsarCollection<dynamic> col, Id id, LocalHarvestLog object) {
  object.localId = id;
}

extension LocalHarvestLogByIndex on IsarCollection<LocalHarvestLog> {
  Future<LocalHarvestLog?> getByServerId(String serverId) {
    return getByIndex(r'serverId', [serverId]);
  }

  LocalHarvestLog? getByServerIdSync(String serverId) {
    return getByIndexSync(r'serverId', [serverId]);
  }

  Future<bool> deleteByServerId(String serverId) {
    return deleteByIndex(r'serverId', [serverId]);
  }

  bool deleteByServerIdSync(String serverId) {
    return deleteByIndexSync(r'serverId', [serverId]);
  }

  Future<List<LocalHarvestLog?>> getAllByServerId(List<String> serverIdValues) {
    final values = serverIdValues.map((e) => [e]).toList();
    return getAllByIndex(r'serverId', values);
  }

  List<LocalHarvestLog?> getAllByServerIdSync(List<String> serverIdValues) {
    final values = serverIdValues.map((e) => [e]).toList();
    return getAllByIndexSync(r'serverId', values);
  }

  Future<int> deleteAllByServerId(List<String> serverIdValues) {
    final values = serverIdValues.map((e) => [e]).toList();
    return deleteAllByIndex(r'serverId', values);
  }

  int deleteAllByServerIdSync(List<String> serverIdValues) {
    final values = serverIdValues.map((e) => [e]).toList();
    return deleteAllByIndexSync(r'serverId', values);
  }

  Future<Id> putByServerId(LocalHarvestLog object) {
    return putByIndex(r'serverId', object);
  }

  Id putByServerIdSync(LocalHarvestLog object, {bool saveLinks = true}) {
    return putByIndexSync(r'serverId', object, saveLinks: saveLinks);
  }

  Future<List<Id>> putAllByServerId(List<LocalHarvestLog> objects) {
    return putAllByIndex(r'serverId', objects);
  }

  List<Id> putAllByServerIdSync(List<LocalHarvestLog> objects,
      {bool saveLinks = true}) {
    return putAllByIndexSync(r'serverId', objects, saveLinks: saveLinks);
  }
}

extension LocalHarvestLogQueryWhereSort
    on QueryBuilder<LocalHarvestLog, LocalHarvestLog, QWhere> {
  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterWhere> anyLocalId() {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(const IdWhereClause.any());
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterWhere>
      anyClientTimestampMs() {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(
        const IndexWhereClause.any(indexName: r'clientTimestampMs'),
      );
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterWhere>
      anyPriorityScore() {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(
        const IndexWhereClause.any(indexName: r'priorityScore'),
      );
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterWhere> anyIsSynced() {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(
        const IndexWhereClause.any(indexName: r'isSynced'),
      );
    });
  }
}

extension LocalHarvestLogQueryWhere
    on QueryBuilder<LocalHarvestLog, LocalHarvestLog, QWhereClause> {
  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterWhereClause>
      localIdEqualTo(Id localId) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IdWhereClause.between(
        lower: localId,
        upper: localId,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterWhereClause>
      localIdNotEqualTo(Id localId) {
    return QueryBuilder.apply(this, (query) {
      if (query.whereSort == Sort.asc) {
        return query
            .addWhereClause(
              IdWhereClause.lessThan(upper: localId, includeUpper: false),
            )
            .addWhereClause(
              IdWhereClause.greaterThan(lower: localId, includeLower: false),
            );
      } else {
        return query
            .addWhereClause(
              IdWhereClause.greaterThan(lower: localId, includeLower: false),
            )
            .addWhereClause(
              IdWhereClause.lessThan(upper: localId, includeUpper: false),
            );
      }
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterWhereClause>
      localIdGreaterThan(Id localId, {bool include = false}) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(
        IdWhereClause.greaterThan(lower: localId, includeLower: include),
      );
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterWhereClause>
      localIdLessThan(Id localId, {bool include = false}) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(
        IdWhereClause.lessThan(upper: localId, includeUpper: include),
      );
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterWhereClause>
      localIdBetween(
    Id lowerLocalId,
    Id upperLocalId, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IdWhereClause.between(
        lower: lowerLocalId,
        includeLower: includeLower,
        upper: upperLocalId,
        includeUpper: includeUpper,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterWhereClause>
      serverIdEqualTo(String serverId) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.equalTo(
        indexName: r'serverId',
        value: [serverId],
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterWhereClause>
      serverIdNotEqualTo(String serverId) {
    return QueryBuilder.apply(this, (query) {
      if (query.whereSort == Sort.asc) {
        return query
            .addWhereClause(IndexWhereClause.between(
              indexName: r'serverId',
              lower: [],
              upper: [serverId],
              includeUpper: false,
            ))
            .addWhereClause(IndexWhereClause.between(
              indexName: r'serverId',
              lower: [serverId],
              includeLower: false,
              upper: [],
            ));
      } else {
        return query
            .addWhereClause(IndexWhereClause.between(
              indexName: r'serverId',
              lower: [serverId],
              includeLower: false,
              upper: [],
            ))
            .addWhereClause(IndexWhereClause.between(
              indexName: r'serverId',
              lower: [],
              upper: [serverId],
              includeUpper: false,
            ));
      }
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterWhereClause>
      tphIdEqualTo(String tphId) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.equalTo(
        indexName: r'tphId',
        value: [tphId],
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterWhereClause>
      tphIdNotEqualTo(String tphId) {
    return QueryBuilder.apply(this, (query) {
      if (query.whereSort == Sort.asc) {
        return query
            .addWhereClause(IndexWhereClause.between(
              indexName: r'tphId',
              lower: [],
              upper: [tphId],
              includeUpper: false,
            ))
            .addWhereClause(IndexWhereClause.between(
              indexName: r'tphId',
              lower: [tphId],
              includeLower: false,
              upper: [],
            ));
      } else {
        return query
            .addWhereClause(IndexWhereClause.between(
              indexName: r'tphId',
              lower: [tphId],
              includeLower: false,
              upper: [],
            ))
            .addWhereClause(IndexWhereClause.between(
              indexName: r'tphId',
              lower: [],
              upper: [tphId],
              includeUpper: false,
            ));
      }
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterWhereClause>
      clientTimestampMsEqualTo(int clientTimestampMs) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.equalTo(
        indexName: r'clientTimestampMs',
        value: [clientTimestampMs],
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterWhereClause>
      clientTimestampMsNotEqualTo(int clientTimestampMs) {
    return QueryBuilder.apply(this, (query) {
      if (query.whereSort == Sort.asc) {
        return query
            .addWhereClause(IndexWhereClause.between(
              indexName: r'clientTimestampMs',
              lower: [],
              upper: [clientTimestampMs],
              includeUpper: false,
            ))
            .addWhereClause(IndexWhereClause.between(
              indexName: r'clientTimestampMs',
              lower: [clientTimestampMs],
              includeLower: false,
              upper: [],
            ));
      } else {
        return query
            .addWhereClause(IndexWhereClause.between(
              indexName: r'clientTimestampMs',
              lower: [clientTimestampMs],
              includeLower: false,
              upper: [],
            ))
            .addWhereClause(IndexWhereClause.between(
              indexName: r'clientTimestampMs',
              lower: [],
              upper: [clientTimestampMs],
              includeUpper: false,
            ));
      }
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterWhereClause>
      clientTimestampMsGreaterThan(
    int clientTimestampMs, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.between(
        indexName: r'clientTimestampMs',
        lower: [clientTimestampMs],
        includeLower: include,
        upper: [],
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterWhereClause>
      clientTimestampMsLessThan(
    int clientTimestampMs, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.between(
        indexName: r'clientTimestampMs',
        lower: [],
        upper: [clientTimestampMs],
        includeUpper: include,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterWhereClause>
      clientTimestampMsBetween(
    int lowerClientTimestampMs,
    int upperClientTimestampMs, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.between(
        indexName: r'clientTimestampMs',
        lower: [lowerClientTimestampMs],
        includeLower: includeLower,
        upper: [upperClientTimestampMs],
        includeUpper: includeUpper,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterWhereClause>
      priorityScoreEqualTo(int priorityScore) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.equalTo(
        indexName: r'priorityScore',
        value: [priorityScore],
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterWhereClause>
      priorityScoreNotEqualTo(int priorityScore) {
    return QueryBuilder.apply(this, (query) {
      if (query.whereSort == Sort.asc) {
        return query
            .addWhereClause(IndexWhereClause.between(
              indexName: r'priorityScore',
              lower: [],
              upper: [priorityScore],
              includeUpper: false,
            ))
            .addWhereClause(IndexWhereClause.between(
              indexName: r'priorityScore',
              lower: [priorityScore],
              includeLower: false,
              upper: [],
            ));
      } else {
        return query
            .addWhereClause(IndexWhereClause.between(
              indexName: r'priorityScore',
              lower: [priorityScore],
              includeLower: false,
              upper: [],
            ))
            .addWhereClause(IndexWhereClause.between(
              indexName: r'priorityScore',
              lower: [],
              upper: [priorityScore],
              includeUpper: false,
            ));
      }
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterWhereClause>
      priorityScoreGreaterThan(
    int priorityScore, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.between(
        indexName: r'priorityScore',
        lower: [priorityScore],
        includeLower: include,
        upper: [],
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterWhereClause>
      priorityScoreLessThan(
    int priorityScore, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.between(
        indexName: r'priorityScore',
        lower: [],
        upper: [priorityScore],
        includeUpper: include,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterWhereClause>
      priorityScoreBetween(
    int lowerPriorityScore,
    int upperPriorityScore, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.between(
        indexName: r'priorityScore',
        lower: [lowerPriorityScore],
        includeLower: includeLower,
        upper: [upperPriorityScore],
        includeUpper: includeUpper,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterWhereClause>
      isSyncedEqualTo(bool isSynced) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.equalTo(
        indexName: r'isSynced',
        value: [isSynced],
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterWhereClause>
      isSyncedNotEqualTo(bool isSynced) {
    return QueryBuilder.apply(this, (query) {
      if (query.whereSort == Sort.asc) {
        return query
            .addWhereClause(IndexWhereClause.between(
              indexName: r'isSynced',
              lower: [],
              upper: [isSynced],
              includeUpper: false,
            ))
            .addWhereClause(IndexWhereClause.between(
              indexName: r'isSynced',
              lower: [isSynced],
              includeLower: false,
              upper: [],
            ));
      } else {
        return query
            .addWhereClause(IndexWhereClause.between(
              indexName: r'isSynced',
              lower: [isSynced],
              includeLower: false,
              upper: [],
            ))
            .addWhereClause(IndexWhereClause.between(
              indexName: r'isSynced',
              lower: [],
              upper: [isSynced],
              includeUpper: false,
            ));
      }
    });
  }
}

extension LocalHarvestLogQueryFilter
    on QueryBuilder<LocalHarvestLog, LocalHarvestLog, QFilterCondition> {
  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      blockCodeEqualTo(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'blockCode',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      blockCodeGreaterThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'blockCode',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      blockCodeLessThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'blockCode',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      blockCodeBetween(
    String lower,
    String upper, {
    bool includeLower = true,
    bool includeUpper = true,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'blockCode',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      blockCodeStartsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.startsWith(
        property: r'blockCode',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      blockCodeEndsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.endsWith(
        property: r'blockCode',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      blockCodeContains(String value, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.contains(
        property: r'blockCode',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      blockCodeMatches(String pattern, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.matches(
        property: r'blockCode',
        wildcard: pattern,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      blockCodeIsEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'blockCode',
        value: '',
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      blockCodeIsNotEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        property: r'blockCode',
        value: '',
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      blockIdEqualTo(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'blockId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      blockIdGreaterThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'blockId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      blockIdLessThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'blockId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      blockIdBetween(
    String lower,
    String upper, {
    bool includeLower = true,
    bool includeUpper = true,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'blockId',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      blockIdStartsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.startsWith(
        property: r'blockId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      blockIdEndsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.endsWith(
        property: r'blockId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      blockIdContains(String value, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.contains(
        property: r'blockId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      blockIdMatches(String pattern, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.matches(
        property: r'blockId',
        wildcard: pattern,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      blockIdIsEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'blockId',
        value: '',
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      blockIdIsNotEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        property: r'blockId',
        value: '',
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      brondolanWeightKgEqualTo(
    double value, {
    double epsilon = Query.epsilon,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'brondolanWeightKg',
        value: value,
        epsilon: epsilon,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      brondolanWeightKgGreaterThan(
    double value, {
    bool include = false,
    double epsilon = Query.epsilon,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'brondolanWeightKg',
        value: value,
        epsilon: epsilon,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      brondolanWeightKgLessThan(
    double value, {
    bool include = false,
    double epsilon = Query.epsilon,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'brondolanWeightKg',
        value: value,
        epsilon: epsilon,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      brondolanWeightKgBetween(
    double lower,
    double upper, {
    bool includeLower = true,
    bool includeUpper = true,
    double epsilon = Query.epsilon,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'brondolanWeightKg',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
        epsilon: epsilon,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      clientTimestampMsEqualTo(int value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'clientTimestampMs',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      clientTimestampMsGreaterThan(
    int value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'clientTimestampMs',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      clientTimestampMsLessThan(
    int value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'clientTimestampMs',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      clientTimestampMsBetween(
    int lower,
    int upper, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'clientTimestampMs',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      createdAtEqualTo(DateTime value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'createdAt',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      createdAtGreaterThan(
    DateTime value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'createdAt',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      createdAtLessThan(
    DateTime value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'createdAt',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      createdAtBetween(
    DateTime lower,
    DateTime upper, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'createdAt',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      estimatedWeightKgEqualTo(
    double value, {
    double epsilon = Query.epsilon,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'estimatedWeightKg',
        value: value,
        epsilon: epsilon,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      estimatedWeightKgGreaterThan(
    double value, {
    bool include = false,
    double epsilon = Query.epsilon,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'estimatedWeightKg',
        value: value,
        epsilon: epsilon,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      estimatedWeightKgLessThan(
    double value, {
    bool include = false,
    double epsilon = Query.epsilon,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'estimatedWeightKg',
        value: value,
        epsilon: epsilon,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      estimatedWeightKgBetween(
    double lower,
    double upper, {
    bool includeLower = true,
    bool includeUpper = true,
    double epsilon = Query.epsilon,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'estimatedWeightKg',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
        epsilon: epsilon,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      gpsAccuracyEqualTo(
    double value, {
    double epsilon = Query.epsilon,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'gpsAccuracy',
        value: value,
        epsilon: epsilon,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      gpsAccuracyGreaterThan(
    double value, {
    bool include = false,
    double epsilon = Query.epsilon,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'gpsAccuracy',
        value: value,
        epsilon: epsilon,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      gpsAccuracyLessThan(
    double value, {
    bool include = false,
    double epsilon = Query.epsilon,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'gpsAccuracy',
        value: value,
        epsilon: epsilon,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      gpsAccuracyBetween(
    double lower,
    double upper, {
    bool includeLower = true,
    bool includeUpper = true,
    double epsilon = Query.epsilon,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'gpsAccuracy',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
        epsilon: epsilon,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      harvestDateEqualTo(DateTime value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'harvestDate',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      harvestDateGreaterThan(
    DateTime value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'harvestDate',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      harvestDateLessThan(
    DateTime value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'harvestDate',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      harvestDateBetween(
    DateTime lower,
    DateTime upper, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'harvestDate',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      idempotencyKeyEqualTo(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'idempotencyKey',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      idempotencyKeyGreaterThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'idempotencyKey',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      idempotencyKeyLessThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'idempotencyKey',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      idempotencyKeyBetween(
    String lower,
    String upper, {
    bool includeLower = true,
    bool includeUpper = true,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'idempotencyKey',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      idempotencyKeyStartsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.startsWith(
        property: r'idempotencyKey',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      idempotencyKeyEndsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.endsWith(
        property: r'idempotencyKey',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      idempotencyKeyContains(String value, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.contains(
        property: r'idempotencyKey',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      idempotencyKeyMatches(String pattern, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.matches(
        property: r'idempotencyKey',
        wildcard: pattern,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      idempotencyKeyIsEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'idempotencyKey',
        value: '',
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      idempotencyKeyIsNotEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        property: r'idempotencyKey',
        value: '',
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      isSyncedEqualTo(bool value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'isSynced',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      janjangCountEqualTo(int value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'janjangCount',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      janjangCountGreaterThan(
    int value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'janjangCount',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      janjangCountLessThan(
    int value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'janjangCount',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      janjangCountBetween(
    int lower,
    int upper, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'janjangCount',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      latitudeEqualTo(
    double value, {
    double epsilon = Query.epsilon,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'latitude',
        value: value,
        epsilon: epsilon,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      latitudeGreaterThan(
    double value, {
    bool include = false,
    double epsilon = Query.epsilon,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'latitude',
        value: value,
        epsilon: epsilon,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      latitudeLessThan(
    double value, {
    bool include = false,
    double epsilon = Query.epsilon,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'latitude',
        value: value,
        epsilon: epsilon,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      latitudeBetween(
    double lower,
    double upper, {
    bool includeLower = true,
    bool includeUpper = true,
    double epsilon = Query.epsilon,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'latitude',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
        epsilon: epsilon,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      lewatMasakCountEqualTo(int value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'lewatMasakCount',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      lewatMasakCountGreaterThan(
    int value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'lewatMasakCount',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      lewatMasakCountLessThan(
    int value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'lewatMasakCount',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      lewatMasakCountBetween(
    int lower,
    int upper, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'lewatMasakCount',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      localIdEqualTo(Id value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'localId',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      localIdGreaterThan(
    Id value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'localId',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      localIdLessThan(
    Id value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'localId',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      localIdBetween(
    Id lower,
    Id upper, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'localId',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      longitudeEqualTo(
    double value, {
    double epsilon = Query.epsilon,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'longitude',
        value: value,
        epsilon: epsilon,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      longitudeGreaterThan(
    double value, {
    bool include = false,
    double epsilon = Query.epsilon,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'longitude',
        value: value,
        epsilon: epsilon,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      longitudeLessThan(
    double value, {
    bool include = false,
    double epsilon = Query.epsilon,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'longitude',
        value: value,
        epsilon: epsilon,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      longitudeBetween(
    double lower,
    double upper, {
    bool includeLower = true,
    bool includeUpper = true,
    double epsilon = Query.epsilon,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'longitude',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
        epsilon: epsilon,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      masakCountEqualTo(int value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'masakCount',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      masakCountGreaterThan(
    int value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'masakCount',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      masakCountLessThan(
    int value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'masakCount',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      masakCountBetween(
    int lower,
    int upper, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'masakCount',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      mentahCountEqualTo(int value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'mentahCount',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      mentahCountGreaterThan(
    int value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'mentahCount',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      mentahCountLessThan(
    int value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'mentahCount',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      mentahCountBetween(
    int lower,
    int upper, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'mentahCount',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      priorityScoreEqualTo(int value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'priorityScore',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      priorityScoreGreaterThan(
    int value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'priorityScore',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      priorityScoreLessThan(
    int value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'priorityScore',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      priorityScoreBetween(
    int lower,
    int upper, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'priorityScore',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      serverIdEqualTo(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'serverId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      serverIdGreaterThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'serverId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      serverIdLessThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'serverId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      serverIdBetween(
    String lower,
    String upper, {
    bool includeLower = true,
    bool includeUpper = true,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'serverId',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      serverIdStartsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.startsWith(
        property: r'serverId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      serverIdEndsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.endsWith(
        property: r'serverId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      serverIdContains(String value, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.contains(
        property: r'serverId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      serverIdMatches(String pattern, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.matches(
        property: r'serverId',
        wildcard: pattern,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      serverIdIsEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'serverId',
        value: '',
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      serverIdIsNotEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        property: r'serverId',
        value: '',
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      syncStatusEqualTo(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'syncStatus',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      syncStatusGreaterThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'syncStatus',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      syncStatusLessThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'syncStatus',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      syncStatusBetween(
    String lower,
    String upper, {
    bool includeLower = true,
    bool includeUpper = true,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'syncStatus',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      syncStatusStartsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.startsWith(
        property: r'syncStatus',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      syncStatusEndsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.endsWith(
        property: r'syncStatus',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      syncStatusContains(String value, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.contains(
        property: r'syncStatus',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      syncStatusMatches(String pattern, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.matches(
        property: r'syncStatus',
        wildcard: pattern,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      syncStatusIsEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'syncStatus',
        value: '',
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      syncStatusIsNotEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        property: r'syncStatus',
        value: '',
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      tangkaiPanjangCountEqualTo(int value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'tangkaiPanjangCount',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      tangkaiPanjangCountGreaterThan(
    int value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'tangkaiPanjangCount',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      tangkaiPanjangCountLessThan(
    int value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'tangkaiPanjangCount',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      tangkaiPanjangCountBetween(
    int lower,
    int upper, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'tangkaiPanjangCount',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      tphIdEqualTo(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'tphId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      tphIdGreaterThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'tphId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      tphIdLessThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'tphId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      tphIdBetween(
    String lower,
    String upper, {
    bool includeLower = true,
    bool includeUpper = true,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'tphId',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      tphIdStartsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.startsWith(
        property: r'tphId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      tphIdEndsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.endsWith(
        property: r'tphId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      tphIdContains(String value, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.contains(
        property: r'tphId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      tphIdMatches(String pattern, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.matches(
        property: r'tphId',
        wildcard: pattern,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      tphIdIsEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'tphId',
        value: '',
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      tphIdIsNotEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        property: r'tphId',
        value: '',
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      tphNumberEqualTo(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'tphNumber',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      tphNumberGreaterThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'tphNumber',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      tphNumberLessThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'tphNumber',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      tphNumberBetween(
    String lower,
    String upper, {
    bool includeLower = true,
    bool includeUpper = true,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'tphNumber',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      tphNumberStartsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.startsWith(
        property: r'tphNumber',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      tphNumberEndsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.endsWith(
        property: r'tphNumber',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      tphNumberContains(String value, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.contains(
        property: r'tphNumber',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      tphNumberMatches(String pattern, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.matches(
        property: r'tphNumber',
        wildcard: pattern,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      tphNumberIsEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'tphNumber',
        value: '',
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      tphNumberIsNotEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        property: r'tphNumber',
        value: '',
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      updatedAtEqualTo(DateTime value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'updatedAt',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      updatedAtGreaterThan(
    DateTime value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'updatedAt',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      updatedAtLessThan(
    DateTime value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'updatedAt',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      updatedAtBetween(
    DateTime lower,
    DateTime upper, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'updatedAt',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      userIdEqualTo(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'userId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      userIdGreaterThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'userId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      userIdLessThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'userId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      userIdBetween(
    String lower,
    String upper, {
    bool includeLower = true,
    bool includeUpper = true,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'userId',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      userIdStartsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.startsWith(
        property: r'userId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      userIdEndsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.endsWith(
        property: r'userId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      userIdContains(String value, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.contains(
        property: r'userId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      userIdMatches(String pattern, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.matches(
        property: r'userId',
        wildcard: pattern,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      userIdIsEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'userId',
        value: '',
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      userIdIsNotEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        property: r'userId',
        value: '',
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      userNameEqualTo(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'userName',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      userNameGreaterThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'userName',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      userNameLessThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'userName',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      userNameBetween(
    String lower,
    String upper, {
    bool includeLower = true,
    bool includeUpper = true,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'userName',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      userNameStartsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.startsWith(
        property: r'userName',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      userNameEndsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.endsWith(
        property: r'userName',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      userNameContains(String value, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.contains(
        property: r'userName',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      userNameMatches(String pattern, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.matches(
        property: r'userName',
        wildcard: pattern,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      userNameIsEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'userName',
        value: '',
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      userNameIsNotEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        property: r'userName',
        value: '',
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      userRoleWeightEqualTo(int value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'userRoleWeight',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      userRoleWeightGreaterThan(
    int value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'userRoleWeight',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      userRoleWeightLessThan(
    int value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'userRoleWeight',
        value: value,
      ));
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterFilterCondition>
      userRoleWeightBetween(
    int lower,
    int upper, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'userRoleWeight',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
      ));
    });
  }
}

extension LocalHarvestLogQueryObject
    on QueryBuilder<LocalHarvestLog, LocalHarvestLog, QFilterCondition> {}

extension LocalHarvestLogQueryLinks
    on QueryBuilder<LocalHarvestLog, LocalHarvestLog, QFilterCondition> {}

extension LocalHarvestLogQuerySortBy
    on QueryBuilder<LocalHarvestLog, LocalHarvestLog, QSortBy> {
  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByBlockCode() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'blockCode', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByBlockCodeDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'blockCode', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy> sortByBlockId() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'blockId', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByBlockIdDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'blockId', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByBrondolanWeightKg() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'brondolanWeightKg', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByBrondolanWeightKgDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'brondolanWeightKg', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByClientTimestampMs() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'clientTimestampMs', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByClientTimestampMsDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'clientTimestampMs', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByCreatedAt() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'createdAt', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByCreatedAtDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'createdAt', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByEstimatedWeightKg() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'estimatedWeightKg', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByEstimatedWeightKgDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'estimatedWeightKg', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByGpsAccuracy() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'gpsAccuracy', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByGpsAccuracyDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'gpsAccuracy', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByHarvestDate() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'harvestDate', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByHarvestDateDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'harvestDate', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByIdempotencyKey() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'idempotencyKey', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByIdempotencyKeyDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'idempotencyKey', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByIsSynced() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'isSynced', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByIsSyncedDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'isSynced', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByJanjangCount() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'janjangCount', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByJanjangCountDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'janjangCount', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByLatitude() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'latitude', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByLatitudeDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'latitude', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByLewatMasakCount() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'lewatMasakCount', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByLewatMasakCountDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'lewatMasakCount', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByLongitude() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'longitude', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByLongitudeDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'longitude', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByMasakCount() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'masakCount', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByMasakCountDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'masakCount', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByMentahCount() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'mentahCount', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByMentahCountDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'mentahCount', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByPriorityScore() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'priorityScore', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByPriorityScoreDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'priorityScore', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByServerId() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'serverId', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByServerIdDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'serverId', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortBySyncStatus() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'syncStatus', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortBySyncStatusDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'syncStatus', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByTangkaiPanjangCount() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'tangkaiPanjangCount', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByTangkaiPanjangCountDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'tangkaiPanjangCount', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy> sortByTphId() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'tphId', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByTphIdDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'tphId', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByTphNumber() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'tphNumber', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByTphNumberDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'tphNumber', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByUpdatedAt() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'updatedAt', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByUpdatedAtDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'updatedAt', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy> sortByUserId() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'userId', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByUserIdDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'userId', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByUserName() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'userName', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByUserNameDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'userName', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByUserRoleWeight() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'userRoleWeight', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      sortByUserRoleWeightDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'userRoleWeight', Sort.desc);
    });
  }
}

extension LocalHarvestLogQuerySortThenBy
    on QueryBuilder<LocalHarvestLog, LocalHarvestLog, QSortThenBy> {
  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByBlockCode() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'blockCode', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByBlockCodeDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'blockCode', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy> thenByBlockId() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'blockId', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByBlockIdDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'blockId', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByBrondolanWeightKg() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'brondolanWeightKg', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByBrondolanWeightKgDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'brondolanWeightKg', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByClientTimestampMs() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'clientTimestampMs', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByClientTimestampMsDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'clientTimestampMs', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByCreatedAt() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'createdAt', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByCreatedAtDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'createdAt', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByEstimatedWeightKg() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'estimatedWeightKg', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByEstimatedWeightKgDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'estimatedWeightKg', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByGpsAccuracy() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'gpsAccuracy', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByGpsAccuracyDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'gpsAccuracy', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByHarvestDate() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'harvestDate', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByHarvestDateDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'harvestDate', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByIdempotencyKey() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'idempotencyKey', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByIdempotencyKeyDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'idempotencyKey', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByIsSynced() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'isSynced', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByIsSyncedDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'isSynced', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByJanjangCount() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'janjangCount', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByJanjangCountDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'janjangCount', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByLatitude() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'latitude', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByLatitudeDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'latitude', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByLewatMasakCount() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'lewatMasakCount', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByLewatMasakCountDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'lewatMasakCount', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy> thenByLocalId() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'localId', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByLocalIdDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'localId', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByLongitude() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'longitude', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByLongitudeDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'longitude', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByMasakCount() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'masakCount', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByMasakCountDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'masakCount', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByMentahCount() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'mentahCount', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByMentahCountDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'mentahCount', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByPriorityScore() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'priorityScore', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByPriorityScoreDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'priorityScore', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByServerId() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'serverId', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByServerIdDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'serverId', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenBySyncStatus() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'syncStatus', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenBySyncStatusDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'syncStatus', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByTangkaiPanjangCount() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'tangkaiPanjangCount', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByTangkaiPanjangCountDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'tangkaiPanjangCount', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy> thenByTphId() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'tphId', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByTphIdDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'tphId', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByTphNumber() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'tphNumber', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByTphNumberDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'tphNumber', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByUpdatedAt() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'updatedAt', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByUpdatedAtDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'updatedAt', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy> thenByUserId() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'userId', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByUserIdDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'userId', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByUserName() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'userName', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByUserNameDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'userName', Sort.desc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByUserRoleWeight() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'userRoleWeight', Sort.asc);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QAfterSortBy>
      thenByUserRoleWeightDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'userRoleWeight', Sort.desc);
    });
  }
}

extension LocalHarvestLogQueryWhereDistinct
    on QueryBuilder<LocalHarvestLog, LocalHarvestLog, QDistinct> {
  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QDistinct> distinctByBlockCode(
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'blockCode', caseSensitive: caseSensitive);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QDistinct> distinctByBlockId(
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'blockId', caseSensitive: caseSensitive);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QDistinct>
      distinctByBrondolanWeightKg() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'brondolanWeightKg');
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QDistinct>
      distinctByClientTimestampMs() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'clientTimestampMs');
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QDistinct>
      distinctByCreatedAt() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'createdAt');
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QDistinct>
      distinctByEstimatedWeightKg() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'estimatedWeightKg');
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QDistinct>
      distinctByGpsAccuracy() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'gpsAccuracy');
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QDistinct>
      distinctByHarvestDate() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'harvestDate');
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QDistinct>
      distinctByIdempotencyKey({bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'idempotencyKey',
          caseSensitive: caseSensitive);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QDistinct>
      distinctByIsSynced() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'isSynced');
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QDistinct>
      distinctByJanjangCount() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'janjangCount');
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QDistinct>
      distinctByLatitude() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'latitude');
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QDistinct>
      distinctByLewatMasakCount() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'lewatMasakCount');
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QDistinct>
      distinctByLongitude() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'longitude');
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QDistinct>
      distinctByMasakCount() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'masakCount');
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QDistinct>
      distinctByMentahCount() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'mentahCount');
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QDistinct>
      distinctByPriorityScore() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'priorityScore');
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QDistinct> distinctByServerId(
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'serverId', caseSensitive: caseSensitive);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QDistinct>
      distinctBySyncStatus({bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'syncStatus', caseSensitive: caseSensitive);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QDistinct>
      distinctByTangkaiPanjangCount() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'tangkaiPanjangCount');
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QDistinct> distinctByTphId(
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'tphId', caseSensitive: caseSensitive);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QDistinct> distinctByTphNumber(
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'tphNumber', caseSensitive: caseSensitive);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QDistinct>
      distinctByUpdatedAt() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'updatedAt');
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QDistinct> distinctByUserId(
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'userId', caseSensitive: caseSensitive);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QDistinct> distinctByUserName(
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'userName', caseSensitive: caseSensitive);
    });
  }

  QueryBuilder<LocalHarvestLog, LocalHarvestLog, QDistinct>
      distinctByUserRoleWeight() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'userRoleWeight');
    });
  }
}

extension LocalHarvestLogQueryProperty
    on QueryBuilder<LocalHarvestLog, LocalHarvestLog, QQueryProperty> {
  QueryBuilder<LocalHarvestLog, int, QQueryOperations> localIdProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'localId');
    });
  }

  QueryBuilder<LocalHarvestLog, String, QQueryOperations> blockCodeProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'blockCode');
    });
  }

  QueryBuilder<LocalHarvestLog, String, QQueryOperations> blockIdProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'blockId');
    });
  }

  QueryBuilder<LocalHarvestLog, double, QQueryOperations>
      brondolanWeightKgProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'brondolanWeightKg');
    });
  }

  QueryBuilder<LocalHarvestLog, int, QQueryOperations>
      clientTimestampMsProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'clientTimestampMs');
    });
  }

  QueryBuilder<LocalHarvestLog, DateTime, QQueryOperations>
      createdAtProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'createdAt');
    });
  }

  QueryBuilder<LocalHarvestLog, double, QQueryOperations>
      estimatedWeightKgProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'estimatedWeightKg');
    });
  }

  QueryBuilder<LocalHarvestLog, double, QQueryOperations>
      gpsAccuracyProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'gpsAccuracy');
    });
  }

  QueryBuilder<LocalHarvestLog, DateTime, QQueryOperations>
      harvestDateProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'harvestDate');
    });
  }

  QueryBuilder<LocalHarvestLog, String, QQueryOperations>
      idempotencyKeyProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'idempotencyKey');
    });
  }

  QueryBuilder<LocalHarvestLog, bool, QQueryOperations> isSyncedProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'isSynced');
    });
  }

  QueryBuilder<LocalHarvestLog, int, QQueryOperations> janjangCountProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'janjangCount');
    });
  }

  QueryBuilder<LocalHarvestLog, double, QQueryOperations> latitudeProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'latitude');
    });
  }

  QueryBuilder<LocalHarvestLog, int, QQueryOperations>
      lewatMasakCountProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'lewatMasakCount');
    });
  }

  QueryBuilder<LocalHarvestLog, double, QQueryOperations> longitudeProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'longitude');
    });
  }

  QueryBuilder<LocalHarvestLog, int, QQueryOperations> masakCountProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'masakCount');
    });
  }

  QueryBuilder<LocalHarvestLog, int, QQueryOperations> mentahCountProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'mentahCount');
    });
  }

  QueryBuilder<LocalHarvestLog, int, QQueryOperations> priorityScoreProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'priorityScore');
    });
  }

  QueryBuilder<LocalHarvestLog, String, QQueryOperations> serverIdProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'serverId');
    });
  }

  QueryBuilder<LocalHarvestLog, String, QQueryOperations> syncStatusProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'syncStatus');
    });
  }

  QueryBuilder<LocalHarvestLog, int, QQueryOperations>
      tangkaiPanjangCountProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'tangkaiPanjangCount');
    });
  }

  QueryBuilder<LocalHarvestLog, String, QQueryOperations> tphIdProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'tphId');
    });
  }

  QueryBuilder<LocalHarvestLog, String, QQueryOperations> tphNumberProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'tphNumber');
    });
  }

  QueryBuilder<LocalHarvestLog, DateTime, QQueryOperations>
      updatedAtProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'updatedAt');
    });
  }

  QueryBuilder<LocalHarvestLog, String, QQueryOperations> userIdProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'userId');
    });
  }

  QueryBuilder<LocalHarvestLog, String, QQueryOperations> userNameProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'userName');
    });
  }

  QueryBuilder<LocalHarvestLog, int, QQueryOperations>
      userRoleWeightProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'userRoleWeight');
    });
  }
}
