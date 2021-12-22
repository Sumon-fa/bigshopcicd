import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ isAdmin, component: Component, ...rest }) => {
  const { isAuthenticated, isLoading, user } = useSelector(
    (state) => state.auth
  );

  return (
    <Fragment>
      {isLoading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Redirect to="/login" />;
            }
            if (isAdmin === true && user.role !== "admin") {
              return <Redirect to="/" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoutes;
