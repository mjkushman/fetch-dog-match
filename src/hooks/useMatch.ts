import fetchMatch from "@/api/fetchMatch";

import { Dog } from "@/types/Dog";

import { useState } from "react";

export const useMatch = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [match, setMatch] = useState<Dog | null>(null);

  const getMatch = (dogMap: Map<string, Dog>) => {
    setIsLoading(true);
    fetchMatch([...dogMap.keys()])
      .then(({ match }) => {
        const matchedDog = dogMap.get(match) || null;
        setMatch(matchedDog);
      })
      .catch(() => setMatch(null))
      .finally(() => setIsLoading(false));
  };

  const clearMatch = () => setMatch(null);

  return { match, getMatch, clearMatch, isLoading };
};
