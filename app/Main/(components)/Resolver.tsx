import {ResolverProps} from "../../(root)/fronendTypes"
import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import React from 'react';
const Resolver = ({ resQL }: ResolverProps): JSX.Element => {
  return (
    <div>
      <ReactCodeMirror />
    </div>
  );
};

export default Resolver;
