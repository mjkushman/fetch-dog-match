import { Dog } from "@/types/Dog";

export default function DogCard({ dog }: { dog: Dog }) {
  return (
    <div className="h-auto max-w-xs bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
      <div className="h-64 w-full overflow-hidden">
        <img
          src={dog.img}
          alt={dog.name}
          className="w-full h-full object-cover object-center rounded-t-md"
        />
      </div>
      <div className="p-3">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {dog.name}
        </h5>
        <div className="mb-3 font-normal text-gray-700 text-left py-1 px-2">
          <p>
            <strong>Age: </strong>
            {dog.age}
          </p>
          <p>
            <strong>Breed: </strong>
            {dog.breed}
          </p>
          <p>
            <strong>Zip Code:</strong>
            {dog.zip_code}
          </p>
        </div>
      </div>
    </div>
  );
}
