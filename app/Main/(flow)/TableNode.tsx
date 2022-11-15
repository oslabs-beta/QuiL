import { Handle, Position } from "reactflow";
import TableRow from "./TableRow";
import React from "react";

const TableNode = ({ data }) => {
  const handles: JSX.Element[] = [];
  const arrOfFKeys = [];
  let pixels = 130;
  const tableFields = data.columns.map((column) => {
    // if the columnName is a foreign key, give it a source handle at the correct key
    if (data.arrFKeys.includes(column.columnName)) {
      const handleStyle = {
        top: `${pixels.toString()}px`,
        bottom: "auto",
        height: "8px",
        width: "8px",
      };
      pixels += 42;
      handles.push(
        <Handle
          type='source'
          position={Position.Left}
          id={`${column.columnName}`}
          style={handleStyle}
        />
      );
    }
    // if current Node is a RefTable, give it a handle on the top right of the Table. (can possibly change to Left of table at primary key)
    if (data.refTables.includes(data.name)) {
      handles.push(
        <Handle
          type='target'
          position={Position.Right}
          id={`${data.name}`}
          style={{ top: "20px", height: "10px", width: "10px" }}
        />
      );
    }
    return (
      <TableRow columnName={column.columnName} dataType={column.dataType} />
    );
  });

  return (
    <div className='border-2 border-secondary rounded-md shadow-2xl'>
      {handles}
      <div className='flex flex-start bg-secondary-focus w-full py-2 font-mono text-base-content text-xl pl-3'>
        {data.name}
      </div>
      <table className='table-auto font-mono text-neutral-focus'>
        <tr className='py-6 border-b border-secondary-focus'>
          <th className='py-5 bg-neutral-content'>Column</th>
          <th className='py-5 bg-neutral-content'>Type</th>
        </tr>
        {tableFields}
      </table>
    </div>
  );
};

export default TableNode;
