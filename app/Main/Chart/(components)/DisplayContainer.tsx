'use client';
import React, { useState } from 'react';
import VisualizeDB from './VisualizeDB';
import VisualizeSchemaResolver from './VisualizeSchemaResolver';
import { DisplayContainerProps } from '../../../(root)/frontendTypes';
import { motion } from 'framer-motion';
import SaveContainer from './SaveContainer';
import LoadContainer from './LoadContainer';
import LoadItem from './LoadItem';

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
  userJWT,
  userProjects,
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

  const saveURIHandler = async (e: any) => {
    e.preventDefault();
    let data = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation {
          saveData(projectName: "${e.target.URInickname.value}", projectData: "${e.target.URIstring.value}", userId: ${userJWT.userId}) {
            projectId
            projectName
            success
          }
        }`,
      }),
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        console.log('userJWT.userId', userJWT);
      });
  };

  const LoadComponents = [];
  for (let i = 0; i < userProjects.length; i++) {
    LoadComponents.push(
      <LoadItem
        id={userProjects[i]._id}
        key={`${i}`}
        userProject={userProjects[i]}
      />
    );
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
                {/* Save Button and Modal */}
                <label
                  htmlFor="my-modal-3"
                  className="btn btn-success btn-outline btn-sm"
                >
                  Save
                </label>
                <div>
                  <input
                    type="checkbox"
                    id="my-modal-3"
                    className="modal-toggle"
                  />
                  <div className="modal">
                    <div className="modal-box relative">
                      <label
                        htmlFor="my-modal-3"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                      >
                        ✕
                      </label>
                      <h3 className="text-lg font-bold">Save Your Database</h3>
                      <form onSubmit={saveURIHandler}>
                        <label className="label" htmlFor="username">
                          URI Nickname:{' '}
                        </label>
                        <input
                          className="input input-bordered w-full max-w-xs"
                          name="URInickname"
                          type="text"
                          placeholder="nickname"
                        ></input>

                        <label className="label" htmlFor="password">
                          URI String:{' '}
                        </label>
                        <input
                          className="input input-bordered w-full max-w-xs"
                          name="URIstring"
                          type="text"
                          placeholder="string"
                        ></input>

                        <div className="form-control mt-6">
                          <button className="btn btn-primary" type="submit">
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* Load Button and Modal */}
                <label
                  htmlFor="my-modal-2"
                  className="btn btn-success btn-outline btn-sm"
                >
                  Load
                </label>
                <div>
                  <input
                    type="checkbox"
                    id="my-modal-2"
                    className="modal-toggle"
                  />
                  <div className="modal">
                    <div className="modal-box relative">
                      <label
                        htmlFor="my-modal-2"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                      >
                        ✕
                      </label>
                      <div className="overflow-x-auto">
                        <table className="table w-full">
                          <thead>
                            <tr>
                              <th></th>
                              <th>URI Nickname</th>
                              <th>URI</th>
                            </tr>
                          </thead>
                          <tbody>{LoadComponents}</tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
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
