import React, { Fragment, Component } from "react";

import handleInputChange from "../handlers/handleInputChange";
import handleLoginRegisterSubmit from "../handlers/handleLoginRegisterSubmit";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.boundSubmit = handleLoginRegisterSubmit.bind(this, "/user/register");
    this.handleInputChange = handleInputChange.bind(this);
  }

  render() {
    return (
      <Fragment>
        <div>Register</div>
        <form onSubmit={this.boundSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            type="text"
            name="username"
            id="0"
            onChange={this.handleInputChange}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            id="0"
            onChange={this.handleInputChange}
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </Fragment>
    );
  }
}

export default Register;
