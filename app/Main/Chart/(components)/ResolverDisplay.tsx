'use client';
import { CopyTwoTone } from '@ant-design/icons';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import ReactCodeMirror from '@uiw/react-codemirror';
import React, { useState } from 'react';

type CardProps = {
  tableName: string;
  value: any;
};

type ResolverMirrorProps = {
  value: any;
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

export const Card = ({ value, tableName }: CardProps) => {
  const [copyStatus, setCopyStatus] = useState('Copy');

  const onClick = () => {
    navigator.clipboard.writeText(value);
    setCopyStatus('Copied!');
    setTimeout(() => {
      setCopyStatus('Copy');
    }, 5000);
  };
  return (
    <div className="min-w-full max-w-fit">
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
    </div>
  );
};
