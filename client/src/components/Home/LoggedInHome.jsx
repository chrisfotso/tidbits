import React, { useState } from "react";
import { Link } from "react-router-dom";

import Dashboard from "./Dashboard";
import Tweets from "./Tweets";

const LoggedInHome = props => {
  const { jwtAuthToken, setJwtToken, history } = props;
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Dashboard setJwtToken={setJwtToken} history={history}>
      <Tweets
        isLoading={isLoading}
        history={history}
        setIsLoading={setIsLoading}
        jwtAuthToken={jwtAuthToken}
        initialTweets={[]}
        onHomeScreen={true}
      />
    </Dashboard>
  );
};

export default LoggedInHome;
