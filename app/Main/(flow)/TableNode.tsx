import { Handle, Position } from "reactflow";
import TableRow from "./TableRow";

const TableNode = ({ data }) => {
  const handles = [];
  const arrOfFKeys = [];
  const tableFields = data.columns.map((column) => {
    return (
      <TableRow
        columnName={column.columnName}
        dataType={column.dataType}
        arrFKeys={data.arrFKeys}
      />
    );
  });
  // if current another Table references this Table, add a target handle so others would be able to connect
  if (data.refTables.includes(data.name))
    handles.push(
      <Handle type="target" position={Position.Left} id={data.key} />
    );

  return (
    <div>
      {handles}
      <table>
        <th>{data.name}</th>
        <tr>
          <td>Column</td>
          <td>Type</td>
        </tr>
        {tableFields}
      </table>
    </div>
  );
};

export default TableNode;
