import { Dog } from "@/types/Dog";

import DogCard from "./DogCard";
import { Skeleton } from "./ui/skeleton";

type DogListProps = {
  dogs: Dog[];
  handleSelectId: (dog: Dog) => void;
  selectedDogs: Map<string, Dog>;
  isLoading: boolean;
};

export default function DogList({
  dogs,
  handleSelectId,
  selectedDogs,
  isLoading,
}: DogListProps) {
  // if (dogs && dogs.length == 0) return <div>No dogs found</div>;

  return (
    <div className="w-full min-h-[300px]">
      {isLoading ? (
        <div className="grid grid-flow-row md:grid-cols-4 xl:grid-cols-6 gap-4 px-6">
          {Array.from({ length: 24 }).map((_, index) => (
            <Skeleton key={index} className="h-52 w-58" />
          ))}
        </div>
      ) : (
        <div className="grid grid-flow-row md:grid-cols-4 xl:grid-cols-6 gap-4 px-6">
          {dogs.map((dog) => {
            const isSelected = selectedDogs.has(dog.id);
            return (
              <div onClick={() => handleSelectId(dog)} key={dog.id}>
                {" "}
                <DogCard dog={dog} selected={isSelected} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
