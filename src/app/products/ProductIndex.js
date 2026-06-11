import React, { useState, useEffect } from "react";
import { Row, Col, Breadcrumb, ButtonGroup } from "react-bootstrap";
import { getProducts, getBrands, getAllCats } from "../services/productService";
import SpinDiv from "../components/SpinDiv";
import { Pagination, Select, Button, Input } from "antd";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";
import DeleteProduct from "./DeleteProduct";
import "./ProductList.css";

const { Option } = Select;

const ProductIndex = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [addProduct, setAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  // Show available products first by default.
  const [sort, setSorting] = useState("availability");
  const [storages, setStorages] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [rams, setRams] = useState([]);

  const formatNumber = (number) => {
    if (number === null || number === undefined || number === "") return "0";
    return number
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Any filter change should send us back to the first page so the result
  // set we get back actually matches the new filters.
  const handleBrandChange = (value) => {
    setBrand(value);
    setPage(1);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setPage(1);
  };

  const handleStorageChange = (selectedOptions) => {
    setStorages(selectedOptions);
    setPage(1);
  };

  const handleProcessorChange = (selectedOptions) => {
    setProcessors(selectedOptions);
    setPage(1);
  };

  const handleRamChange = (selectedOptions) => {
    setRams(selectedOptions);
    setPage(1);
  };

  const handleSorting = (value) => {
    setSorting(value);
    setPage(1);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const clearFilters = () => {
    setBrand(null);
    setCategory(null);
    setStorages([]);
    setProcessors([]);
    setRams([]);
    setSorting("availability");
    setSearch("");
    setPage(1);
  };

  const fetchBrands = () => {
    getBrands().then(
      (res) => setBrands(res.brands),
      () => {}
    );
  };

  const fetchCategories = () => {
    getAllCats().then(
      (res) => setCategories(res.categories),
      () => {}
    );
  };

  const storagesList = [
    "128GB SSD",
    "256GB SSD",
    "512GB SSD",
    "1TB SSD",
    "128GB HDD",
    "256GB HDD",
    "512GB HDD",
    "1TB HDD",
    "128GB SSHD",
    "256GB SSHD",
    "512GB SSHD",
    "1TB SSHD",
    "128GB SSD + HDD",
    "256GB SSD + HDD",
    "512GB SSD + HDD",
    "1TB SSD + HDD",
  ];

  const processorsList = [
    "Intel Atom",
    "Intel Celeron",
    "Intel Pentium",
    "Intel Core i3",
    "Intel Core i5",
    "Intel Core i7",
    "Intel Core i9",
    "Apple Chip M1",
    "Apple Chip M2",
    "AMD A4",
    "AMD A6",
    "AMD A8",
    "AMD A10",
    "AMD A12",
    "AMD Ryzen 3",
    "AMD Ryzen 5",
    "AMD Ryzen 7",
    "Samsung’s Exynos",
    "Qualcomm’s snapdragon",
  ];

  const ramsList = [
    "2GB",
    "4GB",
    "6GB",
    "8GB",
    "12GB",
    "16GB",
    "24GB",
    "32GB",
    "64GB",
    "128GB",
    "256GB",
    "512GB",
    "1TB",
  ];

  const sortOptions = [
    { value: "availability", label: "Availability (Available first)" },
    { value: "name-asc", label: "Alphabetically, A–Z" },
    { value: "name-desc", label: "Alphabetically, Z–A" },
    { value: "low-price", label: "Price, low to high" },
    { value: "high-price", label: "Price, high to low" },
    { value: "date-asc", label: "Date, old to new" },
    { value: "date-desc", label: "Date, new to old" },
  ];

  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rows, brand, rams, sort, storages, processors, category, search]);

  const fetchProducts = () => {
    setLoading(true);
    getProducts({
      page,
      rows,
      brand,
      rams,
      sort,
      storages,
      processors,
      category,
      search,
    })
      .then((res) => {
        setProducts(res.products.data);
        setPage(res.products.current_page);
        setTotal(res.products.total);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const onPageChange = (page, pageSize) => {
    setPage(page);
    setRows(pageSize);
  };

  const toggleAddProduct = () => {
    setAddProduct(!addProduct);
    fetchProducts();
  };

  const toggleEdit = () => {
    setEditProduct(null);
    fetchProducts();
  };

  const toggleDelete = () => {
    setDeleteProduct(null);
    fetchProducts();
  };

  const hasActiveFilters =
    brand ||
    category ||
    storages.length > 0 ||
    processors.length > 0 ||
    rams.length > 0 ||
    search ||
    sort !== "availability";

  return (
    <div>
      {addProduct && (
        <AddProduct
          saved={fetchProducts}
          addProduct={addProduct}
          toggle={toggleAddProduct}
        />
      )}
      {editProduct && (
        <EditProduct
          saved={fetchProducts}
          product={editProduct}
          toggle={toggleEdit}
        />
      )}
      {deleteProduct && (
        <DeleteProduct product={deleteProduct} toggle={toggleDelete} />
      )}
      {loading && <SpinDiv />}

      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card plist-card">
            <div className="card-body">
              <Breadcrumb
                listProps={{ className: "breadcrumb-text-dark text-primary" }}
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
                  Products
                </Breadcrumb.Item>
              </Breadcrumb>

              {/* Header */}
              <div className="plist-header">
                <div>
                  <h4 className="plist-title">
                    Products
                    <span className="plist-title__count">{total}</span>
                  </h4>
                  <p className="plist-subtitle">
                    Manage your catalogue — available items are shown first.
                  </p>
                </div>
                <ButtonGroup>
                  <Button
                    className="plist-add-btn"
                    onClick={toggleAddProduct}
                  >
                    + Add Product
                  </Button>
                </ButtonGroup>
              </div>

              {/* Filters */}
              <div className="plist-filters">
                <Row>
                  <Col xs={12} md={6} lg={3} className="plist-filter">
                    <label className="plist-filter__label">Brand</label>
                    <Select
                      placeholder="All Brands"
                      style={{ width: "100%" }}
                      value={brand}
                      onChange={handleBrandChange}
                      allowClear
                    >
                      {brands.map((b) => (
                        <Option key={b.id} value={b.id}>
                          {b.name}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                  <Col xs={12} md={6} lg={3} className="plist-filter">
                    <label className="plist-filter__label">Category</label>
                    <Select
                      placeholder="All Categories"
                      style={{ width: "100%" }}
                      value={category}
                      onChange={handleCategoryChange}
                      allowClear
                    >
                      {categories.map((c) => (
                        <Option key={c.id} value={c.id}>
                          {c.name}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                  <Col xs={12} md={6} lg={3} className="plist-filter">
                    <label className="plist-filter__label">Processor</label>
                    <Select
                      mode="multiple"
                      placeholder="Any processor"
                      style={{ width: "100%" }}
                      value={processors}
                      onChange={handleProcessorChange}
                      maxTagCount="responsive"
                    >
                      {processorsList.map((option) => (
                        <Option key={option} value={option}>
                          {option}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                  <Col xs={12} md={6} lg={3} className="plist-filter">
                    <label className="plist-filter__label">RAM</label>
                    <Select
                      mode="multiple"
                      placeholder="Any RAM"
                      style={{ width: "100%" }}
                      value={rams}
                      onChange={handleRamChange}
                      maxTagCount="responsive"
                    >
                      {ramsList.map((option) => (
                        <Option key={option} value={option}>
                          {option}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6} lg={3} className="plist-filter">
                    <label className="plist-filter__label">Storage</label>
                    <Select
                      mode="multiple"
                      placeholder="Any storage"
                      style={{ width: "100%" }}
                      value={storages}
                      onChange={handleStorageChange}
                      maxTagCount="responsive"
                    >
                      {storagesList.map((option) => (
                        <Option key={option} value={option}>
                          {option}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                  <Col xs={12} md={6} lg={3} className="plist-filter">
                    <label className="plist-filter__label">Sort by</label>
                    <Select
                      style={{ width: "100%" }}
                      value={sort}
                      onChange={handleSorting}
                    >
                      {sortOptions.map((option) => (
                        <Option key={option.value} value={option.value}>
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                  <Col xs={12} md={12} lg={6} className="plist-filter">
                    <label className="plist-filter__label">Search</label>
                    <Input
                      placeholder="Search by name or specification…"
                      value={search}
                      onChange={handleSearch}
                      allowClear
                    />
                  </Col>
                </Row>
                {hasActiveFilters && (
                  <div className="plist-filters__footer">
                    <span style={{ fontSize: 13, color: "#6b7280" }}>
                      Showing filtered results
                    </span>
                    <button className="plist-clear" onClick={clearFilters}>
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
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>New Price</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th style={{ textAlign: "right" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <span className="plist-name">{product.name}</span>
                        </td>
                        <td>
                          {product.category ? (
                            <span className="plist-cat">
                              {product.category}
                            </span>
                          ) : (
                            <span style={{ color: "#cbd5e1" }}>—</span>
                          )}
                        </td>
                        <td>
                          <span
                            className={
                              product.new_price
                                ? "plist-price plist-price--old"
                                : "plist-price"
                            }
                          >
                            &#8358;{formatNumber(product.price)}
                          </span>
                        </td>
                        <td>
                          {product.new_price ? (
                            <span className="plist-price">
                              &#8358;{formatNumber(product.new_price)}
                            </span>
                          ) : (
                            <span style={{ color: "#cbd5e1" }}>—</span>
                          )}
                        </td>
                        <td>
                          <span
                            className={
                              product.availability == 1
                                ? "plist-badge plist-badge--available"
                                : "plist-badge plist-badge--sold"
                            }
                          >
                            {product.availability == 1 ? "Available" : "Sold"}
                          </span>
                        </td>
                        <td>
                          <span className="plist-date">
                            {product.created_at}
                          </span>
                        </td>
                        <td>
                          <div className="plist-actions" style={{ justifyContent: "flex-end" }}>
                            <Button
                              className="plist-btn-view"
                              onClick={() => setEditProduct(product)}
                              size="small"
                            >
                              View
                            </Button>
                            <Button
                              className="plist-btn-delete"
                              onClick={() => setDeleteProduct(product)}
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

                {!loading && products.length === 0 && (
                  <div className="plist-empty">
                    <div className="plist-empty__title">No products found</div>
                    <div className="plist-empty__hint">
                      Try adjusting or clearing your filters.
                    </div>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {products.length > 0 && (
                <div className="plist-footer">
                  <Pagination
                    total={total}
                    showTotal={(total) => `Total ${total} products`}
                    onChange={onPageChange}
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
};

export default ProductIndex;
