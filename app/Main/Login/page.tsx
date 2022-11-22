'use client';
import Link from 'next/link';
import { useEffect } from 'react';

const clientId = '99436692da0716eb1c22';
const redirectUri = 'http://localhost:3000/Main';
const state = 'jXDXBwH@7!#rz9KH';
const clientSecret = '5fa9b64049117efb7af84af8db2b2b16934f015b';

export default function Page({ searchParams }) {
  const handleOAuth = async (code: string) => {
    const token = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation HandleOAuthToken {
          handleOAuth (code: "${code}") {
            token
          }
        }`,
      }),
    }).then((res) => res.json());

    console.log('TOKEN', token);

    return token;
  };

  const gitHubAuth = `https://github.com/login/oauth/authorize?client_id=${clientId}`;

  if (searchParams.code) {
    handleOAuth(searchParams.code);
  }

  return (
    <div>
      <h1>
        <Link href={gitHubAuth}>
          <button className="btn btn-accent">OAuth</button>
        </Link>
      </h1>
    </div>
  );
}
