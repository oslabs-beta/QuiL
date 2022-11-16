import { ResolverProps } from '../../(root)/fronendTypes';
import ReactCodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import React from 'react';
import res from '../(flow)/dummyRes';
import { Card, ResolverMirror } from './ResolverDisplay';
import { ResolverStrings } from '../../../server/types';

const Resolver = ({ resQL }: ResolverProps): JSX.Element => {
  // const onChange = React.useCallback((value, viewUpdate) => {
  //   console.log("value:", value);
  // }, []);

  const { resolvers } = resQL.data.getAllData;

  return (
    <div className="">
      {resolvers.map((e: ResolverStrings) => (
        <Card value={e.getAllString} title={e.tableName} />
      ))}
    </div>
  );
};

export default Resolver;
