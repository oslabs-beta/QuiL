import { Edge } from "reactflow";
import { edge, resQL } from "../../(root)/fronendTypes";

const createEdges = (res : resQL) : Edge[] => {
  // edges array to be populated and sent to Flow to render
  const edges : Edge[] = [];
  // array of nodes from response
  const nodes = res.data.getAllData.nodes;
  // loop through each node from response
  nodes.forEach((node, i) => {
    // check to see if each node has any edges
    if (node.edges.length !== 0) {
      // if so, loop through edges of current node
      node.edges.forEach((edge) => {
        const newEdge = {
          id: `${node.name}-${edge.refTable}`,
          source: node.name,
          sourceHandle: edge.fKey,
          targetHandle: edge.refTable,
          target: edge.refTable,
        };
        console.log(newEdge.sourceHandle);
        edges.push(newEdge);
      });
    }
  });
  return edges;
};

export default createEdges;
