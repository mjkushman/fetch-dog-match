/** Returns an array of all possible breed names.  */
import BASE_URL from "./baseUrl";

const fetchBreeds = async (): Promise<string[]> => {
  const url = new URL("dogs/breeds", BASE_URL);

  const result = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!result.ok) {
    throw new Error("Failed to fetch breeds");
  }
  return await result.json();
};

export default fetchBreeds;
