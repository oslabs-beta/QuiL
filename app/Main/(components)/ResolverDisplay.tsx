import { ResolverProps } from '../../(root)/fronendTypes';
import ReactCodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import React from 'react';
import { ResolverStrings } from '../../../server/types';
import { CopyTwoTone } from '@ant-design/icons';

type ResolverMirrorProps = {
  value: any;
  title: any;
};

export const ResolverMirror = ({ value }: ResolverMirrorProps) => {
  // const onChange = React.useCallback((value, viewUpdate) => {
  //   console.log("value:", value);
  // }, []);

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
{
  /* <ResolverMirror value={value} />; */
}

export const Card = ({ value, title }: ResolverMirrorProps) => {
  return (
    <div style={{ margin: '25px' }}>
      <div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3 className="font-bold">{title}</h3>
            <button className="btn btn-xs sm:btn-sm">
              <CopyTwoTone />
            </button>
          </div>

          <ResolverMirror value={value} />
        </div>
      </div>
    </div>
  );
};
