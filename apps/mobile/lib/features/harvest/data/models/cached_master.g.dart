// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'cached_master.dart';

// **************************************************************************
// IsarCollectionGenerator
// **************************************************************************

// coverage:ignore-file
// ignore_for_file: duplicate_ignore, non_constant_identifier_names, constant_identifier_names, invalid_use_of_protected_member, unnecessary_cast, prefer_const_constructors, lines_longer_than_80_chars, require_trailing_commas, inference_failure_on_function_invocation, unnecessary_parenthesis, unnecessary_raw_strings, unnecessary_null_checks, join_return_with_assignment, prefer_final_locals, avoid_js_rounded_ints, avoid_positional_boolean_parameters, always_specify_types

extension GetCachedBlockCollection on Isar {
  IsarCollection<CachedBlock> get cachedBlocks => this.collection();
}

const CachedBlockSchema = CollectionSchema(
  name: r'CachedBlock',
  id: -5595076269827328897,
  properties: {
    r'afdelingCode': PropertySchema(
      id: 0,
      name: r'afdelingCode',
      type: IsarType.string,
    ),
    r'blockCode': PropertySchema(
      id: 1,
      name: r'blockCode',
      type: IsarType.string,
    ),
    r'blockId': PropertySchema(
      id: 2,
      name: r'blockId',
      type: IsarType.string,
    ),
    r'plantingYear': PropertySchema(
      id: 3,
      name: r'plantingYear',
      type: IsarType.long,
    ),
    r'polygonGeoJson': PropertySchema(
      id: 4,
      name: r'polygonGeoJson',
      type: IsarType.string,
    )
  },
  estimateSize: _cachedBlockEstimateSize,
  serialize: _cachedBlockSerialize,
  deserialize: _cachedBlockDeserialize,
  deserializeProp: _cachedBlockDeserializeProp,
  idName: r'localId',
  indexes: {
    r'blockId': IndexSchema(
      id: -413886092950911832,
      name: r'blockId',
      unique: true,
      replace: false,
      properties: [
        IndexPropertySchema(
          name: r'blockId',
          type: IndexType.hash,
          caseSensitive: true,
        )
      ],
    )
  },
  links: {},
  embeddedSchemas: {},
  getId: _cachedBlockGetId,
  getLinks: _cachedBlockGetLinks,
  attach: _cachedBlockAttach,
  version: '3.1.0+1',
);

int _cachedBlockEstimateSize(
  CachedBlock object,
  List<int> offsets,
  Map<Type, List<int>> allOffsets,
) {
  var bytesCount = offsets.last;
  bytesCount += 3 + object.afdelingCode.length * 3;
  bytesCount += 3 + object.blockCode.length * 3;
  bytesCount += 3 + object.blockId.length * 3;
  bytesCount += 3 + object.polygonGeoJson.length * 3;
  return bytesCount;
}

void _cachedBlockSerialize(
  CachedBlock object,
  IsarWriter writer,
  List<int> offsets,
  Map<Type, List<int>> allOffsets,
) {
  writer.writeString(offsets[0], object.afdelingCode);
  writer.writeString(offsets[1], object.blockCode);
  writer.writeString(offsets[2], object.blockId);
  writer.writeLong(offsets[3], object.plantingYear);
  writer.writeString(offsets[4], object.polygonGeoJson);
}

CachedBlock _cachedBlockDeserialize(
  Id id,
  IsarReader reader,
  List<int> offsets,
  Map<Type, List<int>> allOffsets,
) {
  final object = CachedBlock();
  object.afdelingCode = reader.readString(offsets[0]);
  object.blockCode = reader.readString(offsets[1]);
  object.blockId = reader.readString(offsets[2]);
  object.localId = id;
  object.plantingYear = reader.readLong(offsets[3]);
  object.polygonGeoJson = reader.readString(offsets[4]);
  return object;
}

P _cachedBlockDeserializeProp<P>(
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
      return (reader.readString(offset)) as P;
    case 3:
      return (reader.readLong(offset)) as P;
    case 4:
      return (reader.readString(offset)) as P;
    default:
      throw IsarError('Unknown property with id $propertyId');
  }
}

