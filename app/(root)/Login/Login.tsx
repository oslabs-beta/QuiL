import { inputObj, userObj } from '../../(root)/frontendTypes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { random } from 'cypress/types/lodash';
const randomstring = require('randomstring');

const Login = () => {
  const router = useRouter();

  const RANDOM = randomstring.generate();
  const SIGNIN_ENCODE = 'c2lnbmlu';
  const clientId = '99436692da0716eb1c22';
  const gitHubAuth = `https://github.com/login/oauth/authorize?client_id=${clientId}&state=${RANDOM}`;

  const loginHandler = async (e: any) => {
    e.preventDefault();
    const userObj: userObj = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    let data = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation {
            signin(username: "${userObj.username}", password: "${userObj.password}") {
              token
            }
          }`,
      }),
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        localStorage.setItem('token', data.data.signin.token);
        router.push('/');
      });
  };

  return (
    <div className="card-body grid h-full place-items-center">
      <form onSubmit={loginHandler}>
        <label className="label" htmlFor="username">
          Username:{' '}
        </label>
        <input
          className="input input-bordered w-full max-w-xs"
          name="username"
          type="text"
          placeholder="username"
        ></input>

        <label className="label" htmlFor="password">
          Password:{' '}
        </label>
        <input
          className="input input-bordered w-full max-w-xs"
          name="password"
          type="text"
          placeholder="password"
        ></input>

        <div className="form-control mt-6">
          <button className="btn btn-primary" type="submit">
            Login
          </button>
          <p style={{ display: 'flex', justifyContent: 'center' }}>OR</p>
        </div>
      </form>
      <Link href={gitHubAuth + SIGNIN_ENCODE}>
        <button className="btn btn-success" style={{ width: '100%' }}>
          <img
            style={{ width: '2em', marginRight: '5px' }}
            src="https://cdn.iconscout.com/icon/free/png-256/github-163-761603.png"
          />
          Login with Github
        </button>
      </Link>
    </div>
  );
};

export default Login;
