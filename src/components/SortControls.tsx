import { SortField, SortOrder } from "@/types/Sort";
import { useState } from "react";

type SortControlsProps = {
  sortField: SortField;
  sortOrder: SortOrder;
  handleSortField: (field: SortField) => void;
  handleSortOrder: (order: SortOrder) => void;
};

export default function SortControls({
  handleSortOrder,
  handleSortField,
  sortOrder,
  sortField,
}: SortControlsProps) {
  const onFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const field = e.target.value as SortField;

    handleSortField(field);
  };
  const onSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value as SortOrder;

    handleSortOrder(order);
  };

  return (
    <div>
      <label htmlFor="sortField">Sort By:</label>
      <select id="sortField" value={sortField} onChange={onFieldChange}>
        <option value="breed">Breed</option>
        <option value="name">Name</option>
        <option value="age">Age</option>
      </select>
      <label htmlFor="sortOrder">Order:</label>
      <select id="sortOrder" value={sortOrder} onChange={onSortChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}
