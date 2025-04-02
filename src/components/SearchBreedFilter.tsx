import { useEffect, useState } from "react";
import fetchBreeds from "@/api/fetchBreeds";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type SearchBreedFilterProps = {
  handleBreedSelect: (breeds: string) => void;
};

/** Filters dogs by breed. Get list of breeds by API request to populate Select element */
export default function SearchBreedFilter({
  handleBreedSelect,
}: SearchBreedFilterProps) {
  const [breedOptions, setBreedOptions] = useState<string[]>([]);


  // shadcn combobox state
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  useEffect(() => {
    // get list of breeds
    fetchBreeds().then((res) => {
      setBreedOptions(res);
      // setSelectedBreeds();
    });
  }, []);


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="bg-white border-0 rounded-full h-16 hover:bg-gray-200 text-center" 
      >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[280px] justify-between h-full"
        >
          {value
            ? breedOptions.find((breeds) => breeds === value)
            : "Search for a breed"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-white rounded-4xl py-2 border-0 shadow-xl ">
        <Command>
          <CommandInput placeholder="Search breeds..." />
          <CommandList>
            <CommandEmpty>No breeds found.</CommandEmpty>
            <CommandGroup>
              {breedOptions.map((breed) => (
                <CommandItem
                  key={breed}
                  value={breed}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    handleBreedSelect(currentValue);
                    // console.log("command selected:", currentValue);
                  }}
                  className="hover:bg-gray-100"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === breed ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {breed}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
