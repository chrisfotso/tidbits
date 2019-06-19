import React, { useState, useEffect } from "react";

import handleInputChange from "../../handlers/handleInputChange";
import handleSubmit from "../../handlers/handleLoginRegisterSubmit";

const Register = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [registerError, setRegisterError] = useState("");

  const { history } = props;

  const credentialsObj = {
    username,
    password,
    password2
  };

  const handleRegister = async event => {
    const registerReturnValue = await handleSubmit(
      "/user/register",
      credentialsObj,
      setRegisterError,
      event
    );

    if (registerReturnValue && registerReturnValue.username) {
      history.push("/register/success");
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
            type="•••••text"
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

export const RegisterSuccess = props => {
  const { history } = props;

  const [secondsRemaining, setSecondsRemaining] = useState(5000);

  useEffect(() => {
    const redirectInterval = setInterval(() => {
      setSecondsRemaining(currSecs => currSecs - 1000);
    }, 1000);

    return function redirectCleanup() {
      clearInterval(redirectInterval);
    };
  }, []);

  if (secondsRemaining === 0) {
    history.push("/login");
  }

  return (
    <div className="register__success">
      <div className="register__success-message">
        <h1>You're registered successfully!</h1>
        <p>
          You'll be redirected to the login screen in {secondsRemaining / 1000}{" "}
          seconds.
        </p>
      </div>
    </div>
  );
};

export default Register;
