import React from "react";

const GuestHome = () => {
  return (
    <div className="guest-home">
      <div className="guest-home__container guest-home__container--text">
        <div className="guest-home__header">Tidbits</div>
        <div className="guest-home__subheader">Share a little life.</div>
      </div>
      <div className="guest-home__container guest-home__container--button ">
        <button className="guest-home__button guest-home__button--login">
          Log in
        </button>
        <button className="guest-home__button guest-home__button--register">
          Sign up
        </button>
      </div>
    </div>
  );
};

export default GuestHome;
