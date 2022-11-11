import { Handle, Position } from "reactflow";

const TableRow = ({ columnName, dataType}) => {

  return (
    <>
      <tr>
        <td>{columnName}</td>
        <td>{dataType}</td>
      </tr>
    </>
  );
};

export default TableRow;
