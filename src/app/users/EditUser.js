import React, { Component } from "react";
import { Modal } from "reactstrap";
import { Form } from "react-bootstrap";
import { editUser } from "../services/userService";
import { Button } from "antd";

const ROLES = [
  { value: "admin", label: "Admin" },
  { value: "staff", label: "Staff" },
  { value: "customer", label: "Customer" },
  { value: "referrer", label: "Referrer" },
];

// The API stores roles in a single `admin` column.
const adminToRole = (admin) => {
  if (admin === null || admin === undefined || admin === "") return "referrer";
  if (admin == 1) return "admin";
  if (admin == 2) return "staff";
  if (admin == 0) return "customer";
  return "referrer";
};

export class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false,
      loading: false,
      id: props.user.id,
      err: { email: "", phone: "" },
      fields: {
        name: props.user.name || "",
        email: props.user.email || "",
        password: "",
        confirmPassword: "",
        address: props.user.address || "",
        phone: props.user.phone || "",
        role: adminToRole(props.user.admin),
      },
      errors: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        phone: "",
        role: "",
      },
    };
  }

  validate = (name, value) => {
    const { fields } = this.state;
    switch (name) {
      case "name":
        if (!value || value.trim() === "") {
          return "Name is Required";
        }
        return "";
      case "email":
        if (!value) {
          return "Email is Required";
        } else if (
          !value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
        ) {
          return "Enter a valid email address";
        }
        return "";
      case "phone":
        if (!value || value.trim() === "") {
          return "Phone number is Required";
        }
        return "";
      case "role":
        if (!value) {
          return "Role is Required";
        }
        return "";
      case "password":
        // Optional on edit — only validate when a new password is entered.
        if (value && (value.length < 8 || value.length > 15)) {
          return "Please fill at least 8 character";
        }
        return "";
      case "confirmPassword":
        if (fields.password && value !== fields.password) {
          return "New Password and Confirm Password Must be Same";
        }
        return "";
      default:
        return "";
    }
  };

  handleUserInput = (e) => {
    this.setState({
      errors: {
        ...this.state.errors,
        [e.target.name]: this.validate(e.target.name, e.target.value),
      },
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { fields, id } = this.state;

    let validationErrors = {};
    Object.keys(fields).forEach((name) => {
      const error = this.validate(name, fields[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      this.setState({ errors: validationErrors });
      return;
    }

    const { name, email, password, address, phone, role } = fields;

    this.setState({ saving: true });
    editUser({ name, email, password, address, phone, role, id })
      .then(() => {
        this.setState({ err: { email: "", phone: "" }, saving: false });
        this.props.toggle();
        this.props.saved();
      })
      .catch((err) => {
        const apiErrors = (err && err.errors) || {};
        this.setState({
          err: {
            email: apiErrors.email ? apiErrors.email[0] : "",
            phone: apiErrors.phone ? apiErrors.phone[0] : "",
          },
          saving: false,
        });
      });
  };

  render() {
    const { loading, saving, fields, errors, err } = this.state;
    const { user, toggle } = this.props;

    return (
      <Modal
        className="modal-dialog modal-dialog-centered"
        isOpen={user != null}
        toggle={() => !loading && !saving && toggle}
        style={{ maxWidth: 700, paddingLeft: 100 }}
      >
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={toggle}
              >
                <span aria-hidden={true}>×</span>
              </button>
              <h4 className="card-title">Edit User</h4>

              <p className="card-description"> </p>
              <form className="forms-sample">
                <Form.Group>
                  <label>Name</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    name="name"
                    value={fields.name}
                    onChange={(event) => this.handleUserInput(event)}
                  />
                  <div>
                    <span
                      style={{ paddingTop: 10, fontSize: 12, fontWeight: "bold" }}
                      className="text-danger"
                    >
                      {errors.name}
                    </span>
                  </div>
                </Form.Group>
                <Form.Group>
                  <label>Email address</label>
                  <Form.Control
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email Address"
                    value={fields.email}
                    onChange={(event) => this.handleUserInput(event)}
                  />
                  <div>
                    <span
                      style={{ paddingTop: 10, fontSize: 12, fontWeight: "bold" }}
                      className="text-danger"
                    >
                      {errors.email}
                      {err && err.email}
                    </span>
                  </div>
                </Form.Group>
                <Form.Group>
                  <label>Phone Number</label>
                  <Form.Control
                    type="number"
                    className="form-control"
                    name="phone"
                    placeholder="Enter Phone Number"
                    value={fields.phone}
                    onChange={(event) => this.handleUserInput(event)}
                  />
                  <div>
                    <span
                      style={{ paddingTop: 10, fontSize: 12, fontWeight: "bold" }}
                      className="text-danger"
                    >
                      {errors.phone}
                      {err.phone}
                    </span>
                  </div>
                </Form.Group>
                <Form.Group>
                  <label>Password</label>
                  <Form.Control
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Leave blank to keep current password"
                    value={fields.password}
                    onChange={(event) => this.handleUserInput(event)}
                  />
                  <div>
                    <span
                      style={{ paddingTop: 10, fontSize: 12, fontWeight: "bold" }}
                      className="text-danger"
                    >
                      {errors.password}
                    </span>
                  </div>
                </Form.Group>
                <Form.Group>
                  <label>Confirm Password</label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm Password"
                    value={fields.confirmPassword}
                    onChange={(event) => this.handleUserInput(event)}
                  />
                  <div>
                    <span
                      style={{ paddingTop: 10, fontSize: 12, fontWeight: "bold" }}
                      className="text-danger"
                    >
                      {errors.confirmPassword}
                    </span>
                  </div>
                </Form.Group>
                <Form.Group>
                  <label style={{ display: "block" }}>Role</label>
                  {ROLES.map((r) => (
                    <div
                      key={r.value}
                      style={{ display: "inline-table", marginRight: 12 }}
                      className="form-check form-check-primary"
                    >
                      <label className="form-check-label">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="role"
                          value={r.value}
                          checked={fields.role === r.value}
                          onChange={(event) => this.handleUserInput(event)}
                        />{" "}
                        {r.label}
                        <i
                          style={{ paddingLeft: 5 }}
                          className="input-helper"
                        ></i>
                      </label>
                    </div>
                  ))}
                  <div>
                    <span
                      style={{ paddingTop: 10, fontSize: 12, fontWeight: "bold" }}
                      className="text-danger"
                    >
                      {errors.role}
                    </span>
                  </div>
                </Form.Group>
                <Form.Group>
                  <label>Address</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    name="address"
                    value={fields.address}
                    onChange={(event) => this.handleUserInput(event)}
                  ></textarea>
                  <div>
                    <span
                      style={{ paddingTop: 10, fontSize: 12, fontWeight: "bold" }}
                      className="text-danger"
                    >
                      {errors.address}
                    </span>
                  </div>
                </Form.Group>
                <div style={{ float: "right" }}>
                  <Button
                    className="btn btn-outline-dark btn-sm"
                    type="submit"
                    loading={saving}
                    onClick={this.handleSubmit}
                  >
                    Save
                  </Button>

                  <button
                    onClick={toggle}
                    className="btn btn-outline-dark btn-sm"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default EditUser;
