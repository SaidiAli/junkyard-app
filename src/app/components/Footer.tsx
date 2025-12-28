import { Button } from "./ui/button";

import { Icon } from "@iconify/react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-foreground border-t border-border/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          {/* Brand */}
          <div className="flex-shrink-0">
            <img
              src="https://res.cloudinary.com/zurri-cloud/image/upload/v1764080623/junkyard/lrmnidwq25bck2xsvhlu.svg"
              alt="Junkyard Concepts"
              width={140}
              height={40}
              className="w-32 md:w-40 h-auto"
            />
          </div>

          {/* Contact & Socials */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div className="flex flex-col items-center gap-2">
              <p className="text-xl font-bold text-muted-foreground">Contact</p>
              <a
                href="tel:+256785050941"
                className="text-xl font-bold text-muted-foreground hover:text-primary transition-colors"
              >
                0785 050941
              </a>
            </div>

            <div className="flex flex-col items-center gap-2">
              <p className="text-xl font-bold text-muted-foreground">Our Socials</p>
              <div className="flex items-center gap-2">
                <a href="https://twitter.com/junkyard256" target="_blank" className="flex items-center justify-center h-16 w-16 rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                  <Icon icon="line-md:twitter-x" className="h-8 w-8" />
                </a>
                <a href="https://instagram.com/junkyard256" target="_blank" className="flex items-center justify-center h-16 w-16 rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                  <Icon icon="line-md:instagram" className="h-8 w-8" />
                </a>
                <a href="https://www.snapchat.com/add/junkyard256?share_id=VSsyBEwycGA&locale=en-GB" target="_blank" className="flex items-center justify-center h-16 w-16 rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                  <Icon icon="fa:snapchat-square" className="h-8 w-8" />
                </a>
                <a href="https://tiktok.com/@junkyard256" target="_blank" className="flex items-center justify-center h-16 w-16 rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                  <Icon icon="line-md:tiktok" className="h-8 w-8" />
                </a>
              </div>
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
