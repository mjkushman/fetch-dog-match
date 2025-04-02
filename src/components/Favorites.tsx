import { Dog } from "@/types/Dog";

type Props = {
  favoriteDogs: Dog[];
  removeFromFavorites: (dog: Dog) => void;
};

export default function Favorites({
  favoriteDogs,
  removeFromFavorites,
}: Props) {
  return (
    <div>
      <h2>Add your favorites to get a match</h2>
      <div className="flex flex-wrap min-w-lg justify-evenly">
        {favoriteDogs.map((dog) => (
          <div key={dog.id} className="">
            <img
              src={dog.img}
              alt={dog.name}
              className="w-12 h-12 object-cover rounded-full mb-1 border border-gray-300"
            />
            <div className="flex flex-col items-center">
              <p className="font-semibold text-xs truncate">{dog.name}</p>
              <button
                onClick={() => removeFromFavorites(dog)}
                className="text-red-500 hover:text-red-700 text-xs p-1"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
