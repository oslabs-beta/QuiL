"use client";
import { useState, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  Node, // TS Generic, array of Nodes
  Edge, // TS Generic, array of Edges
  NodeChange, // TS Generic
  EdgeChange, // TS Generic
  Connection, // TS Generic
  addEdge,
} from "reactflow";
import TableNode from "./TableNode";
import "reactflow/dist/style.css";
import res from "./dummyRes";
import createNodes from "./Nodes";
import createEdges from "./Edges";

const initialNodes = createNodes(res);

// const initialEdges = createEdges(res);
const initialEdges = createEdges(res);
const nodeTypes = { tableNode: TableNode };

const Flow = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div style={{ height: "100%", background: "grey" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Flow;
