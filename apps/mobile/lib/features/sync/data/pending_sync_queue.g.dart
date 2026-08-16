// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'pending_sync_queue.dart';

// **************************************************************************
// IsarCollectionGenerator
// **************************************************************************

// coverage:ignore-file
// ignore_for_file: duplicate_ignore, non_constant_identifier_names, constant_identifier_names, invalid_use_of_protected_member, unnecessary_cast, prefer_const_constructors, lines_longer_than_80_chars, require_trailing_commas, inference_failure_on_function_invocation, unnecessary_parenthesis, unnecessary_raw_strings, unnecessary_null_checks, join_return_with_assignment, prefer_final_locals, avoid_js_rounded_ints, avoid_positional_boolean_parameters, always_specify_types

extension GetPendingSyncQueueCollection on Isar {
  IsarCollection<PendingSyncQueue> get pendingSyncQueues => this.collection();
}

const PendingSyncQueueSchema = CollectionSchema(
  name: r'PendingSyncQueue',
  id: 3992691716747831938,
  properties: {
    r'createdAt': PropertySchema(
      id: 0,
      name: r'createdAt',
      type: IsarType.dateTime,
    ),
    r'endpoint': PropertySchema(
      id: 1,
      name: r'endpoint',
      type: IsarType.string,
    ),
    r'harvestLogServerId': PropertySchema(
      id: 2,
      name: r'harvestLogServerId',
      type: IsarType.string,
    ),
    r'httpMethod': PropertySchema(
      id: 3,
      name: r'httpMethod',
      type: IsarType.string,
    ),
    r'lastAttemptAt': PropertySchema(
      id: 4,
      name: r'lastAttemptAt',
      type: IsarType.dateTime,
    ),
    r'lastErrorMessage': PropertySchema(
      id: 5,
      name: r'lastErrorMessage',
      type: IsarType.string,
    ),
    r'payloadJson': PropertySchema(
      id: 6,
      name: r'payloadJson',
      type: IsarType.string,
    ),
    r'retryCount': PropertySchema(
      id: 7,
      name: r'retryCount',
      type: IsarType.long,
    )
  },
  estimateSize: _pendingSyncQueueEstimateSize,
  serialize: _pendingSyncQueueSerialize,
  deserialize: _pendingSyncQueueDeserialize,
  deserializeProp: _pendingSyncQueueDeserializeProp,
  idName: r'localId',
  indexes: {
    r'harvestLogServerId': IndexSchema(
      id: 1873702967897382448,
      name: r'harvestLogServerId',
      unique: true,
      replace: false,
      properties: [
        IndexPropertySchema(
          name: r'harvestLogServerId',
          type: IndexType.hash,
          caseSensitive: true,
        )
      ],
    )
  },
  links: {},
  embeddedSchemas: {},
  getId: _pendingSyncQueueGetId,
  getLinks: _pendingSyncQueueGetLinks,
  attach: _pendingSyncQueueAttach,
  version: '3.1.0+1',
);

int _pendingSyncQueueEstimateSize(
  PendingSyncQueue object,
  List<int> offsets,
  Map<Type, List<int>> allOffsets,
) {
  var bytesCount = offsets.last;
  bytesCount += 3 + object.endpoint.length * 3;
  bytesCount += 3 + object.harvestLogServerId.length * 3;
  bytesCount += 3 + object.httpMethod.length * 3;
  {
    final value = object.lastErrorMessage;
    if (value != null) {
      bytesCount += 3 + value.length * 3;
    }
  }
  bytesCount += 3 + object.payloadJson.length * 3;
  return bytesCount;
}

void _pendingSyncQueueSerialize(
  PendingSyncQueue object,
  IsarWriter writer,
  List<int> offsets,
  Map<Type, List<int>> allOffsets,
) {
  writer.writeDateTime(offsets[0], object.createdAt);
  writer.writeString(offsets[1], object.endpoint);
  writer.writeString(offsets[2], object.harvestLogServerId);
  writer.writeString(offsets[3], object.httpMethod);
  writer.writeDateTime(offsets[4], object.lastAttemptAt);
  writer.writeString(offsets[5], object.lastErrorMessage);
  writer.writeString(offsets[6], object.payloadJson);
  writer.writeLong(offsets[7], object.retryCount);
}

