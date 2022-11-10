import { Handle, Position } from "reactflow";
import TableRow from "./TableRow";

const TableNode = ({ data }) => {
  const handles = [];
  const arrOfFKeys = [];
  let pixels = 75;
  const tableFields = data.columns.map((column) => {
    if(data.arrFKeys.includes(column.columnName)) {
      const handleStyle = {top: `${pixels.toString()}px`, bottom: 'auto'};
      pixels += 25;
      handles.push(<Handle type="source" position={Position.Left} id={`${column.columnName}`} style={handleStyle} />)
    } 
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

  console.log(handles.length);

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
