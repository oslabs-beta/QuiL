import { inputObj, userObj } from '../../(root)/frontendTypes';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import AnimationLogin from './AnimateLogin';
const randomstring = require('randomstring');

const Login = () => {
  const router = useRouter();

  const SIGNIN_STATE_CODE = 'c2lnbmlu';

  const loginHandler = async (e: any) => {
    e.preventDefault();
    const userObj: userObj = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    let data = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation {
              signin(username: "${userObj.username}", password: "${userObj.password}") {
                token
              }
            }`,
      }),
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        localStorage.setItem('token', data.data.signin.token);
        router.push('/');
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <AnimationLogin />
        <motion.div
          className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.03 }}
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
          <form onSubmit={loginHandler} data-cy="login-form">
            <label className="label ml-7 mt-3" htmlFor="username">
              Username:{' '}
            </label>
            <input
              className="input input-bordered w-5/6 max-w-xs ml-7"
              name="username"
              type="text"
              placeholder="username"
              data-cy="login-username"
            ></input>

            <label className="label ml-7" htmlFor="password">
              Password:{' '}
            </label>
            <input
              className="input input-bordered w-5/6 max-w-xs ml-7"
              name="password"
              type="password"
              placeholder="password"
              data-cy="login-password"
            ></input>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                type="submit"
                data-cy="login-button"
              >
                Login
              </button>
            </div>
          </form>
          <p className="flex justify-center text-xs my-2">OR</p>
          <Link
            href={{
              pathname: 'https://github.com/login/oauth/authorize',
              query: {
                client_id: '99436692da0716eb1c22',
                state: randomstring.generate() + SIGNIN_STATE_CODE,
              },
            }}
          >
            <button className="btn btn-success" style={{ width: '100%' }}>
              <img
                style={{ width: '2em', marginRight: '5px' }}
                src="https://cdn.iconscout.com/icon/free/png-256/github-163-761603.png"
              />
              Login with Github
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
