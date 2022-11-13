import Link from 'next/link';
import { NavigationBarProps } from '../../(root)/fronendTypes';
import React from 'react';
const NavigationBar = ({ isLogged }: NavigationBarProps): JSX.Element => {
  return (
    <div className="NavBar">
      <li className="NavBarList">
        <Link href="/Main">🐺</Link>
      </li>
      <li className="NavBarList">
        <Link href="/Login">Login</Link>
      </li>
      <li className="NavBarList">
        <Link href="/Register">Register</Link>
      </li>
      <li className="NavBarList">
        <Link href="/About">About</Link>
      </li>
    </div>
  );
};

export default NavigationBar;
