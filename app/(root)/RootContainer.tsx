import React from "react";
import { useRouter } from "next/navigation";

const RootContainer = () => {
  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content flex-col lg:flex-row-reverse'>
        <div className='text-center lg:text-left'>
          <h1 className='text-5xl font-bold'>QuiL</h1>
          <p className='py-6'>
            Here we can put some text about what QuiL does such as visualizing
            relational databases and/or generating schemas for people who don't
            know how to use GraphQL
          </p>
        </div>
        <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
          <div className='card-body'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>URI</span>
              </label>
              <input
                type='text'
                placeholder='Enter URI here or choose a sample'
                className='input input-bordered'
              />
            </div>
            <div className='form-control w-full max-w-xs'>
              <label className='label'>
                <span className='label-text'>Sample Database</span>
              </label>
              <select className='select select-bordered'>
                <option disabled selected>
                  Pick one
                </option>
                <option>Star Wars</option>
                <option>Pokemon</option>
                <option>Quitr</option>
              </select>
            </div>
          </div>
          <div className='form-control mt-6'>
            <button className='btn btn-primary'>Launch</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootContainer;
