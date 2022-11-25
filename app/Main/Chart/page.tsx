import MainContainer from './(components)/MainContainer';
import createNodes from './(flow)/Nodes';
import createEdges from './(flow)/Edges';
import { resQL } from '../../(root)/fronendTypes';
async function getData(URI: string) {
  let data = await fetch('http://localhost:4000/graphql', {
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
  });
  const res = await data.json();

  return res;
}

export default async function Page({
  searchParams,
}: {
  searchParams: { URI: string };
}) {
  const data = await getData(searchParams.URI);
  const initialNodes = createNodes(data);
  const initialEdges = createEdges(data);

  return (
    // Parent component of reactflow needs a height and width in order to display
    <div>
      <MainContainer
        data={data}
        initialNodes={initialNodes}
        initialEdges={initialEdges}
      />
      <div style={{ height: '500px', width: '500px' }}></div>
    </div>
  );
}