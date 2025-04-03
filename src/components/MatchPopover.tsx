import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Dog } from "@/types/Dog";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useMatch } from "@/hooks/useMatch";

interface MatchPopoverProps {
  favoriteDogs: Map<string, Dog>;
}

export default function MatchPopover({ favoriteDogs }: MatchPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { match, getMatch, isLoading } = useMatch();


  useEffect(() => {
    if (match) {
      setIsOpen(true); // Open the popover when matchedDog is set
    }
  }, [match]);

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={isLoading || !favoriteDogs.size}
            onClick={() => {
              setIsOpen(false);
              getMatch(favoriteDogs);
            }}
            className="w-full py-4 rounded-lg bg-primary mt-4"
          >
            <p>Get {match ? "New " : ""} Match</p>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full bg-white shadow-lg p-4 rounded-lg">
          {match ? (
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg shadow-xl flex flex-col items-center justify-center animate-fade-in-down w-sm">
              <h2 className="text-2xl font-bold mb-4 animate-pulse">
                We Found a Match!
              </h2>
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
                <img
                  src={match.img}
                  alt={match.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-20"></div>
              </div>
              <p className="text-lg font-semibold">
                Meet <span className="text-yellow-300">{match.name}</span>!
              </p>
              <p className="mt-2 text-sm text-center">
                We think you'll love this dog.
              </p>
            </div>
          ) : (
            <p>Finding your match...</p>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}
