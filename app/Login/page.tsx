'use client';
import { useRouter } from 'next/navigation';
import '../(root)/globals.css';

import NavigationBar from '../Main/(components)/NavigationBar';
export default function Page() {
  const handleOAuth = () => {
    const router = useRouter();
    const clientId = '99436692da0716eb1c22';
    const redirectUri = 'http://localhost:3000/Main';
    const state = 'jXDXBwH@7!#rz9KH';

    router.push(
      `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`
    );
  };
  return (
    <div>
      <NavigationBar isLogged={false} />
      <h1>
        <button className="btn btn-accent">Oauth</button>
      </h1>
    </div>
  );
}
