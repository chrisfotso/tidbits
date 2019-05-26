import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";

const App = props => (
  <Router>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
  </Router>
);

export default App;
