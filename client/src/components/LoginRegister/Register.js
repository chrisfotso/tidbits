import React, { Component } from "react";

import handleInputChange from "../../handlers/handleInputChange";
import handleLoginRegisterSubmit from "../../handlers/handleLoginRegisterSubmit";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password2: ""
    };

    this.boundSubmit = handleLoginRegisterSubmit.bind(this, "/user/register");
    this.handleInputChange = handleInputChange.bind(this);
  }

  render() {
    return (
      <div className="register">
        <div className="register__container">
          <h2 className="register__header">Sign Up</h2>
          <hr />
          <form className="register__form" onSubmit={this.boundSubmit}>
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
              onChange={this.handleInputChange}
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
              onChange={this.handleInputChange}
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
              onChange={this.handleInputChange}
            />
            <input type="submit" value="Submit" className="register__submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
