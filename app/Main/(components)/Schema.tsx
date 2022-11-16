import { SchemaProps } from "../../(root)/fronendTypes";
import React from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
const Schema = ({ resQL }: SchemaProps): JSX.Element => {
  const onChange = React.useCallback((value, viewUpdate) => {
    console.log("value:", value);
  }, []);


  return (
    <div className=''>
      <ReactCodeMirror
        value={resQL.data.getAllData.schemas}
        height='80%'
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
        theme={dracula}
      />
    </div>
  );
};

export default Schema;
