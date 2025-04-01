import fetchDogs from "@/api/fetchDogs";
import searchDogs from "@/api/searchDogs";
import { Dog } from "@/types/Dog";
import { SearchDogsOptions } from "@/types/SearchDogsOptions";
import { useEffect, useState } from "react";

export const useDogs = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nextPageQuery, setNextPageQuery] = useState<string | null>(null);
  const [prevPageQuery, setPrevPageQuery] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const [options, setOptions] = useState<SearchDogsOptions>({
    sortField: "breed",
    sortOrder: "asc", // defaults to breed, asc
  });

  const [dogs, setDogs] = useState<Dog[]>([]);

  useEffect(() => {
    setIsLoading(true);
    searchDogs(query, options)
      .then(({ resultIds, next, prev }) => {
        if (next) setNextPageQuery(next);
        if (prev) setPrevPageQuery(prev);
        return fetchDogs(resultIds);
      })
      .then((dogs) => setDogs(dogs))
      .catch((err) => {
        console.log("error in loadDogs", err);
        setDogs([] as Dog[]);
        setNextPageQuery(null);
        setPrevPageQuery(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [options, query]);

  const getDogs = (query: string, options?: SearchDogsOptions) => {
    setQuery(query);
    if(options) setOptions(options);
  };

  

  return { dogs, getDogs, isLoading, nextPageQuery, prevPageQuery };
};
