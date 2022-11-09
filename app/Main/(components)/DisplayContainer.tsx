'use client';
import React, { useState } from 'react';
import VisualizeDB from './VisualizeDB';
import VisualizeSchemaResolver from './VisualizeSchemaResolver';
const DisplayContainer = () => {
  const [displayMode, setDisplayMode] = useState('');

  return (
    <>
      <div className="MainContainer">
        <VisualizeSchemaResolver
          displayMode={displayMode}
          setDisplayMode={setDisplayMode}
        />
        <VisualizeDB setDisplayMode={setDisplayMode} />
      </div>
    </>
  );
};

export default DisplayContainer;
