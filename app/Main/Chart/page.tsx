import MainContainer from './(components)/MainContainer';
import createNodes from './(flow)/Nodes';
import createEdges from './(flow)/Edges';

import 'react-toastify/dist/ReactToastify.css';

async function getData(URI: string) {
  let data = await fetch(
    'http://quilbackend1-env.eba-52zmdsmp.us-east-1.elasticbeanstalk.com/graphql',
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        query: `query GetData {
      getAllData(uri: "${URI}") {
        nodes {
            name,
            primaryKey,
            columns {
              columnName,
              dataType
            },
            edges {
              fKey,
              refTable
            }
          },
          resolvers {
            tableName,
            resolver
          },
          schemas {
            tableName,
            schemas
          }
      }
    }`,
      }),
    }
  );

  const res = await data?.json();
  return res;
}

export default async function Page({
  searchParams,
}: {
  searchParams: { URI: string };
}) {
  let initialNodes: any;
  let initialEdges: any;
  let data: any;

  if (!searchParams.URI) {
    initialNodes = [];
    initialEdges = [];
    data = {};
  } else {
    data = await getData(searchParams.URI);
    initialNodes = createNodes(data);
    initialEdges = createEdges(data);
  }

  return (
    // Parent component of reactflow needs a height and width in order to display
    <div>
      <MainContainer
        URI={searchParams.URI}
        data={data}
        initialNodes={initialNodes}
        initialEdges={initialEdges}
      />
      <div style={{ height: '500px', width: '500px' }}></div>
    </div>
  );

  // const data = await getData(searchParams.URI);
  // if (!data.getAllData) {
  //   return <h1>Loading</h1>;
  // } else {
  //   const { nodes } = data.getAllData;
  //   const initialNodes = createNodes(nodes);
  //   const initialEdges = createEdges(nodes);

  //   return (
  //     // Parent component of reactflow needs a height and width in order to display
  //     <div>
  //       <MainContainer
  //         data={data}
  //         initialNodes={initialNodes}
  //         initialEdges={initialEdges}
  //       />
  //       <div style={{ height: '500px', width: '500px' }}></div>
  //     </div>
  //   );
  // }
}
