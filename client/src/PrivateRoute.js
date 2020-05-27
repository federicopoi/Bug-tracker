import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, authed, isLoading, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (authed === null && isLoading === false) return null;
      if (authed === null && isLoading === true) return null;
      if (authed === true && isLoading === false)
        return <Component {...props} rest={rest} />;
      if (authed === false && isLoading === false)
        return <Redirect to="/login" />;
    }}
  />
);

export default PrivateRoute;
