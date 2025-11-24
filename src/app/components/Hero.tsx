import { ChevronRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-vehicles.jpg";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark text-dark-foreground pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxury vehicles showcase"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/80" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            A World of Choices
            <br />
            <span className="text-primary">All in One Place</span>
          </h1>
          <p className="text-lg md:text-xl text-dark-foreground/80 max-w-2xl mx-auto">
            Discover your perfect vehicle from our extensive collection of premium cars, SUVs, and motorcycles
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg" className="group">
              Browse Vehicles
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="bg-background/10 backdrop-blur-sm border-background/20 text-dark-foreground hover:bg-background/20">
              <Play className="h-4 w-4" />
              Watch Video
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-dark-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-dark-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
