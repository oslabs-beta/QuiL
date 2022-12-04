import Flow from '../(flow)/Flow';
import React from 'react';
import { ChartProps } from '../../../(root)/frontendTypes';

const Chart = ({
  nodes = null,
  edges = null,
  handleSetNodes,
  handleSetEdges,
}: ChartProps): JSX.Element => {
  return (
    <div style={{ height: '60rem', width: '111rem'}}> 
      <Flow
        nodes={nodes}
        edges={edges}
        handleSetNodes={handleSetNodes}
        handleSetEdges={handleSetEdges}
      />
    </div>
  );
};

export default Chart;
//