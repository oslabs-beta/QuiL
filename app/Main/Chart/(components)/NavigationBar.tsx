'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { NavigationBarProps } from '../../../(root)/frontendTypes';
import test from 'node:test';
import { setSyntheticLeadingComments } from 'typescript';
import quil from './quil.png';
const NavigationBar = ({
  userJWT,
  handleSetTheme,
  aboutPageMode,
  mainPageMode,
}: NavigationBarProps): JSX.Element => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const URIfromRoot = searchParams.get('URI');
  const [uriParam, setUriParam] = useState(URIfromRoot);

  return (
    <div className="navbar bg-base-200" data-cy="nav-bar">
      <div className="navbar">
        <div className="flex-1">
          <img
            src="https://files.slack.com/files-pri/T03N6QNVCES-F04D7PJ2GHZ/quillogo_2.png"
            alt=""
          />
        </div>
        <div className="flex-none">
          <div className="btn-group flex space-x-1 font-mono">
            <button className="btn btn-primary" onClick={() => mainPageMode()}>
              Main
            </button>
            {userJWT ? (
              <button
                className="btn btn-secondary"
                onClick={() => {
                  window.localStorage.removeItem('token');
                  window.location.reload();
                }}
              >
                Log Out
              </button>
            ) : (
              <>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    router.push('/Login');
                  }}
                >
                  Login
                </button>
                <button
                  className="btn btn-accent"
                  onClick={() => router.push('/Register')}
                >
                  Register
                </button>
              </>
            )}
            <button className="btn" onClick={() => aboutPageMode()}>
              About
            </button>
            <select
              onChange={(e: any) => handleSetTheme(e.target.value)}
              className="select bg-neutral-content w-1/3 max-w-xs text-base-300 mr-9"
            >
              <option disabled selected>
                Theme
              </option>
              <option value="light">light</option>
              <option value="night">night</option>
              <option value="retro">retro</option>
              <option value="cyberpunk">cyberpunk</option>
              <option value="synthwave">synthwave</option>
              <option value="pastel">pastel</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
