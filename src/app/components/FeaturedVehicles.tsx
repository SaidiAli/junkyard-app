import VehicleCard from "./VehicleCard";
import carRed from "@/assets/car-red-1.jpg";
import carWhite from "@/assets/car-white-suv.jpg";
import carBlue from "@/assets/car-blue.jpg";
import carSilver from "@/assets/car-silver.jpg";

const FeaturedVehicles = () => {
  const vehicles = [
    {
      image: carWhite,
      name: "BMW X7 M Sport",
      price: "$89,990",
      year: "2024",
      mileage: "5,420 km",
      fuel: "Hybrid",
      seats: "7 Seats",
    },
    {
      image: carRed,
      name: "Mercedes AMG GT",
      price: "$145,000",
      year: "2024",
      mileage: "2,100 km",
      fuel: "Petrol",
      seats: "2 Seats",
    },
    {
      image: carBlue,
      name: "Audi RS6 Avant",
      price: "$125,500",
      year: "2023",
      mileage: "8,900 km",
      fuel: "Petrol",
      seats: "5 Seats",
    },
    {
      image: carSilver,
      name: "Tesla Model S Plaid",
      price: "$112,000",
      year: "2024",
      mileage: "1,500 km",
      fuel: "Electric",
      seats: "5 Seats",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Vehicles</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our handpicked collection of premium vehicles
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle, index) => (
            <VehicleCard key={index} {...vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
