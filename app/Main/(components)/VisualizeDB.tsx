import { VisualizeDBProps } from "../../(root)/fronendTypes";
import Chart from "./Chart";
import React from "react";

const VisualizeDB = ({
  userInputURI,
  nodes,
  edges,
  handleSetEdges,
  handleSetNodes,
  uriLaunch,
}: VisualizeDBProps): JSX.Element => {
  return (
      <div className="flex justify-center">
        <Chart
          nodes={nodes}
          handleSetNodes={handleSetNodes}
          edges={edges}
          handleSetEdges={handleSetEdges}
        />
      </div>
  );
};

export default VisualizeDB;
