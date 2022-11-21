const RegisterComponent = () => {
  const handleEmail = () => {
    console.log('inside email');
  };

  const handleUsername = (e) => {
    console.log('inside user');
  };

  const handlePassword = (e) => {
    console.log('inside password');
  };

  const handleSubmit = (e) => {
    console.log(e.target.value, ' handle the submit');
  };
  return (
    <div className="SignUp">
      <form>
        <h3>Sign up here!</h3>
        <label htmlFor="email">Email: </label>
        <input
          onChange={handleEmail}
          id="emailInput"
          name="email"
          type="text"
          required="required"
        ></input>

        <label htmlFor="username">Username: </label>
        <input
          onChange={handleUsername}
          id="username"
          name="username"
          type="text"
          required="required"
        ></input>

        <label htmlFor="password">Password: </label>
        <input
          onChange={handlePassword}
          id="password"
          name="password"
          type="password"
          required="required"
        ></input>

        <input onClick={handleSubmit} type="button" value="submit" />
      </form>
    </div>
  );
};

export default RegisterComponent;
