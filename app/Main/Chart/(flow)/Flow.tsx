"use client";
import React, { useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  NodeChange, // TS Generic
  EdgeChange, // TS Generic
  Connection, // TS Generic
  addEdge,
} from "reactflow";
import TableNode from "./TableNode";
import "reactflow/dist/style.css";
import { FlowProps } from "../../../(root)/frontendTypes";
import { motion } from "framer-motion";

const nodeTypes = { tableNode: TableNode };

const Flow = ({ nodes, edges, handleSetNodes, handleSetEdges }: FlowProps) => {
  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      handleSetNodes((nds) => applyNodeChanges(changes, nds)),
    [handleSetNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      handleSetEdges((eds) => applyEdgeChanges(changes, eds)),
    [handleSetEdges]
  );

  const onConnect = useCallback(
    (connection: Connection) =>
      handleSetEdges((eds) => addEdge(connection, eds)),
    [handleSetEdges]
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
        <Background className="bg-base-content" size={4} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Flow;
