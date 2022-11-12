import nodeTest from 'node:test';
import Chart from './Chart';
const VisualizeDB = ({
  uri,
  setURImeth,
  setDisplayMode,
  resQL,
  setResQL,
  nodes,
  edges,
  setEdges,
  setNodes,
  uriLaunch,
  schemaGen,
  resolverGen,
}) => {
  /*
requirements for a grapghQL request:

-needs to be sent using the POST method
-query and variables need to be sent as a JSON object
-send the right headers

*/

  //    postgres://lkdxllvk:GTIkPygxpPOx0ZVNJ3luQHEfApEIJekP@heffalump.db.elephantsql.com/lkdxllvk
  // const uriLaunch = async (e) => {
  //   e.preventDefault();
  //   let data = await fetch('http://localhost:4000/graphql', {
  //     method: 'POST',

  //     headers: {
  //       'Content-Type': 'application/json',
  //     },

  //     body: JSON.stringify({
  //       query: `
  //         query getNodes {
  //           uri: ${uri})
  //         }
  //     `,
  //     }),
  //   });
  //   let res = await data.json();
  //   console.log(res, ' line 58');
  // };



  return (
    <div className="VisualizeDB">
      <div className="searchURI">
        <div> insert URI </div>
        <input type="text" onChange={(e) => setURImeth(e.target.value)}></input>
        <button type="submit" onClick={() => uriLaunch()}>
          Launch
        </button>
      </div>
      <Chart resQL={resQL}
            nodes={nodes}
            setNodes={setNodes}
            edges={edges}
            setEdges={setEdges}/>
    </div>
  );
};


export default VisualizeDB;
