"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
const RootContainer = () => {
  const [initialURI, setInitialURI] = useState<string>(null);
  const [sampleURI, setSampleURI] = useState<string>(null);

  const router = useRouter();
  const handleUserURI = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInitialURI(e.target.value);
  };
  const handleSampleURI = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSampleURI(e.target.value);
  };

  const handleLaunch = (e: React.MouseEvent<HTMLElement>): void => {
    const URI = initialURI ? initialURI : sampleURI;
    router.push(`/Main?URI=${URI}`);
  };

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
          >
            QuiL
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: .5 }}
            exit={{ opacity: 0, y: -30 }}
            className='py-6'
          >
            Here we can put some text about what QuiL does such as visualizing
            relational databases and/or generating schemas for people who don't
            know how to use GraphQL
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          exit={{ opacity: 0.5, x: 30 }}
          className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'
        >
          <div className='card-body'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>URI</span>
              </label>
              <input
                type='text'
                disabled={sampleURI ? true : false}
                placeholder='Enter URI here or choose a sample'
                className='input input-bordered'
                onChange={handleUserURI}
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
