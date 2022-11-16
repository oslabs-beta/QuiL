"use client";
import { useRouter } from "next/navigation";
import { NavigationBarProps } from "../../(root)/fronendTypes";
import React from "react";
const NavigationBar = ({ isLogged }: NavigationBarProps): JSX.Element => {
  const router = useRouter();
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
              onClick={() => router.push("/Main")}
            >
              Main
            </button>
            <button
              className='btn btn-secondary'
              onClick={() => router.push("/Login")}
            >
              Login
            </button>
            <button
              className='btn btn-accent'
              onClick={() => router.push("/Register")}
            >
              Register
            </button>
            <button className='btn' onClick={() => router.push("/About")}>
              About
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;

