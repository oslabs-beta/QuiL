import { Handle, Position } from "reactflow";
import TableRow from "./TableRow";

const TableNode = ({ data }) => {
  const handles = [];
  const arrOfFKeys = [];
  let pixels = 75;
  const tableFields = data.columns.map((column) => {
    // if the columnName is a foreign key, give it a source handle at the correct key
    if(data.arrFKeys.includes(column.columnName)) {
      const handleStyle = {top: `${pixels.toString()}px`, bottom: 'auto'};
      pixels += 25;
      handles.push(<Handle type="source" position={Position.Left} id={`${column.columnName}`} style={handleStyle} />)
    } 
    // if current Node is a RefTable, give it a handle on the top right of the Table. (can possibly change to Left of table at primary key)
    if(data.refTables.includes(data.name)) {
      handles.push(<Handle type="target" position={Position.Right} id={`${data.name}`} style={{top: '20px'}} />)
    }
    return (
      <TableRow
        columnName={column.columnName}
        dataType={column.dataType}
      />
    );
  });

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
