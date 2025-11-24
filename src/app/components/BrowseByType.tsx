import { Button } from "./ui/button";

const BrowseByType = () => {
  const types = [
    { name: "Sedan", count: "2,890 Vehicles", image: "/imgs/car-silver.jpg" },
    { name: "SUV", count: "1,756 Vehicles", image: "/imgs/car-white-suv.jpg" },
    { name: "Sports Car", count: "943 Vehicles", image: "/imgs/car-red-1.jpg" },
    { name: "Electric", count: "1,234 Vehicles", image: "imgs/car-blue.jpg" },
  ];

  return (
    <section className="py-20 bg-dark text-dark-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Browse by Listing Type</h2>
            <p className="text-lg text-dark-foreground/80">
              Find your perfect vehicle by category
            </p>
          </div>
          <div className="hidden md:flex gap-4">
            <Button className="bg-background/10 border-background/20 text-dark-foreground hover:bg-background/20">
              View All
            </Button>
            <Button>Sell Your Car</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {types.map((type, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg aspect-[3/4] cursor-pointer"
            >
              <img
                src={type.image}
                alt={type.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold mb-2">{type.name}</h3>
                <p className="text-dark-foreground/80">{type.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByType;
