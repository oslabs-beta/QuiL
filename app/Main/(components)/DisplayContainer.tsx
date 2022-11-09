'use client';
import React, { useState } from 'react';
import VisualizeDB from './VisualizeDB';
import VisualizeSchemaResolver from './VisualizeSchemaResolver';
const DisplayContainer = () => {
  const [displayMode, setDisplayMode] = useState('');
  const [uri, setURI] = useState('');

  return (
    <>
      <div className="MainContainer">
        <VisualizeSchemaResolver
          displayMode={displayMode}
          setDisplayMode={setDisplayMode}
          uri={uri}
          setURI={setURI}
        />
        <VisualizeDB
          setDisplayMode={setDisplayMode}
          uri={uri}
          setURI={setURI}
        />
      </div>
    </>
  );
};

export default DisplayContainer;
