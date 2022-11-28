'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import jwt_decode from 'jwt-decode';
import router from 'next/router';
import Register from './Register/Register';
import { decoded } from './frontendTypes';

const RootContainer = () => {
  const [initialURI, setInitialURI] = useState<string>(null);
  const [sampleURI, setSampleURI] = useState<string>(null);
  // undefined/null = not logged in
  // const [loggedUser, setLoggedUser] = useState<{}>(null);
  const [userJWT, setUserJWT] = useState<any>(null);

  const router = useRouter();
  
  const handleUserURI = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInitialURI(e.target.value);
  };
  const handleSampleURI = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSampleURI(e.target.value);
  };

  const handleLaunch = (e: React.MouseEvent<HTMLElement>): void => {
    const URI = initialURI ? initialURI : sampleURI;
    router.push(`/Main/Chart?URI=${URI}`);
  };

  useEffect(() => {
    let currJWT = window.localStorage.getItem('token');
    let decoded: decoded;
    if (currJWT) {
      decoded = jwt_decode(currJWT);
      console.log(decoded);
    }
    // if JWT doesnt exist, set userJWT to null
    if (!decoded) setUserJWT(null);
    // otherwise decode it and set userJWT object
    else setUserJWT(decoded);
  }, []);

  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content flex-col lg:flex-row-reverse'>
        <div className='text-center lg:text-left'>
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            exit={{ opacity: 0, y: -30 }}
            className='text-5xl font-bold'
            data-cy='root-h1'
          >
            QuiL
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            exit={{ opacity: 0, y: -30 }}
            className='py-6'
            data-cy='root-p'
          >
            QuiL is a developer tool used to visualize an exisiting relational
            database and generate the GraphQL schemas & resolvers for that data
            base. This is intended to help developers see how to tranisition to
            GraphQL from a traditional REST API architecture.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          exit={{ opacity: 0.5, x: 30 }}
          className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'
        >
          <div className="card-body">
            {(userJWT) ? (<h1>Welcome {userJWT.username}</h1>) : (
            <div className='form-control justify-end w-full min-w-full'>
              <button className="btn btn-primary min-w-1/2" setUserJWT={setUserJWT} onClick={() => router.push("/Login")}>Login</button> 
              <button className="btn btn-primary min-w-1/2" onClick={() => router.push("/Register")}>Register</button>
            </div>)}
            <div className="form-control">
              <label className="label">
                <span className="label-text">URI</span>
              </label>
              <input
                type='text'
                disabled={sampleURI ? true : false}
                placeholder='Enter URI here or choose a sample'
                className='input input-bordered'
                onChange={handleUserURI}
                data-cy='root-uri-input'
              />
            </div>
            <div className='form-control w-full max-w-xs'>
              <label className='label'>
                <span className='label-text'>Sample Database</span>
              </label>
              <select
                onChange={handleSampleURI}
                disabled={initialURI ? true : false}
                className='select select-bordered'
                data-cy='select-sample-db'
              >
                <option disabled selected>
                  Pick one
                </option>
                <option value='postgres://lkdxllvk:GTIkPygxpPOx0ZVNJ3luQHEfApEIJekP@heffalump.db.elephantsql.com/lkdxllvk'>
                  Star Wars
                </option>
                <option value='postgres://nsjouiot:4nVVHLiARTADoIiwArtQLG-HfkhQR03k@peanut.db.elephantsql.com/nsjouiot'>
                  Quitr
                </option>
              </select>
            </div>
          </div>
          <div className='form-control mt-6'>
            <button
              disabled={initialURI || sampleURI ? false : true}
              onClick={handleLaunch}
              className='btn btn-primary'
              data-cy='root-launch'
            >
              Launch
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RootContainer;
