import React, { Component } from "react";

class App extends Component {
  state = {
    username: "",
    password: ""
  };

  handleUsernameChange = e => {
    this.setState({
      username: e.target.value
    });
  };

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }
    
    const response = await fetch("/user/register", fetchOptions)
    const registeredUser = await response.json()

    console.log(registeredUser)
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">Username</label>
        <br />
        <input
          type="text"
          name="username"
          id="0"
          onChange={this.handleUsernameChange}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          name="password"
          id="0"
          onChange={this.handlePasswordChange}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default App;
