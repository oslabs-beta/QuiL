'use client';
import React, { useState } from 'react';
import VisualizeDB from './VisualizeDB';
import VisualizeSchemaResolver from './VisualizeSchemaResolver';
import { DisplayContainerProps } from '../../../(root)/frontendTypes';
import { motion } from 'framer-motion';
import SaveContainer from './SaveContainer';
import LoadContainer from './LoadContainer';
import LoadItem from './LoadItem';
import AboutPage from './AboutPage';
import Link from 'next/link';

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
  URI,
  removeDeletedProject,
}: DisplayContainerProps): JSX.Element => {
  const [saveModalVisible, setSaveModalVisible] = useState<boolean>(true);
  const [loadModalVisible, setLoadModalVisible] = useState<boolean>(true);

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
    let data = await fetch('http://quilbackend1-env.eba-52zmdsmp.us-east-1.elasticbeanstalk.com/graphql', {
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
        setSaveModalVisible(false);
      });
  };

  const setLoadVisibility = () => setLoadModalVisible(false);

  const LoadComponents = [];
  for (let i = 0; i < userProjects.length; i++) {
    LoadComponents.push();
  }

  if (displayMode === 'aboutPage') {
    return <AboutPage />;
  } else
    return (
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
                className="btn btn-accent btn-outline btn-sm drawer-button ml-32 my-2 py-0"
                data-cy="view-schemas-resolvers-btn"
              >
                View Schemas/Resolvers
              </motion.label>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 2.75 }}
                className="flex flex-row mr-32 w-2/5"
              >
                <input
                  type="text"
                  onChange={e => userInputURI(e.target.value)}
                  className="input input-sm  input-bordered w-full mx-1"
                  placeholder="insert URI"
                  data-cy="insert-uri-main"
                ></input>

                <button
                  className="btn btn-outline btn-warning btn-sm"
                  type="submit"
                  onClick={() => uriLaunch()}
                  data-cy="main-launch-btn"
                >
                  Launch
                </button>
                {/* Save Button and Modal */}
                <label
                  htmlFor="my-modal-3"
                  className="btn btn-success btn-outline btn-sm mx-1"
                  onClick={() => setSaveModalVisible(true)}
                >
                  Save
                </label>

                {saveModalVisible && (
                  <>
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

                          {/* MAKE CONDITIONAL*/}
                          {userJWT ? (
                            <>
                              <h3 className="text-lg font-bold">
                                Save Your Database
                              </h3>
                              <form onSubmit={e => saveURIHandler(e)}>
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
                                  value={URI}
                                ></input>

                                <div className="mt-6 flex justify-center w-full max-w-xs">
                                  <label htmlFor="my-modal-3">
                                    <button
                                      className="btn btn-primary"
                                      type="submit"
                                    >
                                      Save
                                    </button>
                                  </label>
                                </div>
                              </form>
                            </>
                          ) : (
                            <>
                              <h1
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  marginBottom: '5px',
                                }}
                              >
                                Please login to save your project!!
                              </h1>
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                }}
                              >
                                <Link href="/Login">
                                  <button
                                    style={{
                                      marginRight: '25px',
                                    }}
                                    className="btn btn-active btn-primary"
                                  >
                                    Login
                                  </button>
                                </Link>
                                <Link href="/Register">
                                  <button className="btn btn-active btn-secondary">
                                    Register
                                  </button>
                                </Link>
                              </div>
                            </>
                          )}
                          {/* MAKE CONDITIONAL*/}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {/* Load Button and Modal */}

                <label
                  htmlFor="loadUri-modal"
                  className="btn btn-success btn-outline btn-sm"
                  onClick={() => setLoadModalVisible(true)}
                >
                  Load
                </label>
                {loadModalVisible && (
                  <div className="">
                    <input
                      type="checkbox"
                      id="loadUri-modal"
                      className="modal-toggle"
                    />
                    <div className="modal">
                      <div className="modal-box relative">
                        <label
                          htmlFor="loadUri-modal"
                          className="btn btn-sm btn-circle absolute right-2 top-2"
                        >
                          ✕
                        </label>
                        {userJWT ? (
                          <div className="overflow-x-auto min-w-500px">
                            <table className="table w-full">
                              <thead>
                                <tr>
                                  <th></th>
                                  <th>Project Name</th>
                                </tr>
                              </thead>
                              <tbody>
                                {userProjects.map((e: any, i: any) => (
                                  <LoadItem
                                    id={userProjects[i]._id}
                                    key={`${i}`}
                                    userProject={userProjects[i]}
                                    uriLaunch={uriLaunch}
                                    setLoadVisibility={setLoadVisibility}
                                    setLoadModalVisible={setLoadModalVisible}
                                    removeDeletedProject={removeDeletedProject}
                                  />
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <>
                            <h1
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: '5px',
                              }}
                            >
                              Please login to load your project!!
                            </h1>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                              }}
                            >
                              <Link href="/Login">
                                <button
                                  style={{
                                    marginRight: '25px',
                                  }}
                                  className="btn btn-active btn-primary"
                                >
                                  Login
                                </button>
                              </Link>
                              <Link href="/Register">
                                <button className="btn btn-active btn-secondary">
                                  Register
                                </button>
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
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
    );
};

export default DisplayContainer;
