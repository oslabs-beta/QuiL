import { inputObj, userObj } from "../../(root)/frontendTypes";

const Register = () => {
  // const handleEmail = () => {
  //   console.log('inside email');
  // };

  // const handleUsername = (e) => {
  //   console.log('inside user');
  // };

  // const handlePassword = (e) => {
  //   console.log('inside password');
  // };

  // const handleSubmit = (e) => {
  //   console.log(e.target.value, ' handle the submit');
  // };

  const createUserHandler = async (e: any) => {
    const userObj: userObj = {
      username: e.target.username.value,
      password: e.target.password.value
    };
    console.log(userObj);
    let data = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: `mutation Mutation(${userObj.username}: String, ${userObj.password}: String) {
            newUser(username: ${userObj.username}, password: ${userObj.password}) {
              success
              token
              userId
            }
          }`
        })
    })
    .then((data) => {
        return data.json();
    })
    .then((data) => {
        localStorage.setItem('token', data.token);
    })
  };

  return (
    <div className="grid h-screen place-items-center">
      <form className="SignUpForm" onSubmit={createUserHandler}>
        
        <label htmlFor="username">Username: </label>
        <input name="username" type="text" placeholder="username"></input>

        <label htmlFor="password">Password: </label> 
        <input name="password" type="text" placeholder="password"></input>

        <button onClick={createUserHandler}>Create Account</button>
      </form>
    </div>
  );
};

export default Register;
