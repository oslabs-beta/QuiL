'use client';
import Link from 'next/link';
import Login from './Login';
import { useEffect, useState } from 'react';

const clientId = '99436692da0716eb1c22';

export default function Page({ searchParams }: any) {
  const [code, setCode] = useState(searchParams.code);

  const gitHubAuth = `https://github.com/login/oauth/authorize?client_id=${clientId}`;

  useEffect(() => {
    if (code) {
      const handleOAuth = async (code: string) => {
        const { data } = await fetch('http://localhost:4000/graphql', {
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
        }).then(res => res.json());
      };
      handleOAuth(code);
    }
  }, [code]);

  return (
    <div>
      <h1>
        <Link href={gitHubAuth}>
          <button className="btn btn-accent">OAuth</button>
        </Link>
      </h1>
      <Login />
    </div>
  );
}
