import React, { Component, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Spinner from "./shared/Spinner";
import UserIndex from "./users/UserIndex";
import AdminRoute from "./services/AdminRoute";
import StaffRoute from "./services/StaffRoute";

import Login from "./auth/Login";
import Dashboard from "./dashboard/Dashboard";
import Register from "./auth/Register";
import AuthRoute from "./services/AuthRoute";
import ResetPassword from "./auth/ResetPassword";
import ForgotPassword from "./auth/ForgotPassword";
import { Routes } from "./auth/routes";
import ProductIndex from "./products/ProductIndex";

import BrandIndex from "./brands/BrandIndex";
import CategoryIndex from "./category/CategoryIndex";
import BlogIndex from "./blog/BlogIndex";
import CustomerOrderIndex from "./orders/CustomerOrderIndex";
import YoutubeIndex from "./youtube/YoutubeIndex";
import ReferrerIndex from "./referrers/ReferrerIndex";
import TransactionIndex from "./transactions/TransactionIndex";
import PriceIndex from "./priceedits/PriceIndex";
import NoticeIndex from "./notice/NoticeIndex";

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          {/* Users menu is admin-only */}
          <AdminRoute exact path="/users" component={UserIndex} />

          {/* All other menus are available to staff and admins */}
          <StaffRoute exact path="/" component={Dashboard} />
          <StaffRoute exact path="/dashboard" component={Dashboard} />
          <StaffRoute exact path="/categories" component={CategoryIndex} />
          <StaffRoute exact path="/brands" component={BrandIndex} />
          <StaffRoute exact path="/blogs" component={BlogIndex} />
          <StaffRoute exact path="/orders" component={CustomerOrderIndex} />
          <StaffRoute exact path="/youtube" component={YoutubeIndex} />
          <StaffRoute exact path="/prices" component={PriceIndex} />
          <StaffRoute exact path="/referrers" component={ReferrerIndex} />
          <StaffRoute exact path="/transactions" component={TransactionIndex} />
          <StaffRoute exact path="/notice" component={NoticeIndex} />

          <StaffRoute exact path="/products" component={ProductIndex} />
          <AuthRoute path="/auth/login" component={Login} />
          <AuthRoute path="/auth/register" component={Register} />
          <AuthRoute path="/auth/forgot-password" component={ForgotPassword} />
          <AuthRoute
            exact
            path={Routes.ResetPassword.path}
            component={ResetPassword}
          />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
