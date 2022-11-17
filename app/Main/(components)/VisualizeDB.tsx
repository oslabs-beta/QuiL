import { VisualizeDBProps } from "../../(root)/fronendTypes";
import Chart from "./Chart";
import React from "react";
import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 3.75}}
      className='flex justify-center'
    >
      <Chart
        nodes={nodes}
        handleSetNodes={handleSetNodes}
        edges={edges}
        handleSetEdges={handleSetEdges}
      />
    </motion.div>
  );
};

export default VisualizeDB;