Id _cachedBlockGetId(CachedBlock object) {
  return object.localId;
}

List<IsarLinkBase<dynamic>> _cachedBlockGetLinks(CachedBlock object) {
  return [];
}

void _cachedBlockAttach(
    IsarCollection<dynamic> col, Id id, CachedBlock object) {
  object.localId = id;
}

extension CachedBlockByIndex on IsarCollection<CachedBlock> {
  Future<CachedBlock?> getByBlockId(String blockId) {
    return getByIndex(r'blockId', [blockId]);
  }

  CachedBlock? getByBlockIdSync(String blockId) {
    return getByIndexSync(r'blockId', [blockId]);
  }

  Future<bool> deleteByBlockId(String blockId) {
    return deleteByIndex(r'blockId', [blockId]);
  }

  bool deleteByBlockIdSync(String blockId) {
    return deleteByIndexSync(r'blockId', [blockId]);
  }

  Future<List<CachedBlock?>> getAllByBlockId(List<String> blockIdValues) {
    final values = blockIdValues.map((e) => [e]).toList();
    return getAllByIndex(r'blockId', values);
  }

  List<CachedBlock?> getAllByBlockIdSync(List<String> blockIdValues) {
    final values = blockIdValues.map((e) => [e]).toList();
    return getAllByIndexSync(r'blockId', values);
  }

  Future<int> deleteAllByBlockId(List<String> blockIdValues) {
    final values = blockIdValues.map((e) => [e]).toList();
    return deleteAllByIndex(r'blockId', values);
  }

  int deleteAllByBlockIdSync(List<String> blockIdValues) {
    final values = blockIdValues.map((e) => [e]).toList();
    return deleteAllByIndexSync(r'blockId', values);
  }

  Future<Id> putByBlockId(CachedBlock object) {
    return putByIndex(r'blockId', object);
  }

  Id putByBlockIdSync(CachedBlock object, {bool saveLinks = true}) {
    return putByIndexSync(r'blockId', object, saveLinks: saveLinks);
  }

  Future<List<Id>> putAllByBlockId(List<CachedBlock> objects) {
    return putAllByIndex(r'blockId', objects);
  }

  List<Id> putAllByBlockIdSync(List<CachedBlock> objects,
      {bool saveLinks = true}) {
    return putAllByIndexSync(r'blockId', objects, saveLinks: saveLinks);
  }
}

extension CachedBlockQueryWhereSort
    on QueryBuilder<CachedBlock, CachedBlock, QWhere> {
  QueryBuilder<CachedBlock, CachedBlock, QAfterWhere> anyLocalId() {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(const IdWhereClause.any());
    });
  }
}

