import { Dog } from "@/types/Dog";
import { Button } from "./ui/button";

type Props = {
  favoriteDogs: Dog[];
  removeFromFavorites: (dog: Dog) => void;
};

export default function Favorites({
  favoriteDogs,
  removeFromFavorites,
}: Props) {
  return (
    <div
      className="flex flex-wrap min-w-lg justify-evenly transition-all duration-300"
      style={{
        transition: "max-height 0.3s ease-in-out",
        maxHeight: favoriteDogs.length > 0 ? "500px" : "3.5em",
      }}
    >
      <h2 className="text-center my-4">Add your favorites to get a match</h2>
      <div className="flex flex-wrap min-w-lg justify-evenly transition-all duration-300">
        {favoriteDogs.map((dog) => (
          <div key={dog.id} className="flex flex-col justify-center">
            <img
              src={dog.img}
              alt={dog.name}
              className="w-12 h-12 object-cover rounded-full mb-1 border border-gray-300"
            />
            <div className="flex flex-col items-center">
              <p className="font-semibold text-xs">{dog.name}</p>
              <Button
                variant={"link"}
                onClick={() => removeFromFavorites(dog)}
                className="text-red-500 hover:text-red-700 text-xs m-0 p-0 leading-none"
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
