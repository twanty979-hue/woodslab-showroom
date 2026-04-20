// config.ts

export const LIMIT = 40;

export const SPEC_KEYS = {
  type: "spec_type",
  material: "material",
  panel: "panel_craft",
};

export const STATUS_TABS = [
  { key: "all", label: "All", values: null },
  { key: "available", label: "Available", values: ["available", "active"] },
  { key: "pending", label: "Pending", values: ["pending", "reserved", "hold", "on_request"] },
  { key: "sold", label: "Sold/Archive", values: ["sold", "archived", "inactive"] },
  { key: "draft", label: "Draft", values: ["draft"] },
];

export const RANGE_COLS: Record<string, string> = {
  length: "length_cm",
  width: "width_cm",
  thickness: "thickness_cm",
};

export const PRODUCT_TYPES = [
  "Wood slabs",
  "Small table",
  "Leg",
  "Chair/Stool",
  "Cabinet",
  "Table",
  "Small Furniture",
];

export const HEADERS = [
  { key: "material", label: "Material" },
  { key: "panel", label: "Panel Craft" },
  { key: "length", label: "Length (mm)" },
  { key: "width", label: "Width (mm)" },
  { key: "thickness", label: "Thickness (mm)" },
  { key: "price", label: "Price" },
  { key: "discount", label: "Deals" },
  { key: "status", label: "State" },
];