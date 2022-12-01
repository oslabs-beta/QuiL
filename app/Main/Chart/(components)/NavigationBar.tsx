"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { NavigationBarProps } from "../../../(root)/frontendTypes";
import test from "node:test";
import { setSyntheticLeadingComments } from "typescript";
import quil from "./quil.png";
import { motion } from "framer-motion";
import Image from "next/image";
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
    <motion.div
      whileHover={{ backgroundColor: "accent", scale: 0.95 }}
      className='navbar'
      data-cy='nav-bar'
    >
      <div className='navbar'>
        <motion.div className='flex-1 ml-5'>
          <Image width='60' height='60' src='/logo.png' alt='' />
        </motion.div>
        <div className='flex-none'>
          <div className='btn-group flex space-x-1 font-mono'>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className='btn btn-primary'
              onClick={() => mainPageMode()}
            >
              Main
            </motion.button>
            {userJWT ? (
              <motion.button
                whileHover={{ scale: 1.1 }}
                className='btn btn-secondary'
                onClick={() => {
                  window.localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                Log Out
              </motion.button>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className='btn btn-secondary'
                  onClick={() => {
                    router.push("/Login");
                  }}
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className='btn btn-accent'
                  onClick={() => router.push("/Register")}
                >
                  Register
                </motion.button>
              </>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              className='btn'
              onClick={() => aboutPageMode()}
            >
              About
            </motion.button>
            <motion.select
              whileHover={{ scale: 1.1 }}
              onChange={(e: any) => handleSetTheme(e.target.value)}
              className='select bg-neutral-content w-1/3 max-w-xs text-base-300 mr-9'
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
            </motion.select>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NavigationBar;
