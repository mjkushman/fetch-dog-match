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
    <h2>Favorites</h2>
    <div className="flex flex-row flex-wrap gap-2">
      {favoriteDogs.map((dog) => (
        <div
          key={dog.id}
          className=""
        >
          <img
            src={dog.img}
            alt={dog.name}
            className="w-18 h-18 object-cover rounded-full mb-1 border border-gray-300"
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
