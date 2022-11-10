import { Handle, Position } from "reactflow";

const TableRow = ({ columnName, dataType, arrFKeys }) => {
  // check to see if columnName is in arrFKeys
  // if so, create a handle
  let isForeignKey = false;
  if(arrFKeys.includes(columnName)) {
    isForeignKey = true;
  }
  return (
    <>
    {isForeignKey ? <Handle type="source" position={Position.Right} id={columnName} /> : null}
      <tr>
        <td>{columnName}</td>
        <td>{dataType}</td>
      </tr>
    </>
  );
};

export default TableRow;
