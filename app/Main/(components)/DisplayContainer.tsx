'use client';
import React from 'react';
import VisualizeDB from './VisualizeDB';
import VisualizeSchemaResolver from './VisualizeSchemaResolver';
import { DisplayContainerProps } from '../../(root)/fronendTypes';

const DisplayContainer = ({ displayMode, userInputURI, uriLaunch, resQL, schemaGen, resolverGen, edges, nodes, handleSetEdges, handleSetNodes
} : DisplayContainerProps ): JSX.Element => {

  return (
    <>
      <div className="DisplayContainer">
        <VisualizeSchemaResolver
          displayMode={displayMode}
          resQL={resQL}
          schemaGen={schemaGen}
          resolverGen={resolverGen}
        />
        <VisualizeDB
          userInputURI={userInputURI}
          nodes={nodes}
          handleSetNodes={handleSetNodes}
          handleSetEdges={handleSetEdges}
          edges={edges}
          uriLaunch={uriLaunch}
        />
      </div>
    </>
  );
};

export default DisplayContainer;
