import { Dog } from "@/types/Dog";
import { MapPin } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DogCard({
  dog,
  selected,
}: {
  dog: Dog;
  selected: boolean;
}) {
  return (
    <Card
      className={`p-0 rounded-t-md border-gray-50 gap-0 m-0 hover:shadow transition-all ${
        selected
          ? "border-2 border-blue-500 bg-blue-100 shadow-inner scale-95"
          : ""
      }`}
    >
      <img
        src={dog.img}
        alt={dog.name}
        className="w-full h-38 object-cover object-center rounded-t-md"
      />
      <CardHeader className="gap-0 p-2">
        <CardDescription className="">{dog.breed}</CardDescription>
        <CardTitle className="text-lg pb-0 mb-0">
          {dog.name}, {dog.age}
        </CardTitle>
      </CardHeader>

      <CardDescription className="px-2 mb-1">
        <div className="flex flex-row-reverse gap-1">
          <p>{dog.zip_code}</p>
          <MapPin className="w-4" />
        </div>
      </CardDescription>
    </Card>
  );
}
