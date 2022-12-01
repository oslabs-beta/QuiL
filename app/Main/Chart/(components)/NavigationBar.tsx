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
    <div className="navbar" data-cy="nav-bar">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <img
            src="https://cdn.discordapp.com/attachments/1036015925679378457/1047680349406236733/My_project.png"
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
              className="select bg-neutral-content w-1/4 max-w-xs text-base-300"
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
