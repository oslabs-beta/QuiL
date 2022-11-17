import { VisualizeDBProps } from '../../(root)/fronendTypes';
import Chart from './Chart';
import React, { useEffect, useState } from 'react';

const VisualizeDB = ({
  userInputURI,
  nodes,
  edges,
  handleSetEdges,
  handleSetNodes,
  uriLaunch,
  isLoaded,
}: VisualizeDBProps): JSX.Element => {
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    if (isLoaded) setPercent(100);

    if (percent < 97)
      setTimeout(() => {
        setPercent(number => number + 3);
      }, 200);
  }, [percent]);

  return (
    <>
      {!isLoaded && (
        <div
          style={{
            display: 'flex',
            height: '60%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <button className="btn btn-lg loading"></button>
        </div>
      )}
      {isLoaded && (
        <div className="flex justify-center">
          <Chart
            nodes={nodes}
            handleSetNodes={handleSetNodes}
            edges={edges}
            handleSetEdges={handleSetEdges}
          />
        </div>
      )}
    </>
  );
};

export default VisualizeDB;
