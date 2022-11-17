'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">QuiL</h1>
          <p className="py-6">
            QuiL is a developer tool used to visualize an exisiting relational
            database and generate the GraphQL schemas & resolvers for that data
            base. This is intended to help developer see how to tranisition to
            GraphQL from a traditional REST API architecture.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
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
              >
                <option disabled selected>
                  Pick one
                </option>
                <option value="postgres://lkdxllvk:GTIkPygxpPOx0ZVNJ3luQHEfApEIJekP@heffalump.db.elephantsql.com/lkdxllvk">
                  Star Wars
                </option>
                <option value="postgres://nsjouiot:4nVVHLiARTADoIiwArtQLG-HfkhQR03k@peanut.db.elephantsql.com/nsjouiot">
                  Quitr
                </option>
              </select>
            </div>
          </div>
          <div className="form-control mt-6">
            <button
              disabled={initialURI || sampleURI ? false : true}
              onClick={handleLaunch}
              className="btn btn-primary"
            >
              Launch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootContainer;
