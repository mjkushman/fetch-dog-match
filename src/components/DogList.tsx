import { Dog } from "@/types/Dog";

import DogCard from "./DogCard";
import { useEffect, useState } from "react";

type DogListProps = {
  dogs: Dog[];

};

export default function DogList({ dogs }: DogListProps) {
  
  const [selectedDogIds, setSelectedDogIds] = useState<Set<string>>(new Set()); // an array of "saved" dog Ids

  const handleSelectId = (id: string) => {
    if (selectedDogIds.has(id)) {
      setSelectedDogIds((prev) => {
        prev.delete(id);
        return new Set(prev);
      });
    } else {
      setSelectedDogIds((prev) => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
    }
  };


  useEffect(() => {
    console.log("selectedDogIds: ", selectedDogIds);
  }, [selectedDogIds]);
  
  useEffect(() => {
    console.log("debugging DogList dogs:", dogs);
  }, [dogs]);

  if (!dogs) return <div>Loading...</div>;
  if (dogs.length == 0) return <div>No dogs found</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {dogs &&
        dogs.map((dog) => (
          <div onClick={() => handleSelectId(dog.id)} key={dog.id}>
            {" "}
            <DogCard dog={dog} />
          </div>
        ))}
    </div>
  );
}
