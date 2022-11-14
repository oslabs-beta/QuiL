'use client';
import React, { useState } from 'react';
import Schema from './Schema';
import Resolver from './Resolver';
import { VisualizeSchemaResolverProps } from '../../(root)/fronendTypes';
const VisualizeSchemaResolver = ({
  displayMode,
  resQL,
  schemaGen,
  resolverGen,
}:VisualizeSchemaResolverProps): JSX.Element => {
  if (displayMode === 'schemaMode') {
    return (
      <div className="VisualizeSchemaResolver">
        <div className="mainButtons">
          <button onClick={() => schemaGen()} className="SchemaBtn">
            Schema
          </button>
          <button onClick={() => resolverGen()} className="ResolverBtn">
            Resolver
          </button>
        </div>
        <Schema resQL={resQL} />
      </div>
    );
  } else if (displayMode === 'resolverMode') {
    return (
      <div className="VisualizeSchemaResolver">
        <div className="mainButtons">
          <button onClick={() => schemaGen()} className="SchemaBtn">
            Schema
          </button>
          <button onClick={() => resolverGen()} className="ResolverBtn">
            Resolver
          </button>
        </div>
        <Resolver resQL={resQL} />
      </div>
    );
  } else {
    return (
      <div className="VisualizeSchemaResolver">
        <div className="mainButtons">
          <button onClick={() => schemaGen()} className="SchemaBtn">
            Schema
          </button>
          <button onClick={() => resolverGen()} className="ResolverBtn">
            Resolver
          </button>
        </div>
      </div>
    );
  }
};

export default VisualizeSchemaResolver;
