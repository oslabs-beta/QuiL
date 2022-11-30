'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { NavigationBarProps } from '../../../(root)/frontendTypes';
import test from 'node:test';
import { setSyntheticLeadingComments } from 'typescript';

const NavigationBar = ({
  userJWT,
  handleSetTheme,
}: NavigationBarProps): JSX.Element => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const URIfromRoot = searchParams.get('URI');
  const [uriParam, setUriParam] = useState(URIfromRoot);

  // return (
  //   <div className='navbar'>
  //     <div className='navbar bg-base-100'>
  //       <div className='flex-1'>
  //         <div className=''>
  //           <ul>
  //             <li>
  //               <Link href={`/Main/Chart?URI=${uriParam}`}>Home</Link>
  //             </li>
  //             <li>
  //               <Link href="/Main/Login">Login</Link>
  //             </li>
  //             <li>
  //               <Link href="/Main/Register">Register</Link>
  //             </li>
  //             <li>
  //               <Link href="/Main/About">About</Link>
  //             </li>

  //           </ul>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )

  return (
    <div className="navbar">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">QuiL 🐺</a>
        </div>
        <div className="flex-none">
          <div className="btn-group flex space-x-1 font-mono">
            <button
              className="btn btn-primary"
              onClick={() => router.push(`/Main/Chart?URI=${uriParam}`)}
            >
              Main
            </button>
            {userJWT ? (
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => router.push('/Account')}
                >
                  My Account
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    window.localStorage.removeItem('token');
                    window.location.reload();
                  }}
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div>
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
              </div>
            )}
            <button className="btn" onClick={() => router.push('/Main/About')}>
              About
            </button>
            <select className="select w-full max-w-xs">
              <option disabled selected>
                Theme
              </option>
              <option value="light" onClick={() => handleSetTheme('light')}>
                light
              </option>
              <option value="night" onClick={() => handleSetTheme('night')}>
                night
              </option>
              <option value="retro" onClick={() => handleSetTheme('retro')}>
                retro
              </option>
              <option
                value="cyberpunk"
                onClick={() => handleSetTheme('cyberpunk')}
              >
                cyberpunk
              </option>
              <option
                value="synthwave"
                onClick={() => handleSetTheme('synthwave')}
              >
                synthwave
              </option>
              <option value="pastel" onClick={() => handleSetTheme('pastel')}>
                pastel
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
