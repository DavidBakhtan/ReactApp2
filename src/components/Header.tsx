import { Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CartDrawer from "@/components/CartDrawer";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  cartCount: number;
  onAdminClick: () => void;
  cartItems?: any[];
  onUpdateCartQuantity?: (id: number, quantity: number) => void;
  onRemoveFromCart?: (id: number) => void;
}

/**
 * Header Component - Top navigation with logo, search, and cart
 * Features: Search functionality, cart count display, admin access
 */
const Header = ({ searchTerm, onSearchChange, cartCount, onAdminClick, cartItems = [], onUpdateCartQuantity, onRemoveFromCart }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b shadow-sm">
      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
        {/* Mobile Layout */}
        <div className="block sm:hidden">
          {/* Top Row - Logo and Actions */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-sm">🧸</span>
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ToyBox
              </h1>
            </div>

            <div className="flex items-center gap-1">
              {/* Cart Button */}
              <CartDrawer
                cartItems={cartItems}
                onUpdateQuantity={onUpdateCartQuantity || (() => { })}
                onRemoveItem={onRemoveFromCart || (() => { })}
              >
                <Button variant="outline" size="sm" className="relative h-9 w-9 p-0">
                  <ShoppingCart className="w-4 h-4" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </CartDrawer>

              {/* Admin Button */}
              <Button variant="outline" size="sm" onClick={onAdminClick} className="h-9 px-2">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Bottom Row - Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search toys..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 h-10 rounded-full border-2 focus:border-primary transition-colors text-sm"
            />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-between gap-4">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-lg">🧸</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ToyBox Market
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search for toys..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 h-10 rounded-full border-2 focus:border-primary transition-colors"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Cart Button */}
            <CartDrawer
              cartItems={cartItems}
              onUpdateQuantity={onUpdateCartQuantity || (() => { })}
              onRemoveItem={onRemoveFromCart || (() => { })}
            >
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </CartDrawer>

            {/* Admin Button */}
            <Button variant="outline" size="sm" onClick={onAdminClick}>
              <User className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Admin</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;