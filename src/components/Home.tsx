import { SearchDogsOptions } from "@/types/SearchDogsOptions";
import { SortField, SortOrder } from "@/types/Sort";
import { useEffect, useState } from "react";
import SearchBreedFilter from "./SearchBreedFilter";
import SortControls from "./SortControls";
import PageControls from "./PageControls";
import DogList from "./DogList";

import { useDogs } from "@/hooks/useDogs";
import { Dog } from "@/types/Dog";

import Favorites from "./Favorites";
import MatchPopover from "@/components/MatchPopover";

import Hero from "@/components/Hero";

export default function Home() {
  const maxFavorites = 7;
  const { dogs, getDogs, isLoading, nextPageQuery, prevPageQuery } = useDogs();

  const [selectedDogs, setSelectedDogs] = useState<Map<string, Dog>>(new Map()); // an array of "saved" dog Ids

  const [options, setOptions] = useState<SearchDogsOptions>({
    sortField: "breed",
    sortOrder: "asc", // defaults to breed, asc
  });

  useEffect(() => {
    getDogs("", options);
  }, [options]);

  const handleSortOrder = (order: SortOrder) => {
    setOptions((prev) => ({ ...prev, sortOrder: order }));
  };
  const handleSortField = (field: SortField) => {
    setOptions((prev) => ({ ...prev, sortField: field }));
  };

  const handleBreedSelect = (breed: string) => {
    if (breed !== "") {
      setOptions((prev) => ({ ...prev, breeds: [breed] }));
    }
  };

  const handleSelectId = (dog: Dog) => {
    if (selectedDogs.has(dog.id)) {
      setSelectedDogs((prev) => {
        prev.delete(dog.id);
        return new Map(prev);
      });
    } else {
      if (selectedDogs.size < maxFavorites)
        setSelectedDogs((prev) => {
          const next = new Map(prev);
          next.set(dog.id, dog);
          return next;
        });
    }
  };

  const removeFromFavorites = (dog: Dog) => {
    setSelectedDogs((prev) => {
      prev.delete(dog.id);
      return new Map(prev);
    });
  };

  return (
    <>
      <div className="fixed top-0 w-full z-10">
        <Hero>
          <div className="flex mx-auto h-16 bg-white items-center rounded-l-full  rounded-r-full shadow-2xl border-stone-200 border-1">
            {/* Breed and Sort controls */}
            <SearchBreedFilter handleBreedSelect={handleBreedSelect} />
            <SortControls
              handleSortOrder={handleSortOrder}
              handleSortField={handleSortField}
            />
          </div>
        </Hero>
      </div>

      <div className="relative w-full flex flex-col items-center mt-32">
        <div className="flex flex-row">
          {/*  Favotites and Match section */}
          <div className="sticky top-4 self-start p-4 w-full bg-white shadow-lg rounded-xl border my-2 max-w-xl">
            <Favorites
              favoriteDogs={[...selectedDogs.values()]}
              removeFromFavorites={removeFromFavorites}
            />
            <div hidden={selectedDogs.size == 0}>
              <MatchPopover favoriteDogs={selectedDogs} />
            </div>
          </div>
        </div>

        {/* Display dogs */}
        <div>
          <DogList
            dogs={dogs}
            handleSelectId={handleSelectId}
            selectedDogs={selectedDogs}
            isLoading={isLoading}
          />
        </div>
        {/* Pagination controls */}
        <PageControls
          nextPageQuery={nextPageQuery}
          prevPageQuery={prevPageQuery}
          getDogs={getDogs}
        />
      </div>
    </>
  );
}
