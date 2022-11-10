import Flow from '../(flow)/Flow';
import createNodes from '../(flow)/Nodes';
import createEdges from '../(flow)/Edges';

const Chart = ({ resQL, nodes, edges, setNodes, setEdges}) => {
  
  /*
  the input field above the chart (visualizeDB) would have a fetch request
  they input their database
  we display it in here
  */
 

 

 

  return (
    <div className="Chart">
      <Flow nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} resQL={resQL}/>
    </div>
  );
};

export default Chart;
