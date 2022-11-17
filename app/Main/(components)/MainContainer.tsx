"use client";
//      postgres://lkdxllvk:GTIkPygxpPOx0ZVNJ3luQHEfApEIJekP@heffalump.db.elephantsql.com/lkdxllvk
import React, { useState, useEffect, EffectCallback } from "react";
import NavigationBar from "./NavigationBar";
import DisplayContainer from "./DisplayContainer";
import { Node, Edge, applyNodeChanges, NodeChange } from "reactflow";
import createNodes from "../(flow)/Nodes";
import createEdges from "../(flow)/Edges";
import { resQL } from "../../(root)/fronendTypes";
import res from "../(flow)/dummyRes";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const MainContainer = (): JSX.Element => {
  const [displayMode, setDisplayMode] = useState<string>("");
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [uri, setURI] = useState<string>("");
  const [resQL, setResQL] = useState<resQL>(res);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const searchParams = useSearchParams();
  const initialURI = searchParams.get("URI");
  useEffect(() => {
    const fetchData = async () => {
      let data = await fetch("http://localhost:4000/graphql", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          query: `query GetData {
          getAllData(uri: "${initialURI}") {
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
      setResQL(res);
      setNodes(createNodes(res));
      setEdges(createEdges(res));
    };
    fetchData().catch(console.error);
  }, []);

  //invoked in VisualizeSchemaResolver
  const schemaGen = (): void => {
    setDisplayMode("schemaMode");
  };
  //invoked in VisualizeSchemaResolver
  const resolverGen = (): void => {
    setDisplayMode("resolverMode");
  };
  //invoked in visualizeDB.
  const uriLaunch = async (): Promise<void> => {
    // e.preventDefault();
    let data = await fetch("http://localhost:4000/graphql", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
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
    setResQL(res);
    setNodes(createNodes(res));
    setEdges(createEdges(res));
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
    setURI(e);
  };

  return (
    <div data-theme='night'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <NavigationBar isLogged={isLogged} />
      </motion.div>
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
