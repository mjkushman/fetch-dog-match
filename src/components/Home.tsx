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
import Hero from "@/components/Hero";
import { Button } from "./ui/button";

export default function Home() {
  const maxFavorites = 7;
  const { dogs, getDogs, isLoading, nextPageQuery, prevPageQuery } = useDogs();

  const [selectedDogs, setSelectedDogs] = useState<Map<string, Dog>>(new Map()); // an array of "saved" dog Ids

  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
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
      console.log("selected breed", breed);
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

  const getMatch = () => {
    if (!selectedDogs.size) return; // do nothing
    setMatchedDog(null);
    fetchMatch([...selectedDogs.keys()]).then(({ match }) => {
      const dog = selectedDogs.get(match) || null;
      setMatchedDog(dog);
    });
  };


  return (
    <>
      <div className="fixed top-0 w-full z-10">
        <Hero>
          <div className="flex mx-auto h-16 bg-white items-center rounded-l-full  rounded-r-full shadow-2xl border-stone-200 border-1">
            {/* Breed Filter control */}
            <SearchBreedFilter handleBreedSelect={handleBreedSelect} />
            {/* SORT CONTROLS for sorting dogs  */}
            <SortControls
              handleSortOrder={handleSortOrder}
              handleSortField={handleSortField}
            />
          </div>
        </Hero>
      </div>

      <div className="relative main w-full mx-auto flex flex-col items-center mt-32">
        <div>
          {/* FILTER CONTROLS for age min, age max, breeds, zip code */}
        </div>

        <div className="flex flex-row items-center-auto">
          {/*  Favotites and Match section */}
          <div className="sticky top-4 self-start p-4 w-full bg-white shadow-lg rounded-xl border my-2 max-w-xl">

            <Favorites
              favoriteDogs={[...selectedDogs.values()]}
              removeFromFavorites={removeFromFavorites}
            />
            <Button
              disabled={selectedDogs.size === 0}
              onClick={getMatch}
              className="w-full py-4 rounded-lg bg-primary mt-4"
            >
              <p>Get {matchedDog ? "New " : ""} Recommendation</p>
            </Button>
          </div>
          <div className="flex flex-col m-2">
            <MatchedDog matchedDog={matchedDog} />

          </div>
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
    </>
  );
}
