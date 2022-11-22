'use client';
import Link from 'next/link';
import { useEffect } from 'react';

const clientId = '99436692da0716eb1c22';
const redirectUri = 'http://localhost:3000/Main';
const state = 'jXDXBwH@7!#rz9KH';
const clientSecret = '5fa9b64049117efb7af84af8db2b2b16934f015b';

export default function Page({ searchParams }) {
  const handleOAuth = () => {};

  const gitHubAuth = `https://github.com/login/oauth/authorize?client_id=${clientId}`;

  useEffect(() => {
    const authorizeCode = async (code: string) => {
      const status = await fetch(
        `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`,
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
          },
        }
      )
        .then(res => {
          console.log('STATUS:', status);
          return res.json();
        })
        .catch(err => console.log(err));

      return status;
    };

    if (searchParams.code) {
      console.log('CODE', searchParams.code);

      authorizeCode(searchParams.code);
    }
  });

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
