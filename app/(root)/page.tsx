import { useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "path";
import React from "react";

export default function Page() {
  const submitForm = (e) => {
    console.log("inside submit");
  };
  const handleUsernameInput = (e) => {
    console.log("inside handle username");
  };
  const handlePasswordInput = (e) => {
    console.log("inside handle pass");
  };
  // console.log(userName, email, password);

  return (
    <div data-theme='business'>
      <h1 className='text-3x1 font-bold underline'>Welcome to QuiL</h1>
      <h3>Writing GraphQL for you</h3>
      <div className='landingPageURI'>
        <div>insert URI</div>
        <input type='text'></input>
        <Link href='/Main'>Launch</Link>
      </div>
      <Link className='landingPageBtn' href='/Main'>
        Main
      </Link>
    </div>
  );
}
