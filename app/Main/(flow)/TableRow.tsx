import { Handle, Position } from "reactflow";

const TableRow = ({ columnName, dataType}) => {
  // check to see if columnName is in arrFKeys
  // if so, create a <Handle type='source' />

  // let isForeignKey;
  // let tableIsRefTable;
  // arrFKeys.includes(columnName) ? isForeignKey = true : isForeignKey = false;
  // refTables.includes(name) ? tableIsRefTable = true : tableIsRefTable = false;
  // console.log('name:', name)
  // console.log('refTables:', refTables)
  

    // {tableIsRefTable && columnName === "_id" ? <Handle type="target" position={Position.Left} id={key} /> : null}
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
