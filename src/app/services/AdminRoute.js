import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isSessionValid, isAdmin } from "./authService";

// Admin-only routes (e.g. the Users menu). A valid, non-expired session that
// belongs to an admin is required.
class AdminRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props;

    return (
      <Route
        {...props}
        render={(props) => {
          if (!isSessionValid()) {
            return <Redirect to="/auth/login" />;
          }
          if (!isAdmin()) {
            // Logged in but not an admin — send them to the dashboard.
            return <Redirect to="/" />;
          }
          return <Component {...props} />;
        }}
      />
    );
  }
}

export default AdminRoute;
