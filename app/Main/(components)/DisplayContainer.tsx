'use client';
import React, { useState } from 'react';
import VisualizeDB from './VisualizeDB';
import VisualizeSchemaResolver from './VisualizeSchemaResolver';
const DisplayContainer = ({
  displayMode,
  uri,
  setURImeth,
  uriLaunch,
  resQL,
  setResQL,
  schemaGen,
  resolverGen,
}) => {
  // const [displayMode, setDisplayMode] = useState('');
  // const [uri, setURI] = useState('');
  // const [resQL, setResQL] = useState('');

  // const setURImeth = (e) => {
  //   console.log(e.target.value, ' line 9 in main container');
  //   setURI(e.target.value);
  // };

  return (
    <>
      <div className="DisplayContainer">
        <VisualizeSchemaResolver
          displayMode={displayMode}
          uri={uri}
          resQL={resQL}
          schemaGen={schemaGen}
          resolverGen={resolverGen}
        />
        <VisualizeDB
          uri={uri}
          setURImeth={setURImeth}
          resQL={resQL}
          setResQL={setResQL}
          uriLaunch={uriLaunch}
          schemaGen={schemaGen}
          resolverGen={resolverGen}
        />
      </div>
    </>
  );
};

export default DisplayContainer;
