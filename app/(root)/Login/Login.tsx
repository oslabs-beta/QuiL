import { inputObj, userObj } from "../../(root)/frontendTypes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const [logged, setLogged] = useState<boolean>(false);

  const router = useRouter();

  const loginHandler = async (e: any) => {
    e.preventDefault();
    const userObj: userObj = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    let data = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation {
            signin(username: "${userObj.username}", password: "${userObj.password}") {
              token
            }
          }`,
      }),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.data.signin.token);
        setLogged(true);
        router.push("/");
      });
  };

  return (
    <div className="card-body form-control grid h-screen place-items-center">
      <form onSubmit={loginHandler}>
        <label htmlFor="username">Username: </label>
        <input name="username" type="text" placeholder="username"></input>

        <label htmlFor="password">Password: </label>
        <input name="password" type="text" placeholder="password"></input>

        <div className="form-control mt-6">
          <button className="btn btn-primary" type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
