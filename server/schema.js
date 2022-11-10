const { sendNodes } = require('./middleware/databaseHandler');

module.exports = {
  resolvers: {
    Query: {
      getNodes: (_, args) => sendNodes(args.uri),
    },
  },

  typeDefs: `#graphql
  
    type VisualData {
      nodes: [Node]
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

    type Query {
        getNodes(uri: String): VisualData,
    }
    `,
};
