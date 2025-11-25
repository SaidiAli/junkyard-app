'use client'

import { Menu } from "lucide-react";
import Image from 'next/image';
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
} from "./ui/sheet";

const navItems = [
  { label: 'Sunday Bazaar', href: '/sunday-bazaar' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Sell Your Car', href: '/sell-your-car' },
  { label: 'Login', href: '/login' },
  { label: 'Register', href: '/register' }
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around h-22">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="https://res.cloudinary.com/zurri-cloud/image/upload/v1764080623/junkyard/lrmnidwq25bck2xsvhlu.svg"
              alt="Kars"
              width={120}
              height={40}
              className="w-24 lg:w-[180px] h-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) =>
            (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground hover:text-primary text-xl transition-colors font-medium"
              >
                {item.label}
              </a>
            )
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center">
            <Button
              size="icon"
              variant="ghost"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Sheet */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="left" className="w-3/4 sm:max-w-sm">
          <SheetHeader className="mb-8">
            <Image
              src="/imgs/logo.svg"
              alt="Kars"
              width={120}
              height={40}
              className="w-[120px] h-auto"
            />
          </SheetHeader>
          <nav className="space-y-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-foreground hover:text-primary transition-colors font-medium text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
