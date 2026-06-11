import React, { useState } from "react";
import { Select } from "antd";
import { normalizeName, isGroupedOptions } from "./productSpecConfig";

// A single, friendly select used across the product spec form.
//
// Users can pick from a curated list (flat, grouped, or {id,name} objects) OR
// just start typing their own value and add it on the fly — type, then press
// Enter (or click the highlighted "+ Add" row). No extra steps, no clutter.
//
// Pass `allowCustom={false}` for fields that must stay on a fixed list (Category).
const SpecSelect = ({
  value,
  onChange,
  options = [],
  placeholder,
  disabled = false,
  allowCustom = true,
  allowClear = true,
  size = "large",
}) => {
  const [search, setSearch] = useState("");
  const typed = (search || "").trim();

  // Grouped options look like [{ label, items: [...] }]. An {id,name}/{value,label}
  // list also has object entries, so we tell them apart by the `items` array.
  const grouped = isGroupedOptions(options) && Array.isArray(options[0].items);

  // Flatten to { value, label } so we can both render and check for duplicates.
  const flat = grouped
    ? options.reduce(
        (acc, g) => acc.concat((g.items || []).map((v) => ({ value: v, label: v }))),
        []
      )
    : (options || []).map((o) =>
        o && typeof o === "object"
          ? { value: o.value != null ? o.value : o.id, label: o.label || o.name }
          : { value: o, label: String(o) }
      );

  const alreadyExists = flat.some(
    (o) =>
      normalizeName(o.label) === normalizeName(typed) ||
      normalizeName(String(o.value)) === normalizeName(typed)
  );
  const canAdd = allowCustom && !!typed && !alreadyExists;

  return (
    <Select
      showSearch
      allowClear={allowClear}
      size={size}
      style={{ width: "100%" }}
      popupClassName="spec-dropdown"
      disabled={disabled}
      placeholder={placeholder}
      value={value || undefined}
      searchValue={search}
      notFoundContent={
        allowCustom ? "Start typing to add your own" : "No matches"
      }
      onSearch={setSearch}
      onBlur={() => setSearch("")}
      onChange={(val) => {
        onChange(val || "");
        setSearch("");
      }}
      filterOption={(input, option) => {
        // Always keep the "+ Add" row visible while the user is typing.
        if (option && option.className === "spec-add-option") return true;
        return String((option && option.children) || "")
          .toLowerCase()
          .includes(input.toLowerCase());
      }}
    >
      {canAdd && (
        <Select.Option key="__add__" value={typed} className="spec-add-option">
          {`+ Add "${typed}"`}
        </Select.Option>
      )}

      {grouped
        ? options.map((grp) => (
            <Select.OptGroup key={grp.label} label={grp.label.toUpperCase()}>
              {(grp.items || []).map((opt) => (
                <Select.Option key={opt} value={opt}>
                  {opt}
                </Select.Option>
              ))}
            </Select.OptGroup>
          ))
        : flat.map((o, i) => (
            <Select.Option key={`${o.value}-${i}`} value={o.value}>
              {o.label}
            </Select.Option>
          ))}
    </Select>
  );
};

export default SpecSelect;
