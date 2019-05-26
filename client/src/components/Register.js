import React, { Fragment, Component } from "react";

class Register extends Component {
  state = {
    username: "",
    password: ""
  };

  handleInputChange = e => {
    const inputName = e.target.name;
    this.setState({
      [inputName]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const reqBody = {
      username: this.state.username,
      password: this.state.password
    };

    const fetchOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reqBody)
    };

    const response = await fetch("/user/register", fetchOptions);
    const registeredUser = await response.json();

    return registeredUser;
  };

  render() {
    return (
      <Fragment>
        <div>Register</div>
        <form onSubmit={this.handleSubmit}>
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
