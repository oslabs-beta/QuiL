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


// moved a lot of the functionality orginially here to DisplayContainer

const nodeTypes = { tableNode: TableNode };

const Flow = ({nodes, edges, setNodes, setEdges}) => {

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
