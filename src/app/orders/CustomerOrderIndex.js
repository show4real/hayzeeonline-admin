import React, { Component } from "react";
import { Row, Col, Breadcrumb } from "react-bootstrap";
import { getOrders } from "../services/productService";
import SpinDiv from "../components/SpinDiv";

import { throttle, debounce } from "./debounce";

import { Pagination, Select, Input, Button } from "antd";
import EditOrder from "./EditOrder";
import DeleteOrder from "./DeleteOrder";
import "../products/ProductList.css";
import "./OrderList.css";

const { Option } = Select;

export class CustomerOrderIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      orders: [],
      page: 1,
      rows: 10,
      loading: false,
      total: 0,
      // "" = all, "paid" = paid online, "request" = request (no payment ref)
      paymentType: "",
      editOrder: null,
      deleteOrder: null,
    };
    this.searchDebounced = debounce(this.getOrders, 500);
    this.searchThrottled = throttle(this.getOrders, 500);
  }

  componentDidMount() {
    this.getOrders();
  }

  getOrders = () => {
    const { page, rows, search, paymentType } = this.state;
    this.setState({ loading: true });
    getOrders({ page, rows, search, payment_type: paymentType }).then(
      (res) => {
        this.setState({
          orders: res.orders.data,
          page: res.orders.current_page,
          total: res.orders.total,
          loading: false,
        });
      },
      () => {
        this.setState({ loading: false });
      }
    );
  };

  onPage = (page, rows) => {
    this.setState({ page, rows }, this.getOrders);
  };

  handleSearch = (event) => {
    const search = event.target.value;
    this.setState({ search, page: 1 }, () => {
      if (search.length < 5) {
        this.searchThrottled();
      } else {
        this.searchDebounced();
      }
    });
  };

  handlePaymentTypeChange = (value) => {
    this.setState({ paymentType: value || "", page: 1 }, this.getOrders);
  };

  clearFilters = () => {
    this.setState({ search: "", paymentType: "", page: 1 }, this.getOrders);
  };

  toggleEditOrder = (editOrder) => {
    this.setState({ editOrder });
  };

  toggleEdit = () => {
    this.setState({ editOrder: null });
    this.getOrders();
  };

  toggle = () => {
    this.setState((prevState) => ({ deleteOrder: !prevState.deleteOrder }));
  };

  toggleDeleteOrder = (deleteOrder) => {
    this.setState({ deleteOrder });
  };

  render() {
    const {
      orders,
      total,
      page,
      rows,
      search,
      paymentType,
      loading,
      editOrder,
      deleteOrder,
    } = this.state;

    const hasActiveFilters = search || paymentType;

    return (
      <div>
        {editOrder && (
          <EditOrder
            saved={this.getOrders}
            order={editOrder}
            toggle={this.toggleEdit}
          />
        )}
        {deleteOrder && (
          <DeleteOrder
            saved={this.getOrders}
            order={deleteOrder}
            toggle={this.toggle}
          />
        )}
        {loading && <SpinDiv />}

        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card plist-card">
              <div className="card-body">
                <Breadcrumb
                  listProps={{
                    className: "breadcrumb-text-dark text-primary",
                  }}
                >
                  <Breadcrumb.Item
                    style={{ color: "#64748b", fontWeight: 600 }}
                    href="/"
                  >
                    Home
                  </Breadcrumb.Item>
                  <Breadcrumb.Item
                    active
                    style={{ color: "#0f172a", fontWeight: 700 }}
                  >
                    Orders
                  </Breadcrumb.Item>
                </Breadcrumb>

                {/* Header */}
                <div className="plist-header">
                  <div>
                    <h4 className="plist-title">
                      Orders
                      <span className="plist-title__count">{total}</span>
                    </h4>
                    <p className="plist-subtitle">
                      Track customer orders — paid online and requests.
                    </p>
                  </div>
                </div>

                {/* Filters */}
                <div className="plist-filters">
                  <Row>
                    <Col xs={12} md={6} lg={4} className="plist-filter">
                      <label className="plist-filter__label">
                        Payment Type
                      </label>
                      <Select
                        placeholder="All Orders"
                        style={{ width: "100%" }}
                        value={paymentType || undefined}
                        onChange={this.handlePaymentTypeChange}
                        allowClear
                      >
                        <Option value="paid">Paid online</Option>
                        <Option value="request">Request</Option>
                      </Select>
                    </Col>
                    <Col xs={12} md={6} lg={8} className="plist-filter">
                      <label className="plist-filter__label">Search</label>
                      <Input
                        placeholder="Search by customer, phone or order ID…"
                        value={search}
                        onChange={this.handleSearch}
                        allowClear
                      />
                    </Col>
                  </Row>
                  {hasActiveFilters && (
                    <div className="plist-filters__footer">
                      <span style={{ fontSize: 13, color: "#6b7280" }}>
                        Showing filtered results
                      </span>
                      <button
                        className="plist-clear"
                        onClick={this.clearFilters}
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}
                </div>

                {/* Table */}
                <div className="plist-table-wrap">
                  <table className="plist-table">
                    <thead>
                      <tr>
                        <th>Customer Name</th>
                        <th>Phone</th>
                        <th>Order ID</th>
                        <th>Order Mode</th>
                        <th>Payment Reference</th>
                        <th>Discount</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th style={{ textAlign: "right" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td>
                            <span className="plist-name">
                              {(order.user && order.user.name) || "—"}
                            </span>
                          </td>
                          <td>
                            <span className="plist-phone">
                              {(order.user && order.user.phone) || "—"}
                            </span>
                          </td>
                          <td>
                            <span className="plist-id">#{order.id}</span>
                          </td>
                          <td>
                            <span
                              className={
                                order.payment_reference == null
                                  ? "plist-pay plist-pay--request"
                                  : "plist-pay plist-pay--paid"
                              }
                            >
                              {order.payment_reference == null
                                ? "Request"
                                : "Paid online"}
                            </span>
                          </td>
                          <td>
                            {order.payment_reference ? (
                              <span className="plist-ref">
                                {order.payment_reference}
                              </span>
                            ) : (
                              <span className="plist-muted">—</span>
                            )}
                          </td>
                          <td>{order.discount !== null ? order.discount : 0}</td>
                          <td>
                            <span
                              className={
                                order.status == 1
                                  ? "plist-badge plist-badge--available"
                                  : "plist-badge plist-badge--pending"
                              }
                            >
                              {order.status == 1 ? "Completed" : "Pending"}
                            </span>
                          </td>
                          <td>
                            <span className="plist-date">
                              {order.created_at}
                            </span>
                          </td>
                          <td>
                            <div
                              className="plist-actions"
                              style={{ justifyContent: "flex-end" }}
                            >
                              <Button
                                className="plist-btn-view"
                                onClick={() => this.toggleEditOrder(order)}
                                size="small"
                              >
                                View
                              </Button>
                              <Button
                                className="plist-btn-delete"
                                onClick={() => this.toggleDeleteOrder(order)}
                                size="small"
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {!loading && orders.length === 0 && (
                    <div className="plist-empty">
                      <div className="plist-empty__title">No orders found</div>
                      <div className="plist-empty__hint">
                        Try adjusting or clearing your filters.
                      </div>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {orders.length > 0 && (
                  <div className="plist-footer">
                    <Pagination
                      total={total}
                      showTotal={(total) => `Total ${total} orders`}
                      onChange={this.onPage}
                      pageSize={rows}
                      current={page}
                      showSizeChanger
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerOrderIndex;
