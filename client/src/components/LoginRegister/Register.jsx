import React, { useState } from "react";

import handleInputChange from "../../handlers/handleInputChange";
import handleSubmit from "../../handlers/handleLoginRegisterSubmit";

const Register = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [registerError, setRegisterError] = useState("");

  const credentialsObj = {
    username,
    password,
    password2
  };

  const handleRegister = async event => {
    event.preventDefault();

    const { err } = await handleSubmit("/user/register", credentialsObj, event);

    if (err) {
      //Handling any error returned by handleSubmit()
      return setRegisterError(err);
    }
  };

  return (
    <div className="register">
      <div className="register__container">
        <h2 className="register__header">Sign Up</h2>
        <hr />
        {registerError && <p className="register__error">{registerError}</p>}
        <form className="register__form" onSubmit={handleRegister}>
          <label
            htmlFor="username"
            className="register__label register__label--username"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            className="register__input register__input--username"
            onChange={e => handleInputChange(setUsername, e)}
          />
          <label
            htmlFor="password"
            className="register__label register__label--password"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            className="register__input register__input--password"
            onChange={e => handleInputChange(setPassword, e)}
          />
          <label
            htmlFor="password2"
            className="register__label register__label--password"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="password2"
            className="register__input register__input--password"
            onChange={e => handleInputChange(setPassword2, e)}
          />
          <input type="submit" value="Submit" className="register__submit" />
        </form>
      </div>
    </div>
  );
};

export default Register;
