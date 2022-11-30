import { inputObj, userObj } from '../../(root)/frontendTypes';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
const randomstring = require('randomstring');

const Register = () => {
  const router = useRouter();
  const REGISTER_STATE_CODE = 'cmVnaXN0ZXI';

  const createUserHandler = async (e: any) => {
    e.preventDefault();
    const userObj: userObj = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    let data = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation {
            newUser(username: "${userObj.username}", password: "${userObj.password}") {
              token
            }
          }`,
      }),
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        if (data.data.newUser.token) {
          localStorage.setItem('token', data.data.newUser.token);
          router.push('/');
        }
        else throw new Error;
      });
  };

  return (
    <div className="card-body grid h-full place-items-center">
      <form className="SignUpForm" onSubmit={createUserHandler}>
        <label className="label" htmlFor="username">
          Username:
        </label>
        <input
          className="input input-bordered w-full max-w-xs"
          name="username"
          type="text"
          placeholder="username"
        ></input>

        <label className="label" htmlFor="password">
          Password:
        </label>
        <input
          className="input input-bordered w-full max-w-xs"
          name="password"
          type="text"
          placeholder="password"
        ></input>
        <div className="form-control mt-6">
          <button className="btn btn-primary" type="submit">
            Create Account
          </button>
        </div>
      </form>
      <p style={{ display: 'flex', justifyContent: 'center' }}>OR</p>
      <Link
        href={{
          pathname: 'https://github.com/login/oauth/authorize',
          query: {
            client_id: '99436692da0716eb1c22',
            state: randomstring.generate() + REGISTER_STATE_CODE,
          },
        }}
      >
        <button className="btn btn-success" style={{ width: '100%' }}>
          <img
            style={{ width: '2em', marginRight: '5px' }}
            src="https://cdn.iconscout.com/icon/free/png-256/github-163-761603.png"
          />
          Register with Github
        </button>
      </Link>
    </div>
  );
};

{
  /* <button type='submit'>Create Account</button> */
}
{
  /* <button type='submit' onClick={createUserHandler}>Create Account</button> */
}

export default Register;

/*
mutation ($password: String, $username: String, $newUserUsername2: String, $newUserPassword2: String) newUser {
            newUser ($password: String, $username: String, $newUserUsername2: String, $newUserPassword2: String) {
              newUser(password: "${userObj.password}" username: "${userObj.username}") {
              token
            }
          }
*/
