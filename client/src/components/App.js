import React, { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { AuthContextProvider } from "./AuthContext";

import Login from "./LoginRegister/Login";
import Register, { RegisterSuccess } from "./LoginRegister/Register";
import Home from "./Home/Home";
import UserPage from "./UserPage/UserPage";
import ExpandedTweet from "./Home/ExpandedTweet";
import RouteWithProps from "./RouteWithProps";

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <RouteWithProps path="/login" Component={Login} />
          <Route exact path="/register/success" component={RegisterSuccess} />
          <Route exact path="/register" component={Register} />
          <RouteWithProps path="/tweet/:tweetId" Component={ExpandedTweet} />
          <RouteWithProps path="/:username" Component={UserPage} />
          <RouteWithProps path="/" Component={Home} onHomeScreen={true} />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
