'use client';
import React, { useState, useCallback } from 'react';
import VisualizeDB from './VisualizeDB';
import VisualizeSchemaResolver from './VisualizeSchemaResolver';
import ReactFlow, {Node, Edge} from 'reactflow';
import res from '../(flow)/dummyRes';
const DisplayContainer = ({ displayMode, setDisplayMode, uri, setURImeth, uriLaunch, resQL, setResQL, schemaGen, resolverGen, edges, nodes, setEdges, setNodes
}) => {

  return (
    <>
      <div className="DisplayContainer">
        <VisualizeSchemaResolver
          displayMode={displayMode}
          setDisplayMode={setDisplayMode}
          uri={uri}
          resQL={resQL}
          setResQL={setResQL}
          schemaGen={schemaGen}
          resolverGen={resolverGen}
        />
        <VisualizeDB
          setDisplayMode={setDisplayMode}
          uri={uri}
          setURImeth={setURImeth}
          resQL={resQL}
          setResQL={setResQL}
          nodes={nodes}
          setNodes={setNodes}
          setEdges={setEdges}
          edges={edges}
          uriLaunch={uriLaunch}
          schemaGen={schemaGen}
          resolverGen={resolverGen}
        />
      </div>
    </>
  );
};

export default DisplayContainer;
