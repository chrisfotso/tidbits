import React, { useState } from "react";
import { Link } from "react-router-dom";

import Dashboard from "./Dashboard";
import Tweets from "./Tweets";

const LoggedInHome = props => {
  const { jwtAuthToken, setJwtToken } = props;

  const [isLoading, setIsLoading] = useState(true);

  return (
    <Dashboard setJwtToken={setJwtToken}>
      <Tweets
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        jwtAuthToken={jwtAuthToken}
      />
    </Dashboard>
  );
};

export default LoggedInHome;
