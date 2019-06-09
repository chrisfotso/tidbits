import React from "react";

const Dashboard = props => {
  return (
    <div className="dashboard">
      <h1 className="dashboard__header">Tidbits</h1>
      {props.children}
    </div>
  );
};

export default Dashboard;
