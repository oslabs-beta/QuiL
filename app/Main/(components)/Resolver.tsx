import {ResolverProps} from "../../(root)/fronendTypes"
import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
import React from 'react';
const Resolver = ({ resQL }: ResolverProps): JSX.Element => {
  const onChange = React.useCallback((value, viewUpdate) => {
    console.log("value:", value);
  }, []);


  return (
    <div className=''>
      <ReactCodeMirror
        value={resQL.data.getAllData.resolvers.map(e => e.getOneString).join('')}
        height='80%'
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
        theme={dracula}
      />
    </div>
  );
};

export default Resolver;
