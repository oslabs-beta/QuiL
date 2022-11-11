import nodeTest from 'node:test';
import Chart from './Chart';
const VisualizeDB = ({
  uri,
  setURImeth,
  setDisplayMode,
  resQL,
  setResQL,
  uriLaunch,
  schemaGen,
  resolverGen,
}) => {
  return (
    <div className="VisualizeDB">
      <div className="searchURI">
        <div> insert URI </div>
        <input type="text" onChange={(e) => setURImeth(e.target.value)}></input>
        <button type="submit" onClick={() => uriLaunch()}>
          Launch
        </button>
      </div>
      <Chart />
    </div>
  );
};

export default VisualizeDB;
