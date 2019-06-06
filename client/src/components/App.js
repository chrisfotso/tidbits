import React, { useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import Login from "./LoginRegister/Login";
import Register from "./LoginRegister/Register";
import GuestHome from "./GuestHome/GuestHome";

const App = () => {
  const [jwtAuthToken, setJwtToken] = useState("");
  return (
    <Router>
      <Route exact path="/" component={GuestHome} />
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
