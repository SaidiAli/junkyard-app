import { Heart, Gauge, Fuel, Users } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";

interface VehicleCardProps {
  image: string;
  name: string;
  price: string;
  year?: string;
  mileage?: string;
  fuel?: string;
  seats?: string;
}

const VehicleCard = ({ image, name, price, year, mileage, fuel, seats }: VehicleCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-hover transition-all duration-300 border-border">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <Heart className="h-5 w-5" />
        {year && (
          <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
            {year}
          </div>
        )}
      </div>
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold mb-2">{name}</h3>
          <p className="text-2xl font-bold text-primary">{price}</p>
        </div>
        {(mileage || fuel || seats) && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {mileage && (
              <div className="flex items-center gap-1">
                <Gauge className="h-4 w-4" />
                <span>{mileage}</span>
              </div>
            )}
            {fuel && (
              <div className="flex items-center gap-1">
                <Fuel className="h-4 w-4" />
                <span>{fuel}</span>
              </div>
            )}
            {seats && (
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{seats}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0 gap-2">
        <Button className="flex-1">
          View Details
        </Button>
        <Button className="flex-1">
          Test Drive
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VehicleCard;
