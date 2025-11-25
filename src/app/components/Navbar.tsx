'use client'

import { Menu } from "lucide-react";
import Image from 'next/image';
import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
} from "./ui/sheet";

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Dealership', href: '#dealership' },
  { label: 'Inventory', href: '#inventory' },
  {
    label: 'Pages',
    href: '#pages',
    hasDropdown: true,
    dropdownItems: [{ label: 'Shop', href: '#shop' }]
  },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact Us', href: '#contact' }
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/imgs/logo.svg"
              alt="Kars"
              width={120}
              height={40}
              className="w-24 lg:w-[120px] h-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) =>
              item.hasDropdown ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger className="text-foreground hover:text-primary transition-colors font-medium outline-none">
                    {item.label}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {item.dropdownItems?.map((subItem) => (
                      <DropdownMenuItem key={subItem.label}>
                        <a href={subItem.href} className="w-full">
                          {subItem.label}
                        </a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors font-medium"
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
