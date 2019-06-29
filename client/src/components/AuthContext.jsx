import React, { useState } from "react";

const AuthContext = React.createContext();

const AuthContextProvider = props => {
  const [jwtAuthToken, setJwtToken] = useState(null);

  return (
    <AuthContext.Provider value={{ jwtAuthToken, setJwtToken }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
