import { Dog } from "@/types/Dog";

type Props = { matchedDog?: Dog };

export default function MatchedDog({ matchedDog }: Props) {
  return (
    matchedDog && (
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg shadow-xl flex flex-col items-center justify-center animate-fade-in-down w-sm">
        <h2 className="text-2xl font-bold mb-4 animate-pulse">
          We Found a Match!
        </h2>
        <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
          <img
            src={matchedDog.img}
            alt={matchedDog.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-20"></div>
        </div>
        <p className="text-lg font-semibold">
          Meet <span className="text-yellow-300">{matchedDog.name}</span>!
        </p>
        <p className="mt-2 text-sm text-center">
          We think you'll love this dog.
        </p>
      </div>
    )
  );
}
