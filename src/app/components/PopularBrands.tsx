const PopularBrands = () => {
  const brands = [
    { name: "Honda", logo: "H" },
    { name: "Nissan", logo: "N" },
    { name: "Toyota", logo: "T" },
    { name: "Audi", logo: "A" },
    { name: "Tesla", logo: "T" },
    { name: "BMW", logo: "B" },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Popular Brands</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="bg-background rounded-lg p-8 flex flex-col items-center justify-center gap-4 hover:shadow-hover transition-all duration-300 cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-3xl font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                {brand.logo}
              </div>
              <p className="font-semibold text-center">{brand.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBrands;
