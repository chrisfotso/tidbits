import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";

import LoggedOutHome from "./LoggedOutHome";
import LoggedInHome from "./LoggedInHome";

const Home = props => {
  const { jwtAuthToken } = useContext(AuthContext);

  if (jwtAuthToken) return <LoggedInHome />;

  return <LoggedOutHome />;
};

export default Home;
