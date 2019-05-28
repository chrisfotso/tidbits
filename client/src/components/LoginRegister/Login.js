import React, { Component } from "react";

import handleInputChange from "../../handlers/handleInputChange";
import handleLoginRegisterSubmit from "../../handlers/handleLoginRegisterSubmit";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.boundSubmit = handleLoginRegisterSubmit.bind(this, "/user/login");
    this.handleInputChange = handleInputChange.bind(this);
  }

  render() {
    return (
      <div className="login">
        <div className="login__container">
          <h2 className="login__header">Log In</h2>
          <hr />
          <form className="login__form" onSubmit={this.boundSubmit}>
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
              onChange={this.handleInputChange}
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
              onChange={this.handleInputChange}
            />
            <input type="submit" value="Submit" className="login__submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
