'use client'

import { Car, Menu, Search, User } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Car className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">KARS</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </a>
            <a href="#listings" className="text-foreground hover:text-primary transition-colors font-medium">
              Listings
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </a>
            <a href="#services" className="text-foreground hover:text-primary transition-colors font-medium">
              Services
            </a>
            <a href="#news" className="text-foreground hover:text-primary transition-colors font-medium">
              News
            </a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Button size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            <Button className="hidden md:flex">
              Get Started
            </Button>
            <Button
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 space-y-4">
            <a href="#home" className="block text-foreground hover:text-primary transition-colors font-medium">
              Home
            </a>
            <a href="#listings" className="block text-foreground hover:text-primary transition-colors font-medium">
              Listings
            </a>
            <a href="#about" className="block text-foreground hover:text-primary transition-colors font-medium">
              About
            </a>
            <a href="#services" className="block text-foreground hover:text-primary transition-colors font-medium">
              Services
            </a>
            <a href="#news" className="block text-foreground hover:text-primary transition-colors font-medium">
              News
            </a>
            <Button className="w-full">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
