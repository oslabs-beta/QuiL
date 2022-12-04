import { Handle, Position } from 'reactflow';
import React from 'react';
const TableRow = ({ columnName, dataType }: any) => {
  return (
    <>
      <tr>
        <td className="flex-start px-4 py-2 bg-neutral-content">
          {columnName}
        </td>
        <td className="flex-start px-4 bg-neutral-content">{dataType}</td>
      </tr>
    </>
  );
};

export default TableRow;
