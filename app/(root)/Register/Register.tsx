import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { inputObj, userObj } from '../../(root)/frontendTypes';
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
    let data = await fetch(
      'http://quilbackend1-env.eba-52zmdsmp.us-east-1.elasticbeanstalk.com/graphql',
      {
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
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (data.data.newUser.token) {
          localStorage.setItem('token', data.data.newUser.token);
          router.push('/');
        } else throw new Error();
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h1 className="text-5xl font-bold">Register with QuiL</h1>
          <p className="py-6">
            Registering with QuiL will grant you access to save your URI's and
            themes. Simply create your account by entering your desired username
            and password or register with you github account.
          </p>
        </motion.div>
        <motion.div
          className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            default: {
              duration: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
            },
            scale: {
              type: 'spring',
              damping: 5,
              stiffness: 100,
              restDelta: 0.001,
            },
          }}
        >
          <form
            className="SignUpForm"
            onSubmit={createUserHandler}
            data-cy="register-form"
          >
            <label className="label ml-7 mt-3" htmlFor="username">
              Username:
            </label>
            <input
              className="input input-bordered w-full max-w-xs ml-7"
              name="username"
              type="text"
              placeholder="username"
              data-cy="register-username-input"
            ></input>

            <label className="label ml-7" htmlFor="password">
              Password:
            </label>
            <input
              className="input input-bordered w-5/6 max-w-xs ml-7"
              name="password"
              type="text"
              placeholder="password"
            ></input>
            <div className="form-control mt-6 mx-2">
              <button
                className="btn btn-primary"
                type="submit"
                data-cy="create-account-btn"
              >
                Create Account
              </button>
            </div>
          </form>
          <p className="flex justify-center text-xs my-2">OR</p>
          <Link
            href={{
              pathname: 'https://github.com/login/oauth/authorize',
              query: {
                client_id: '99436692da0716eb1c22',
                state: randomstring.generate() + REGISTER_STATE_CODE,
              },
            }}
            data-cy="register-github-btn"
            className="mx-2 mb-4"
          >
            <button className="btn btn-success" style={{ width: '100%' }}>
              <img
                style={{ width: '2em', marginRight: '5px' }}
                src="https://cdn.iconscout.com/icon/free/png-256/github-163-761603.png"
              />
              Register with Github
            </button>
          </Link>
        </motion.div>
      </div>
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
