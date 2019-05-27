import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import Login from "./LoginRegister/Login";
import Register from "./LoginRegister/Register";
import GuestHome from "./GuestHome/GuestHome";

const App = () => (
  <Router>
    <Route exact path="/" component={GuestHome} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
  </Router>
);

export default App;
