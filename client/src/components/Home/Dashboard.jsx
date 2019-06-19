import React from "react";
import Header from "./Header";

const Dashboard = props => {
  const { setJwtToken, history } = props;

  return (
    <div className="dashboard">
      <Header setJwtToken={setJwtToken} history={history} />
      {props.children}
    </div>
  );
};

export default Dashboard;
