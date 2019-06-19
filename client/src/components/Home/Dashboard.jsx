import React from "react";
import { set } from "mongoose";

export const Header = props => {
  const { setJwtToken } = props;

  const handleLogout = () => {
    setJwtToken("");
  };

  return (
    <div className="dashboard__header">
      <h1 className="dashboard__title">Tidbits</h1>
      <button onClick={handleLogout} className="dashboard__logout">
        Log out
      </button>
    </div>
  );
};

const Dashboard = props => {
  const { setJwtToken } = props;

  return (
    <div className="dashboard">
      <Header setJwtToken={setJwtToken} />
      {props.children}
    </div>
  );
};

export default Dashboard;
