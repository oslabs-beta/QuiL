import { ResolverProps } from '../../../(root)/frontendTypes';
import React, { useState } from 'react';
import { Card } from './ResolverDisplay';
import { ResolverStrings } from '../../../../server/types';

const Resolver = ({ resQL }: ResolverProps): JSX.Element => {
  const [copyStatus, setCopyStatus] = useState('Copy');
  if (Object.keys(resQL).length === 0) return;
  const { resolvers } = resQL.data.getAllData;

  const onClick = () => {
    const allResolvers = resolvers.reduce((all, curr) => {
      return all + curr.resolver;
    }, '');

    const formatted = `Query {` + allResolvers + `\n }`;
    navigator.clipboard.writeText(formatted);
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
      {resolvers.map((e: ResolverStrings) => (
        <Card
          value={`Query: {    ` + e.resolver + `\n }`}
          tableName={e.tableName}
        />
      ))}
    </div>
  );
};

export default Resolver;
