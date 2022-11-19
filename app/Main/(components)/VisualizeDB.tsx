import { VisualizeDBProps } from '../../(root)/fronendTypes';
import Chart from './Chart';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75 }}
          className="flex justify-center"
        >
          <Chart
            nodes={nodes}
            handleSetNodes={handleSetNodes}
            edges={edges}
            handleSetEdges={handleSetEdges}
          />
        </motion.div>
      )}
    </>
  );
};

export default VisualizeDB;