extension CachedBlockQueryWhere
    on QueryBuilder<CachedBlock, CachedBlock, QWhereClause> {
  QueryBuilder<CachedBlock, CachedBlock, QAfterWhereClause> localIdEqualTo(
      Id localId) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IdWhereClause.between(
        lower: localId,
        upper: localId,
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterWhereClause> localIdNotEqualTo(
      Id localId) {
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

  QueryBuilder<CachedBlock, CachedBlock, QAfterWhereClause> localIdGreaterThan(
      Id localId,
      {bool include = false}) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(
        IdWhereClause.greaterThan(lower: localId, includeLower: include),
      );
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterWhereClause> localIdLessThan(
      Id localId,
      {bool include = false}) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(
        IdWhereClause.lessThan(upper: localId, includeUpper: include),
      );
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterWhereClause> localIdBetween(
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

  QueryBuilder<CachedBlock, CachedBlock, QAfterWhereClause> blockIdEqualTo(
      String blockId) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.equalTo(
        indexName: r'blockId',
        value: [blockId],
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterWhereClause> blockIdNotEqualTo(
      String blockId) {
    return QueryBuilder.apply(this, (query) {
      if (query.whereSort == Sort.asc) {
        return query
            .addWhereClause(IndexWhereClause.between(
              indexName: r'blockId',
              lower: [],
              upper: [blockId],
              includeUpper: false,
            ))
            .addWhereClause(IndexWhereClause.between(
              indexName: r'blockId',
              lower: [blockId],
              includeLower: false,
              upper: [],
            ));
      } else {
        return query
            .addWhereClause(IndexWhereClause.between(
              indexName: r'blockId',
              lower: [blockId],
              includeLower: false,
              upper: [],
            ))
            .addWhereClause(IndexWhereClause.between(
              indexName: r'blockId',
              lower: [],
              upper: [blockId],
              includeUpper: false,
            ));
      }
    });
  }
}

extension CachedBlockQueryFilter
    on QueryBuilder<CachedBlock, CachedBlock, QFilterCondition> {
  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      afdelingCodeEqualTo(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'afdelingCode',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      afdelingCodeGreaterThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'afdelingCode',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      afdelingCodeLessThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'afdelingCode',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      afdelingCodeBetween(
    String lower,
    String upper, {
    bool includeLower = true,
    bool includeUpper = true,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'afdelingCode',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      afdelingCodeStartsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.startsWith(
        property: r'afdelingCode',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      afdelingCodeEndsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.endsWith(
        property: r'afdelingCode',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      afdelingCodeContains(String value, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.contains(
        property: r'afdelingCode',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      afdelingCodeMatches(String pattern, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.matches(
        property: r'afdelingCode',
        wildcard: pattern,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      afdelingCodeIsEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'afdelingCode',
        value: '',
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      afdelingCodeIsNotEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        property: r'afdelingCode',
        value: '',
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
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

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
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

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
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

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
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

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
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

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
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

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      blockCodeContains(String value, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.contains(
        property: r'blockCode',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      blockCodeMatches(String pattern, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.matches(
        property: r'blockCode',
        wildcard: pattern,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      blockCodeIsEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'blockCode',
        value: '',
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      blockCodeIsNotEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        property: r'blockCode',
        value: '',
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition> blockIdEqualTo(
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

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
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

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition> blockIdLessThan(
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

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition> blockIdBetween(
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

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
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

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition> blockIdEndsWith(
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

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition> blockIdContains(
      String value,
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.contains(
        property: r'blockId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition> blockIdMatches(
      String pattern,
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.matches(
        property: r'blockId',
        wildcard: pattern,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      blockIdIsEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'blockId',
        value: '',
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      blockIdIsNotEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        property: r'blockId',
        value: '',
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition> localIdEqualTo(
      Id value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'localId',
        value: value,
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
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

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition> localIdLessThan(
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

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition> localIdBetween(
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

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      plantingYearEqualTo(int value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'plantingYear',
        value: value,
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      plantingYearGreaterThan(
    int value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'plantingYear',
        value: value,
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      plantingYearLessThan(
    int value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'plantingYear',
        value: value,
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      plantingYearBetween(
    int lower,
    int upper, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'plantingYear',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      polygonGeoJsonEqualTo(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'polygonGeoJson',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      polygonGeoJsonGreaterThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'polygonGeoJson',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      polygonGeoJsonLessThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'polygonGeoJson',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      polygonGeoJsonBetween(
    String lower,
    String upper, {
    bool includeLower = true,
    bool includeUpper = true,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'polygonGeoJson',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      polygonGeoJsonStartsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.startsWith(
        property: r'polygonGeoJson',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      polygonGeoJsonEndsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.endsWith(
        property: r'polygonGeoJson',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      polygonGeoJsonContains(String value, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.contains(
        property: r'polygonGeoJson',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      polygonGeoJsonMatches(String pattern, {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.matches(
        property: r'polygonGeoJson',
        wildcard: pattern,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      polygonGeoJsonIsEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'polygonGeoJson',
        value: '',
      ));
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterFilterCondition>
      polygonGeoJsonIsNotEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        property: r'polygonGeoJson',
        value: '',
      ));
    });
  }
}

extension CachedBlockQueryObject
    on QueryBuilder<CachedBlock, CachedBlock, QFilterCondition> {}

extension CachedBlockQueryLinks
    on QueryBuilder<CachedBlock, CachedBlock, QFilterCondition> {}

extension CachedBlockQuerySortBy
    on QueryBuilder<CachedBlock, CachedBlock, QSortBy> {
  QueryBuilder<CachedBlock, CachedBlock, QAfterSortBy> sortByAfdelingCode() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'afdelingCode', Sort.asc);
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterSortBy>
      sortByAfdelingCodeDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'afdelingCode', Sort.desc);
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterSortBy> sortByBlockCode() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'blockCode', Sort.asc);
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterSortBy> sortByBlockCodeDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'blockCode', Sort.desc);
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterSortBy> sortByBlockId() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'blockId', Sort.asc);
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterSortBy> sortByBlockIdDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'blockId', Sort.desc);
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterSortBy> sortByPlantingYear() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'plantingYear', Sort.asc);
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterSortBy>
      sortByPlantingYearDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'plantingYear', Sort.desc);
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterSortBy> sortByPolygonGeoJson() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'polygonGeoJson', Sort.asc);
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterSortBy>
      sortByPolygonGeoJsonDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'polygonGeoJson', Sort.desc);
    });
  }
}

extension CachedBlockQuerySortThenBy
    on QueryBuilder<CachedBlock, CachedBlock, QSortThenBy> {
  QueryBuilder<CachedBlock, CachedBlock, QAfterSortBy> thenByAfdelingCode() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'afdelingCode', Sort.asc);
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterSortBy>
      thenByAfdelingCodeDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'afdelingCode', Sort.desc);
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterSortBy> thenByBlockCode() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'blockCode', Sort.asc);
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterSortBy> thenByBlockCodeDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'blockCode', Sort.desc);
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterSortBy> thenByBlockId() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'blockId', Sort.asc);
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterSortBy> thenByBlockIdDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'blockId', Sort.desc);
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterSortBy> thenByLocalId() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'localId', Sort.asc);
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterSortBy> thenByLocalIdDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'localId', Sort.desc);
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterSortBy> thenByPlantingYear() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'plantingYear', Sort.asc);
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterSortBy>
      thenByPlantingYearDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'plantingYear', Sort.desc);
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterSortBy> thenByPolygonGeoJson() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'polygonGeoJson', Sort.asc);
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QAfterSortBy>
      thenByPolygonGeoJsonDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'polygonGeoJson', Sort.desc);
    });
  }
}

extension CachedBlockQueryWhereDistinct
    on QueryBuilder<CachedBlock, CachedBlock, QDistinct> {
  QueryBuilder<CachedBlock, CachedBlock, QDistinct> distinctByAfdelingCode(
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'afdelingCode', caseSensitive: caseSensitive);
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QDistinct> distinctByBlockCode(
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'blockCode', caseSensitive: caseSensitive);
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QDistinct> distinctByBlockId(
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'blockId', caseSensitive: caseSensitive);
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QDistinct> distinctByPlantingYear() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'plantingYear');
    });
  }

  QueryBuilder<CachedBlock, CachedBlock, QDistinct> distinctByPolygonGeoJson(
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'polygonGeoJson',
          caseSensitive: caseSensitive);
    });
  }
}

