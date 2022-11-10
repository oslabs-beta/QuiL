'use client';
import React, { useState, useCallback } from 'react';
import VisualizeDB from './VisualizeDB';
import VisualizeSchemaResolver from './VisualizeSchemaResolver';
import ReactFlow, {Node, Edge} from 'reactflow';
import res from '../(flow)/dummyRes';
const DisplayContainer = () => {
  const [displayMode, setDisplayMode] = useState('');
  const [uri, setURI] = useState('');
  const [resQL, setResQL] = useState(null); // changed from useState('') to useState(null)
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  return (
    <>
      <div className="DisplayContainer">
        <VisualizeSchemaResolver
          displayMode={displayMode}
          setDisplayMode={setDisplayMode}
          uri={uri}
          setURI={setURI}
          resQL={resQL}
          setResQL={setResQL}
        />
        <VisualizeDB
          setDisplayMode={setDisplayMode}
          uri={uri}
          setURI={setURI}
          resQL={resQL}
          setResQL={setResQL}
          nodes={nodes}
          setNodes={setNodes}
          edges={edges}
          setEdges={setEdges}
        />
      </div>
    </>
  );
};

export default DisplayContainer;
