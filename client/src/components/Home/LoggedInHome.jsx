import React from "react";
import { Link } from "react-router-dom";

import Dashboard from "./Dashboard";
import Tweets from "./Tweets";

const LoggedInHome = props => {
  return (
    <Dashboard>
      <Tweets />
    </Dashboard>
  );
};

export default LoggedInHome;