extension CachedBlockQueryProperty
    on QueryBuilder<CachedBlock, CachedBlock, QQueryProperty> {
  QueryBuilder<CachedBlock, int, QQueryOperations> localIdProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'localId');
    });
  }

  QueryBuilder<CachedBlock, String, QQueryOperations> afdelingCodeProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'afdelingCode');
    });
  }

  QueryBuilder<CachedBlock, String, QQueryOperations> blockCodeProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'blockCode');
    });
  }

  QueryBuilder<CachedBlock, String, QQueryOperations> blockIdProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'blockId');
    });
  }

  QueryBuilder<CachedBlock, int, QQueryOperations> plantingYearProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'plantingYear');
    });
  }

  QueryBuilder<CachedBlock, String, QQueryOperations> polygonGeoJsonProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'polygonGeoJson');
    });
  }
}

// coverage:ignore-file
// ignore_for_file: duplicate_ignore, non_constant_identifier_names, constant_identifier_names, invalid_use_of_protected_member, unnecessary_cast, prefer_const_constructors, lines_longer_than_80_chars, require_trailing_commas, inference_failure_on_function_invocation, unnecessary_parenthesis, unnecessary_raw_strings, unnecessary_null_checks, join_return_with_assignment, prefer_final_locals, avoid_js_rounded_ints, avoid_positional_boolean_parameters, always_specify_types

