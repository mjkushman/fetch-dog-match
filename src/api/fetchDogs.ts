import { FetchDogsOptions } from "@/types/FetchDogsOptions";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/** GET request that optionally accepts FetchDogsOptions */
const fetchDogs = async (options: FetchDogsOptions = {}) => {
  const url = new URL(`${BASE_URL}/dogs/search`);

  // Add query parameters to URL
  Object.keys(options).forEach((key) => {
    const value = options[key as keyof FetchDogsOptions];
    if (value !== undefined) {
      url.searchParams.append(key, String(value));
    }
  });

  await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export default fetchDogs;