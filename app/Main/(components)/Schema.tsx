import { SchemaProps } from "../../(root)/fronendTypes";
import React from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
const Schema = ({ resQL }: SchemaProps): JSX.Element => {
  const onChange = React.useCallback((value, viewUpdate) => {
    console.log("value:", value);
  }, []);
  const test =
    "type Node { \n  name: String, \n  primaryKey: String,\n  columns: [ColumnData],\n  edges: [Edgfadsfffffffffffffffffffffffffe]\n} ";
  return (
    <div className=''>
      <ReactCodeMirror
        value={test}
        height='200px'
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
        theme={dracula}
      />
    </div>
  );
};

export default Schema;
