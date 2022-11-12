import { VisualizeDBProps } from '../../(root)/fronendTypes';
import Chart from './Chart';

const VisualizeDB = ({
  userInputURI,
  nodes,
  edges,
  handleSetEdges,
  handleSetNodes,
  uriLaunch,
} : VisualizeDBProps): JSX.Element => {

  return (
    <div className="VisualizeDB">
      <div className="searchURI">
        <div> insert URI </div>
        <input type="text" onChange={(e) => userInputURI(e.target.value)}></input>
        <button type="submit" onClick={() => uriLaunch()}>
          Launch
        </button>
      </div>
      <Chart 
            nodes={nodes}
            handleSetNodes={handleSetNodes}
            edges={edges}
            handleSetEdges={handleSetEdges}/>
    </div>
  );
};


export default VisualizeDB;
