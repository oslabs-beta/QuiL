'use client';
import React from 'react';
import VisualizeDB from './VisualizeDB';
import VisualizeSchemaResolver from './VisualizeSchemaResolver';
import { DisplayContainerProps } from '../../../(root)/frontendTypes';
import { motion } from 'framer-motion';
<<<<<<< HEAD
=======
import { PopUp } from './PopUp';
>>>>>>> dev

const DisplayContainer = ({
  displayMode,
  userInputURI,
  uriLaunch,
  resQL,
  schemaGen,
  resolverGen,
  edges,
  nodes,
  handleSetEdges,
  handleSetNodes,
}: DisplayContainerProps): JSX.Element => {
  let schemaTabStyle = 'tab tab-bordered';
  let resolverTabStyle = 'tab tab-bordered';
  switch (displayMode) {
    case 'schemaMode':
      schemaTabStyle = 'tab tab-bordered tab-active';
      break;
    case 'resolverMode':
      resolverTabStyle = 'tab tab-bordered tab-active';
      break;
  }
  return (
    <>
      <div className="DisplayContainer">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <div className="flex flex-row justify-between items-center">
              <motion.label
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 3.25 }}
                htmlFor="my-drawer"
                className="btn btn-accent btn-outline btn-sm drawer-button ml-12 my-2 py-0"
              >
                View Schemas/Resolvers
              </motion.label>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 2.75 }}
                className="flex flex-row mr-12 w-2/5"
              >
                <input
                  type="text"
                  onChange={e => userInputURI(e.target.value)}
                  className="input input-sm  input-bordered w-full mx-1"
                  placeholder="insert URI"
                ></input>

                <button
                  className="btn btn-success btn-outline btn-sm"
                  type="submit"
                  onClick={() => uriLaunch()}
                >
                  Launch
                </button>
              </motion.div>
            </div>
            <VisualizeDB
              userInputURI={userInputURI}
              nodes={nodes}
              handleSetNodes={handleSetNodes}
              handleSetEdges={handleSetEdges}
              edges={edges}
              uriLaunch={uriLaunch}
            />
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <div className="menu p-4 w-2/5 bg-base-100 text-base-content">
              <ul>
                <li className={schemaTabStyle} onClick={() => schemaGen()}>
                  Schemas
                </li>
                <li className={resolverTabStyle} onClick={() => resolverGen()}>
                  Resolvers
                </li>
              </ul>
              <ul className="max">
                <li>
                  <div>
                    <VisualizeSchemaResolver
                      displayMode={displayMode}
                      resQL={resQL}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayContainer;
