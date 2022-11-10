const createEdges = (res) => {
  const edges = [];
  const nodes = res.data.getGraph.nodes;
  nodes.forEach((node, i) => {
    if (node.edges.length !== 0) {
      node.edges.forEach((edge) => {
        const target = edge.refTable;
        const newEdge = {
          id: `${node.name}-${target}`,
          source: node.name,
          sourceHandle: edge.FKey,
          targetHandle: i,
          target: target,
        };
        console.log(newEdge.sourceHandle);
        edges.push(newEdge);
      });
    }
  });
  return edges;
};

export default createEdges;
