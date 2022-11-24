'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import jwtDecode from 'jwt-decode';

const clientId = '99436692da0716eb1c22';

export default function Page({ searchParams }) {
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
        }).then((res) => res.json());

        // let keyNum = 1;
        // console.log(`TOKEN`, token.data.handleOAuth.token);
        // if (window.localStorage.getItem(`key_${keyNum}`)) keyNum++;
        // window.localStorage.setItem('token', token.data.handleOAuth.token);
        const { token } = data.handleOAuth.token;

        
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
    </div>
  );
}
