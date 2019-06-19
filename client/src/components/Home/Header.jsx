import React from "react";

const Header = props => {
  const { setJwtToken, history } = props;

  const handleLogout = () => {
    setJwtToken("");
    history.push("/login");
  };

  window.addEventListener("scroll", () => {
    const headerElem = document.querySelector(".dashboard__header");

    if (window.scrollY > 50) {
      //Making the header transparent if the user scrolls
      headerElem.classList.add("dashboard__header--scrolled");
    } else {
      headerElem.classList.remove("dashboard__header--scrolled");
    }
  });

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