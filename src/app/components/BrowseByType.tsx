import Link from "next/link";
import { Button } from "./ui/button";

const BrowseByType = () => {
  const types = [
    { name: "Sedan", path: "sedan", image: "https://res.cloudinary.com/zurri-cloud/image/upload/v1765110018/junkyard/v2w1dp6sm3qqskor31hd.jpg" },
    { name: "SUV", path: "suv", image: "https://res.cloudinary.com/zurri-cloud/image/upload/v1765110018/junkyard/q6p1xs4p9foohscsuqqk.jpg" },
    { name: "Mini Bus", path: "mini-truck", image: "https://res.cloudinary.com/zurri-cloud/image/upload/v1765110018/junkyard/ejtv90spyaj5ax8n60nh.jpg" },
    { name: "Pickup", path: "pickup", image: "https://res.cloudinary.com/zurri-cloud/image/upload/v1765110018/junkyard/m1efwmyutxv41lhptld2.jpg" },
  ];

  return (
    <section className="py-20 bg-muted text-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Browse by Category</h2>
            <p className="text-lg text-muted-foreground">
              Find your perfect vehicle by category
            </p>
          </div>
          <div className="hidden md:flex gap-4">
            <Link href="/shop">
              <Button className="text-white">
                View All
              </Button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {types.map((type, index) => (
            <a href={`/shop?category=${type.path}`}>
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg aspect-[3/4] cursor-pointer"
              >
                <img
                  src={type.image}
                  alt={type.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold mb-2 text-white">{type.name}</h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByType;
