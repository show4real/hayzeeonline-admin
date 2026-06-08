import React, { useState, useRef, useEffect } from "react";
import { Modal, Input } from "reactstrap";
import { Col, Row, Form, ButtonGroup } from "react-bootstrap";

import { Button } from "antd";
import { LoginOutlined, DeleteOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import "./CustomFileInput.css";
import "./ProductSpecs.css";
import settings from "../services/settings";
import { authService } from "../services/authService";
import { getBrands, getCategories } from "../services/categoryService";
import SpinDiv from "../components/SpinDiv";
import { Select, Radio, Input as AntInput } from "antd";
import { brandModels, fallbackBrandNames } from "./productSpecConfig";

const AddProduct = ({ product, toggle, saved }) => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(false);
  const [specs, setSpecs] = useState({});
  const [specErrors, setSpecErrors] = useState({});
  // Tracks the text the user is typing per spec field, so any field can offer
  // an "add your own" custom value when nothing in the list matches.
  const [fieldSearch, setFieldSearch] = useState({});
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [other_sales, setOtherSales] = useState(null);

  const properties = ["Type", "Storage capacity"];

  const storages = [
    "32GB SSD",
    "64GB SSD",
    "128GB SSD",
    "180GB SSD",
    "200GB SSD",
    "256GB SSD",
    "512GB SSD",
    "1TB SSD",
    "60GB HDD",
    "120GB HDD",
    "180GB HDD",
    "200GB HDD",
    "250GB HDD",
    "320GB HDD",
    "500GB HDD",
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
  const rams = [
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
  const processors = [
    "Intel Atom",
    "Intel Celeron",
    "Intel Pentium",
    "Intel Core i3",
    "Intel Core i5",
    "Intel Core i7",
    "Intel Core i9",
    "Intel Core m3",
    "Intel Core m5",
    "Intel Core m7",
    "Intel Xeon",
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
    "i5-7200U",
    "Intel Atom Dual –Core",
    "Intel Atom Octa –Core",
    "Intel Atom Quad –Core",
    "Intel Atom Single –Core",
    "Intel Celeron",
    "Intel Celeron D",
    "Intel Celeron M",
    "Intel Celeron N",
    "Intel Centrino",
    "Intel Core 2 Duo",
    "Intel Core 2 Quad",
    "Intel Core 2 Solo",
    "Intel Core Duo",
    "Intel Core i3 10th Gen",
    "Intel Core i3 11th Gen",
    "Intel Core i3 12th Gen",
    "Intel Core i3 13th Gen",
    "Intel Core i3 1st Gen",
    "Intel Core i3 2nd Gen",
    "Intel Core i3 3rd Gen",
    "Intel  Core i3 4th Gen",
    "Intel Core i3 5th Gen",
    "Intel Core i3 6TH Gen",
    "Intel Core i3 7th Gen",
    "Intel Core i3 8th Gen",
    "Intel Core i5 10th Gen",
    "Intel Core i5 12th Gen",
    "Intel Core i5 13th Gen",
    "Intel Core i5 1st Gen",
    "Intel Core i5 2nd Gen",
    "Intel Core i5 3rd Gen",
    "Intel Core i5 5th Gen",
    "Intel Core i5 -7200U",
    "Intel Core i5 7th Gen",
    "Intel Core i5 -8300H ",
    "Intel Core i5 9th Gen",
    "Intel Core i7 13TH Gen",
    "Intel Core i7 1st Gen",
    "Intel Core i7 2nd Gen",
    "Intel Core i7 3rd Gen",
    "Intel Core i7 4th Gen",
    "Intel Core i7 5th Gen",
    "Intel Core i7 6TH Gen",
    "Intel Core i7 7th Gen",
    "Intel Core i7 9th Gen",
    "Intel Core I7 Extreme 1st Gen",
    "Intel Core i7 Extreme 3rd Gen",
    "Intel Core I7 Extreme 5th Gen",
    "Intel Core i7 Extreme 6th Gen",
    "Intel Core i7 Extreme 7th Gen",
    "Intel Core i9 10th Gen",
    "Intel Core i9 13th Gen",
    "Intel Core i9 8th Gen",
    "Intel Core i9 9th Gen",
    "Intel Core M",
    "Intel Core M3",
    "Intel Core M3 6th Gen",
    "Intel Core M3 7th Gen",
    "Intel Core M5 6th Gen",
    "Intel Core Solo",
    "Intel Pentium",
    "Intel Pentium 4",
    "Intel Pentium 4 HT",
    "Intel Pentium 4 M",
    "Intel Pentium Dual – Core",
    "Intel Pentium Gold",
    "Intel Pentium II",
    "Intel Pentium III",
    "Intel Pentium III M",
    "Intel Pentium III Mobile",
    "Intel Pentium M",
    "Intel Pentium MMX",
    "Intel Pentium Mobile",
    "Intel Pentium  N4200",
    "Intel Pentium N- Series",
    "Intel Pentium Silver",
    "Intel Processor N",
    "Intel Xeon",
    "MediaTek MT8183",
    "Microsoft SQ1",
    "Microsoft SQ2",
    "Mobile AMD Sempron",
    "NVIDIA Tegra 3",
    "NVIDIA Tegra 4",
    "NVIDIA Tegra  K1",
    "Samsung Exynos 5 Dual",
    "VIA C7",
    "Not Specified",
    "Intel Core i5 11th Gen",
    "Intel Core i5 4th Gen",
    "Intel Core i5 6th Gen",
    "Intel Core i5 8th Gen",
    "Intel Core i7 10th Gen",
    "Intel Core i7 11th Gen",
    "Intel Core i7 12th Gen",
    "Intel Core i7 8th Gen",
    "AMD A10",
    "AMD A10 Quad-Core",
    "AMD A12",
    "AMD A4 Dual-Core",
    "AMD A6 Dual-Core",
    "AMD A6 Quad-Core",
    "AMD A6 Tri-Core",
    "AMD A8",
    "AMD A8 Quad-Core",
    "AMD A9",
    "AMD Athlon",
    "AMD Athlon 64",
    "AMD Athlon 64,64 M",
    "AMD Athlon 64 X2",
    "AMD Athlon Gold 3150U",
    "AMD Athlon ll",
    "AMD Athlon ll Neo",
    "AMD Athlon ll x2",
    "AMD Athlon Neo",
    "AMD Athlon Neo x2",
    "AMD Athlon Silver 3050U",
    "AMD Athlon x2",
    "AMD Athlon XP  XP- M",
    "AMD C-Series",
    "AMD Duron",
    "AMD E- Series",
    "AMD FX",
    "AMD K7",
    "AMD Opteron",
    "AMD Phenom",
    "AMD Phenom ll",
    "AMD Phenom ll X2",
    "AMD Phenom ll X4",
    "AMD Phenom  X4",
    "AMD Ryzen 5",
    "AMD Ryzen 5 2nd Gen",
    "AMD Ryzen  7",
    "AMD Ryzen 9",
    "AMD Sempron",
    "AMD Turion 64",
    "AMD Turion 64 X2",
    "AMD Turion ll",
    "AMD Turion X2",
    "AMD V-Series",
  ];

  const productTypes = ["Brand New", "UK Used", "Open Box", "US Used"];

  // ---- Jiji-style specification options ----
  const numberOfCores = [
    "Dual-Core",
    "Quad-Core",
    "Hexa-Core",
    "Octa-Core",
    "10-Core",
    "12-Core",
    "14-Core",
    "16-Core",
  ];
  const storageTypes = ["HDD", "SSD", "SSHD", "HDD + SSD", "NVMe SSD"];
  const storageCapacities = [
    "128GB",
    "256GB",
    "320GB",
    "500GB",
    "512GB",
    "1TB",
    "2TB",
    "4TB",
  ];
  const displaySizes = [
    "11.6 inches",
    "12.5 inches",
    "13.3 inches",
    "14 inches",
    "15.6 inches",
    "17.3 inches",
    "19 inches",
    "21.5 inches",
    "24 inches",
    "27 inches",
    "32 inches",
  ];
  const graphicsCards = [
    "Intel UHD Graphics",
    "Intel Iris Xe",
    "NVIDIA GeForce GTX",
    "NVIDIA GeForce RTX",
    "AMD Radeon",
    "Apple GPU",
    "Not Specified",
  ];
  const graphicsCardMemories = [
    "1GB",
    "2GB",
    "3GB",
    "4GB",
    "6GB",
    "8GB",
    "12GB",
    "16GB",
    "24GB",
  ];
  const operatingSystems = [
    "iOS",
    "iPadOS",
    "Android",
    "HarmonyOS",
    "KaiOS",
    "Windows 7",
    "Windows 8",
    "Windows 10",
    "Windows 11",
    "macOS",
    "Linux",
    "Chrome OS",
    "No OS",
  ];
  const colors = [
    "Black",
    "Silver",
    "Gray",
    "Blue",
    "White",
    "Rose Gold",
    "Gold",
    "Red",
    "Green",
    "Pink",
  ];
  const subtypes = [
    "Desktop Computer",
    "Laptop",
    "All-in-One",
    "Workstation",
    "Mini PC",
    "Server",
    "Monitor",
  ];
  const yesNo = ["Yes", "No"];

  // ---- Grouped dropdown options (POPULAR / OTHER style, like the screenshot) ----
  // An options value can be a flat array OR an array of { label, items } groups.
  const storageCapacityGroups = [
    { label: "Popular", items: ["64GB", "128GB", "256GB", "512GB", "1TB"] },
    {
      label: "Other",
      items: ["16GB", "32GB", "320GB", "500GB", "2TB", "4TB"],
    },
  ];
  const ramGroups = [
    { label: "Popular", items: ["4GB", "6GB", "8GB", "12GB", "16GB"] },
    {
      label: "Other",
      items: ["1GB", "2GB", "3GB", "24GB", "32GB", "64GB", "128GB", "256GB"],
    },
  ];
  const displaySizeGroups = [
    {
      label: "Phone",
      items: [
        "5.4 inches",
        "5.8 inches",
        "6.1 inches",
        "6.5 inches",
        "6.7 inches",
        "6.8 inches",
      ],
    },
    {
      label: "Tablet",
      items: [
        "8.3 inches",
        "10.2 inches",
        "10.9 inches",
        "11 inches",
        "12.9 inches",
      ],
    },
    {
      label: "Laptop & Monitor",
      items: [
        "11.6 inches",
        "13.3 inches",
        "14 inches",
        "15.6 inches",
        "17.3 inches",
        "19 inches",
        "21.5 inches",
        "24 inches",
        "27 inches",
        "32 inches",
      ],
    },
  ];

  // Build grouped processor options (Intel / AMD / Apple / Other), de-duplicated.
  const buildProcessorGroups = () => {
    const seen = {};
    const buckets = { Intel: [], AMD: [], Apple: [], Other: [] };
    processors.forEach((p) => {
      if (seen[p]) return;
      seen[p] = true;
      if (p.indexOf("Intel") === 0) buckets.Intel.push(p);
      else if (p.indexOf("AMD") === 0) buckets.AMD.push(p);
      else if (p.toLowerCase().indexOf("apple") !== -1) buckets.Apple.push(p);
      else buckets.Other.push(p);
    });
    return Object.keys(buckets)
      .filter((k) => buckets[k].length)
      .map((k) => ({ label: k, items: buckets[k] }));
  };
  const processorGroups = buildProcessorGroups();

  // brandModels & fallbackBrandNames now come from ./productSpecConfig

  const normalizeName = (value) =>
    (value || "").toString().trim().toLowerCase();

  // Classify a category (by its name) into a kind so we can show only the
  // specification fields that make sense for it.
  const classifyCategory = (name) => {
    const n = normalizeName(name);
    if (!n) return "general";
    if (/iphone|android|phone|smartphone|tecno|infinix|itel|nokia/.test(n))
      return "phone";
    if (/ipad|tablet|\btab\b/.test(n)) return "tablet";
    if (/laptop|notebook|macbook|ultrabook/.test(n)) return "laptop";
    if (
      /desktop|imac|all.?in.?one|workstation|server|mini ?pc|computer|monitor/.test(
        n
      )
    )
      return "desktop";
    if (
      /accessor|charger|cable|headphone|earbud|earphone|airpod|case|cover|pouch|smart ?watch|watch|power ?bank|adapter|mouse|keyboard|speaker|memory card|sim/.test(
        n
      )
    )
      return "accessory";
    return "general";
  };

  // Single flat list of specification fields rendered as a 2-column grid.
  // `brand` and `category` stay as dedicated API-driven selects above this grid.
  // All specification fields are optional. `kinds` controls which categories a
  // field shows for ("all" = every category). Computer-only fields (processor,
  // graphics, storage type…) are hidden for phones, tablets and accessories.
  const COMPUTER = ["laptop", "desktop"];
  const DEVICE = ["laptop", "desktop", "phone", "tablet"];
  const specFields = [
    {
      name: "model",
      label: "Model",
      dependsOn: "brand",
      placeholder: "Select a brand first",
      kinds: ["all"],
    },
    { name: "subtype", label: "Subtype", options: subtypes, kinds: COMPUTER },
    {
      name: "condition",
      label: "Condition",
      options: productTypes,
      kinds: ["all"],
    },
    {
      name: "processor",
      label: "Processor",
      options: processorGroups,
      kinds: COMPUTER,
    },
    {
      name: "number_of_cores",
      label: "Number of Cores",
      options: numberOfCores,
      kinds: COMPUTER,
    },
    { name: "ram", label: "RAM", options: ramGroups, kinds: DEVICE },
    {
      name: "storage_capacity",
      label: "Storage Capacity",
      options: storageCapacityGroups,
      kinds: DEVICE,
    },
    {
      name: "storage_type",
      label: "Storage Type",
      options: storageTypes,
      kinds: COMPUTER,
    },
    {
      name: "display_size",
      label: "Display Size",
      options: displaySizeGroups,
      kinds: DEVICE,
    },
    {
      name: "graphics_card",
      label: "Graphics Card",
      options: graphicsCards,
      kinds: COMPUTER,
    },
    {
      name: "graphics_card_memory",
      label: "Graphics Card Memory",
      options: graphicsCardMemories,
      kinds: COMPUTER,
    },
    {
      name: "operating_system",
      label: "Operating System",
      options: operatingSystems,
      kinds: DEVICE,
    },
    { name: "color", label: "Color", options: colors, kinds: ["all"] },
    {
      name: "exchange_possible",
      label: "Exchange Possible",
      options: yesNo,
      kinds: ["all"],
    },
  ];

  // Detects whether a field's options are grouped ({ label, items }) vs flat.
  const isGroupedOptions = (opts) =>
    Array.isArray(opts) && opts.length > 0 && typeof opts[0] === "object";

  // Backend brands merged with our fallback list (deduped by name). Backend
  // brands keep their numeric id; fallback-only brands use their name as value.
  const mergedBrands = (() => {
    const seen = {};
    const list = [];
    (brands || []).forEach((b) => {
      if (!b || !b.name) return;
      seen[normalizeName(b.name)] = true;
      list.push({ id: b.id, name: b.name });
    });
    fallbackBrandNames.forEach((name) => {
      if (seen[normalizeName(name)]) return;
      seen[normalizeName(name)] = true;
      list.push({ id: name, name });
    });
    return list.sort((a, b) => a.name.localeCompare(b.name));
  })();

  const laptopProperties = [
    {
      name: "Processor",
      values: [
        "Intel Core i5",
        "Intel Core i7",
        "AMD Ryzen 5",
        "AMD Ryzen 7",
        "Intel Core i9",
        "AMD Ryzen 9",
      ],
    },
    { name: "RAM", values: ["8GB", "16GB", "32GB", "64GB", "128GB"] },
    { name: "Storage Type", values: ["HDD", "SSD", "HDD + SSD", "NVMe SSD"] },
    {
      name: "Storage Capacity",
      values: ["256GB", "512GB", "1TB", "2TB", "4TB"],
    },
    {
      name: "Graphics Card",
      values: [
        "NVIDIA GeForce GTX",
        "NVIDIA GeForce RTX",
        "AMD Radeon",
        "Intel UHD Graphics",
      ],
    },
    {
      name: "Display Size",
      values: ["13.3 inches", "15.6 inches", "17.3 inches"],
    },
    {
      name: "Resolution",
      values: ["Full HD (1920x1080)", "4K UHD (3840x2160)", "QHD (2560x1440)"],
    },
    {
      name: "Operating System",
      values: ["Windows 10", "macOS", "Linux", "Chrome OS"],
    },
    {
      name: "Battery Life",
      values: ["Up to 5 hours", "5-8 hours", "8-12 hours", "12+ hours"],
    },
    { name: "Weight", values: ["1-2 kg", "2-3 kg", "3-4 kg", "4+ kg"] },
    { name: "Touchscreen", values: ["Yes", "No"] },
    { name: "Backlit Keyboard", values: ["Yes", "No"] },
    {
      name: "USB Ports",
      values: ["2x USB 3.0", "2x USB 3.1", "4x USB 3.0", "4x USB 3.1", "USB-C"],
    },
    { name: "HDMI Port", values: ["Yes", "No"] },
    { name: "Webcam", values: ["720p HD", "1080p Full HD"] },
    {
      name: "Bluetooth",
      values: [
        "Bluetooth 4.0",
        "Bluetooth 5.0",
        "Bluetooth 5.1",
        "Bluetooth 5.2",
      ],
    },
    { name: "Wi-Fi", values: ["802.11ac", "Wi-Fi 6 (802.11ax)"] },
    { name: "Ethernet", values: ["Yes", "No"] },
    { name: "Audio Jack", values: ["Yes", "No"] },
    { name: "SD Card Slot", values: ["Yes", "No"] },
    { name: "Fingerprint Reader", values: ["Yes", "No"] },
    {
      name: "Color",
      values: ["Black", "Silver", "Gray", "Blue", "White", "Rose Gold"],
    },
    { name: "Dimensions", values: ["Width x Depth x Height"] },
    { name: "Warranty", values: ["1 year", "2 years", "3 years", "5 years"] },
    {
      name: "Processor Speed",
      values: [
        "2.0 GHz",
        "2.5 GHz",
        "3.0 GHz",
        "3.5 GHz",
        "4.0 GHz",
        "4.5 GHz",
      ],
    },
    {
      name: "Processor Cores",
      values: ["Dual-core", "Quad-core", "Hexa-core", "Octa-core"],
    },
    { name: "Cache Memory", values: ["3MB", "6MB", "8MB", "12MB", "16MB"] },
    { name: "SSD Type", values: ["SATA III", "PCIe NVMe"] },
    { name: "SSD Capacity", values: ["128GB", "256GB", "512GB", "1TB", "2TB"] },
    // Add more laptop properties and values here
  ];

  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const [rotationIndex, setRotationIndex] = useState(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(true);
  const [fields, setFields] = useState({
    name: "",
    category: "",
    storage: "",
    processor: "",
    brand: "",
    ram: "",
    product_type: "",
  });

  // Resolve the selected brand's name, then its detailed model catalogue.
  // Declared after `fields` so it can read the current brand selection.
  const selectedBrand = mergedBrands.find(
    (b) => String(b.id) === String(fields.brand)
  );
  const selectedBrandName = selectedBrand ? selectedBrand.name : "";
  const modelOptions = brandModels[normalizeName(selectedBrandName)] || [];
  // Is the typed text already one of a field's options (flat or grouped)?
  const optionExists = (options, value) =>
    (isGroupedOptions(options)
      ? options.reduce((acc, g) => acc.concat(g.items), [])
      : options || []
    ).some((opt) => normalizeName(opt) === normalizeName(value));

  // Resolve the selected category's kind, then the spec fields that apply to it.
  const selectedCategory = (categories || []).find(
    (c) => String(c.id) === String(fields.category)
  );
  const categoryKind = classifyCategory(
    selectedCategory ? selectedCategory.name : ""
  );
  const visibleSpecFields = specFields.filter(
    (field) =>
      categoryKind === "general" ||
      field.kinds.includes("all") ||
      field.kinds.includes(categoryKind)
  );

  const [errors, setErrors] = useState({
    name: "",
    category: "",
    brand: "",
    price: "",
    description: "",
    processor: "",
    ram: "",
    product_type: "",
  });

  const validate = (name, value) => {
    switch (name) {
      case "name":
        return !value ? "Product name is required" : "";
      case "category":
        return !value ? "Category is required" : "";
      case "brand":
        return !value ? "Brand is required" : "";
      case "price":
        return !/^\d*$/.test(value) ? "Price is required" : "";
      // case "storage":
      //   return !value ? "Storage is required" : "";
      // case "processor":
      //   return !value ? "Processor is required" : "";
      // case "ram":
      //   return !value ? "RAM is required" : "";

      default:
        return "";
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = () => {
    setLoading(true);
    const rows = 1000;
    getCategories({ rows })
      .then((res) => {
        setCategories(res.categories.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchBrands = () => {
    setLoading(true);
    const rows = 1000;
    getBrands({ rows })
      .then((res) => {
        setBrands(res.brands.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleStatus = (e) => {
    setStatus(e.target.checked);
  };

  const handleDescription = (description) => {
    setDescription(description);
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

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);

    // Use Promise.all to ensure all images are processed before updating the state
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
              const maxImageSize = 800; // Set your desired max image size here

              let width = img.width;
              let height = img.height;

              // Resize the image if it exceeds the max size
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

              // Convert canvas image to a Blob with reduced size
              canvas.toBlob(
                (blob) => {
                  resolve({ blob, name: image.name, size: image.size });
                },
                "image/jpeg",
                0.6
              ); // Adjust the quality (0.7 means 70% quality)

              // Alternatively, you can use 'image/png' if you prefer PNG format
            };
          };
        });
      })
    ).then((resizedImages) => {
      // Now that all images are resized, update the state
      setImages([...images, ...resizedImages]);
    });
  };

  const handleProductInput = (e) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validate(name, value),
    }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setPrice(value);
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validate(name, value),
    }));
  };

  const handleRemoveImage = (idx) => () => {
    setImages(images.filter((s, sidx) => idx !== sidx));
  };

  const handleSpecChange = (name, value) => {
    setSpecs((prev) => ({ ...prev, [name]: value }));
    setSpecErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleOtherSaleChange = (e) => {
    const other_sales = e.target.value;
    console.log(other_sales);
    setOtherSales(other_sales);
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
    // for (var i in images) {
    //   data.append(`images[${i}]`, images[i]);
    // }

    images.forEach((image, index) => {
      // Append all images using the same key "images[]"
      data.append("images[]", image.blob, image.name);
    });

    // Only send specs relevant to the selected category, and only if filled.
    const filledSpecFields = visibleSpecFields.filter(
      (field) => specs[field.name]
    );

    // Build specification label/value pairs from the grid (only filled fields)
    filledSpecFields.forEach((field, i) => {
      data.set(`labels[${i}]`, field.label);
      data.set(`values[${i}]`, specs[field.name]);
    });

    data.set("name", fields.name);
    other_sales !== null && data.set("other_sales", other_sales);
    data.set("product_type", fields.product_type);
    data.set("category", fields.category);
    data.set("brand", fields.brand);
    // Keep dedicated columns populated for backward compatibility
    data.set("ram", specs.ram || "");
    data.set("storage", specs.storage_capacity || "");
    data.set("processor", specs.processor || "");
    data.set("description", description);
    data.set("availability", status ? 1 : 0);
    data.set("price", price);
    // Send each relevant specification field raw (one key per spec)
    filledSpecFields.forEach((field) => {
      data.set(field.name, specs[field.name]);
    });

    return axios
      .post(
        `${settings.API_URL}store/product`,
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
        saved();
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
      <div className="col-12">
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
            <h4 className="card-title">Add Product</h4>
            <p className="card-description"> </p>
            <form className="forms-sample">
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <label className="label">Product Name</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="exampleInputName1"
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
                      id="exampleFormControlSelect3"
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
              <Row></Row>

              <div className="spec-section">
                <div className="spec-section__title">Specifications</div>

                <Row>
                  <Col md={6}>
                    <div
                      className={`spec-field${
                        errors.category ? " spec-field--error" : ""
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
                        value={fields.category || undefined}
                        onChange={(value) =>
                          handleProductInput({
                            target: { name: "category", value: value || "" },
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
                      {errors.category && (
                        <span className="spec-field__error">
                          {errors.category}
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
                      <Select
                        showSearch
                        allowClear
                        size="large"
                        style={{ width: "100%" }}
                        popupClassName="spec-dropdown"
                        placeholder="Search & choose brand"
                        optionFilterProp="children"
                        value={fields.brand || undefined}
                        onChange={(value) => {
                          handleProductInput({
                            target: { name: "brand", value: value || "" },
                          });
                          // Reset the dependent model when the brand changes.
                          handleSpecChange("model", "");
                        }}
                        filterOption={(input, option) =>
                          String((option && option.children) || "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      >
                        {mergedBrands.map((brand) => (
                          <Select.Option key={brand.id} value={brand.id}>
                            {brand.name}
                          </Select.Option>
                        ))}
                      </Select>
                      {errors.brand && (
                        <span className="spec-field__error">{errors.brand}</span>
                      )}
                    </div>
                  </Col>

                  {visibleSpecFields.map((field) => {
                    const hasError = !!specErrors[field.name];
                    // The Model field depends on the selected brand.
                    const isModel = field.name === "model";
                    const fieldOptions = isModel
                      ? modelOptions
                      : field.options;
                    const modelDisabled = isModel && !selectedBrandName;
                    const selectPlaceholder = isModel
                      ? selectedBrandName
                        ? `Search, pick or type a ${selectedBrandName} model`
                        : "Select a brand first"
                      : `Search & choose ${field.label.toLowerCase()}`;
                    return (
                      <Col md={6} key={field.name}>
                        <div
                          className={`spec-field${
                            hasError ? " spec-field--error" : ""
                          }`}
                        >
                          <label className="spec-field__label">
                            {field.label}
                            {field.required && <span className="req">*</span>}
                          </label>
                          {field.type === "text" ? (
                            <AntInput
                              size="large"
                              placeholder={field.placeholder || field.label}
                              value={specs[field.name] || ""}
                              onChange={(e) =>
                                handleSpecChange(field.name, e.target.value)
                              }
                            />
                          ) : (
                            <Select
                              showSearch
                              allowClear
                              size="large"
                              style={{ width: "100%" }}
                              popupClassName="spec-dropdown"
                              disabled={modelDisabled}
                              notFoundContent="Type to add your own value"
                              placeholder={selectPlaceholder}
                              optionFilterProp="children"
                              value={specs[field.name] || undefined}
                              onSearch={(val) =>
                                setFieldSearch((prev) => ({
                                  ...prev,
                                  [field.name]: val,
                                }))
                              }
                              onChange={(value) => {
                                handleSpecChange(field.name, value || "");
                                setFieldSearch((prev) => ({
                                  ...prev,
                                  [field.name]: "",
                                }));
                              }}
                              filterOption={(input, option) =>
                                String((option && option.children) || "")
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                            >
                              {isGroupedOptions(fieldOptions)
                                ? fieldOptions.map((grp) => (
                                    <Select.OptGroup
                                      key={grp.label}
                                      label={grp.label.toUpperCase()}
                                    >
                                      {grp.items.map((option) => (
                                        <Select.Option
                                          key={option}
                                          value={option}
                                        >
                                          {option}
                                        </Select.Option>
                                      ))}
                                    </Select.OptGroup>
                                  ))
                                : fieldOptions.map((option, key) => (
                                    <Select.Option key={key} value={option}>
                                      {option}
                                    </Select.Option>
                                  ))}
                              {/* Let users add a value that isn't in the list */}
                              {(fieldSearch[field.name] || "").trim() &&
                                !optionExists(
                                  fieldOptions,
                                  (fieldSearch[field.name] || "").trim()
                                ) && (
                                  <Select.OptGroup label="ADD YOUR OWN">
                                    <Select.Option
                                      value={fieldSearch[field.name].trim()}
                                    >
                                      {fieldSearch[field.name].trim()}
                                    </Select.Option>
                                  </Select.OptGroup>
                                )}
                            </Select>
                          )}
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
                      <label className="spec-field__label">Availability</label>
                      <label className="avail-toggle">
                        <Input
                          type="checkbox"
                          className="form-check-input"
                          checked={status}
                          onChange={handleStatus}
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
                      Upload Product Images
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
    </Modal>
  );
};

export default AddProduct;
