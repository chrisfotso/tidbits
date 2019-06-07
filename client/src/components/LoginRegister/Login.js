import React, { useState } from "react";

import handleInputChange from "../../handlers/handleInputChange";
import handleLoginRegisterSubmit from "../../handlers/handleLoginRegisterSubmit";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const credentialsObj = { username, password };

  const handleLogin = async event => {
    event.preventDefault();

    const { token: generatedToken } = await handleLoginRegisterSubmit(
      "/user/login",
      credentialsObj,
      event
    );

    props.setJwtToken(prevToken => {
      if (generatedToken === undefined) return prevToken;
      else return generatedToken;
    });

    if (generatedToken !== undefined) return props.history.push("/");

    return;
  };

  return (
    <div className="login">
      <div className="login__container">
        <h2 className="login__header">Log In</h2>
        <hr />
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