extension GetCachedTPHCollection on Isar {
  IsarCollection<CachedTPH> get cachedTPHs => this.collection();
}

const CachedTPHSchema = CollectionSchema(
  name: r'CachedTPH',
  id: -3024504362703784928,
  properties: {
    r'blockId': PropertySchema(
      id: 0,
      name: r'blockId',
      type: IsarType.string,
    ),
    r'latitude': PropertySchema(
      id: 1,
      name: r'latitude',
      type: IsarType.double,
    ),
    r'longitude': PropertySchema(
      id: 2,
      name: r'longitude',
      type: IsarType.double,
    ),
    r'qrCode': PropertySchema(
      id: 3,
      name: r'qrCode',
      type: IsarType.string,
    ),
    r'tphId': PropertySchema(
      id: 4,
      name: r'tphId',
      type: IsarType.string,
    ),
    r'tphNumber': PropertySchema(
      id: 5,
      name: r'tphNumber',
      type: IsarType.string,
    )
  },
  estimateSize: _cachedTPHEstimateSize,
  serialize: _cachedTPHSerialize,
  deserialize: _cachedTPHDeserialize,
  deserializeProp: _cachedTPHDeserializeProp,
  idName: r'localId',
  indexes: {
    r'tphId': IndexSchema(
      id: -6337004884452333292,
      name: r'tphId',
      unique: true,
      replace: false,
      properties: [
        IndexPropertySchema(
          name: r'tphId',
          type: IndexType.hash,
          caseSensitive: true,
        )
      ],
    ),
    r'blockId': IndexSchema(
      id: -413886092950911832,
      name: r'blockId',
      unique: false,
      replace: false,
      properties: [
        IndexPropertySchema(
          name: r'blockId',
          type: IndexType.hash,
          caseSensitive: true,
        )
      ],
    )
  },
  links: {},
  embeddedSchemas: {},
  getId: _cachedTPHGetId,
  getLinks: _cachedTPHGetLinks,
  attach: _cachedTPHAttach,
  version: '3.1.0+1',
);

int _cachedTPHEstimateSize(
  CachedTPH object,
  List<int> offsets,
  Map<Type, List<int>> allOffsets,
) {
  var bytesCount = offsets.last;
  bytesCount += 3 + object.blockId.length * 3;
  bytesCount += 3 + object.qrCode.length * 3;
  bytesCount += 3 + object.tphId.length * 3;
  bytesCount += 3 + object.tphNumber.length * 3;
  return bytesCount;
}

void _cachedTPHSerialize(
  CachedTPH object,
  IsarWriter writer,
  List<int> offsets,
  Map<Type, List<int>> allOffsets,
) {
  writer.writeString(offsets[0], object.blockId);
  writer.writeDouble(offsets[1], object.latitude);
  writer.writeDouble(offsets[2], object.longitude);
  writer.writeString(offsets[3], object.qrCode);
  writer.writeString(offsets[4], object.tphId);
  writer.writeString(offsets[5], object.tphNumber);
}

CachedTPH _cachedTPHDeserialize(
  Id id,
  IsarReader reader,
  List<int> offsets,
  Map<Type, List<int>> allOffsets,
) {
  final object = CachedTPH();
  object.blockId = reader.readString(offsets[0]);
  object.latitude = reader.readDouble(offsets[1]);
  object.localId = id;
  object.longitude = reader.readDouble(offsets[2]);
  object.qrCode = reader.readString(offsets[3]);
  object.tphId = reader.readString(offsets[4]);
  object.tphNumber = reader.readString(offsets[5]);
  return object;
}

