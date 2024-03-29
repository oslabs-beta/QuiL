'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import jwt_decode from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { decoded } from './frontendTypes';

const RootContainer = ({
  authCode,
  stateCode,
}: {
  authCode: string;
  stateCode: string;
}) => {
  const [initialURI, setInitialURI] = useState<string>(null);
  const [sampleURI, setSampleURI] = useState<string>(null);
  const [code, setCode] = useState(authCode);
  const [stateString, setStateCode] = useState(stateCode);

  const [userJWT, setUserJWT] = useState<any>(null);

  const router = useRouter();

  const handleUserURI = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let sanitize = e.target.value.trim();
    setInitialURI(sanitize);
  };
  const handleSampleURI = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSampleURI(e.target.value);
  };
  let rootLoading: any;
  const sanitizeLaunch = (e: any) => {
    if (sampleURI || initialURI.includes('postgres')) {
      handleLaunch(e);
      rootLoading = toast.loading('Loading content..');
    } else {
      toast.error('Not a valid PostgreSQL URL');
    }
  };

  const handleLaunch = (e: React.MouseEvent<HTMLElement>): void => {
    const URI = initialURI ? initialURI : sampleURI;
    router.push(`/Main/Chart?URI=${URI}`);
    toast.dismiss(rootLoading);
  };
  useEffect(() => {
    const handleLogin = async (code: string) => {
      let currJWT = window.localStorage.getItem('token');

      let oauthType;

      if (stateString) {
        if (stateString.includes('c2lnbmlu')) oauthType = 'signin';
        if (stateString.includes('cmVnaXN0ZXI')) oauthType = 'register';
      }

      if (code) {
        const queryValue = `mutation {
          postOAuth(code: "${code}", oauthType: "${oauthType}") {
            token
          }
        }`;

        const oauthResponse = await fetch('/api/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: queryValue,
          }),
        }).then(res => res.json());

        if (oauthResponse.data.postOAuth.token !== null) {
          localStorage.setItem('token', oauthResponse.data.postOAuth.token);
        }
      }

      currJWT = window.localStorage.getItem('token');
      let decoded: decoded;

      if (currJWT || currJWT !== null) {
        decoded = jwt_decode(currJWT);
      }
      // if JWT doesnt exist, set userJWT to null
      if (!decoded) setUserJWT(null);
      // otherwise decode it and set userJWT object
      else setUserJWT(decoded);
    };
    handleLogin(code);
  }, []);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {userJWT ? (
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 1 }}
            exit={{ opacity: 0, y: -30 }}
            className="text-5xl font-bold"
            data-cy="root-h1"
          >
            Welcome back<a className="text-accent"></a>
            <a className="text-primary"> {userJWT.username}</a>
          </motion.h1>
        ) : (
          <motion.div className="text-center lg:text-left">
            <motion.h2
              initial={{ x: -300, y: 50 }}
              animate={{
                opacity: 0,
              }}
              transition={{ duration: 2 }}
              className="text-5xl font-bold"
            >
              Welcome to
            </motion.h2>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              transition={{ duration: 2, delay: 2 }}
              className="text-5xl font-bold"
              data-cy="root-h1"
            >
              QuiL
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.75 }}
              exit={{ opacity: 0, y: -30 }}
              className="py-6"
              data-cy="root-p"
            >
              QuiL is a developer tool used to visualize an existing relational
              database and generate the GraphQL schemas & resolvers for that
              data base. This is intended to help developers see how to
              transition to GraphQL from a traditional REST API architecture.
            </motion.p>
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 3.25 }}
          className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
        >
          <motion.div whileHover={{ scale: 1.03 }} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">URI</span>
              </label>
              <input
                type="text"
                disabled={sampleURI ? true : false}
                placeholder="Enter URI here or choose a sample"
                className="input input-bordered"
                onChange={handleUserURI}
                data-cy="root-uri-input"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Sample Database</span>
              </label>
              <select
                onChange={handleSampleURI}
                disabled={initialURI ? true : false}
                className="select select-bordered"
                data-cy="select-sample-db"
              >
                <option value="">Pick one</option>
                {/* <option
                  value="postgres://lkdxllvk:GTIkPygxpPOx0ZVNJ3luQHEfApEIJekP@heffalump.db.elephantsql.com/lkdxllvk"
                  data-cy="sample-starwars"
                >
                  Star Wars
                </option> */}
                <option value="postgres://nsjouiot:4nVVHLiARTADoIiwArtQLG-HfkhQR03k@peanut.db.elephantsql.com/nsjouiot">
                  Quitr
                </option>
              </select>
            </div>
          </motion.div>
          <div className="form-control mt-4">
            <button
              disabled={initialURI || sampleURI ? false : true}
              onClick={sanitizeLaunch}
              className="btn btn-success mx-7 mb-1"
              data-cy="root-launch"
            >
              Launch
            </button>
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
            {userJWT ? (
              <div className="form-control mx-7 mt-1 mb-8">
                <button
                  className="btn btn-secondary btn-outline"
                  onClick={() => {
                    window.localStorage.removeItem('token');
                    window.location.reload();
                  }}
                >
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <div className="form-control justify-end w-full min-w-full mt-3">
                  <p className="flex justify-center text-xs">OR</p>
                  <div className="flex justify-center pt-2">
                    <button
                      style={{ marginBottom: '15px' }}
                      className="btn btn-primary btn-outline w-2/5 mx-1"
                      onClick={() => router.push('/Login')}
                      data-cy="root-login-btn"
                    >
                      Login
                    </button>
                    <button
                      className="btn btn-accent btn-outline w-2/5 mx-1"
                      onClick={() => router.push('/Register')}
                      data-cy="root-register-btn"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RootContainer;
