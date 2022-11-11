'use client';
//      postgres://lkdxllvk:GTIkPygxpPOx0ZVNJ3luQHEfApEIJekP@heffalump.db.elephantsql.com/lkdxllvk
import React, { useState } from 'react';
import NavigationBar from './NavigationBar';
import DisplayContainer from './DisplayContainer';
const MainContainer = () => {
  const [displayMode, setDisplayMode] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [uri, setURI] = useState('');
  const [resQL, setResQL] = useState('');

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
    setResQL(res);
  };

  // invoked inside visualizeDB
  const setURImeth = (e) => {
    setURI(e);
  };
  return (
    <>
      <NavigationBar isLogged={isLogged} />
      <DisplayContainer
        displayMode={displayMode}
        uri={uri}
        setURImeth={setURImeth}
        uriLaunch={uriLaunch}
        resQL={resQL}
        schemaGen={schemaGen}
        resolverGen={resolverGen}
      />
    </>
  );
};

export default MainContainer;
