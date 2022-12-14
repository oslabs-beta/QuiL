'use client';

import Login from './Login';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page({ searchParams }: any) {
  const [code, setCode] = useState(searchParams.code);
  const router = useRouter();

  useEffect(() => {
    if (code) {
      const handleOAuth = async (code: string) => {
        const oauthResponse = await fetch('/api/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `mutation {
                postOAuth(code: "${code}", oauthType: "signin") {
                  token
                }
              }`,
          }),
        }).then(res => res.json());
        localStorage.setItem('token', oauthResponse.data.postOAuth.token);
        router.push('/');
      };
      handleOAuth(code);
    }
  }, [code]);

  if (code) {
    return (
      <div>
        <h1>Authorizing OAuth</h1>
      </div>
    );
  }
  return (
    <div>
      <Login />
    </div>
  );
}
