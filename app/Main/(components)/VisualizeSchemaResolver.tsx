'use client';
import React, { useState } from 'react';
import Schema from './Schema';
import Resolver from './Resolver';

const VisualizeSchemaResolver = ({
  displayMode,
  setDisplayMode,
  uri,
  resQL,
}) => {
  const schemaGen = () => {
    console.log('inside the schemaGen');
    setDisplayMode('schemaMode');
  };

  const resolverGen = () => {
    console.log('inside the resolverGen');
    setDisplayMode('resolverMode');
  };

  if (displayMode === 'schemaMode') {
    return (
      <div className="VisualizeSchemaResolver">
        <div className="mainButtons">
          <button onClick={schemaGen} className="SchemaBtn">
            Schema
          </button>
          <button onClick={resolverGen} className="ResolverBtn">
            Resolver
          </button>
        </div>
        <Schema resQL={resQL} uri={uri} />
      </div>
    );
  } else if (displayMode === 'resolverMode') {
    return (
      <div className="VisualizeSchemaResolver">
        <div className="mainButtons">
          <button onClick={schemaGen} className="SchemaBtn">
            Schema
          </button>
          <button onClick={resolverGen} className="ResolverBtn">
            Resolver
          </button>
        </div>
        <Resolver resQL={resQL} uri={uri} />
      </div>
    );
  } else {
    return (
      <div className="VisualizeSchemaResolver">
        <div className="mainButtons">
          <button onClick={schemaGen} className="SchemaBtn">
            Schema
          </button>
          <button onClick={resolverGen} className="ResolverBtn">
            Resolver
          </button>
        </div>
      </div>
    );
  }
};

export default VisualizeSchemaResolver;
