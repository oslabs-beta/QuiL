import { Handle, Position } from "reactflow";
import React from "react";
const TableRow = ({ columnName, dataType }) => {
  return (
    <>
      <tr className="hover">
        <td>{columnName}</td>
        <td>{dataType}</td>
      </tr>
    </>
  );
};

export default TableRow;
