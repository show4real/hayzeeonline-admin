import React, { useState, useEffect, useRef } from "react";
import { Modal, Input } from "reactstrap";
import { Col, Row, Form } from "react-bootstrap";
import { Button, Radio, Select } from "antd";
import { LoginOutlined, DeleteOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import "./CustomFileInput.css";
import "./ProductSpecs.css";
import settings from "../services/settings";
import { authService } from "../services/authService";
import {
  getBrands,
  getCategories,
  getProductDescriptions,
  getProductImages,
} from "../services/categoryService";
import SpinDiv from "../components/SpinDiv";
import {
  productTypes,
  specFields,
  normalizeName,
  getModelOptions,
  mergeBrands,
  classifyCategory,
  getVisibleSpecFields,
} from "./productSpecConfig";
import SpecSelect from "./SpecSelect";

const EditProduct = ({ product, toggle }) => {
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [rotation, setRotation] = useState(0);
  const [rotationIndex, setRotationIndex] = useState(null);
  const [status, setStatus] = useState(
    product.availability == 1 ? true : false
  );
  const [price, setPrice] = useState(product.price);
  const [other_sales, setOtherSales] = useState(product.other_sales);

  const [fields, setFields] = useState({
    name: product.name,
    price: product.price,
    category_id: product.category_id,
    brand: product.brand_id,
    product_type: product.product_type,
  });

  // Pre-fill the spec grid from the product's dedicated columns; the rest is
  // hydrated from its saved descriptions (label/value pairs) below.
  const [specs, setSpecs] = useState({
    processor: product.processor || "",
    ram: product.ram || "",
    storage_capacity: product.storage || "",
  });
  const [specErrors, setSpecErrors] = useState({});
  // Saved descriptions that don't map onto a known spec field are preserved here.
  const [extraInfos, setExtraInfos] = useState([]);

  const [errors, setErrors] = useState({
    name: "",
    category_id: "",
    price: "",
    description: "",
    brand: "",
  });
  const [description, setDescription] = useState(product.description);
  const hiddenFileInput = useRef(null);

  // Map a saved description label (e.g. "Storage Capacity") back to a spec key.
  const labelToFieldName = {};
  specFields.forEach((f) => {
    labelToFieldName[normalizeName(f.label)] = f.name;
  });

  // Backend brands merged with our fallback list, plus the resolved model list.
  const mergedBrands = mergeBrands(brands);
  const selectedBrand = mergedBrands.find(
    (b) => String(b.id) === String(fields.brand)
  );
  const selectedBrandName = selectedBrand ? selectedBrand.name : "";
  const modelOptions = getModelOptions(selectedBrandName);

  // Resolve the selected category's kind, then the spec fields that apply to it.
  const selectedCategory = (categories || []).find(
    (c) => String(c.id) === String(fields.category_id)
  );
  const categoryKind = classifyCategory(
    selectedCategory ? selectedCategory.name : ""
  );
  const visibleSpecFields = getVisibleSpecFields(categoryKind);

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchProductInfos();
    fetchImageFiles();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const rows = 1000;
      const res = await getCategories({ rows });
      setCategories(res.categories.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const rows = 1000;
      const res = await getBrands({ rows });
      setBrands(res.brands.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProductInfos = async () => {
    try {
      setLoading(true);
      const res = await getProductDescriptions(product.id);
      const mappedSpecs = {};
      const extras = [];
      res.product_descriptions.forEach((item) => {
        const fieldName = labelToFieldName[normalizeName(item.label)];
        if (fieldName) {
          mappedSpecs[fieldName] = item.values;
        } else {
          extras.push({ label: item.label, value: item.values });
        }
      });
      setSpecs((prev) => ({ ...prev, ...mappedSpecs }));
      setExtraInfos(extras);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOtherSaleChange = (e) => {
    setOtherSales(e.target.value);
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const rotate = (image, index) => () => {
    const newRotation = rotation + 90 >= 360 ? -360 : rotation + 90;

    image.rotation = newRotation;
    const updatedImages = [...images];
    updatedImages.splice(index, 1, image);

    setRotation(newRotation);
    setRotationIndex(index);
    setImages(updatedImages);
  };

  const fetchImageFiles = async () => {
    setLoading(true);
    const res = await getProductImages(product.id);
    if (res) {
      const files = await Promise.all(
        res.product_images.map(async (imageUrl) => {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          return {
            blob,
            name: imageUrl.substring(imageUrl.lastIndexOf("/") + 1),
          };
        })
      );
      setImages(files);
    }
    setLoading(false);
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);

    Promise.all(
      selectedImages.map((image) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(image);

          reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
              const canvas = document.createElement("canvas");
              const maxImageSize = 800;

              let width = img.width;
              let height = img.height;

              if (width > maxImageSize || height > maxImageSize) {
                if (width > height) {
                  height *= maxImageSize / width;
                  width = maxImageSize;
                } else {
                  width *= maxImageSize / height;
                  height = maxImageSize;
                }
              }

              canvas.width = width;
              canvas.height = height;

              const ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0, width, height);

              canvas.toBlob(
                (blob) => {
                  resolve({ blob, name: image.name });
                },
                "image/jpeg",
                0.6
              );
            };
          };
        });
      })
    ).then((resizedImages) => {
      setImages([...images, ...resizedImages]);
    });
  };

  const handleRemoveImage = (idx) => () => {
    setImages(images.filter((s, sidx) => idx !== sidx));
  };

  const handleStatus = (checked) => {
    setStatus(checked);
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      setPrice(value);
    }
  };

  const validate = (name, value) => {
    switch (name) {
      case "name":
        return !value ? "Product name is required" : "";
      case "price":
        return !value ? "Price is required" : "";
      default:
        return "";
    }
  };

  const handleProductInput = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validate(name, value),
    }));
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSpecChange = (name, value) => {
    setSpecs((prev) => ({ ...prev, [name]: value }));
    setSpecErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleDescription = (description) => {
    setDescription(description);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};
    Object.keys(fields).forEach((name) => {
      const error = validate(name, fields[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });

    if (images.length === 0) {
      validationErrors.images = "Image is required";
    }
    if (description === "") {
      validationErrors.description = "description is required";
    }
    if (price === "") {
      validationErrors.price = "Price is required";
    }

    // Specification fields are optional — no per-field required validation.
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);
    const data = new FormData();
    for (let i = 0; i < images.length; i++) {
      let new_rotation =
        images[i].rotation == undefined ? 0 : images[i].rotation;
      data.set(`rotations[${i}]`, new_rotation);
    }
    images.forEach((image) => {
      data.append("images[]", image.blob, image.name);
    });

    // Only send specs relevant to the selected category, and only if filled.
    const filledSpecFields = visibleSpecFields.filter(
      (field) => specs[field.name]
    );

    // Build label/value pairs from the grid, then keep any extra saved infos.
    const specEntries = filledSpecFields.map((field) => ({
      label: field.label,
      value: specs[field.name],
    }));
    const allEntries = specEntries.concat(
      extraInfos.filter((entry) => entry.label && entry.value)
    );
    allEntries.forEach((entry, i) => {
      data.set(`labels[${i}]`, entry.label);
      data.set(`values[${i}]`, entry.value);
    });

    data.set("name", fields.name);
    data.set("product_type", fields.product_type);
    data.set("category", fields.category_id);
    data.set("brand", fields.brand);
    // Keep dedicated columns populated for backward compatibility
    data.set("ram", specs.ram || "");
    data.set("storage", specs.storage_capacity || "");
    data.set("processor", specs.processor || "");
    data.set("description", description);
    data.set("availability", status ? 1 : 0);
    data.set("price", price);
    other_sales !== null && data.set("other_sales", other_sales);
    // Send each relevant specification field raw (one key per spec)
    filledSpecFields.forEach((field) => {
      data.set(field.name, specs[field.name]);
    });

    return axios
      .post(
        `${settings.API_URL}update/product/${product.id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).token,
          },
        },
        authService.handleResponse
      )
      .then((res) => {
        setSaving(false);
        toggle();
      })
      .catch((err) => {
        console.error(err);
        setSaving(false);
      });
  };

  return (
    <Modal
      className="modal-dialog modal-dialog-top"
      isOpen={product !== null}
      toggle={toggle}
      style={{ maxWidth: "70%", paddingLeft: 100 }}
    >
      {loading && <SpinDiv text={"loading..."} />}
      {!loading && (
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
              <h4 className="card-title">Edit Product</h4>
              <p className="card-description"> </p>
              <form className="forms-sample">
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <label className="label">Product Name</label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        placeholder="Product Name"
                        name="name"
                        value={fields.name}
                        onChange={handleProductInput}
                      />
                      <div>
                        <span
                          style={{
                            paddingTop: 10,
                            fontSize: 12,
                            fontWeight: "bold",
                          }}
                          className="text-danger"
                        >
                          {errors.name}
                        </span>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <label className="label">Product Type</label>
                      <select
                        className="form-control"
                        name="product_type"
                        value={fields.product_type}
                        onChange={handleProductInput}
                      >
                        <option value="">Choose Product Type</option>
                        {productTypes.map((ptype, key) => (
                          <option key={key} value={ptype}>
                            {ptype}
                          </option>
                        ))}
                      </select>
                      <div>
                        <span
                          style={{
                            paddingTop: 10,
                            fontSize: 12,
                            fontWeight: "bold",
                          }}
                          className="text-danger"
                        >
                          {errors.product_type}
                        </span>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <label className="label">Price</label>
                      <Form.Control
                        type="text"
                        value={price}
                        onChange={handlePriceChange}
                        pattern="[0-9]*"
                        inputMode="numeric"
                        className="form-control"
                        placeholder="Enter Price"
                        name="price"
                      />
                      <div>
                        <span
                          style={{
                            paddingTop: 10,
                            fontSize: 12,
                            fontWeight: "bold",
                          }}
                          className="text-danger"
                        >
                          {errors.price}
                        </span>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="spec-section">
                  <div className="spec-section__title">Specifications</div>

                  <Row>
                    <Col md={6}>
                      <div
                        className={`spec-field${
                          errors.category_id ? " spec-field--error" : ""
                        }`}
                      >
                        <label className="spec-field__label">
                          Category<span className="req">*</span>
                        </label>
                        <Select
                          showSearch
                          allowClear
                          size="large"
                          style={{ width: "100%" }}
                          popupClassName="spec-dropdown"
                          placeholder="Search & choose category"
                          optionFilterProp="children"
                          value={fields.category_id || undefined}
                          onChange={(value) =>
                            handleProductInput({
                              target: {
                                name: "category_id",
                                value: value || "",
                              },
                            })
                          }
                          filterOption={(input, option) =>
                            String((option && option.children) || "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                        >
                          {categories.map((category) => (
                            <Select.Option key={category.id} value={category.id}>
                              {category.name}
                            </Select.Option>
                          ))}
                        </Select>
                        {errors.category_id && (
                          <span className="spec-field__error">
                            {errors.category_id}
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col md={6}>
                      <div
                        className={`spec-field${
                          errors.brand ? " spec-field--error" : ""
                        }`}
                      >
                        <label className="spec-field__label">
                          Brand<span className="req">*</span>
                        </label>
                        <SpecSelect
                          placeholder="Search, pick or type a brand"
                          value={fields.brand}
                          options={mergedBrands}
                          onChange={(value) => {
                            handleProductInput({
                              target: { name: "brand", value: value || "" },
                            });
                            // Reset the dependent model when the brand changes.
                            handleSpecChange("model", "");
                          }}
                        />
                        {errors.brand && (
                          <span className="spec-field__error">
                            {errors.brand}
                          </span>
                        )}
                      </div>
                    </Col>

                    {visibleSpecFields.map((field) => {
                      const hasError = !!specErrors[field.name];
                      // The Model field depends on the selected brand.
                      const isModel = field.name === "model";
                      const fieldOptions = isModel ? modelOptions : field.options;
                      const modelDisabled = isModel && !selectedBrandName;
                      const selectPlaceholder = isModel
                        ? selectedBrandName
                          ? `Search, pick or type a ${selectedBrandName} model`
                          : "Select a brand first"
                        : `Search, pick or type ${field.label.toLowerCase()}`;
                      return (
                        <Col md={6} key={field.name}>
                          <div
                            className={`spec-field${
                              hasError ? " spec-field--error" : ""
                            }`}
                          >
                            <label className="spec-field__label">
                              {field.label}
                              {field.required && (
                                <span className="req">*</span>
                              )}
                            </label>
                            <SpecSelect
                              placeholder={selectPlaceholder}
                              value={specs[field.name]}
                              options={fieldOptions}
                              disabled={modelDisabled}
                              onChange={(value) =>
                                handleSpecChange(field.name, value || "")
                              }
                            />
                            {hasError && (
                              <span className="spec-field__error">
                                {specErrors[field.name]}
                              </span>
                            )}
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </div>

                <div className="spec-section">
                  <div className="spec-section__title">
                    Availability, Promotions &amp; Media
                  </div>

                  <Row>
                    <Col md={6}>
                      <div className="spec-field">
                        <label className="spec-field__label">
                          Availability
                        </label>
                        <label className="avail-toggle">
                          <Input
                            type="checkbox"
                            className="form-check-input"
                            checked={status}
                            onChange={(e) => handleStatus(e.target.checked)}
                          />
                          <i className="input-helper"></i>
                          <span className="avail-toggle__text">
                            {status
                              ? "Available / In stock"
                              : "Unavailable / Out of stock"}
                          </span>
                        </label>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="spec-field">
                        <label className="spec-field__label">Other Sales</label>
                        <Radio.Group
                          className="sales-radio"
                          onChange={handleOtherSaleChange}
                          defaultValue={other_sales}
                        >
                          <Radio.Button value={null}>None</Radio.Button>
                          <Radio.Button value="flash sales">
                            Flash Sales
                          </Radio.Button>
                          <Radio.Button value="PRE-ORDER (24Hours)">
                            PRE-ORDER (24Hours)
                          </Radio.Button>
                          <Radio.Button value="PRE-ORDER (7DAYS)">
                            PRE-ORDER (7DAYS)
                          </Radio.Button>
                          <Radio.Button value="PRE-ORDER (21DAYS)">
                            PRE-ORDER (21DAYS)
                          </Radio.Button>
                          <Radio.Button value="mid year sales">
                            Mid Year Sales
                          </Radio.Button>
                          <Radio.Button value="promo sales">
                            Promo Sales
                          </Radio.Button>
                          <Radio.Button value="black friday">
                            Black Friday
                          </Radio.Button>
                        </Radio.Group>
                      </div>
                    </Col>
                  </Row>

                  <div className="spec-field">
                    <label className="spec-field__label">Product Images</label>
                    <div className="upload-area">
                      <Button className="upload-btn" onClick={handleClick}>
                        Update Product Images
                      </Button>
                      <input
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                        type="file"
                        ref={hiddenFileInput}
                        multiple
                        accept="image/*"
                      />
                      <span className="upload-hint">
                        You can only upload jpg, jpeg, and png files
                      </span>
                    </div>
                    <Row className="image-grid">
                      {images.map((image, index) => (
                        <Col md={3} key={index}>
                          <div className="image-grid__item">
                            <img
                              style={{
                                transform:
                                  index === rotationIndex
                                    ? `rotate(${rotation}deg)`
                                    : "rotate(0deg)",
                                width: "100%",
                              }}
                              src={URL.createObjectURL(image.blob)}
                              alt=""
                            />
                            <div className="image-grid__actions">
                              <LoginOutlined
                                style={{ marginRight: "10px" }}
                                onClick={rotate(image, index)}
                              />
                              <DeleteOutlined
                                onClick={handleRemoveImage(index)}
                              />
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                    {errors.images && (
                      <span className="spec-field__error">{errors.images}</span>
                    )}
                  </div>

                  <div className="spec-field">
                    <label className="spec-field__label">Description</label>
                    <ReactQuill
                      theme="snow"
                      className="desc-quill"
                      value={description}
                      onChange={handleDescription}
                    />
                    {errors.description && (
                      <span className="spec-field__error">
                        {errors.description}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ float: "right" }}>
                  <Button
                    className="btn btn-outline-dark btn-sm"
                    type="submit"
                    loading={saving}
                    onClick={handleSubmit}
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
      )}
    </Modal>
  );
};

export default EditProduct;
