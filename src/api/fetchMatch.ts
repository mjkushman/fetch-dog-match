/** POST , returns a single ID from list of provided ids */

import { Match } from "@/types/Match";
/** Takes an array of dog IDs, returns an array of Dog objects */
import BASE_URL from "./baseUrl";

const fetchMatch = async (dogIds: string[]): Promise<Match> => {
  const url = new URL("dogs/match", BASE_URL);

  const result = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dogIds),
  });

  if (!result.ok) {
    throw new Error("Failed to fetch match");
  }
  return await result.json();
};

export default fetchMatch;