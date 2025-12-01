import VehicleCard from "./VehicleCard";
import carRed from "@/assets/car-red-1.jpg";
import carWhite from "@/assets/car-white-suv.jpg";
import carBlue from "@/assets/car-blue.jpg";
import carSilver from "@/assets/car-silver.jpg";
import { Button } from "./ui/button";
import Link from "next/link";

const PremiumAds = () => {
  const vehicles = [
    {
      image: "/imgs/car-red-1.jpg",
      name: "Porsche 911 Turbo S",
      price: "UGX 30,225,000",
      year: "2024",
      mileage: "500 km",
      fuel: "Petrol",
      seats: "4 Seats",
    },
    {
      image: "/imgs/car-white-suv.jpg",
      name: "Range Rover Sport",
      price: "UGX 95,000,000",
      year: "2024",
      mileage: "3,200 km",
      fuel: "Diesel",
      seats: "5 Seats",
    },
    {
      image: "/imgs/car-blue.jpg",
      name: "Lamborghini Huracán",
      price: "UGCX 285,000,000",
      year: "2023",
      mileage: "1,800 km",
      fuel: "Petrol",
      seats: "2 Seats",
    },
    {
      image: "/imgs/car-silver.jpg",
      name: "Mercedes S-Class",
      price: "UGX 125,000,000",
      year: "2024",
      mileage: "2,100 km",
      fuel: "Hybrid",
      seats: "5 Seats",
    },
    {
      image: "/imgs/car-white-suv.jpg",
      name: "Audi Q8 e-tron",
      price: "UGX 88,500,000",
      year: "2024",
      mileage: "4,500 km",
      fuel: "Electric",
      seats: "5 Seats",
    },
    {
      image: "/imgs/car-red-1.jpg",
      name: "Ferrari F8 Tributo",
      price: "UGX 350,000,000",
      year: "2023",
      mileage: "900 km",
      fuel: "Petrol",
      seats: "2 Seats",
    },
    {
      image: "/imgs/car-blue.jpg",
      name: "BMW M5 Competition",
      price: "UGX 135,000,000",
      year: "2024",
      mileage: "1,200 km",
      fuel: "Petrol",
      seats: "5 Seats",
    },
    {
      image: "/imgs/car-silver.jpg",
      name: "Lexus LS 500h",
      price: "UGX 92,000,000",
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Premium ADS</h2>
          </div>
          <Link href="/shop">
            <Button variant="hero" className="hidden md:flex cursor">
              View All
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle, index) => (
            <VehicleCard key={index} {...vehicle} />
          ))}
        </div>
        <div className="text-center mt-8 md:hidden">
          <Button variant="hero">View All</Button>
        </div>
      </div>
    </section>
  );
};

export default PremiumAds;
