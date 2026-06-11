import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isSessionValid, isStaff } from "./authService";

// Shared routes available to both staff and admins. A valid, non-expired
// session with staff-level access (admin or staff) is required.
class StaffRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props;

    return (
      <Route
        {...props}
        render={(props) => {
          if (!isSessionValid()) {
            return <Redirect to="/auth/login" />;
          }
          if (!isStaff()) {
            return <Redirect to="/auth/login" />;
          }
          return <Component {...props} />;
        }}
      />
    );
  }
}

export default StaffRoute;
