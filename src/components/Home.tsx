import { SearchDogsOptions } from "@/types/SearchDogsOptions";
import { SortField, SortOrder } from "@/types/Sort";
import { useEffect, useState } from "react";
import SearchBreedFilter from "./SearchBreedFilter";
import SortControls from "./SortControls";
import PageControls from "./PageControls";
import DogList from "./DogList";

import Loading from "./Loading";
import { useDogs } from "@/hooks/useDogs";
import { Dog } from "@/types/Dog";

import Favorites from "./Favorites";
import MatchedDog from "@/components/MatchedDog";
import fetchMatch from "@/api/fetchMatch";

export default function Home() {
  const maxFavorites = 5;
  const { dogs, getDogs, isLoading, nextPageQuery, prevPageQuery } = useDogs();

  const [sortField, setSortField] = useState<SortField>("breed");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const [selectedDogs, setSelectedDogs] = useState<Map<string, Dog>>(new Map()); // an array of "saved" dog Ids

  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [options, setOptions] = useState<SearchDogsOptions>({
    sortField: "breed",
    sortOrder: "asc", // defaults to breed, asc
  }); // dog search options, updated by filters

  useEffect(() => {
    getDogs("", options);
  }, [options]);

  const handleSortOrder = (order: SortOrder) => {
    setSortOrder(order);
    setOptions((prev) => ({ ...prev, sortOrder: order }));
  };
  const handleSortField = (field: SortField) => {
    setSortField(field);
    setOptions((prev) => ({ ...prev, sortField: field }));
  };
  // temp function
  const handleBreedSelect = (breeds: string[]) => {
    if (breeds.length > 0) {
      console.log("selected breeds", breeds);
      setOptions((prev) => ({ ...prev, breeds: breeds }));
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

  const getMatch = () => {
    if (!selectedDogs.size) return; // do nothing
    fetchMatch([...selectedDogs.keys()]).then(({ match }) => {
      const dog = selectedDogs.get(match) || null;
      setMatchedDog(dog);
    });
  };

  useEffect(() => {
    console.log("debugging matchedDog:", matchedDog);
  }, [matchedDog]);

  return (
    <div className="w-full mx-auto flex flex-col items-center">
      <div className="h-32 mt-32 w-full bg-yellow-100 flex">
        <h1 className="p-auto m-auto">Find Your Best Friend</h1>
      </div>

      <div>{/* FILTER CONTROLS for age min, age max, breeds, zip code */}</div>

      <div className="flex flex-row">
        <div>
          <h3>Select up to 5 dogs to receive a recommentation</h3>

          <Favorites
            favoriteDogs={[...selectedDogs.values()]}
            removeFromFavorites={removeFromFavorites}
          />
        </div>
        <div className="flex flex-col m-2">
          TODO: Add logic to show or hide this section
          <button disabled={selectedDogs.size === 0} onClick={getMatch}>
            Get Recommendation
          </button>
          <MatchedDog matchedDog={matchedDog} />
        </div>
      </div>
      <div className="flex mx-auto justify-center h-32 bg-blue-100 items-center rounded-sm mt-8 mb-4 text-xl">
        {/* Breed Filter control */}
        <SearchBreedFilter handleBreedSelect={handleBreedSelect} />
        {/* SORT CONTROLS for sorting dogs  */}
        <SortControls
          handleSortOrder={handleSortOrder}
          handleSortField={handleSortField}
          sortField={sortField}
          sortOrder={sortOrder}
        />
      </div>

      {/* Display dogs */}
      <div className="block">
        {isLoading ? (
          <Loading />
        ) : (
          <DogList dogs={dogs} handleSelectId={handleSelectId} />
        )}
      </div>
      {/* Pagination controls */}
      <PageControls
        nextPageQuery={nextPageQuery}
        prevPageQuery={prevPageQuery}
        getDogs={getDogs}
      />
    </div>
  );
}