P _cachedTPHDeserializeProp<P>(
  IsarReader reader,
  int propertyId,
  int offset,
  Map<Type, List<int>> allOffsets,
) {
  switch (propertyId) {
    case 0:
      return (reader.readString(offset)) as P;
    case 1:
      return (reader.readDouble(offset)) as P;
    case 2:
      return (reader.readDouble(offset)) as P;
    case 3:
      return (reader.readString(offset)) as P;
    case 4:
      return (reader.readString(offset)) as P;
    case 5:
      return (reader.readString(offset)) as P;
    default:
      throw IsarError('Unknown property with id $propertyId');
  }
}

Id _cachedTPHGetId(CachedTPH object) {
  return object.localId;
}

List<IsarLinkBase<dynamic>> _cachedTPHGetLinks(CachedTPH object) {
  return [];
}

void _cachedTPHAttach(IsarCollection<dynamic> col, Id id, CachedTPH object) {
  object.localId = id;
}

extension CachedTPHByIndex on IsarCollection<CachedTPH> {
  Future<CachedTPH?> getByTphId(String tphId) {
    return getByIndex(r'tphId', [tphId]);
  }

  CachedTPH? getByTphIdSync(String tphId) {
    return getByIndexSync(r'tphId', [tphId]);
  }

  Future<bool> deleteByTphId(String tphId) {
    return deleteByIndex(r'tphId', [tphId]);
  }

  bool deleteByTphIdSync(String tphId) {
    return deleteByIndexSync(r'tphId', [tphId]);
  }

  Future<List<CachedTPH?>> getAllByTphId(List<String> tphIdValues) {
    final values = tphIdValues.map((e) => [e]).toList();
    return getAllByIndex(r'tphId', values);
  }

  List<CachedTPH?> getAllByTphIdSync(List<String> tphIdValues) {
    final values = tphIdValues.map((e) => [e]).toList();
    return getAllByIndexSync(r'tphId', values);
  }

  Future<int> deleteAllByTphId(List<String> tphIdValues) {
    final values = tphIdValues.map((e) => [e]).toList();
    return deleteAllByIndex(r'tphId', values);
  }

  int deleteAllByTphIdSync(List<String> tphIdValues) {
    final values = tphIdValues.map((e) => [e]).toList();
    return deleteAllByIndexSync(r'tphId', values);
  }

  Future<Id> putByTphId(CachedTPH object) {
    return putByIndex(r'tphId', object);
  }

  Id putByTphIdSync(CachedTPH object, {bool saveLinks = true}) {
    return putByIndexSync(r'tphId', object, saveLinks: saveLinks);
  }

  Future<List<Id>> putAllByTphId(List<CachedTPH> objects) {
    return putAllByIndex(r'tphId', objects);
  }

  List<Id> putAllByTphIdSync(List<CachedTPH> objects, {bool saveLinks = true}) {
    return putAllByIndexSync(r'tphId', objects, saveLinks: saveLinks);
  }
}

extension CachedTPHQueryWhereSort
    on QueryBuilder<CachedTPH, CachedTPH, QWhere> {
  QueryBuilder<CachedTPH, CachedTPH, QAfterWhere> anyLocalId() {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(const IdWhereClause.any());
    });
  }
}

extension CachedTPHQueryWhere
    on QueryBuilder<CachedTPH, CachedTPH, QWhereClause> {
  QueryBuilder<CachedTPH, CachedTPH, QAfterWhereClause> localIdEqualTo(
      Id localId) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IdWhereClause.between(
        lower: localId,
        upper: localId,
      ));
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterWhereClause> localIdNotEqualTo(
      Id localId) {
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterWhereClause> localIdGreaterThan(
      Id localId,
      {bool include = false}) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(
        IdWhereClause.greaterThan(lower: localId, includeLower: include),
      );
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterWhereClause> localIdLessThan(
      Id localId,
      {bool include = false}) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(
        IdWhereClause.lessThan(upper: localId, includeUpper: include),
      );
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterWhereClause> localIdBetween(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterWhereClause> tphIdEqualTo(
      String tphId) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.equalTo(
        indexName: r'tphId',
        value: [tphId],
      ));
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterWhereClause> tphIdNotEqualTo(
      String tphId) {
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterWhereClause> blockIdEqualTo(
      String blockId) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.equalTo(
        indexName: r'blockId',
        value: [blockId],
      ));
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterWhereClause> blockIdNotEqualTo(
      String blockId) {
    return QueryBuilder.apply(this, (query) {
      if (query.whereSort == Sort.asc) {
        return query
            .addWhereClause(IndexWhereClause.between(
              indexName: r'blockId',
              lower: [],
              upper: [blockId],
              includeUpper: false,
            ))
            .addWhereClause(IndexWhereClause.between(
              indexName: r'blockId',
              lower: [blockId],
              includeLower: false,
              upper: [],
            ));
      } else {
        return query
            .addWhereClause(IndexWhereClause.between(
              indexName: r'blockId',
              lower: [blockId],
              includeLower: false,
              upper: [],
            ))
            .addWhereClause(IndexWhereClause.between(
              indexName: r'blockId',
              lower: [],
              upper: [blockId],
              includeUpper: false,
            ));
      }
    });
  }
}

