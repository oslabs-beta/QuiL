import {SchemaProps} from "../../(root)/fronendTypes"
const Schema = ({ resQL }: SchemaProps): JSX.Element => {
  return (
    <p className="Schema">
      <code>{JSON.stringify(resQL)}</code>
    </p>
  );
};

export default Schema;
