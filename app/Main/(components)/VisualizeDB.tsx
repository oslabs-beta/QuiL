import Chart from './Chart';
const VisualizeDB = ({ uri, setURI, setDisplayMode }) => {
  /*
  they are inputting their uri and we need to fetch their db and run it through our database
  */
  const uriLaunch = async (e) => {
    e.preventDefault();
    // console.log('inside uri working asdf');
    const data = await fetch('http://localhost:4000/visualizer').then((res) => {
      return res.json();
    });
    console.log(data);
  };

  const handleUri = (e) => {
    console.log('inside handle URI line 13');
  };
  return (
    <div className="VisualizeDB">
      <div className="searchURI">
        <div> insert URI </div>
        <input type="text" onChange={handleUri}></input>
        <button type="submit" onClick={uriLaunch}>
          Launch
        </button>
      </div>
      <Chart />
    </div>
  );
};

export default VisualizeDB;
