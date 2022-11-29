import { VisualizeDBProps } from '../../../(root)/frontendTypes';
import Chart from './Chart';
import React from 'react';
import { motion } from 'framer-motion';
const VisualizeDB = ({
  nodes,
  edges,
  handleSetEdges,
  handleSetNodes,
}: VisualizeDBProps): JSX.Element => {
  return (
    <>
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
    </>
  );
};

export default VisualizeDB;
