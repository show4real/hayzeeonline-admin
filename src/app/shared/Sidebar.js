import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { Trans } from "react-i18next";

class Sidebar extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach((i) => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector("#sidebar").classList.remove("active");
    Object.keys(this.state).forEach((i) => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: "/apps", state: "appsMenuOpen" },
      { path: "/basic-ui", state: "basicUiMenuOpen" },
      { path: "/advanced-ui", state: "advancedUiMenuOpen" },
      { path: "/form-elements", state: "formElementsMenuOpen" },
      { path: "/tables", state: "tablesMenuOpen" },
      { path: "/maps", state: "mapsMenuOpen" },
      { path: "/icons", state: "iconsMenuOpen" },
      { path: "/charts", state: "chartsMenuOpen" },
      { path: "/user-pages", state: "userPagesMenuOpen" },
      { path: "/error-pages", state: "errorPagesMenuOpen" },
      { path: "/general-pages", state: "generalPagesMenuOpen" },
      { path: "/ecommerce", state: "ecommercePagesMenuOpen" },
      { path: "/users", state: "users" },
    ];

    dropdownPaths.forEach((obj) => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true });
      }
    });
  }
  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          {/* <li className="nav-item nav-category">
            <Trans>Main</Trans>
          </li> */}
          <li
            className={this.isPathActive("/") ? "nav-item active" : "nav-item"}
          >
            <Link className="nav-link" to="/">
              <span className="icon-bg">
                <i className="mdi mdi-cube menu-icon"></i>
              </span>
              <span className="menu-title">
                <Trans>Dashboard</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/users") ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/users">
              <span className="icon-bg">
                <i className="mdi mdi-account-multiple-outline menu-icon"></i>
              </span>
              <span className="menu-title">
                <Trans>Users</Trans>
              </span>
            </Link>
          </li>

          <li
            className={
              this.isPathActive("/categories") ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/categories">
              <span className="icon-bg">
                <i className="mdi mdi-vector-intersection menu-icon"></i>
              </span>
              <span className="menu-title">
                <Trans>Categories</Trans>
              </span>
            </Link>
          </li>

          <li
            className={
              this.isPathActive("/brands") ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/brands">
              <span className="icon-bg">
                <i className="mdi mdi-vector-intersection menu-icon"></i>
              </span>
              <span className="menu-title">
                <Trans>Brands</Trans>
              </span>
            </Link>
          </li>

          <li
            className={
              this.isPathActive("/blogs") ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/blogs">
              <span className="icon-bg">
                <i className="mdi mdi-vector-intersection menu-icon"></i>
              </span>
              <span className="menu-title">
                <Trans>Blogs</Trans>
              </span>
            </Link>
          </li>

          <li
            className={
              this.isPathActive("/products") ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/products">
              <span className="icon-bg">
                <i className="mdi mdi-cart-outline menu-icon"></i>
              </span>
              <span className="menu-title">
                <Trans>Products</Trans>
              </span>
            </Link>
          </li>

          <li
            className={
              this.isPathActive("/orders") ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/orders">
              <span className="icon-bg">
                <i className="mdi mdi-shopping menu-icon"></i>
              </span>
              <span className="menu-title">
                <Trans>Orders</Trans>
              </span>
            </Link>
          </li>

          <li
            className={
              this.isPathActive("/prices") ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/prices">
              <span className="icon-bg">
                <i className="mdi mdi-shopping menu-icon"></i>
              </span>
              <span className="menu-title">
                <Trans>Prices</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/referrers") ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/referrers">
              <span className="icon-bg">
                <i className="mdi mdi-shopping menu-icon"></i>
              </span>
              <span className="menu-title">
                <Trans>Referrers</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/transactions")
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to="/transactions">
              <span className="icon-bg">
                <i className="mdi mdi-shopping menu-icon"></i>
              </span>
              <span className="menu-title">
                <Trans>Transactions</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/youtube") ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/youtube">
              <span className="icon-bg">
                <i className="mdi mdi-shopping menu-icon"></i>
              </span>
              <span className="menu-title">
                <Trans>Youtube</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/notice") ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/notice">
              <span className="icon-bg">
                <i className="mdi mdi-shopping menu-icon"></i>
              </span>
              <span className="menu-title">
                <Trans>Notices</Trans>
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add className 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  }
}

export default withRouter(Sidebar);
