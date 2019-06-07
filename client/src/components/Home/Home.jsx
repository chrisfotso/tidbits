import React from "react";

import LoggedOutHome from "./LoggedOutHome";
import LoggedInHome from "./LoggedInHome";

const Home = props => {
  if (props.jwtAuthToken) {
    return <LoggedInHome {...props} />;
  } else return <LoggedOutHome {...props} />;
};

export default Home;
