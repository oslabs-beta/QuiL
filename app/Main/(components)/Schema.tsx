import { SchemaProps } from '../../(root)/fronendTypes';
import React, { useState } from 'react';
import ReactCodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';

const Schema = ({ resQL }: SchemaProps): JSX.Element => {
  const [copyStatus, setCopyStatus] = useState('Copy');

  const { schemas } = resQL.data.getAllData;
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

export default Schema;
