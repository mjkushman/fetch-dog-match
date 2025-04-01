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

export default function Home() {
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  // const getInitialDogs = () => {
  //   // setIsLoading(true);
  //   return searchDogs("")
  //     .then(({ resultIds, next, prev }) => {
  //       if (next) setNextPageQuery(next);
  //       if (prev) setPrevPageQuery(prev);
  //       return fetchDogs(resultIds);
  //     })
  //     .then((dogs) => dogs)
  //     .catch((err) => {
  //       console.log("error in loadDogs", err);
  //       return [] as Dog[];
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  // const [dogs, setDogs] = useState<Promise<Dog[]>>(() =>
  //   getInitialDogs()
  // ); // result from get dogs, for display

  const { dogs, getDogs, isLoading, nextPageQuery, prevPageQuery } = useDogs();

  const [sortField, setSortField] = useState<SortField>("breed");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");


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



  

  return (
    <div>
      <h1>Find Your Best Friend</h1>

      <div>{/* FILTER CONTROLS for age min, age max, breeds, zip code */}</div>

      <div></div>
      <div className="flex mx-auto justify-center">
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
          <DogList dogs={dogs}  />
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
