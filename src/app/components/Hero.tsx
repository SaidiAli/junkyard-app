import Image from 'next/image';
import SearchForm from './SearchForm';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/imgs/hero_bg_5_1.jpg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 z-10 relative pb-32 lg:pb-48">
        <div className="flex flex-col items-center justify-center">
          {/* Title Section */}
          <div className="text-center mb-8 lg:mb-12 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-[38px] md:text-[50px] lg:text-[55px] xl:text-[74px] font-bold leading-tight text-white">
              A World of Choices{' '}
              <span className="block text-[32px] md:text-[38px] lg:text-[45px] xl:text-[64px] font-normal mt-2">
                All in One Place
              </span>
            </h1>
          </div>

          {/* Search Form */}
          <div className="w-full max-w-7xl">
            <SearchForm />
          </div>
        </div>
      </div>

      {/* Overlapping Car Image at Bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 w-full max-w-6xl pointer-events-none -mb-16 md:-mb-24 lg:-mb-32">
        <Image
          src="/imgs/hero_5_1.png"
          alt="Featured car"
          width={1200}
          height={400}
          className="w-full h-auto"
        />
      </div>
    </section>
  );
};

export default Hero;
