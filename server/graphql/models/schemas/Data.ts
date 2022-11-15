export const DataType: string = `
type Data {
  nodes: [Node],
  resolverStrings: [ResolverStrings],
  schemas: [String]
}

type Node {
  name: String, 
  primaryKey: String,
  columns: [ColumnData],
  edges: [Edge]
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
  getOneString: String, 
  getAllString: String
}`;
