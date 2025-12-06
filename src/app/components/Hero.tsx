import Image from 'next/image';
import SearchForm from './SearchForm';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-[60%] flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/zurri-cloud/image/upload/v1761209098/junkyard/n7lra4eaom7y4m6mqqwf.jpg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content Container */}
      <div className="container m-auto z-10 relative px-4 py-16">
        <div className="flex flex-col items-center justify-center">
          {/* Title Section */}
          <div className="text-center mb-8 lg:mb-12 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-[35px] md:text-[45px] font-bold leading-tight text-white">
              BUY AND SELL CARS IN UGANDA
            </h1>
          </div>

          {/* Search Form */}
          <div className="w-full max-w-7xl">
            <SearchForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
