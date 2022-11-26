import { inputObj, userObj } from "../../(root)/frontendTypes";

const Login = () => {
  const loginHandler = async (e: any) => {
    const userObj: userObj = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    let data = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: userObj.username,
            password: userObj.password
        })
    })
    .then((data) => {
        return data.json();
    })
    .then((data) => {
        window.localStorage.setItem('token', data.token);
    })
  };

  return (
    <div className="card-body form-control grid h-screen place-items-center">
      <form onSubmit={loginHandler}>
        <label htmlFor="username">Username: </label>
        <input name="username" type="text" placeholder="username"></input>

        <label htmlFor="password">Password: </label>
        <input name="password" type="text" placeholder="password"></input>

        <div className="form-control mt-6">
          <button className="btn btn-primary" onClick={loginHandler}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
