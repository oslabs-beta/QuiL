export const DataType: string = `
type Data {
  nodes: [Node],
  resolvers: [ResolverStrings],
  schemas: [SchemasObject]
}

type Node {
  name: String, 
  primaryKey: String,
  columns: [ColumnData],
  edges: [Edge], 
  isIntersectionTable: Boolean
}

type ColumnData {
  columnName: String, 
  dataType: String
}

type Edge {
  fKey: String,
  refTable: String
}

type ResolverStrings {
  tableName: String,
  resolver: String
}

type SchemasObject {
  tableName: String,
  schemas: String
}`;
