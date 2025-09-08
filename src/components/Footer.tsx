import { Heart, Github, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

/**
 * Footer Component - Site footer with links and company info
 * Features: Social links, contact info, copyright
 */
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary/5 to-secondary/5 border-t mt-auto">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Mobile Layout */}
        <div className="block sm:hidden space-y-6">
          {/* Company Info */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-sm">🧸</span>
              </div>
              <h3 className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ToyBox Market
              </h3>
            </div>
            <p className="text-muted-foreground text-sm px-4">
              Bringing joy to children worldwide with quality toys!
            </p>
          </div>

          {/* Quick Access Links */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Quick Links</h4>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div><a href="#" className="hover:text-primary transition-colors">About</a></div>
                <div><a href="#" className="hover:text-primary transition-colors">Categories</a></div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Support</h4>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div><a href="#" className="hover:text-primary transition-colors">FAQ</a></div>
                <div><a href="#" className="hover:text-primary transition-colors">Contact</a></div>
              </div>
            </div>
          </div>

          {/* Contact Info - Compact */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Phone className="w-3 h-3" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Mail className="w-3 h-3" />
              <span>info@toyboxmarket.com</span>
            </div>
          </div>

          {/* Social & Copyright */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2024 ToyBox Market. Made with <Heart className="w-3 h-3 inline text-red-500" /> for children.
            </p>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🧸</span>
                </div>
                <h3 className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ToyBox Market
                </h3>
              </div>
              <p className="text-muted-foreground text-sm">
                The ultimate destination for amazing toys and endless fun!
                Bringing joy to children worldwide with quality products.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Categories</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Special Offers</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="space-y-4">
              <h4 className="font-semibold">Customer Service</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="font-semibold">Contact</h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@toyboxmarket.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>123 Toy Street, Fun City</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>123 Toy Street, Fun City</span>
          <Separator className="my-6" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 ToyBox Market. Made with <Heart className="w-4 h-4 inline text-red-500" /> for children everywhere.
            </p>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;