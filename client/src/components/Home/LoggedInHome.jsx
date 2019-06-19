import React from "react";
import { Link } from "react-router-dom";

import Dashboard from "./Dashboard";
import Tweets from "./Tweets";

const LoggedInHome = props => {
  const { jwtAuthToken } = props;

  return (
    <Dashboard>
      <Tweets jwtAuthToken={jwtAuthToken} />
    </Dashboard>
  );
};

export default LoggedInHome;
