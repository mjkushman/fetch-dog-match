import { Dog } from "@/types/Dog";

import DogCard from "./DogCard";


type DogListProps = {
  dogs: Dog[];
  handleSelectId: (dog:Dog)=> void
};

export default function DogList({ dogs,handleSelectId }: DogListProps) {
  

  

  if (!dogs) return <div>Loading...</div>;
  if (dogs.length == 0) return <div>No dogs found</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {dogs &&
        dogs.map((dog) => (
          <div onClick={() => handleSelectId(dog)} key={dog.id}>
            {" "}
            <DogCard dog={dog} />
          </div>
        ))}
    </div>
  );
}
