import { Dog } from "@/types/Dog";
import React from "react";
import DogCard from "./DogCard";

type DogListProps = {
  dogs: Dog[] | null;
};

export default function DogList({ dogs }: DogListProps) {
  return dogs ? (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {dogs && dogs.map((dog) => <DogCard key={dog.id} dog={dog} />)}
    </div>
  ) : (
    "No dogs found"
  );
}
