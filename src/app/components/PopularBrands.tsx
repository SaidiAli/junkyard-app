const PopularBrands = () => {
  const brands = [
    { name: "Honda", logo: "/honda.svg" },
    { name: "Nissan", logo: "/nissan.svg" },
    { name: "Toyota", logo: "/toyota.svg" },
    { name: "Audi", logo: "/audi.svg" },
    { name: "Ford", logo: "/ford.svg" },
    { name: "BMW", logo: "/bmw.svg" },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Popular Brands</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="bg-background rounded-lg p-8 flex flex-col items-center justify-center gap-4 hover:shadow-hover transition-all duration-300 cursor-pointer group"
            >
              <div className="w-16 h-16 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
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
