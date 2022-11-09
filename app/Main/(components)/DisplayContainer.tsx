'use client';
import React, { useState } from 'react';
import VisualizeDB from './VisualizeDB';
import VisualizeSchemaResolver from './VisualizeSchemaResolver';
const DisplayContainer = () => {
  const [displayMode, setDisplayMode] = useState('');
  const [uri, setURI] = useState('');
  const [resQL, setResQL] = useState('');

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
          res={resQL}
          setResQL={setResQL}
        />
      </div>
    </>
  );
};

export default DisplayContainer;
