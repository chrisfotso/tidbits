import React, { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Login from "./LoginRegister/Login";
import Register, { RegisterSuccess } from "./LoginRegister/Register";
import Home from "./Home/Home";
import UserPage from "./UserPage/UserPage";
import ExpandedTweet from "./Home/ExpandedTweet";

const App = () => {
  const [jwtAuthToken, setJwtToken] = useState("");

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/login"
          render={(
            props //Using a render function because I want to pass additional props to the rendered component
          ) => (
            <Login
              {...props}
              jwtAuthToken={jwtAuthToken}
              setJwtToken={setJwtToken}
            />
          )}
        />
        <Route exact path="/register/success" component={RegisterSuccess} />
        <Route exact path="/register" component={Register} />
        <Route
          exact
          path="/:username"
          render={props => <UserPage {...props} setJwtToken={setJwtToken} />}
        />
        <Route
          exact
          path="/tweet/:tweetId"
          render={props => (
            <ExpandedTweet {...props} jwtAuthToken={jwtAuthToken} />
          )}
        />
        <Route
          exact
          path="/"
          render={props => (
            <Home
              {...props}
              jwtAuthToken={jwtAuthToken}
              setJwtToken={setJwtToken}
            />
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;
