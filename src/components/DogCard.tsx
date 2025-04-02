import { Dog } from "@/types/Dog";
import { MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DogCard({ dog }: { dog: Dog }) {
  return (
    <>
      <Card className="pt-0 m-2 rounded-t-md border-gray-50 gap-2 mx-0">
        <img
          src={dog.img}
          alt={dog.name}
          className="w-full h-38 object-cover object-center rounded-t-md"
        />
        <CardHeader className="gap-1">
          <CardTitle className="text-lg">
            {dog.name}, {dog.age}
          </CardTitle>
          <CardDescription>{dog.breed}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-4">
            <MapPin />
            <p>{dog.zip_code}</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