PendingSyncQueue _pendingSyncQueueDeserialize(
  Id id,
  IsarReader reader,
  List<int> offsets,
  Map<Type, List<int>> allOffsets,
) {
  final object = PendingSyncQueue();
  object.createdAt = reader.readDateTime(offsets[0]);
  object.endpoint = reader.readString(offsets[1]);
  object.harvestLogServerId = reader.readString(offsets[2]);
  object.httpMethod = reader.readString(offsets[3]);
  object.lastAttemptAt = reader.readDateTimeOrNull(offsets[4]);
  object.lastErrorMessage = reader.readStringOrNull(offsets[5]);
  object.localId = id;
  object.payloadJson = reader.readString(offsets[6]);
  object.retryCount = reader.readLong(offsets[7]);
  return object;
}

P _pendingSyncQueueDeserializeProp<P>(
  IsarReader reader,
  int propertyId,
  int offset,
  Map<Type, List<int>> allOffsets,
) {
  switch (propertyId) {
    case 0:
      return (reader.readDateTime(offset)) as P;
    case 1:
      return (reader.readString(offset)) as P;
    case 2:
      return (reader.readString(offset)) as P;
    case 3:
      return (reader.readString(offset)) as P;
    case 4:
      return (reader.readDateTimeOrNull(offset)) as P;
    case 5:
      return (reader.readStringOrNull(offset)) as P;
    case 6:
      return (reader.readString(offset)) as P;
    case 7:
      return (reader.readLong(offset)) as P;
    default:
      throw IsarError('Unknown property with id $propertyId');
  }
}

Id _pendingSyncQueueGetId(PendingSyncQueue object) {
  return object.localId;
}

List<IsarLinkBase<dynamic>> _pendingSyncQueueGetLinks(PendingSyncQueue object) {
  return [];
}

void _pendingSyncQueueAttach(
    IsarCollection<dynamic> col, Id id, PendingSyncQueue object) {
  object.localId = id;
}

extension PendingSyncQueueByIndex on IsarCollection<PendingSyncQueue> {
  Future<PendingSyncQueue?> getByHarvestLogServerId(String harvestLogServerId) {
    return getByIndex(r'harvestLogServerId', [harvestLogServerId]);
  }

  PendingSyncQueue? getByHarvestLogServerIdSync(String harvestLogServerId) {
    return getByIndexSync(r'harvestLogServerId', [harvestLogServerId]);
  }

  Future<bool> deleteByHarvestLogServerId(String harvestLogServerId) {
    return deleteByIndex(r'harvestLogServerId', [harvestLogServerId]);
  }

  bool deleteByHarvestLogServerIdSync(String harvestLogServerId) {
    return deleteByIndexSync(r'harvestLogServerId', [harvestLogServerId]);
  }

  Future<List<PendingSyncQueue?>> getAllByHarvestLogServerId(
      List<String> harvestLogServerIdValues) {
    final values = harvestLogServerIdValues.map((e) => [e]).toList();
    return getAllByIndex(r'harvestLogServerId', values);
  }

  List<PendingSyncQueue?> getAllByHarvestLogServerIdSync(
      List<String> harvestLogServerIdValues) {
    final values = harvestLogServerIdValues.map((e) => [e]).toList();
    return getAllByIndexSync(r'harvestLogServerId', values);
  }

  Future<int> deleteAllByHarvestLogServerId(
      List<String> harvestLogServerIdValues) {
    final values = harvestLogServerIdValues.map((e) => [e]).toList();
    return deleteAllByIndex(r'harvestLogServerId', values);
  }

  int deleteAllByHarvestLogServerIdSync(List<String> harvestLogServerIdValues) {
    final values = harvestLogServerIdValues.map((e) => [e]).toList();
    return deleteAllByIndexSync(r'harvestLogServerId', values);
  }

  Future<Id> putByHarvestLogServerId(PendingSyncQueue object) {
    return putByIndex(r'harvestLogServerId', object);
  }

  Id putByHarvestLogServerIdSync(PendingSyncQueue object,
      {bool saveLinks = true}) {
    return putByIndexSync(r'harvestLogServerId', object, saveLinks: saveLinks);
  }

  Future<List<Id>> putAllByHarvestLogServerId(List<PendingSyncQueue> objects) {
    return putAllByIndex(r'harvestLogServerId', objects);
  }

  List<Id> putAllByHarvestLogServerIdSync(List<PendingSyncQueue> objects,
      {bool saveLinks = true}) {
    return putAllByIndexSync(r'harvestLogServerId', objects,
        saveLinks: saveLinks);
  }
}

