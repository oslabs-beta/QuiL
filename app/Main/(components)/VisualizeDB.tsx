import nodeTest from 'node:test';
import Chart from './Chart';
const VisualizeDB = ({ uri, setURI, setDisplayMode, resQL, setResQL }) => {
  /*
requirements for a grapghQL request:

-needs to be sent using the POST method
-query and variables need to be sent as a JSON object
-send the right headers

*/
  // const uriLaunch = async (e) => {
  //   e.preventDefault();
  //   let data = await fetch('http://localhost:4000/graphql', {
  //     method: 'POST',

  //     headers: {
  //       'Content-Type': 'application/json',
  //     },

  //     body: JSON.stringify({
  //       query: `
  //       query GetGraph {
  //         getGraph {
  //          nodes {
  //            name,
  //            primaryKey,
  //            columns {
  //              columnName,
  //              dataType
  //            },
  //            edges {
  //              FKey,
  //              refTable
  //            }
  //          }
  //         }
  //       }
  //     `,
  //     }),
  //   });
  //   let res = await data.json();
  //   console.log(res.data.getGraph.nodes, ' line 24');
  // };
  //    postgres://lkdxllvk:GTIkPygxpPOx0ZVNJ3luQHEfApEIJekP@heffalump.db.elephantsql.com/lkdxllvk
  const uriLaunch = async (e) => {
    e.preventDefault();
    let data = await fetch('http://localhost:4000/graphql', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        query: `
        query GetGraph {
          getNodes(uri: ${uri})
        }
      `,
      }),
    });
    let res = await data.json();
    console.log(res, ' line 58');
  };

  const handleUri = async (e) => {
    console.log('inside handle URI line 13');
    setURI(e.target.value);
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
