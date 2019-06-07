import React, { useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import Login from "./LoginRegister/Login";
import Register from "./LoginRegister/Register";
import Home from "./Home/Home";

const App = () => {
  const [jwtAuthToken, setJwtToken] = useState("");

  return (
    <Router>
      <Route
        exact
        path="/"
        render={props => <Home {...props} jwtAuthToken={jwtAuthToken} />}
      />
      <Route
        exact
        path="/login"
        render={props => (
          <Login
            {...props}
            jwtAuthToken={jwtAuthToken}
            setJwtToken={setJwtToken}
          />
        )}
      />
      <Route exact path="/register" component={Register} />
    </Router>
  );
};

export default App;
