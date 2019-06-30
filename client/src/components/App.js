import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { AuthContextProvider } from "./AuthContext";

import Login from "./LoginRegister/Login";
import Register, { RegisterSuccess } from "./LoginRegister/Register";
import Home from "./Home/Home";
import UserPage from "./UserPage/UserPage";
import ExpandedTweet from "./Home/ExpandedTweet";
import RouteWithProps from "./RouteWithProps";

const App = () => (
  <AuthContextProvider>
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register/success" component={RegisterSuccess} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/tweet/:tweetId" component={ExpandedTweet} />
        <Route exact path="/:username" component={UserPage} />
        <RouteWithProps path="/" Component={Home} onHomeScreen={true} />
      </Switch>
    </Router>
  </AuthContextProvider>
);

export default App;
