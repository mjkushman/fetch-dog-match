import { SearchDogsOptions } from "@/types/SearchDogsOptions";
import { SearchDogsResponse } from "@/types/SearchDogsResponse";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/** GET request that optionally accepts FetchDogsOptions */
const searchDogs = (
  options: SearchDogsOptions = {}
): Promise<SearchDogsResponse[]> => {
  const url = new URL(`${BASE_URL}/dogs/search`);

  // Add query parameters to URL
  Object.keys(options).forEach((key) => {
    const value = options[key as keyof SearchDogsOptions];
    if (value !== undefined) {
      url.searchParams.append(key, String(value));
    }
  });

  return fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export default searchDogs;
