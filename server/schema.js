const node1 = {
  name: 'planets',
  primaryKey: '_id',
  attributeNames: [
    { columnName: 'name', dataType: 'String' },
    { columnName: 'rotation_speed', dataType: 'String' },
    { columnName: 'size', dataType: 'String' },
  ],
  edges: [],
};

const node2 = {
  name: 'species',
  primaryKey: '_id',
  attributeNames: [
    { columnName: 'name', dataType: 'String' },
    { columnName: 'weight', dataType: 'String' },
    { columnName: 'color', dataType: 'String' },
  ],
  edges: [],
};

const node3 = {
  name: 'people',
  primaryKey: '_id',
  attributeNames: [
    { columnName: 'name', dataType: 'String' },
    { columnName: 'height', dataType: 'String' },
    { columnName: 'species_id', dataType: 'String' },
  ],
  edges: [
    {
      fKey: 'homeworld_id',
      refTable: 'planets',
    },
    {
      fKey: 'species_id',
      refTable: 'species',
    },
  ],
};

const makeGraph = (x, y, z) => {
  return {
    nodes: [x, y, z],
  };
};

module.exports = {
  resolvers: {
    Query: {
      getGraph: () => makeGraph(node1, node2, node3),
    },
  },

  typeDefs: `#graphql
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

    type Graph {
      nodes: [Node]
    }

    type Node {
      id: String, 
      primaryKey: String,
      attributeNames: [ColumnData],
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
    


    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).

    
    type Query {
        getGraph: Graph,
    }
    `,
};
