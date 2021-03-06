import React, { useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { Link } from "react-router-dom";

const Header = props => {
  const { history } = props;
  const { setJwtToken } = useContext(AuthContext);

  const handleLogout = () => {
    setJwtToken("");
    history.push("/"); //Redirects user to login page when they log out
  };

  //Making the header transparent if the user scrolls
  const handleScroll = () => {
    const headerElem = document.querySelector(".dashboard__header");
    if (window.scrollY > 50) {
      headerElem.classList.add("dashboard__header--scrolled");
    } else {
      headerElem.classList.remove("dashboard__header--scrolled");
    }
  };

  //Adds scroll event listener to window on mount and removes it on unmount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return function cleanUpScroll() {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="dashboard__header">
      <Link to="/" style={{ textDecoration: "none", color: "#2f2f2f" }}>
        <h1 className="dashboard__title">Tidbits</h1>
      </Link>
      <button onClick={handleLogout} className="dashboard__logout">
        Log out
      </button>
    </div>
  );
};

export default withRouter(Header);