extension CachedTPHQueryFilter
    on QueryBuilder<CachedTPH, CachedTPH, QFilterCondition> {
  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> blockIdEqualTo(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> blockIdGreaterThan(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> blockIdLessThan(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> blockIdBetween(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> blockIdStartsWith(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> blockIdEndsWith(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> blockIdContains(
      String value,
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.contains(
        property: r'blockId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> blockIdMatches(
      String pattern,
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.matches(
        property: r'blockId',
        wildcard: pattern,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> blockIdIsEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'blockId',
        value: '',
      ));
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition>
      blockIdIsNotEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        property: r'blockId',
        value: '',
      ));
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> latitudeEqualTo(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> latitudeGreaterThan(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> latitudeLessThan(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> latitudeBetween(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> localIdEqualTo(
      Id value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'localId',
        value: value,
      ));
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> localIdGreaterThan(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> localIdLessThan(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> localIdBetween(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> longitudeEqualTo(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition>
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> longitudeLessThan(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> longitudeBetween(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> qrCodeEqualTo(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'qrCode',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> qrCodeGreaterThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'qrCode',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> qrCodeLessThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'qrCode',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> qrCodeBetween(
    String lower,
    String upper, {
    bool includeLower = true,
    bool includeUpper = true,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'qrCode',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> qrCodeStartsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.startsWith(
        property: r'qrCode',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> qrCodeEndsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.endsWith(
        property: r'qrCode',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> qrCodeContains(
      String value,
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.contains(
        property: r'qrCode',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> qrCodeMatches(
      String pattern,
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.matches(
        property: r'qrCode',
        wildcard: pattern,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> qrCodeIsEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'qrCode',
        value: '',
      ));
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> qrCodeIsNotEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        property: r'qrCode',
        value: '',
      ));
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> tphIdEqualTo(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> tphIdGreaterThan(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> tphIdLessThan(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> tphIdBetween(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> tphIdStartsWith(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> tphIdEndsWith(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> tphIdContains(
      String value,
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.contains(
        property: r'tphId',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> tphIdMatches(
      String pattern,
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.matches(
        property: r'tphId',
        wildcard: pattern,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> tphIdIsEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'tphId',
        value: '',
      ));
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> tphIdIsNotEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        property: r'tphId',
        value: '',
      ));
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> tphNumberEqualTo(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition>
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> tphNumberLessThan(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> tphNumberBetween(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> tphNumberStartsWith(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> tphNumberEndsWith(
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

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> tphNumberContains(
      String value,
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.contains(
        property: r'tphNumber',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> tphNumberMatches(
      String pattern,
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.matches(
        property: r'tphNumber',
        wildcard: pattern,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition> tphNumberIsEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'tphNumber',
        value: '',
      ));
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterFilterCondition>
      tphNumberIsNotEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        property: r'tphNumber',
        value: '',
      ));
    });
  }
}

extension CachedTPHQueryObject
    on QueryBuilder<CachedTPH, CachedTPH, QFilterCondition> {}

extension CachedTPHQueryLinks
    on QueryBuilder<CachedTPH, CachedTPH, QFilterCondition> {}

extension CachedTPHQuerySortBy on QueryBuilder<CachedTPH, CachedTPH, QSortBy> {
  QueryBuilder<CachedTPH, CachedTPH, QAfterSortBy> sortByBlockId() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'blockId', Sort.asc);
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterSortBy> sortByBlockIdDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'blockId', Sort.desc);
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterSortBy> sortByLatitude() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'latitude', Sort.asc);
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterSortBy> sortByLatitudeDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'latitude', Sort.desc);
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterSortBy> sortByLongitude() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'longitude', Sort.asc);
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterSortBy> sortByLongitudeDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'longitude', Sort.desc);
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterSortBy> sortByQrCode() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'qrCode', Sort.asc);
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterSortBy> sortByQrCodeDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'qrCode', Sort.desc);
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterSortBy> sortByTphId() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'tphId', Sort.asc);
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterSortBy> sortByTphIdDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'tphId', Sort.desc);
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterSortBy> sortByTphNumber() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'tphNumber', Sort.asc);
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterSortBy> sortByTphNumberDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'tphNumber', Sort.desc);
    });
  }
}

extension CachedTPHQuerySortThenBy
    on QueryBuilder<CachedTPH, CachedTPH, QSortThenBy> {
  QueryBuilder<CachedTPH, CachedTPH, QAfterSortBy> thenByBlockId() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'blockId', Sort.asc);
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterSortBy> thenByBlockIdDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'blockId', Sort.desc);
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterSortBy> thenByLatitude() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'latitude', Sort.asc);
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterSortBy> thenByLatitudeDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'latitude', Sort.desc);
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterSortBy> thenByLocalId() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'localId', Sort.asc);
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterSortBy> thenByLocalIdDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'localId', Sort.desc);
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterSortBy> thenByLongitude() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'longitude', Sort.asc);
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterSortBy> thenByLongitudeDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'longitude', Sort.desc);
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterSortBy> thenByQrCode() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'qrCode', Sort.asc);
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterSortBy> thenByQrCodeDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'qrCode', Sort.desc);
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterSortBy> thenByTphId() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'tphId', Sort.asc);
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterSortBy> thenByTphIdDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'tphId', Sort.desc);
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterSortBy> thenByTphNumber() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'tphNumber', Sort.asc);
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QAfterSortBy> thenByTphNumberDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'tphNumber', Sort.desc);
    });
  }
}

