import React, { useContext } from "react";
import Header from "./Header";

const Dashboard = ({ children }) => (
  <div className="dashboard">
    <Header />
    {children}
  </div>
);

export default Dashboard;
