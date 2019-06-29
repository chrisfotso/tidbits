import React from "react";

import Dashboard from "./Dashboard";
import Tweets from "./Tweets";

const LoggedInHome = () => (
  <Dashboard>
    <Tweets initialTweets={[]} onHomeScreen={true} />
  </Dashboard>
);

export default LoggedInHome;
