'use client';
//      postgres://lkdxllvk:GTIkPygxpPOx0ZVNJ3luQHEfApEIJekP@heffalump.db.elephantsql.com/lkdxllvk
import React, { useEffect, useState } from 'react';
import DisplayContainer from './DisplayContainer';
import { Node, Edge } from 'reactflow';
import createNodes from '../(flow)/Nodes';
import createEdges from '../(flow)/Edges';
import NavigationBar from './NavigationBar';
import jwt_decode from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import { MainContainerProps, resQL } from '../../../(root)/frontendTypes';

import 'react-toastify/dist/ReactToastify.css';
const MainContainer = ({
  initialNodes,
  initialEdges,
  data,
}: MainContainerProps): JSX.Element => {
  const [displayMode, setDisplayMode] = useState<string>('schemaMode');
  const [uri, setURI] = useState<string>('');
  const [resQL, setResQL] = useState<resQL>(data);
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [theme, setTheme] = useState<string>('night');
  const [userJWT, setUserJWT] = useState<any>(null);

  useEffect(() => {
    try {
      let currJWT = window.localStorage.getItem('token');
      let decoded: any;
      if (currJWT) {
        decoded = jwt_decode(currJWT);
        console.log(decoded);
      }
      // if JWT doesnt exist, set userJWT to null
      if (!decoded) setUserJWT(null);
      // otherwise decode it and set userJWT object
      else setUserJWT(decoded);
    } catch (error) {}
  }, []);

  //invoked in VisualizeSchemaResolver
  const schemaGen = (): void => {
    setDisplayMode('schemaMode');
  };
  //invoked in VisualizeSchemaResolver
  const resolverGen = (): void => {
    setDisplayMode('resolverMode');
  };
  //invoked in visualizeDB.
  const uriLaunch = async (): Promise<void> => {
    // e.preventDefault();
    if (uri.includes('postgres')) {
      launchUri();
    } else {
      toast.error('Not a valid PostgreSQL URL');
    }
  };
  const launchUri = async (): Promise<void> => {
    console.log(uri);
    const toastLoading = toast.loading('loading content');
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
    let res = await data.json();
    toast.dismiss(toastLoading);
    if (
      res.data.getAllData.nodes.length === 0 &&
      res.data.getAllData.resolvers.length === 0 &&
      res.data.getAllData.schemas.length === 0
    ) {
      toast.error('Empty database or bad URL');
    }
    setResQL(res);
    setNodes(createNodes(res));
    setEdges(createEdges(res));
    // setLoading(false);
  };

  // handleSetNodes takes in a callback (cb). That callback takes in
  const handleSetNodes = (cb: (nds: Node[]) => Node[]): void => {
    setNodes(cb);
  };
  const handleSetEdges = (): void => {
    setEdges(edges);
  };

  // invoked inside visualizeDB. users input (uri)
  const userInputURI = (e: string): void => {
    let test = e.trim();
    setURI(test);
  };

  const handleSetTheme = (e: string): void => {
    setTheme(e);
  };

  return (
    <div data-theme={theme}>
      <NavigationBar userJWT={userJWT} />

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <DisplayContainer
        edges={edges}
        handleSetEdges={handleSetEdges}
        handleSetNodes={handleSetNodes}
        nodes={nodes}
        displayMode={displayMode}
        userInputURI={userInputURI}
        uriLaunch={uriLaunch}
        resQL={resQL}
        schemaGen={schemaGen}
        resolverGen={resolverGen}
      />
    </div>
  );
};

export default MainContainer;
