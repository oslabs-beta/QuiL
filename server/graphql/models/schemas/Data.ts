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

type ProjectData {
  name: String,
  owner_id: Int,
  saved_db: String,
  _id: Int
}

type SchemasObject {
  tableName: String,
  schemas: String
}`;
