import { Twitter, Instagram } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image"

const Footer = () => {
  return (
    <footer className="bg-secondary/30 text-foreground border-t border-border/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          {/* Brand */}
          <div className="flex-shrink-0">
            <Image
              src="https://res.cloudinary.com/zurri-cloud/image/upload/v1764080623/junkyard/lrmnidwq25bck2xsvhlu.svg"
              alt="Junkyard Concepts"
              width={140}
              height={40}
              className="w-32 md:w-40 h-auto"
              priority
            />
          </div>

          {/* Contact & Socials */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <a
              href="tel:+11234567890"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              0777 000-000
            </a>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-16 w-16 hover:bg-primary/10 hover:text-primary transition-colors">
                <Twitter className="h-16 w-16" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-16 w-16 hover:bg-primary/10 hover:text-primary transition-colors">
                <Instagram className="h-16 w-16" />
                <span className="sr-only">Instagram</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} JUNKYARD CONCEPTS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
