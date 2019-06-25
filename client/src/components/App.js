import React, { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Login from "./LoginRegister/Login";
import Register, { RegisterSuccess } from "./LoginRegister/Register";
import Home from "./Home/Home";
import UserPage from "./UserPage/UserPage";
import ExpandedTweet from "./Home/ExpandedTweet";
import RouteWithProps from "./RouteWithProps";

const App = () => {
  const [jwtAuthToken, setJwtToken] = useState("");

  return (
    <Router>
      <Switch>
        <RouteWithProps
          path="/login"
          Component={Login}
          jwtAuthToken={jwtAuthToken}
          setJwtToken={setJwtToken}
        />
        <Route exact path="/register/success" component={RegisterSuccess} />
        <Route exact path="/register" component={Register} />
        <RouteWithProps
          path="/tweet/:tweetId"
          Component={ExpandedTweet}
          jwtAuthToken={jwtAuthToken}
        />
        <RouteWithProps
          path="/:username"
          Component={UserPage}
          setJwtToken={setJwtToken}
        />
        <RouteWithProps
          path="/"
          Component={Home}
          jwtAuthToken={jwtAuthToken}
          setJwtToken={setJwtToken}
        />
      </Switch>
    </Router>
  );
};

export default App;
