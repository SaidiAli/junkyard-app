import VehicleCard from "./VehicleCard";
import carRed from "@/assets/car-red-1.jpg";
import carWhite from "@/assets/car-white-suv.jpg";
import carBlue from "@/assets/car-blue.jpg";
import carSilver from "@/assets/car-silver.jpg";
import { Button } from "./ui/button";

const RecentVehicles = () => {
  const vehicles = [
    {
      image: carRed,
      name: "Porsche 911 Turbo S",
      price: "$225,000",
      year: "2024",
      mileage: "500 km",
      fuel: "Petrol",
      seats: "4 Seats",
    },
    {
      image: carWhite,
      name: "Range Rover Sport",
      price: "$95,000",
      year: "2024",
      mileage: "3,200 km",
      fuel: "Diesel",
      seats: "5 Seats",
    },
    {
      image: carBlue,
      name: "Lamborghini Huracán",
      price: "$285,000",
      year: "2023",
      mileage: "1,800 km",
      fuel: "Petrol",
      seats: "2 Seats",
    },
    {
      image: carSilver,
      name: "Mercedes S-Class",
      price: "$125,000",
      year: "2024",
      mileage: "2,100 km",
      fuel: "Hybrid",
      seats: "5 Seats",
    },
    {
      image: carWhite,
      name: "Audi Q8 e-tron",
      price: "$88,500",
      year: "2024",
      mileage: "4,500 km",
      fuel: "Electric",
      seats: "5 Seats",
    },
    {
      image: carRed,
      name: "Ferrari F8 Tributo",
      price: "$350,000",
      year: "2023",
      mileage: "900 km",
      fuel: "Petrol",
      seats: "2 Seats",
    },
    {
      image: carBlue,
      name: "BMW M5 Competition",
      price: "$135,000",
      year: "2024",
      mileage: "1,200 km",
      fuel: "Petrol",
      seats: "5 Seats",
    },
    {
      image: carSilver,
      name: "Lexus LS 500h",
      price: "$92,000",
      year: "2024",
      mileage: "5,800 km",
      fuel: "Hybrid",
      seats: "5 Seats",
    },
  ];

  return (
    <section className="py-20 bg-background" id="listings">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Recent Vehicle Items</h2>
            <p className="text-lg text-muted-foreground">
              Latest additions to our premium collection
            </p>
          </div>
          <Button variant="hero" className="hidden md:flex">
            View All Vehicles
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle, index) => (
            <VehicleCard key={index} {...vehicle} />
          ))}
        </div>
        <div className="text-center mt-8 md:hidden">
          <Button variant="hero">View All Vehicles</Button>
        </div>
      </div>
    </section>
  );
};

export default RecentVehicles;
