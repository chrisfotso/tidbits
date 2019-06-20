import React, { useEffect } from "react";

const Header = props => {
  const { setJwtToken, history } = props;

  const handleLogout = () => {
    setJwtToken("");
    history.push("/login"); //Redirects user to login page when they log out
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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return function cleanupScroll() {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="dashboard__header">
      <h1 className="dashboard__title">Tidbits</h1>
      <button onClick={handleLogout} className="dashboard__logout">
        Log out
      </button>
    </div>
  );
};

export default Header;
