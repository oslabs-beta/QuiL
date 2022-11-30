"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { NavigationBarProps } from "../../../(root)/frontendTypes";
import test from "node:test";
import { setSyntheticLeadingComments } from "typescript";

const NavigationBar = ({
  userJWT,
  handleSetTheme,
  aboutPageMode,
  mainPageMode,
}: NavigationBarProps): JSX.Element => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const URIfromRoot = searchParams.get("URI");
  const [uriParam, setUriParam] = useState(URIfromRoot);

  return (
    <div className='navbar' data-cy='nav-bar'>
      <div className='navbar bg-base-100'>
        <div className='flex-1'>
          <a className='btn btn-ghost normal-case text-xl'>QuiL 🐺</a>
        </div>
        <div className='flex-none'>
          <div className='btn-group flex space-x-1 font-mono'>
            {/* <button
              className='btn btn-primary'
              onClick={() => router.push(`/Main/Chart?URI=${uriParam}`)}
            >
              Main
            </button> */}
            <button className='btn btn-primary' onClick={() => mainPageMode()}>
              Main
            </button>
            {userJWT ? (
              <button
                className='btn btn-secondary'
                onClick={() => {
                  window.localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                Log Out
              </button>
            ) : (
              <>
                <button
                  className='btn btn-secondary'
                  onClick={() => {
                    router.push("/Login");
                  }}
                >
                  Login
                </button>
                <button
                  className='btn btn-accent'
                  onClick={() => router.push("/Register")}
                >
                  Register
                </button>
              </>
            )}
            {/* <button className="btn" onClick={() => router.push('/Main/About')}>
              About
            </button> */}
            <button className='btn' onClick={() => aboutPageMode()}>
              About
            </button>
            <select className='select bg-neutral-content w-1/4 max-w-xs text-base-300'>
              <option disabled selected>
                Theme
              </option>
              <option value='light' onClick={() => handleSetTheme("light")}>
                light
              </option>
              <option value='night' onClick={() => handleSetTheme("night")}>
                night
              </option>
              <option value='retro' onClick={() => handleSetTheme("retro")}>
                retro
              </option>
              <option
                value='cyberpunk'
                onClick={() => handleSetTheme("cyberpunk")}
              >
                cyberpunk
              </option>
              <option
                value='synthwave'
                onClick={() => handleSetTheme("synthwave")}
              >
                synthwave
              </option>
              <option value='pastel' onClick={() => handleSetTheme("pastel")}>
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
