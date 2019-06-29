import React, { useState, useContext } from "react";

import { AuthContext } from "../AuthContext";

import handleInputChange from "../../handlers/handleInputChange";
import handleSubmit from "../../handlers/handleLoginRegisterSubmit";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const { setJwtToken } = useContext(AuthContext);

  const credentialsObj = { username, password };

  // Since handleLoginRegisterSubmit() is used for both the Login and Register components,
  // I have to separate logic meant for only the Login component into its own function
  const handleLogin = async event => {
    event.preventDefault();

    const loginReturnValue = await handleSubmit(
      "/user/login",
      credentialsObj,
      setLoginError,
      event
    );

    //handleSubmit() can either return undefined or a data object
    //So I have to make sure the return value is truthy
    if (loginReturnValue && loginReturnValue.token) {
      //This is the logic that is specific to the login component;
      //Updating the JWT token in state and redirecting to the dashboard/home page
      setJwtToken(loginReturnValue.token);
      return props.history.push("/");
    }

    return;
  };

  return (
    <div className="login">
      <div className="login__container">
        <h2 className="login__header">Log In</h2>
        <hr />
        {loginError && <p className="login__error">{loginError}</p>}
        <form className="login__form" onSubmit={handleLogin}>
          <label
            htmlFor="username"
            className="login__label login__label--username"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            className="login__input login__input--username"
            onChange={e => handleInputChange(setUsername, e)}
          />
          <label
            htmlFor="password"
            className="login__label login__label--password"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            className="login__input login__input--password"
            onChange={e => handleInputChange(setPassword, e)}
          />
          <input type="submit" value="Submit" className="login__submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;
