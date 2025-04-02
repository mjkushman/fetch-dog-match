import { SortField, SortOrder } from "@/types/Sort";
import { ArrowUp, ArrowDown } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type SortControlsProps = {
  handleSortField: (field: SortField) => void;
  handleSortOrder: (order: SortOrder) => void;
};

export default function SortControls({
  handleSortOrder,
  handleSortField,
}: SortControlsProps) {
  const [isAscending, setIsAscending] = useState(true);

  const onFieldChange = (value: SortField) => {
    handleSortField(value);
  };
  const toggleSort = () => {
    setIsAscending((prev) => !prev);
  };

  useEffect(() => {
    if (isAscending) handleSortOrder("asc");
    else handleSortOrder("desc");
  }, [isAscending]);

  return (
    <div className="flex flex-row h-full">
      <Select onValueChange={onFieldChange}>
        <SelectTrigger
          className="w-[180px] min-h-full rounded-full border-0 hover:bg-gray-200 flex items-center"
          name="sortField"
        >
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent className="bg-white rounded-xl">
          <SelectGroup>
            <SelectLabel>Sort by:</SelectLabel>
            <SelectItem value="breed">Breed</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="age">Age</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button
        onClick={toggleSort}
        variant="outline"
        className="flex items-center gap-2 h-full rounded-full border-0 hover:bg-gray-200"
      >
        {isAscending ? "Asc" : "Desc"}
        {isAscending ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
      </Button>
    </div>
  );
}
