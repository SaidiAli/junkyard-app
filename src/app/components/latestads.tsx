import VehicleCard from "./VehicleCard";

const LatestAds = () => {
  const vehicles = [
    {
      image: "/imgs/car-white-suv.jpg",
      name: "BMW X7 M Sport",
      price: "UGX 89,990,000",
      year: "2024",
      mileage: "5,420 km",
      fuel: "Hybrid",
      seats: "7 Seats",
    },
    {
      image: "imgs/car-red-1.jpg",
      name: "Mercedes AMG GT",
      price: "UGX 145,000,000",
      year: "2024",
      mileage: "2,100 km",
      fuel: "Petrol",
      seats: "2 Seats",
    },
    {
      image: "/imgs/car-blue.jpg",
      name: "Audi RS6 Avant",
      price: "UGX 125,500,000",
      year: "2023",
      mileage: "8,900 km",
      fuel: "Petrol",
      seats: "5 Seats",
    },
    {
      image: "/imgs/car-silver.jpg",
      name: "Tesla Model S Plaid",
      price: "UGX 112,000,000",
      year: "2024",
      mileage: "1,500 km",
      fuel: "Electric",
      seats: "5 Seats",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Vehicles</h2>
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

export default LatestAds;
