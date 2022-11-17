'use client';
import { CopyTwoTone } from '@ant-design/icons';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import ReactCodeMirror from '@uiw/react-codemirror';
import React, { useState } from 'react';
import { ResolverProps } from '../../(root)/fronendTypes';
import { ResolverStrings } from '../../../server/types';

type ResolverMirrorProps = {
  value: any;
  tableName: any;
};

export const ResolverMirror = ({ value }: ResolverMirrorProps) => {
  return (
    <div>
      <ReactCodeMirror
        value={value}
        height="80%"
        width="100%"
        extensions={[javascript({ jsx: true })]}
        theme={dracula}
      />
    </div>
  );
};

export const Card = ({ value, tableName }: ResolverMirrorProps) => {
  const [copyStatus, setCopyStatus] = useState('Copy');

  const onClick = () => {
    navigator.clipboard.writeText(value);
    setCopyStatus('Copied!');
    setTimeout(() => {
      setCopyStatus('Copy');
    }, 5000);
  };
  return (
    <div style={{ margin: '25px' }}>
      <div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3 className="font-bold">
              {tableName[0].toUpperCase() +
                tableName.substring(1, tableName.length)}
            </h3>
            <div className="tooltip" data-tip={copyStatus}>
              <button className="btn btn-xs sm:btn-sm" onClick={onClick}>
                <CopyTwoTone />
              </button>
            </div>
          </div>
          <ResolverMirror value={value} />
        </div>
      </div>
    </div>
  );
};
