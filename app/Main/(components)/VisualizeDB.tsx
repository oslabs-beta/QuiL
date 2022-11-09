import Chart from './Chart';
const VisualizeDB = ({ setDisplayMode }) => {
  /*
  they are inputting their uri and we need to fetch their db and run it through our database
  */
  return (
    <div className="VisualizeDB">
      <div className="searchURI">
        <div> insert URI </div>
        <input type="text"></input>
        <button type="submit">Launch</button>
      </div>
      <Chart />
    </div>
  );
};

export default VisualizeDB;