extension CachedTPHQueryWhereDistinct
    on QueryBuilder<CachedTPH, CachedTPH, QDistinct> {
  QueryBuilder<CachedTPH, CachedTPH, QDistinct> distinctByBlockId(
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'blockId', caseSensitive: caseSensitive);
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QDistinct> distinctByLatitude() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'latitude');
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QDistinct> distinctByLongitude() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'longitude');
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QDistinct> distinctByQrCode(
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'qrCode', caseSensitive: caseSensitive);
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QDistinct> distinctByTphId(
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'tphId', caseSensitive: caseSensitive);
    });
  }

  QueryBuilder<CachedTPH, CachedTPH, QDistinct> distinctByTphNumber(
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'tphNumber', caseSensitive: caseSensitive);
    });
  }
}

extension CachedTPHQueryProperty
    on QueryBuilder<CachedTPH, CachedTPH, QQueryProperty> {
  QueryBuilder<CachedTPH, int, QQueryOperations> localIdProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'localId');
    });
  }

  QueryBuilder<CachedTPH, String, QQueryOperations> blockIdProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'blockId');
    });
  }

  QueryBuilder<CachedTPH, double, QQueryOperations> latitudeProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'latitude');
    });
  }

  QueryBuilder<CachedTPH, double, QQueryOperations> longitudeProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'longitude');
    });
  }

  QueryBuilder<CachedTPH, String, QQueryOperations> qrCodeProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'qrCode');
    });
  }

  QueryBuilder<CachedTPH, String, QQueryOperations> tphIdProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'tphId');
    });
  }

  QueryBuilder<CachedTPH, String, QQueryOperations> tphNumberProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'tphNumber');
    });
  }
}
