'use client';
//      postgres://lkdxllvk:GTIkPygxpPOx0ZVNJ3luQHEfApEIJekP@heffalump.db.elephantsql.com/lkdxllvk
import React, { useState } from 'react';
import NavigationBar from './NavigationBar';
import DisplayContainer from './DisplayContainer';
import  {Node, Edge} from "reactflow";
import createNodes from '../(flow)/Nodes';
import createEdges from '../(flow)/Edges';

const MainContainer = () => {
  const [displayMode, setDisplayMode] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [uri, setURI] = useState('');
  const [resQL, setResQL] = useState('');
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  //invoked in VisualizeSchemaResolver
  const schemaGen = () => {
    setDisplayMode('schemaMode');
  };
  //invoked in VisualizeSchemaResolver
  const resolverGen = () => {
    setDisplayMode('resolverMode');
  };

  //invoked in visualizeDB
  const uriLaunch = async (e) => {
    // e.preventDefault();
    let data = await fetch('http://localhost:4000/graphql', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        query: `query GetData {
          getAllData(uri: "${uri}") {
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
              resolvers,
              schemas
          }
        }`,
      }),
    });
    let res = await data.json();
    setNodes(createNodes(res)); 
    setEdges(createEdges(res));
  };

  const handleUri = async (e) => {
    console.log('inside handle URI line 13');
    setURI(e.target.value);
  };

  // invoked inside visualizeDB
  const setURImeth = (e) => {
    setURI(e);
  };
  return (
    <>
      <NavigationBar isLogged={isLogged} />
      <DisplayContainer
        edges={edges}
        setEdges={setEdges}
        setNodes={setNodes}
        nodes={nodes}
        displayMode={displayMode}
        setDisplayMode={setDisplayMode}
        uri={uri}
        setURImeth={setURImeth}
        uriLaunch={uriLaunch}
        resQL={resQL}
        setResQL={setResQL}
        schemaGen={schemaGen}
        resolverGen={resolverGen}
      />
    </>
  );
};

export default MainContainer;
