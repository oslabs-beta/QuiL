import {SchemaProps} from "../../(root)/fronendTypes"
import React from "react";
const Schema = ({ resQL }: SchemaProps): JSX.Element => {
  const resolvers = resQL.data.getAllData.schemas.map((resolver, i) => {
    return <pre data-prefix={i}><code>{JSON.stringify(resolver)}</code></pre>
  })
  return (
    <div className="mockup-code max-w-fit mr-0">
      {resolvers}
    </div>
  );
};

export default Schema;
