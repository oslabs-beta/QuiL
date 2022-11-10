const createNodes = (res) => {
  const positions = [
    { x: 0, y: 0 },
    { x: 500, y: 0 },
    { x: 0, y: 350 },
    { x: 500, y: 350 },
    { x: 0, y: 700 },
    { x: 500, y: 700 },
    { x: 0, y: 1050 },
    { x: 500, y: 1050 },
    { x: 0, y: 1400 },
    { x: 500, y: 1400 },
    { x: 0, y: 1750 },
    { x: 500, y: 1750 },
    { x: 0, y: 2100 },
    { x: 500, y: 2100 },
    { x: 0, y: 2450 },
    { x: 500, y: 2450 },
    { x: 0, y: 2450 },
  ];
  // pass down an array of FKeys so that each row can check to see their dataType is a foreign key, 
  // in 
  const arrFKeys = [];
  // array of tableNames that needs a handle. 'refTables will be passed down to each TableNode to
  // determine whether the TableNode needs a target <Handle />
  const refTables = [];
  // array of nodes from response
  const resNodes = res.data.getGraph.nodes;
  // map through the nodes and create template for each node
  const nodes = resNodes.map((node, i) => {
    // check to see if current node has any edges
    if (node.edges.length !== 0) {
      // if so, loop through edges and push the name refTable to 'refTables'
      node.edges.forEach((edge) => {
        refTables.push(edge.refTable);
        arrFKeys.push(edge.FKey);
      });
    }
    return {
      id: node.name,
      type: "tableNode",
      position: positions[i],
      data: {
        name: node.name,
        key: i,
        columns: node.columns,
        edges: node.edges,
        refTables: refTables,
        arrFKeys: arrFKeys,
      },
    };
  });

  return nodes;
};

export default createNodes;
