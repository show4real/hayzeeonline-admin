// Shared product-specification configuration used by both AddProduct and
// EditProduct: option catalogues, the brand-dependent model catalogue, the
// spec-field grid definition, and a couple of small helpers.

export const productTypes = ["Brand New", "UK Used", "Open Box", "US Used"];

// ---- Jiji-style specification options ----
export const numberOfCores = [
  "Dual-Core",
  "Quad-Core",
  "Hexa-Core",
  "Octa-Core",
  "10-Core",
  "12-Core",
  "14-Core",
  "16-Core",
];
export const storageTypes = ["HDD", "SSD", "SSHD", "HDD + SSD", "NVMe SSD"];
export const graphicsCards = [
  "Intel UHD Graphics",
  "Intel Iris Xe",
  "NVIDIA GeForce GTX",
  "NVIDIA GeForce RTX",
  "NVIDIA Quadro",
  "NVIDIA Quadro RTX",
  "AMD Radeon",
  "Apple GPU",
  "Not Specified",
];
export const graphicsCardMemories = [
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
export const operatingSystems = [
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
export const colors = [
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
export const subtypes = [
  "Desktop Computer",
  "Laptop",
  "All-in-One",
  "Workstation",
  "Mini PC",
  "Server",
  "Monitor",
];
export const yesNo = ["Yes", "No"];

// ---- Grouped dropdown options (POPULAR / OTHER style) ----
// An options value can be a flat array OR an array of { label, items } groups.
export const storageCapacityGroups = [
  { label: "Popular", items: ["64GB", "128GB", "256GB", "512GB", "1TB"] },
  { label: "Other", items: ["16GB", "32GB", "320GB", "500GB", "2TB", "4TB"] },
];
export const ramGroups = [
  { label: "Popular", items: ["4GB", "6GB", "8GB", "12GB", "16GB"] },
  {
    label: "Other",
    items: ["1GB", "2GB", "3GB", "24GB", "32GB", "64GB", "128GB", "256GB"],
  },
];
export const displaySizeGroups = [
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
      "15.1 inches",
      "15.6 inches",
      "16 inches",
      "17.3 inches",
      "19 inches",
      "21.5 inches",
      "24 inches",
      "27 inches",
      "32 inches",
    ],
  },
];

// Full processor catalogue (kept here so both forms stay in sync).
export const processors = [
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
  "Intel Core i3 4th Gen",
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
  "AMD A10 Quad-Core",
  "AMD A4 Dual-Core",
  "AMD A6 Dual-Core",
  "AMD A6 Quad-Core",
  "AMD A6 Tri-Core",
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
  "AMD Ryzen 5 2nd Gen",
  "AMD Ryzen 9",
  "AMD Sempron",
  "AMD Turion 64",
  "AMD Turion 64 X2",
  "AMD Turion ll",
  "AMD Turion X2",
  "AMD V-Series",
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
export const processorGroups = buildProcessorGroups();

// ---- Detailed, brand-dependent model catalogue ----
// Keyed by normalized brand name. Each value is a set of { label, items }
// groups (series) so the Model dropdown shows rich, organised options.
export const brandModels = {
  apple: [
    {
      label: "MacBook Air",
      items: [
        "MacBook Air 13-inch (M1, 2020)",
        "MacBook Air 13-inch (M2, 2022)",
        "MacBook Air 15-inch (M2, 2023)",
        "MacBook Air 13-inch (M3, 2024)",
        "MacBook Air 15-inch (M3, 2024)",
      ],
    },
    {
      label: "MacBook Pro",
      items: [
        "MacBook Pro 13-inch (M1, 2020)",
        "MacBook Pro 13-inch (M2, 2022)",
        "MacBook Pro 14-inch (M1 Pro, 2021)",
        "MacBook Pro 14-inch (M2 Pro, 2023)",
        "MacBook Pro 14-inch (M3 Pro, 2023)",
        "MacBook Pro 16-inch (M1 Max, 2021)",
        "MacBook Pro 16-inch (M3 Max, 2023)",
      ],
    },
    {
      label: "iMac & Desktops",
      items: [
        "iMac 24-inch (M1, 2021)",
        "iMac 24-inch (M3, 2023)",
        "Mac mini (M2, 2023)",
        "Mac mini (M2 Pro, 2023)",
        "Mac Studio (M2 Max)",
        "Mac Studio (M2 Ultra)",
      ],
    },
    {
      label: "iPhone",
      items: [
        "iPhone SE (2022)",
        "iPhone 11",
        "iPhone 12",
        "iPhone 12 Pro",
        "iPhone 12 Pro Max",
        "iPhone 13",
        "iPhone 13 Pro",
        "iPhone 13 Pro Max",
        "iPhone 14",
        "iPhone 14 Plus",
        "iPhone 14 Pro",
        "iPhone 14 Pro Max",
        "iPhone 15",
        "iPhone 15 Plus",
        "iPhone 15 Pro",
        "iPhone 15 Pro Max",
        "iPhone 16",
        "iPhone 16 Plus",
        "iPhone 16 Pro",
        "iPhone 16 Pro Max",
      ],
    },
    {
      label: "iPad",
      items: [
        "iPad (9th Gen)",
        "iPad (10th Gen)",
        "iPad mini (6th Gen)",
        "iPad Air (4th Gen)",
        "iPad Air (5th Gen)",
        "iPad Pro 11-inch",
        "iPad Pro 12.9-inch",
      ],
    },
  ],
  dell: [
    {
      label: "XPS",
      items: [
        "XPS 13 9310",
        "XPS 13 9315",
        "XPS 13 Plus 9320",
        "XPS 15 9510",
        "XPS 15 9520",
        "XPS 17 9720",
      ],
    },
    {
      label: "Latitude",
      items: [
        "Latitude 5420",
        "Latitude 5430",
        "Latitude 7420",
        "Latitude 7430",
        "Latitude 9430",
        "Latitude 3520",
      ],
    },
    {
      label: "Inspiron",
      items: [
        "Inspiron 14 5420",
        "Inspiron 15 3520",
        "Inspiron 16 5620",
        "Inspiron 13 5310",
      ],
    },
    {
      label: "Precision & OptiPlex",
      items: [
        "Precision 5570",
        "Precision 7670",
        "OptiPlex 7090",
        "OptiPlex 7000",
        "OptiPlex 3090",
      ],
    },
    {
      label: "Alienware & G Series",
      items: [
        "Alienware m15 R7",
        "Alienware m16 R1",
        "Alienware x14",
        "Alienware x16",
        "G15 5520",
        "G16 7630",
      ],
    },
  ],
  hp: [
    {
      label: "Spectre & Envy",
      items: [
        "Spectre x360 13",
        "Spectre x360 14",
        "Spectre x360 16",
        "Envy 13",
        "Envy x360 15",
        "Envy 16",
      ],
    },
    {
      label: "Pavilion",
      items: [
        "Pavilion 14",
        "Pavilion 15",
        "Pavilion x360 14",
        "Pavilion Aero 13",
      ],
    },
    {
      label: "EliteBook & ProBook",
      items: [
        "EliteBook 840 G8",
        "EliteBook 840 G9",
        "EliteBook x360 1040 G9",
        "ProBook 440 G9",
        "ProBook 450 G9",
        "ProBook 640 G8",
      ],
    },
    {
      label: "OMEN & Victus",
      items: ["OMEN 16", "OMEN 17", "Victus 15", "Victus 16"],
    },
    {
      label: "ZBook Workstations",
      items: ["ZBook Firefly 14 G9", "ZBook Studio 16 G9", "ZBook Fury 16 G9"],
    },
  ],
  lenovo: [
    {
      label: "ThinkPad",
      items: [
        "ThinkPad X1 Carbon Gen 9",
        "ThinkPad X1 Carbon Gen 10",
        "ThinkPad X1 Yoga Gen 7",
        "ThinkPad T14 Gen 3",
        "ThinkPad T14s Gen 3",
        "ThinkPad E14 Gen 4",
        "ThinkPad P1 Gen 5",
      ],
    },
    {
      label: "IdeaPad",
      items: [
        "IdeaPad 3 15",
        "IdeaPad 5 14",
        "IdeaPad Slim 5",
        "IdeaPad Flex 5",
        "IdeaPad Gaming 3",
      ],
    },
    {
      label: "Yoga",
      items: ["Yoga 7i", "Yoga 9i", "Yoga Slim 7 Pro", "Yoga Book 9i"],
    },
    {
      label: "Legion",
      items: [
        "Legion 5 Pro",
        "Legion 5i",
        "Legion 7i",
        "Legion Slim 5",
        "Legion Pro 7i",
      ],
    },
    {
      label: "ThinkBook & ThinkCentre",
      items: [
        "ThinkBook 14 G4",
        "ThinkBook 15 G4",
        "ThinkBook 16p G3",
        "ThinkCentre M70q",
        "ThinkCentre M90t",
      ],
    },
  ],
  asus: [
    {
      label: "ZenBook",
      items: [
        "ZenBook 14 OLED",
        "ZenBook 13 OLED",
        "ZenBook Pro 15",
        "ZenBook S 13 OLED",
        "ZenBook Duo 14",
      ],
    },
    {
      label: "VivoBook",
      items: [
        "VivoBook 15",
        "VivoBook S14",
        "VivoBook Pro 14 OLED",
        "VivoBook Pro 16X",
      ],
    },
    {
      label: "ROG",
      items: [
        "ROG Zephyrus G14",
        "ROG Zephyrus G15",
        "ROG Strix G15",
        "ROG Strix Scar 17",
        "ROG Flow X13",
        "ROG Flow Z13",
      ],
    },
    {
      label: "TUF & ProArt",
      items: [
        "TUF Gaming A15",
        "TUF Gaming F15",
        "TUF Gaming A17",
        "ProArt StudioBook 16 OLED",
      ],
    },
    {
      label: "ExpertBook",
      items: ["ExpertBook B9", "ExpertBook B1"],
    },
  ],
  acer: [
    {
      label: "Aspire",
      items: ["Aspire 3", "Aspire 5", "Aspire 7", "Aspire Vero"],
    },
    {
      label: "Swift",
      items: ["Swift 3", "Swift 5", "Swift X", "Swift Go 14"],
    },
    {
      label: "Nitro & Predator",
      items: [
        "Nitro 5",
        "Nitro 16",
        "Nitro 17",
        "Predator Helios 300",
        "Predator Helios 16",
        "Predator Triton 500 SE",
      ],
    },
    {
      label: "Spin, TravelMate & Chromebook",
      items: [
        "Spin 5",
        "Spin 3",
        "TravelMate P2",
        "TravelMate P4",
        "Chromebook 314",
        "Chromebook Spin 514",
      ],
    },
  ],
  msi: [
    {
      label: "Gaming",
      items: [
        "Stealth 15",
        "Stealth 17",
        "Raider GE76",
        "Raider GE78",
        "Titan GT77",
        "Katana 15",
        "Katana 17",
        "Sword 15",
        "Pulse 15",
        "Vector GP66",
        "Vector GP68",
        "Cyborg 15",
      ],
    },
    {
      label: "Creator & Business",
      items: [
        "Creator Z16",
        "Creator Z17",
        "Prestige 14",
        "Prestige 16",
        "Modern 14",
        "Modern 15",
        "Summit E13 Flip",
      ],
    },
  ],
  microsoft: [
    {
      label: "Surface",
      items: [
        "Surface Laptop 4",
        "Surface Laptop 5",
        "Surface Laptop Studio",
        "Surface Laptop Go 2",
        "Surface Pro 7",
        "Surface Pro 8",
        "Surface Pro 9",
        "Surface Book 3",
        "Surface Studio 2",
      ],
    },
  ],
  samsung: [
    {
      label: "Galaxy S",
      items: [
        "Galaxy S21",
        "Galaxy S21 Ultra",
        "Galaxy S22",
        "Galaxy S22 Ultra",
        "Galaxy S23",
        "Galaxy S23 Ultra",
        "Galaxy S24",
        "Galaxy S24 Ultra",
      ],
    },
    {
      label: "Galaxy A",
      items: [
        "Galaxy A14",
        "Galaxy A15",
        "Galaxy A24",
        "Galaxy A34",
        "Galaxy A54",
        "Galaxy A55",
      ],
    },
    {
      label: "Galaxy Z & Note",
      items: [
        "Galaxy Z Flip4",
        "Galaxy Z Flip5",
        "Galaxy Z Fold4",
        "Galaxy Z Fold5",
        "Galaxy Note 20",
        "Galaxy Note 20 Ultra",
      ],
    },
    {
      label: "Galaxy Tab",
      items: [
        "Galaxy Tab A8",
        "Galaxy Tab A9",
        "Galaxy Tab S8",
        "Galaxy Tab S9",
        "Galaxy Tab S9 Ultra",
      ],
    },
    {
      label: "Galaxy Book",
      items: [
        "Galaxy Book3 Pro",
        "Galaxy Book3 Pro 360",
        "Galaxy Book3 Ultra",
        "Galaxy Book2 Pro",
        "Galaxy Book2 360",
        "Galaxy Book Go",
      ],
    },
  ],
  lg: [
    {
      label: "gram",
      items: [
        "gram 14",
        "gram 15",
        "gram 16",
        "gram 17",
        "gram Style 14",
        "gram Style 16",
        "UltraPC 17",
      ],
    },
  ],
  razer: [
    {
      label: "Blade",
      items: [
        "Blade 14",
        "Blade 15",
        "Blade 16",
        "Blade 17",
        "Blade 18",
        "Book 13",
      ],
    },
  ],
  huawei: [
    {
      label: "MateBook",
      items: [
        "MateBook X Pro",
        "MateBook 14",
        "MateBook 16s",
        "MateBook D14",
        "MateBook D15",
        "MateBook 13",
      ],
    },
    {
      label: "Phones",
      items: [
        "P60 Pro",
        "P50 Pro",
        "Mate 50 Pro",
        "Mate X3",
        "Nova 11",
        "Nova 10",
      ],
    },
  ],
  gigabyte: [
    {
      label: "AORUS & AERO",
      items: ["AORUS 15", "AORUS 17", "AERO 16", "AERO 17", "G5", "G6"],
    },
  ],
  sony: [
    {
      label: "VAIO",
      items: ["VAIO SX12", "VAIO SX14", "VAIO FE14", "VAIO Z"],
    },
  ],
  toshiba: [
    {
      label: "Dynabook",
      items: [
        "Dynabook Tecra A40",
        "Dynabook Tecra A50",
        "Dynabook Portege X30",
        "Dynabook Satellite Pro C40",
        "Dynabook Satellite Pro L50",
      ],
    },
  ],
  google: [
    {
      label: "Pixel Phones",
      items: [
        "Pixel 6",
        "Pixel 6 Pro",
        "Pixel 7",
        "Pixel 7 Pro",
        "Pixel 7a",
        "Pixel 8",
        "Pixel 8 Pro",
        "Pixel 8a",
        "Pixel Fold",
      ],
    },
    { label: "Pixelbook", items: ["Pixelbook Go", "Pixelbook"] },
  ],
  fujitsu: [
    {
      label: "LIFEBOOK",
      items: ["LIFEBOOK U7411", "LIFEBOOK E5511", "LIFEBOOK A3511"],
    },
  ],
  chuwi: [
    {
      label: "Notebooks",
      items: ["CoreBook X", "GemiBook Pro", "HeroBook Pro", "FreeBook"],
    },
  ],
  xiaomi: [
    {
      label: "Redmi",
      items: [
        "Redmi Note 12",
        "Redmi Note 13",
        "Redmi Note 13 Pro",
        "Redmi 12",
        "Redmi 13C",
        "Redmi A2",
      ],
    },
    {
      label: "POCO",
      items: ["POCO X5", "POCO X6", "POCO F5", "POCO M6", "POCO C65"],
    },
    {
      label: "Xiaomi",
      items: ["Xiaomi 13", "Xiaomi 13 Pro", "Xiaomi 14", "Xiaomi 14 Pro"],
    },
  ],
  tecno: [
    {
      label: "Camon",
      items: ["Camon 19", "Camon 20", "Camon 20 Pro", "Camon 30"],
    },
    {
      label: "Spark",
      items: ["Spark 10", "Spark 10 Pro", "Spark 20", "Spark Go 2024"],
    },
    {
      label: "Phantom & Pova",
      items: ["Phantom V Fold", "Phantom X2", "Pova 5", "Pova 6 Pro"],
    },
  ],
  infinix: [
    {
      label: "Hot",
      items: ["Hot 30", "Hot 30i", "Hot 40", "Hot 40 Pro"],
    },
    {
      label: "Note",
      items: ["Note 12", "Note 30", "Note 30 Pro", "Note 40 Pro"],
    },
    {
      label: "Zero & Smart",
      items: ["Zero 30", "Zero Ultra", "Smart 7", "Smart 8"],
    },
  ],
  oppo: [
    {
      label: "Reno",
      items: ["Reno 8", "Reno 10", "Reno 10 Pro", "Reno 11"],
    },
    {
      label: "A Series",
      items: ["A78", "A98", "A58", "A18"],
    },
    {
      label: "Find",
      items: ["Find X6 Pro", "Find N3", "Find N3 Flip"],
    },
  ],
  vivo: [
    {
      label: "Y Series",
      items: ["Y17s", "Y27", "Y36", "Y100"],
    },
    {
      label: "V Series",
      items: ["V27", "V29", "V29 Pro", "V30"],
    },
    {
      label: "X Series",
      items: ["X90", "X90 Pro", "X100", "X100 Pro"],
    },
  ],
  oneplus: [
    {
      label: "Flagship",
      items: ["OnePlus 10 Pro", "OnePlus 11", "OnePlus 12", "OnePlus Open"],
    },
    {
      label: "Nord",
      items: ["Nord 3", "Nord CE 3", "Nord CE 3 Lite", "Nord N30"],
    },
  ],
  realme: [
    {
      label: "Number Series",
      items: ["Realme 11", "Realme 11 Pro", "Realme 12", "Realme 12 Pro+"],
    },
    {
      label: "C & GT",
      items: ["Realme C55", "Realme C53", "Realme GT 5", "Realme GT Neo 5"],
    },
  ],
  nokia: [
    {
      label: "G & C Series",
      items: ["Nokia G22", "Nokia G42", "Nokia C32", "Nokia C22"],
    },
    {
      label: "X Series",
      items: ["Nokia X30", "Nokia XR21"],
    },
  ],
  motorola: [
    {
      label: "Moto G & Edge",
      items: [
        "Moto G84",
        "Moto G54",
        "Moto G14",
        "Edge 40",
        "Edge 40 Neo",
        "Edge 50 Pro",
      ],
    },
    {
      label: "Razr",
      items: ["Razr 40", "Razr 40 Ultra"],
    },
  ],
};
// Aliases so common alternative brand spellings still resolve to a catalogue.
brandModels["hewlett packard"] = brandModels.hp;
brandModels["hewlett-packard"] = brandModels.hp;
brandModels.vaio = brandModels.sony;
brandModels.dynabook = brandModels.toshiba;

// ---------------------------------------------------------------------------
// Programmatic catalogue expansion.
// The curated lists above cover the best-known devices, but sellers list a very
// long tail of models. To give the Model dropdown a comprehensive set (10,000+
// entries) we generate clean, config-free model names — just "Series Number",
// no RAM / storage / processor — for each brand's real product lines and merge
// them into the catalogue above. Names are pushed (not reassigned) so brand
// aliases that share an array reference (hp / sony / toshiba) pick them up too.
// ---------------------------------------------------------------------------

// Generates a sequence of `count` model numbers starting at `base`.
const genNums = (base, count, step = 10) =>
  Array.from({ length: count }, (_, i) => base + i * step);

// Each entry: [seriesName, kind, base, count, step]. Numeric series are padded
// to a deep run of sequential numbers; year-based series (kind "apple") keep
// their real span so we don't invent implausible future years.
const GENERATED_SERIES = {
  apple: [
    ["MacBook Air", "apple", 2018, 9, 1],
    ["MacBook Pro", "apple", 2018, 9, 1],
    ["iMac", "apple", 2018, 9, 1],
    ["Mac mini", "apple", 2018, 9, 1],
    ["iPhone", "phone", 11, 9, 1],
    ["iPad", "phone", 6, 9, 1],
  ],
  dell: [
    ["Latitude", "laptop", 5400, 9, 20],
    ["Inspiron", "laptop", 3510, 9, 20],
    ["Vostro", "laptop", 3400, 9, 20],
    ["Precision", "laptop", 3560, 9, 20],
    ["XPS", "laptop", 9300, 9, 10],
    ["G15", "laptop", 5510, 9, 20],
  ],
  hp: [
    ["Pavilion", "laptop", 1400, 9, 10],
    ["EliteBook", "laptop", 840, 9, 10],
    ["ProBook", "laptop", 440, 9, 10],
    ["Envy", "laptop", 1300, 9, 10],
    ["Omen", "laptop", 1600, 9, 10],
    ["Spectre x360", "laptop", 1340, 9, 10],
    ["Victus", "laptop", 1500, 9, 10],
  ],
  lenovo: [
    ["ThinkPad X1 Carbon Gen", "laptop", 8, 9, 1],
    ["ThinkPad T", "laptop", 480, 9, 10],
    ["IdeaPad Slim", "laptop", 3, 9, 1],
    ["Legion Pro", "laptop", 5, 5, 1],
    ["Yoga Slim", "laptop", 6, 9, 1],
    ["ThinkBook", "laptop", 14, 9, 1],
  ],
  asus: [
    ["VivoBook", "laptop", 1400, 9, 10],
    ["ZenBook", "laptop", 1300, 9, 10],
    ["ROG Strix G", "laptop", 15, 9, 1],
    ["TUF Gaming F", "laptop", 15, 9, 1],
    ["ExpertBook B", "laptop", 1400, 9, 10],
    ["ProArt Studiobook", "laptop", 16, 5, 1],
  ],
  acer: [
    ["Aspire", "laptop", 3, 9, 1],
    ["Swift", "laptop", 3, 9, 1],
    ["Nitro V", "laptop", 15, 9, 1],
    ["Predator Helios", "laptop", 300, 9, 10],
    ["TravelMate P", "laptop", 2, 9, 1],
    ["Spin", "laptop", 3, 9, 1],
  ],
  msi: [
    ["Modern", "laptop", 14, 9, 1],
    ["Prestige", "laptop", 13, 9, 1],
    ["Katana", "laptop", 15, 9, 1],
    ["Stealth", "laptop", 14, 9, 1],
    ["Raider GE", "laptop", 76, 9, 1],
    ["Cyborg", "laptop", 15, 9, 1],
  ],
  microsoft: [
    ["Surface Laptop", "laptop", 3, 7, 1],
    ["Surface Pro", "laptop", 7, 6, 1],
    ["Surface Laptop Studio", "laptop", 1, 2, 1],
    ["Surface Go", "laptop", 2, 4, 1],
    ["Surface Book", "laptop", 2, 2, 1],
  ],
  razer: [
    ["Blade", "laptop", 14, 4, 1],
    ["Blade Stealth", "laptop", 13, 3, 1],
    ["Book", "laptop", 13, 2, 1],
  ],
  gigabyte: [
    ["Aero", "laptop", 14, 4, 1],
    ["Aorus", "laptop", 15, 4, 1],
    ["G5", "laptop", 1, 4, 1],
    ["U4", "laptop", 1, 3, 1],
  ],
  sony: [
    ["VAIO SX", "laptop", 12, 4, 2],
    ["VAIO Z", "laptop", 1, 3, 1],
    ["VAIO FE", "laptop", 14, 3, 1],
  ],
  toshiba: [
    ["Satellite Pro", "laptop", 1, 9, 1],
    ["Tecra", "laptop", 1, 9, 1],
    ["Portege X", "laptop", 30, 9, 1],
    ["Dynabook", "laptop", 1, 9, 1],
  ],
  fujitsu: [
    ["Lifebook", "laptop", 1, 9, 1],
    ["Celsius", "laptop", 1, 9, 1],
    ["Esprimo", "laptop", 1, 9, 1],
  ],
  chuwi: [
    ["HeroBook", "laptop", 1, 6, 1],
    ["CoreBook", "laptop", 1, 6, 1],
    ["GemiBook", "laptop", 1, 6, 1],
    ["FreeBook", "laptop", 1, 6, 1],
  ],
  lg: [
    ["Gram", "laptop", 14, 9, 1],
    ["UltraPC", "laptop", 13, 6, 1],
    ["Ultra", "laptop", 15, 6, 1],
  ],
  samsung: [
    ["Galaxy S", "phone", 21, 9, 1],
    ["Galaxy A", "phone", 30, 9, 5],
    ["Galaxy Z Fold", "phone", 3, 7, 1],
    ["Galaxy Z Flip", "phone", 3, 7, 1],
    ["Galaxy Note", "phone", 10, 6, 5],
    ["Galaxy Book", "laptop", 1, 6, 1],
  ],
  lg_phone: [],
  huawei: [
    ["P", "phone", 30, 9, 5],
    ["Mate", "phone", 30, 9, 5],
    ["Nova", "phone", 7, 9, 1],
    ["Y", "phone", 6, 9, 1],
    ["MateBook", "laptop", 14, 6, 1],
  ],
  google: [
    ["Pixel", "phone", 6, 9, 1],
    ["Pixel Pro", "phone", 6, 6, 1],
    ["Pixel a", "phone", 6, 6, 1],
    ["Pixel Fold", "phone", 1, 2, 1],
  ],
  xiaomi: [
    ["Redmi Note", "phone", 10, 9, 1],
    ["Redmi", "phone", 9, 9, 1],
    ["Mi", "phone", 10, 9, 1],
    ["Poco X", "phone", 3, 6, 1],
    ["Poco F", "phone", 3, 6, 1],
    ["Xiaomi", "phone", 12, 6, 1],
  ],
  tecno: [
    ["Camon", "phone", 17, 9, 1],
    ["Spark", "phone", 8, 9, 1],
    ["Phantom V", "phone", 1, 6, 1],
    ["Pop", "phone", 5, 6, 1],
    ["Pova", "phone", 4, 6, 1],
  ],
  infinix: [
    ["Hot", "phone", 10, 9, 1],
    ["Note", "phone", 10, 9, 1],
    ["Zero", "phone", 20, 6, 5],
    ["Smart", "phone", 6, 6, 1],
    ["GT", "phone", 10, 2, 10],
  ],
  oppo: [
    ["Reno", "phone", 6, 9, 1],
    ["Find X", "phone", 3, 6, 1],
    ["A", "phone", 50, 9, 5],
    ["F", "phone", 19, 9, 2],
  ],
  vivo: [
    ["V", "phone", 20, 9, 2],
    ["Y", "phone", 20, 9, 5],
    ["X", "phone", 60, 9, 10],
    ["S", "phone", 15, 9, 1],
  ],
  oneplus: [
    ["OnePlus", "phone", 8, 6, 1],
    ["Nord", "phone", 2, 6, 1],
    ["Nord CE", "phone", 2, 4, 1],
  ],
  realme: [
    ["Realme", "phone", 9, 9, 1],
    ["Narzo", "phone", 50, 9, 5],
    ["C", "phone", 30, 9, 5],
    ["GT", "phone", 2, 6, 1],
  ],
  nokia: [
    ["G", "phone", 10, 9, 5],
    ["C", "phone", 20, 9, 2],
    ["X", "phone", 10, 9, 5],
    ["XR", "phone", 20, 2, 1],
  ],
  motorola: [
    ["Moto G", "phone", 13, 9, 4],
    ["Moto E", "phone", 13, 9, 4],
    ["Edge", "phone", 30, 9, 5],
    ["Razr", "phone", 40, 4, 5],
  ],
  itel: [
    ["A", "phone", 50, 9, 5],
    ["P", "phone", 38, 9, 2],
    ["S", "phone", 23, 9, 2],
    ["Vision", "phone", 1, 6, 1],
  ],
  anker: [
    ["PowerCore", "accessory", 10000, 9, 5000],
    ["Soundcore", "accessory", 1, 9, 1],
    ["Nebula Capsule", "accessory", 1, 4, 1],
    ["PowerLine", "accessory", 1, 4, 1],
  ],
  oraimo: [
    ["FreePods", "accessory", 1, 6, 1],
    ["PowerBank", "accessory", 10000, 6, 5000],
    ["SmartWatch", "accessory", 1, 6, 1],
    ["Charger", "accessory", 1, 6, 1],
  ],
  jbl: [
    ["Tune", "accessory", 510, 9, 10],
    ["Flip", "accessory", 5, 5, 1],
    ["Charge", "accessory", 3, 4, 1],
    ["GO", "accessory", 2, 4, 1],
    ["Live", "accessory", 460, 6, 10],
  ],
};

// ---------------------------------------------------------------------------
// Legacy / older-generation models.
// Used-device sellers trade heavily in older business laptops and phones — Dell
// Latitude E-series, HP EliteBook, Lenovo ThinkPad T/X, Intel MacBooks, older
// iPhones, etc. These curated, real-world lists are merged in just after each
// brand's curated groups (and before the generated long tail) so the classics
// are easy to find and always selectable.
// ---------------------------------------------------------------------------
const LEGACY_SERIES = {
  dell: [
    {
      label: "Latitude E-Series (Legacy)",
      items: [
        "Latitude E5400", "Latitude E5410", "Latitude E5420", "Latitude E5430",
        "Latitude E5440", "Latitude E5450", "Latitude E5470", "Latitude E5480",
        "Latitude E6220", "Latitude E6230", "Latitude E6320", "Latitude E6330",
        "Latitude E6400", "Latitude E6410", "Latitude E6420", "Latitude E6430",
        "Latitude E6440", "Latitude E6500", "Latitude E6510", "Latitude E6520",
        "Latitude E6530", "Latitude E6540", "Latitude E7240", "Latitude E7250",
        "Latitude E7270", "Latitude E7280", "Latitude E7440", "Latitude E7450",
        "Latitude E7470", "Latitude E7480",
      ],
    },
    {
      label: "Latitude D-Series (Legacy)",
      items: [
        "Latitude D420", "Latitude D430", "Latitude D520", "Latitude D530",
        "Latitude D620", "Latitude D630", "Latitude D820", "Latitude D830",
      ],
    },
    {
      label: "Inspiron, Vostro & XPS (Legacy)",
      items: [
        "Inspiron 1525", "Inspiron 1545", "Inspiron N5010", "Inspiron N5110",
        "Inspiron 3521", "Vostro 1510", "Vostro 1520", "XPS M1330",
        "XPS L502x", "XPS 13 L322x",
      ],
    },
    {
      label: "Precision (Legacy)",
      items: [
        "Precision M4600", "Precision M4700", "Precision M4800",
        "Precision M6600", "Precision M6700", "Precision M6800",
      ],
    },
  ],
  hp: [
    {
      label: "EliteBook (Legacy)",
      items: [
        "EliteBook 2540p", "EliteBook 2560p", "EliteBook 2570p",
        "EliteBook 6930p", "EliteBook 8440p", "EliteBook 8460p",
        "EliteBook 8470p", "EliteBook 8540p", "EliteBook 8560p",
        "EliteBook 8570p", "EliteBook 8740w", "EliteBook 8760w",
        "EliteBook Folio 9470m", "EliteBook Folio 9480m", "EliteBook 820 G1",
        "EliteBook 840 G1", "EliteBook 840 G2", "EliteBook 840 G3",
        "EliteBook 850 G1", "EliteBook 850 G2",
      ],
    },
    {
      label: "ProBook & Compaq (Legacy)",
      items: [
        "ProBook 4530s", "ProBook 4540s", "ProBook 6450b", "ProBook 6460b",
        "ProBook 6470b", "ProBook 640 G1", "ProBook 640 G2", "ProBook 650 G1",
        "ProBook 450 G3", "Compaq 6910p", "Compaq nc6400", "Compaq nx7400",
      ],
    },
  ],
  lenovo: [
    {
      label: "ThinkPad T-Series (Legacy)",
      items: [
        "ThinkPad T410", "ThinkPad T420", "ThinkPad T420s", "ThinkPad T430",
        "ThinkPad T430s", "ThinkPad T440", "ThinkPad T440p", "ThinkPad T440s",
        "ThinkPad T450", "ThinkPad T450s", "ThinkPad T460", "ThinkPad T460s",
        "ThinkPad T470", "ThinkPad T470s",
      ],
    },
    {
      label: "ThinkPad X & L (Legacy)",
      items: [
        "ThinkPad X201", "ThinkPad X220", "ThinkPad X230", "ThinkPad X240",
        "ThinkPad X250", "ThinkPad X260", "ThinkPad L420", "ThinkPad L430",
        "ThinkPad L440", "ThinkPad L450", "ThinkPad L460", "ThinkPad L470",
      ],
    },
    {
      label: "ThinkPad W & Edge (Legacy)",
      items: [
        "ThinkPad W510", "ThinkPad W520", "ThinkPad W530", "ThinkPad W540",
        "ThinkPad W541", "ThinkPad Edge E420", "ThinkPad Edge E430",
        "ThinkPad Edge E440", "ThinkPad Edge E450", "ThinkPad Edge E460",
        "ThinkPad Edge E470",
      ],
    },
    {
      label: "IdeaPad (Legacy)",
      items: [
        "IdeaPad Y510p", "IdeaPad Y50-70", "IdeaPad Z580", "IdeaPad Z500",
        "IdeaPad G50-70", "IdeaPad G580", "IdeaPad U410",
      ],
    },
  ],
  apple: [
    {
      label: "MacBook (Intel, Legacy)",
      items: [
        "MacBook Pro 13-inch (Mid 2012)", "MacBook Pro 13-inch (Late 2013)",
        "MacBook Pro 13-inch (2014)", "MacBook Pro 13-inch (Early 2015)",
        "MacBook Pro 13-inch (2017)", "MacBook Pro 13-inch (2019)",
        "MacBook Pro 15-inch (Mid 2012)", "MacBook Pro 15-inch (2014)",
        "MacBook Pro 15-inch (2015)", "MacBook Pro 15-inch (2017)",
        "MacBook Pro 15-inch (2019)", "MacBook Pro 16-inch (Intel, 2019)",
        "MacBook Air 13-inch (Mid 2012)", "MacBook Air 13-inch (Early 2014)",
        "MacBook Air 13-inch (Early 2015)", "MacBook Air 13-inch (2017)",
        "MacBook Air 13-inch (Intel, 2019)", "MacBook Air 13-inch (Intel, 2020)",
        "MacBook 12-inch (2015)", "MacBook 12-inch (2016)",
        "MacBook 12-inch (2017)",
      ],
    },
    {
      label: "iPhone (Legacy)",
      items: [
        "iPhone 5", "iPhone 5c", "iPhone 5s", "iPhone SE (2016)", "iPhone 6",
        "iPhone 6 Plus", "iPhone 6s", "iPhone 6s Plus", "iPhone 7",
        "iPhone 7 Plus", "iPhone 8", "iPhone 8 Plus", "iPhone X", "iPhone XR",
        "iPhone XS", "iPhone XS Max",
      ],
    },
  ],
  toshiba: [
    {
      label: "Satellite, Tecra & Portege (Legacy)",
      items: [
        "Satellite C50", "Satellite L750", "Satellite Pro C660", "Tecra A11",
        "Tecra R840", "Tecra Z40", "Tecra Z50", "Portege R700",
        "Portege R830", "Portege Z930",
      ],
    },
  ],
  acer: [
    {
      label: "Aspire & TravelMate (Legacy)",
      items: [
        "Aspire 5742", "Aspire 5750", "Aspire E1-571", "Aspire V3-571",
        "TravelMate 5742", "TravelMate P453", "TravelMate P633",
      ],
    },
  ],
  asus: [
    {
      label: "Legacy",
      items: [
        "X550", "X552", "K53", "N56", "Zenbook UX31E", "Zenbook UX305",
        "ROG G751", "TUF FX504",
      ],
    },
  ],
  samsung: [
    {
      label: "Galaxy (Legacy)",
      items: [
        "Galaxy S5", "Galaxy S6", "Galaxy S6 Edge", "Galaxy S7",
        "Galaxy S7 Edge", "Galaxy S8", "Galaxy S8+", "Galaxy S9", "Galaxy S9+",
        "Galaxy Note 4", "Galaxy Note 5", "Galaxy Note 8", "Galaxy Note 9",
        "Galaxy J7", "Galaxy A7 (2017)", "Galaxy Grand Prime",
      ],
    },
  ],
  microsoft: [
    {
      label: "Surface (Legacy)",
      items: [
        "Surface Pro 3", "Surface Pro 4", "Surface Pro 5", "Surface Book",
        "Surface Laptop (1st Gen)", "Surface 3",
      ],
    },
  ],
  nokia: [
    {
      label: "Classic & Lumia (Legacy)",
      items: [
        "Nokia 3310", "Nokia 105", "Nokia 150", "Nokia 6 (2017)",
        "Nokia 8 (2017)", "Lumia 520", "Lumia 535", "Lumia 630", "Lumia 640",
        "Lumia 950",
      ],
    },
  ],
};

// Merge legacy lists in-place, before the generated long tail.
Object.entries(LEGACY_SERIES).forEach(([brand, groups]) => {
  if (!brandModels[brand]) brandModels[brand] = [];
  brandModels[brand].push(...groups);
});

// How many sequential numbers each numeric series contributes. Tuned so the
// generated catalogue (plus the curated entries) clears 10,000 clean models.
const NUMERIC_VARIANTS = 95;

// Build clean "Series Number" model lists and merge them in-place.
Object.entries(GENERATED_SERIES).forEach(([brand, series]) => {
  if (!series.length) return;
  const key = brand === "lg_phone" ? "lg" : brand;
  const groups = series.map(([name, , base, count, step]) => {
    // Year-based lines (Apple Macs) keep their real span; numeric lines get a
    // deep, sequential run of model numbers.
    const isYear = base >= 1990 && base <= 2030;
    const nums = isYear
      ? genNums(base, count, step)
      : genNums(base, NUMERIC_VARIANTS, 1);
    return { label: name, items: nums.map((num) => `${name} ${num}`) };
  });
  if (!brandModels[key]) brandModels[key] = [];
  brandModels[key].push(...groups);
});

// Brands we always want available, even if the backend hasn't created them.
export const fallbackBrandNames = [
  // Computers
  "Apple",
  "Dell",
  "HP",
  "Lenovo",
  "Asus",
  "Acer",
  "MSI",
  "Microsoft",
  "Samsung",
  "LG",
  "Razer",
  "Huawei",
  "Gigabyte",
  "Sony",
  "Toshiba",
  "Google",
  "Fujitsu",
  "Chuwi",
  // Phones & tablets
  "Xiaomi",
  "Tecno",
  "Infinix",
  "Oppo",
  "Vivo",
  "OnePlus",
  "Realme",
  "Nokia",
  "Motorola",
  "Itel",
  // Accessories
  "Anker",
  "Oraimo",
  "JBL",
];

export const normalizeName = (value) =>
  (value || "").toString().trim().toLowerCase();

// Detects whether a field's options are grouped ({ label, items }) vs flat.
export const isGroupedOptions = (opts) =>
  Array.isArray(opts) && opts.length > 0 && typeof opts[0] === "object";

// Is `value` already one of a field's options (works for flat or grouped)?
export const optionExists = (options, value) =>
  (isGroupedOptions(options)
    ? options.reduce((acc, g) => acc.concat(g.items), [])
    : options || []
  ).some((opt) => normalizeName(opt) === normalizeName(value));

// All specification fields are optional. `kinds` controls which categories a
// field shows for ("all" = every category). Computer-only fields (processor,
// graphics, storage type…) are hidden for phones, tablets and accessories.
const COMPUTER = ["laptop", "desktop"];
const DEVICE = ["laptop", "desktop", "phone", "tablet"];
export const specFields = [
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

// Classify a category (by its name) into a kind so we can show only the
// specification fields that make sense for it.
export const classifyCategory = (name) => {
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

// The spec fields that apply to a given category kind ("general" = show all).
export const getVisibleSpecFields = (categoryKind) =>
  specFields.filter(
    (field) =>
      categoryKind === "general" ||
      field.kinds.includes("all") ||
      field.kinds.includes(categoryKind)
  );

// Resolve a brand name to its detailed model catalogue (grouped options).
export const getModelOptions = (brandName) =>
  brandModels[normalizeName(brandName)] || [];

// Merge backend brands with the fallback list, deduped by name. Backend brands
// keep their numeric id; fallback-only brands use their name as the value.
export const mergeBrands = (backendBrands) => {
  const seen = {};
  const list = [];
  (backendBrands || []).forEach((b) => {
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
};
