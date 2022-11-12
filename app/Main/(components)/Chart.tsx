import Flow from '../(flow)/Flow';

const Chart = ({ resQL, nodes, edges, setNodes, setEdges}) => {
  
  /*
  the input field above the chart (visualizeDB) would have a fetch request
  they input their database
  we display it in here
  */
 
  return (
    <div className="Chart">
      <Flow nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
    </div>
  );
};

export default Chart;
