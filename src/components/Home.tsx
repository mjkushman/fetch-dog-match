import fetchDogs from "@/api/fetchDogs";
import searchDogs from "@/api/searchDogs";
import { SearchDogsOptions } from "@/types/SearchDogsOptions";
import { SortField, SortOrder } from "@/types/Sort";
import React, { useEffect, useState } from "react";
import SearchBreedFilter from "./SearchBreedFilter";
import SortControls from "./SortControls";
import PageControls from "./PageControls";
import DogList from "./DogList";

type Props = {};

export default function Home({}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getInitialDogs = () => {
    setIsLoading(true);
    searchDogs("")
      .then(({ resultIds, next, prev }) => {
        if (next) setNextPageQuery(next);
        if (prev) setPrevPageQuery(prev);
        return fetchDogs(resultIds);
      })
      .then((dogs) => dogs)
      .catch((err) => {
        console.log("error in loadDogs", err);
      })
      .finally(() => setIsLoading(false));
  };

  const [dogs, setDogs] = useState<Dog[] | null>(() => getInitialDogs()); // result from get dogs, for display
  const [nextPageQuery, setNextPageQuery] = useState<string | null>(null);
  const [prevPageQuery, setPrevPageQuery] = useState<string | null>(null);

  const [sortField, setSortField] = useState<SortField>("breed");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const [breedFilter, setBreedFilter] = useState<string>();

  const [options, setOptions] = useState<SearchDogsOptions>({
    sortField: "breed",
    sortOrder: "asc", // defaults to breed, asc
  }); // dog search options, updated by filters

  // Getting breeds should also act to check authentication
  const [breeds, setBreeds] = useState<string[]>([]);
  // async () => await fetchBreeds()

  // const breeds = async () => await fetchBreeds();

  useEffect(() => {
    console.log("breeds", breeds);
  }, [breeds]);

  /** loadDogs combines searchDogs and fetchDogs **/
  const loadDogs = async (query?: string) => {
    setIsLoading(true);
    try {
      const searchResult = await searchDogs(query ?? undefined, options);
      const { resultIds, next, prev } = searchResult;
      if (next) setNextPageQuery(next);
      if (prev) setPrevPageQuery(prev);

      const fetchResult = await fetchDogs([...resultIds]);
      console.log("fetchResult", fetchResult);
      if (!fetchResult) setDogs(null);
      setDogs(fetchResult);
    } catch (error) {
      console.log(error);
      setDogs(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDogs();
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
  const handleBreedSelect = (breed: string) => {
    if (!breed) console.log("selected breed", breed);
  };
  return (
    <>
      <h1>Find Your Best Friend</h1>
      
      <div>{/* FILTER CONTROLS for age min, age max, breeds, zip code */}</div>

      <div>
        {/* Breed Filter control */}
        <SearchBreedFilter
          // breeds={breeds}
          handleBreedSelect={handleBreedSelect}
        />
      </div>
      <div>
        {/* SORT CONTROLS for sorting dogs  */}
        <SortControls
          handleSortOrder={handleSortOrder}
          handleSortField={handleSortField}
          sortField={sortField}
          sortOrder={sortOrder}
        />
      </div>
      {/* Display dogs */}
      <DogList dogs={dogs} />
      {/* Pagination controls */}
      <PageControls
        nextPageQuery={nextPageQuery}
        prevPageQuery={prevPageQuery}
        loadDogs={loadDogs}
      />
    </>
  );
}
