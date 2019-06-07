import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import Login from "./LoginRegister/Login";
import Register from "./LoginRegister/Register";
import GuestHome from "./GuestHome/GuestHome";

const App = () => {
  const [jwtAuthToken, setJwtToken] = useState("");

  return (
    <Router>
      <Route
        exact
        path="/"
        render={props => <GuestHome {...props} jwtAuthToken={jwtAuthToken} />}
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
