import { inputObj, userObj } from "../../(root)/frontendTypes";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();

  const createUserHandler = async (e: any) => {
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
            newUser(username: "${userObj.username}", password: "${userObj.password}") {
              token
            }
          }`,
      }),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (data.data.newUser.token) localStorage.setItem("token", data.data.newUser.token);
        router.push("/");
      });
  };

  return (
    <div className="grid h-screen place-items-center">
      <form className="SignUpForm" onSubmit={createUserHandler}>
        <label htmlFor="username">Username: </label>
        <input name="username" type="text" placeholder="username"></input>

        <label htmlFor="password">Password: </label>
        <input name="password" type="text" placeholder="password"></input>

        <button type="submit">Create Account</button>
      </form>
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
