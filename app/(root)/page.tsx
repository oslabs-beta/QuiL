import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Page() {
  const submitForm = (e) => {
    console.log('inside submit');
  };
  const handleUsernameInput = (e) => {
    console.log('inside handle username');
  };
  const handlePasswordInput = (e) => {
    console.log('inside handle pass');
  };
  // console.log(userName, email, password);

  return (
    <div>
      <h1>Welcome to the Root</h1>
      <input type="text"></input>
      <form>
        <h3>Login here!</h3>
        <>
          <label htmlFor="username">Username: </label>
          <input id="username" name="username" type="text"></input>
        </>
        <>
          <label htmlFor="password">Password: </label>
          <input id="password" name="password" type="password"></input>
        </>
        <input type="button" value="submit" />
      </form>
      <Link href="/Main">Main</Link>
    </div>
  );
}
