'use client';
//      postgres://lkdxllvk:GTIkPygxpPOx0ZVNJ3luQHEfApEIJekP@heffalump.db.elephantsql.com/lkdxllvk
import React, { useEffect, useState } from 'react';
import DisplayContainer from './DisplayContainer';
import { Node, Edge } from 'reactflow';
import createNodes from '../(flow)/Nodes';
import createEdges from '../(flow)/Edges';
import { resQL } from '../../../(root)/frontendTypes';
import { MainContainerProps, loggedUser } from '../../../(root)/frontendTypes';
import NavigationBar from './NavigationBar';
import jwt_decode from 'jwt-decode';
import { useAnimationFrame } from 'framer-motion';

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
  // const [loggedUser, setLoggedUser] = useState<any>(localStorage.getItem('token'));
  const LoggedUserProps = {
    username: 'Daniel',
  };

  // useEffect(() => {
  //   let JWT = localStorage.getItem('token');
  //   let decoded;
  //   if (JWT) {
  //     decoded = jwt_decode(JWT);
  //   }
  //   // if JWT doesnt exist, set loggedUser to null
  //   if (!decoded) setLoggedUser(null);
  //   // otherwise decode it and set loggedInUser
  //   else {
  //     setLoggedUser({username: 'Daniel'});
  //   }
  // }, []);

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
      alert('invalid postgres uri');
    }
  };
  const launchUri = async (): Promise<void> => {
    console.log(uri);
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
    console.log('this is res, ', res);
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
      <NavigationBar
      // loggedUser={loggedUser}
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
