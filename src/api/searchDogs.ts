import { SearchDogsOptions } from "@/types/SearchDogsOptions";
import { SearchDogsResponse } from "@/types/SearchDogsResponse";

import BASE_URL from "./baseUrl";

// const defaultOptions = { size: 24, ageMin: 9 };

/** GET request that optionally accepts FetchDogsOptions */
const searchDogs = async (
  path: string | undefined,
  options?: SearchDogsOptions
): Promise<SearchDogsResponse> => {
  const url = new URL(path || `dogs/search`, BASE_URL);

  if (!path) {
    // Add query parameters to URL if a path wasn't supplied
    if(options){
      Object.keys(options).forEach((key) => {
        const value = options[key as keyof SearchDogsOptions];
        if (value !== undefined && key !== "sortOrder" && key !== "sortField") {
          url.searchParams.set(key, String(value));
        }
      });

      if(options.sortField && options.sortOrder) {
        url.searchParams.set("sort", `${options.sortField}:${options.sortOrder}`);
      }
    }
    url.searchParams.set("size", "24"); // force size
    // handle sorting specifically
  }

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export default searchDogs;
