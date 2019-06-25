import React from "react";
import { Route } from "react-router-dom";

const RouteWithProps = props => {
  const { Component, path } = props;
  return (
    <Route
      exact
      path={path}
      render={routeProps => <Component {...props} {...routeProps} />}
    />
  );
};

export default RouteWithProps;
