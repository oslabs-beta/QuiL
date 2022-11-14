export const DataType: string =`
type Data {
  nodes: [Node],
  resolvers: [String],
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
}`
