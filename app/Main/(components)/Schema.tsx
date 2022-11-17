import { SchemaProps } from '../../(root)/fronendTypes';
import React, { useState } from 'react';
import { Card } from './ResolverDisplay';
import { SchemaType } from '../../../server/types';

const Schema = ({ resQL }: SchemaProps): JSX.Element => {
  const [copyStatus, setCopyStatus] = useState('Copy');

  const { schemas } = resQL.data.getAllData;
  const onClick = () => {
    // const allResolvers = resolvers.reduce((all, curr) => {
    //   return all + curr.resolver;
    // }, '');

    // const formatted = `Query {` + allResolvers + `\n }`;
    navigator.clipboard.writeText('s');
    setCopyStatus('Copied!');
    setTimeout(() => {
      setCopyStatus('Copy');
    }, 5000);
  };

  return (
    <div className="">
      <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <div className="tooltip" data-tip={copyStatus}>
          <button className="btn btn-xs" onClick={onClick}>
            Copy All
          </button>
        </div>
      </div>
      {schemas.map((e: SchemaType) => (
        <Card value={e.schema} tableName={e.tableName} />
      ))}
    </div>
  );
};

export default Schema;
