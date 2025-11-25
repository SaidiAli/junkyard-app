import { Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image"

const Footer = () => {
  return (
    <footer className="bg-secondary text-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src="https://res.cloudinary.com/zurri-cloud/image/upload/v1764080623/junkyard/lrmnidwq25bck2xsvhlu.svg"
                alt="Kars"
                width={120}
                height={40}
                className="w-24 lg:w-[180px] h-auto"
              />
            </div>
            <p className="text-muted-foreground">
              Your trusted partner for premium automotive solutions. Find your perfect vehicle with us.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="hover:bg-primary hover:text-primary-foreground">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary hover:text-primary-foreground">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#listings" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Vehicles
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#news" className="text-muted-foreground hover:text-primary transition-colors">
                  News & Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Financing
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-muted-foreground">Kampala, Uganda</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:+11234567890" className="text-muted-foreground hover:text-primary transition-colors">
                  0777 000-000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:info@kars.com" className="text-muted-foreground hover:text-primary transition-colors">
                  info@junkyard.ug
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 text-center text-muted-foreground/70">
          <p>&copy; 2025 JUNKYARD CONCEPTS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
