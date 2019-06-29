import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";

import Dashboard from "./Dashboard";
import Tweets from "./Tweets";

const LoggedInHome = props => (
  <Dashboard>
    <Tweets initialTweets={[]} onHomeScreen={true} />
  </Dashboard>
);

export default LoggedInHome;
