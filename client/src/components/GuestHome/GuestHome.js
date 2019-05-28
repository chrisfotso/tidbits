import React from "react";
import { Link } from "react-router-dom";

const GuestHome = () => (
  <div className="guest-home">
    <div className="guest-home__container guest-home__container--text">
      <div className="guest-home__header">Tidbits</div>
      <div className="guest-home__subheader">Share a little life.</div>
    </div>
    <div className="guest-home__container guest-home__container--button ">
      <Link to="/login" style={{ textDecoration: "none" }}>
        {" "}
        <button className="guest-home__button guest-home__button--login">
          Log in
        </button>
      </Link>
      <Link to="/register" style={{ textDecoration: "none" }}>
        <button className="guest-home__button guest-home__button--register">
          Sign up
        </button>
      </Link>
    </div>
  </div>
);

export default GuestHome;
