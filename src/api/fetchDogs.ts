import { Dog } from "@/types/Dog";
/** Takes an array of dog IDs, returns an array of Dog objects */
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchDogs = async (dogIds: string[]): Promise<Dog[]> => {
  const url = new URL("dogs", BASE_URL);

  const result = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dogIds),
  });

  if (!result.ok) {
    throw new Error("Failed to fetch dogs");
  }
  return await result.json();
};

export default fetchDogs;
