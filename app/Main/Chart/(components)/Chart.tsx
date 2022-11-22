import Flow from "../(flow)/Flow";
import React from "react";
import { ChartProps } from "../../../(root)/fronendTypes";

const Chart = ({
  nodes,
  edges,
  handleSetNodes,
  handleSetEdges,
}: ChartProps): JSX.Element => {
  return (
    <div style={{ height: "75rem", width: "120rem" }}>
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
