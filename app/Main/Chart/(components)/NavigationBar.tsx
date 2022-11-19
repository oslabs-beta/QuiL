"use client";
import { useRouter } from "next/navigation";
import { NavigationBarProps } from "../../../(root)/fronendTypes";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
const NavigationBar = (): //   {
//   isLogged,
//   theme,
//   handleSetTheme,
// }: NavigationBarProps

JSX.Element => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const URIfromRoot = searchParams.get("URI");
  const [uriParam, setUriParam] = useState(URIfromRoot);

  return (
    <div className='navbar'>
      <div className='navbar bg-base-100'>
        <div className='flex-1'>
          <a className='btn btn-ghost normal-case text-xl'>QuiL 🐺</a>
        </div>
        <div className='flex-none'>
          <div className='btn-group flex space-x-1 font-mono'>
            <button
              className='btn btn-primary'
              onClick={() => router.push(`/Main/Chart?URI=${uriParam}`)}
            >
              Main
            </button>
            <button
              className='btn btn-secondary'
              onClick={() => router.push("/Main/Login")}
            >
              Login
            </button>
            <button
              className='btn btn-accent'
              onClick={() => router.push("/Main/Register")}
            >
              Register
            </button>
            <button className='btn' onClick={() => router.push("/Main/About")}>
              About
            </button>
            <select
              className='select w-full max-w-xs'
              onChange={(e) => handleSetTheme(e.target.value)}
            >
              <option disabled selected>
                Theme
              </option>
              <option value='light'>light</option>
              <option value='night'>night</option>
              <option value='retro'>retro</option>
              <option value='cyberpunk'>cyberpunk</option>
              <option value='synthwave'>synthwave</option>
              <option value='pastel'>pastel</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