extension PendingSyncQueueQueryWhereSort
    on QueryBuilder<PendingSyncQueue, PendingSyncQueue, QWhere> {
  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterWhere> anyLocalId() {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(const IdWhereClause.any());
    });
  }
}

extension PendingSyncQueueQueryWhere
    on QueryBuilder<PendingSyncQueue, PendingSyncQueue, QWhereClause> {
  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterWhereClause>
      localIdEqualTo(Id localId) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IdWhereClause.between(
        lower: localId,
        upper: localId,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterWhereClause>
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

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterWhereClause>
      localIdGreaterThan(Id localId, {bool include = false}) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(
        IdWhereClause.greaterThan(lower: localId, includeLower: include),
      );
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterWhereClause>
      localIdLessThan(Id localId, {bool include = false}) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(
        IdWhereClause.lessThan(upper: localId, includeUpper: include),
      );
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterWhereClause>
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

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterWhereClause>
      harvestLogServerIdEqualTo(String harvestLogServerId) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.equalTo(
        indexName: r'harvestLogServerId',
        value: [harvestLogServerId],
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterWhereClause>
      harvestLogServerIdNotEqualTo(String harvestLogServerId) {
    return QueryBuilder.apply(this, (query) {
      if (query.whereSort == Sort.asc) {
        return query
            .addWhereClause(IndexWhereClause.between(
              indexName: r'harvestLogServerId',
              lower: [],
              upper: [harvestLogServerId],
              includeUpper: false,
            ))
            .addWhereClause(IndexWhereClause.between(
              indexName: r'harvestLogServerId',
              lower: [harvestLogServerId],
              includeLower: false,
              upper: [],
            ));
      } else {
        return query
            .addWhereClause(IndexWhereClause.between(
              indexName: r'harvestLogServerId',
              lower: [harvestLogServerId],
              includeLower: false,
              upper: [],
            ))
            .addWhereClause(IndexWhereClause.between(
              indexName: r'harvestLogServerId',
              lower: [],
              upper: [harvestLogServerId],
              includeUpper: false,
            ));
      }
    });
  }
}

extension PendingSyncQueueQueryFilter
    on QueryBuilder<PendingSyncQueue, PendingSyncQueue, QFilterCondition> {
  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      createdAtEqualTo(DateTime value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'createdAt',
        value: value,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
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

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
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

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
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

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      endpointEqualTo(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'endpoint',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      endpointGreaterThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'endpoint',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      endpointLessThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'endpoint',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      endpointBetween(
    String lower,
    String upper, {
    bool includeLower = true,
    bool includeUpper = true,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'endpoint',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      endpointStartsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.startsWith(
        property: r'endpoint',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      endpointEndsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.endsWith(
        property: r'endpoint',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      endpointContains(String value, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.contains(
        property: r'endpoint',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      endpointMatches(String pattern, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.matches(
        property: r'endpoint',
        wildcard: pattern,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      endpointIsEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'endpoint',
        value: '',
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      endpointIsNotEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        property: r'endpoint',
        value: '',
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      harvestLogServerIdEqualTo(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'harvestLogServerId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      harvestLogServerIdGreaterThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'harvestLogServerId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      harvestLogServerIdLessThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'harvestLogServerId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      harvestLogServerIdBetween(
    String lower,
    String upper, {
    bool includeLower = true,
    bool includeUpper = true,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'harvestLogServerId',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      harvestLogServerIdStartsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.startsWith(
        property: r'harvestLogServerId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      harvestLogServerIdEndsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.endsWith(
        property: r'harvestLogServerId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      harvestLogServerIdContains(String value, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.contains(
        property: r'harvestLogServerId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      harvestLogServerIdMatches(String pattern, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.matches(
        property: r'harvestLogServerId',
        wildcard: pattern,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      harvestLogServerIdIsEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'harvestLogServerId',
        value: '',
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      harvestLogServerIdIsNotEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        property: r'harvestLogServerId',
        value: '',
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      httpMethodEqualTo(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'httpMethod',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      httpMethodGreaterThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'httpMethod',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      httpMethodLessThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'httpMethod',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      httpMethodBetween(
    String lower,
    String upper, {
    bool includeLower = true,
    bool includeUpper = true,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'httpMethod',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      httpMethodStartsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.startsWith(
        property: r'httpMethod',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      httpMethodEndsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.endsWith(
        property: r'httpMethod',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      httpMethodContains(String value, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.contains(
        property: r'httpMethod',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      httpMethodMatches(String pattern, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.matches(
        property: r'httpMethod',
        wildcard: pattern,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      httpMethodIsEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'httpMethod',
        value: '',
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      httpMethodIsNotEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        property: r'httpMethod',
        value: '',
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      lastAttemptAtIsNull() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(const FilterCondition.isNull(
        property: r'lastAttemptAt',
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      lastAttemptAtIsNotNull() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(const FilterCondition.isNotNull(
        property: r'lastAttemptAt',
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      lastAttemptAtEqualTo(DateTime? value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'lastAttemptAt',
        value: value,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      lastAttemptAtGreaterThan(
    DateTime? value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'lastAttemptAt',
        value: value,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      lastAttemptAtLessThan(
    DateTime? value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'lastAttemptAt',
        value: value,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      lastAttemptAtBetween(
    DateTime? lower,
    DateTime? upper, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'lastAttemptAt',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      lastErrorMessageIsNull() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(const FilterCondition.isNull(
        property: r'lastErrorMessage',
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      lastErrorMessageIsNotNull() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(const FilterCondition.isNotNull(
        property: r'lastErrorMessage',
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      lastErrorMessageEqualTo(
    String? value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'lastErrorMessage',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      lastErrorMessageGreaterThan(
    String? value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'lastErrorMessage',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      lastErrorMessageLessThan(
    String? value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'lastErrorMessage',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      lastErrorMessageBetween(
    String? lower,
    String? upper, {
    bool includeLower = true,
    bool includeUpper = true,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'lastErrorMessage',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      lastErrorMessageStartsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.startsWith(
        property: r'lastErrorMessage',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      lastErrorMessageEndsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.endsWith(
        property: r'lastErrorMessage',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      lastErrorMessageContains(String value, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.contains(
        property: r'lastErrorMessage',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      lastErrorMessageMatches(String pattern, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.matches(
        property: r'lastErrorMessage',
        wildcard: pattern,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      lastErrorMessageIsEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'lastErrorMessage',
        value: '',
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      lastErrorMessageIsNotEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        property: r'lastErrorMessage',
        value: '',
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      localIdEqualTo(Id value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'localId',
        value: value,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
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

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
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

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
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

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      payloadJsonEqualTo(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'payloadJson',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      payloadJsonGreaterThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'payloadJson',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      payloadJsonLessThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'payloadJson',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      payloadJsonBetween(
    String lower,
    String upper, {
    bool includeLower = true,
    bool includeUpper = true,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'payloadJson',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      payloadJsonStartsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.startsWith(
        property: r'payloadJson',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      payloadJsonEndsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.endsWith(
        property: r'payloadJson',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      payloadJsonContains(String value, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.contains(
        property: r'payloadJson',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      payloadJsonMatches(String pattern, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.matches(
        property: r'payloadJson',
        wildcard: pattern,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      payloadJsonIsEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'payloadJson',
        value: '',
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      payloadJsonIsNotEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        property: r'payloadJson',
        value: '',
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      retryCountEqualTo(int value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'retryCount',
        value: value,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      retryCountGreaterThan(
    int value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'retryCount',
        value: value,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      retryCountLessThan(
    int value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'retryCount',
        value: value,
      ));
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterFilterCondition>
      retryCountBetween(
    int lower,
    int upper, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'retryCount',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
      ));
    });
  }
}

extension PendingSyncQueueQueryObject
    on QueryBuilder<PendingSyncQueue, PendingSyncQueue, QFilterCondition> {}

extension PendingSyncQueueQueryLinks
    on QueryBuilder<PendingSyncQueue, PendingSyncQueue, QFilterCondition> {}

extension PendingSyncQueueQuerySortBy
    on QueryBuilder<PendingSyncQueue, PendingSyncQueue, QSortBy> {
  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      sortByCreatedAt() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'createdAt', Sort.asc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      sortByCreatedAtDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'createdAt', Sort.desc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      sortByEndpoint() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'endpoint', Sort.asc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      sortByEndpointDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'endpoint', Sort.desc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      sortByHarvestLogServerId() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'harvestLogServerId', Sort.asc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      sortByHarvestLogServerIdDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'harvestLogServerId', Sort.desc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      sortByHttpMethod() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'httpMethod', Sort.asc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      sortByHttpMethodDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'httpMethod', Sort.desc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      sortByLastAttemptAt() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'lastAttemptAt', Sort.asc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      sortByLastAttemptAtDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'lastAttemptAt', Sort.desc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      sortByLastErrorMessage() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'lastErrorMessage', Sort.asc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      sortByLastErrorMessageDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'lastErrorMessage', Sort.desc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      sortByPayloadJson() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'payloadJson', Sort.asc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      sortByPayloadJsonDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'payloadJson', Sort.desc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      sortByRetryCount() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'retryCount', Sort.asc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      sortByRetryCountDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'retryCount', Sort.desc);
    });
  }
}

extension PendingSyncQueueQuerySortThenBy
    on QueryBuilder<PendingSyncQueue, PendingSyncQueue, QSortThenBy> {
  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      thenByCreatedAt() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'createdAt', Sort.asc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      thenByCreatedAtDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'createdAt', Sort.desc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      thenByEndpoint() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'endpoint', Sort.asc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      thenByEndpointDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'endpoint', Sort.desc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      thenByHarvestLogServerId() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'harvestLogServerId', Sort.asc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      thenByHarvestLogServerIdDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'harvestLogServerId', Sort.desc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      thenByHttpMethod() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'httpMethod', Sort.asc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      thenByHttpMethodDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'httpMethod', Sort.desc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      thenByLastAttemptAt() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'lastAttemptAt', Sort.asc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      thenByLastAttemptAtDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'lastAttemptAt', Sort.desc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      thenByLastErrorMessage() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'lastErrorMessage', Sort.asc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      thenByLastErrorMessageDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'lastErrorMessage', Sort.desc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      thenByLocalId() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'localId', Sort.asc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      thenByLocalIdDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'localId', Sort.desc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      thenByPayloadJson() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'payloadJson', Sort.asc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      thenByPayloadJsonDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'payloadJson', Sort.desc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      thenByRetryCount() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'retryCount', Sort.asc);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QAfterSortBy>
      thenByRetryCountDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'retryCount', Sort.desc);
    });
  }
}

extension PendingSyncQueueQueryWhereDistinct
    on QueryBuilder<PendingSyncQueue, PendingSyncQueue, QDistinct> {
  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QDistinct>
      distinctByCreatedAt() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'createdAt');
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QDistinct>
      distinctByEndpoint({bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'endpoint', caseSensitive: caseSensitive);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QDistinct>
      distinctByHarvestLogServerId({bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'harvestLogServerId',
          caseSensitive: caseSensitive);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QDistinct>
      distinctByHttpMethod({bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'httpMethod', caseSensitive: caseSensitive);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QDistinct>
      distinctByLastAttemptAt() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'lastAttemptAt');
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QDistinct>
      distinctByLastErrorMessage({bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'lastErrorMessage',
          caseSensitive: caseSensitive);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QDistinct>
      distinctByPayloadJson({bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'payloadJson', caseSensitive: caseSensitive);
    });
  }

  QueryBuilder<PendingSyncQueue, PendingSyncQueue, QDistinct>
      distinctByRetryCount() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'retryCount');
    });
  }
}

extension PendingSyncQueueQueryProperty
    on QueryBuilder<PendingSyncQueue, PendingSyncQueue, QQueryProperty> {
  QueryBuilder<PendingSyncQueue, int, QQueryOperations> localIdProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'localId');
    });
  }

  QueryBuilder<PendingSyncQueue, DateTime, QQueryOperations>
      createdAtProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'createdAt');
    });
  }

  QueryBuilder<PendingSyncQueue, String, QQueryOperations> endpointProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'endpoint');
    });
  }

  QueryBuilder<PendingSyncQueue, String, QQueryOperations>
      harvestLogServerIdProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'harvestLogServerId');
    });
  }

  QueryBuilder<PendingSyncQueue, String, QQueryOperations>
      httpMethodProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'httpMethod');
    });
  }

  QueryBuilder<PendingSyncQueue, DateTime?, QQueryOperations>
      lastAttemptAtProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'lastAttemptAt');
    });
  }

  QueryBuilder<PendingSyncQueue, String?, QQueryOperations>
      lastErrorMessageProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'lastErrorMessage');
    });
  }

  QueryBuilder<PendingSyncQueue, String, QQueryOperations>
      payloadJsonProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'payloadJson');
    });
  }

  QueryBuilder<PendingSyncQueue, int, QQueryOperations> retryCountProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'retryCount');
    });
  }
}
