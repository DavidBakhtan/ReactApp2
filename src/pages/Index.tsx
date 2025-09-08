import { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CartDrawer from "@/components/CartDrawer";
import AdminPage from "@/pages/AdminPage";
import { ToyApiService, Toy } from "@/services/toyApi";
import { useToast } from "@/hooks/use-toast";

/**
 * Main Index Page - ToyBox Market Homepage
 * Features: Product listing, search, filtering, cart functionality
 */
const Index = () => {
  // State Management
  const [toys, setToys] = useState<Toy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [cartItems, setCartItems] = useState<(Toy & { quantity: number })[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const { toast } = useToast();

  // Handle sticky filter bar behavior
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('[data-hero-section]');
      const header = document.querySelector('header');
      if (heroSection && header) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsFilterSticky(heroBottom <= 64); // 64px is header height
      }
    };

    window.addEventListener('scroll', handleScroll);
     window.addEventListener('resize', handleScroll); // Also check on resize
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);
  useEffect(() => {
    const fetchToys = async () => {
      try {
        setLoading(true);
        const data = await ToyApiService.getAllToys();
        setToys(data);
        toast({
          title: "Products Loaded! 🎯",
          description: `Successfully loaded ${data.length} toys from API`,
        });
      } catch (error) {
        console.error('Failed to fetch toys:', error);
        toast({
          title: "Error Loading Products ❌",
          description: "Failed to load toys from API",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchToys();
  }, [toast]);

  // Filtered Products Logic
  const filteredToys = useMemo(() => {
    return toys.filter((toy) => {
      const matchesSearch = toy.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || toy.category === selectedCategory;
      const matchesPrice = toy.price >= minPrice && toy.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [toys, searchTerm, selectedCategory, minPrice, maxPrice]);

  // Event Handlers
  const handleAddToCart = (toy: Toy) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === toy.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === toy.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...toy, quantity: 1 }];
      }
    });
    toast({
      title: "Added to Cart! 🛒",
      description: `${toy.name} has been added to your cart.`,
    });
  };

  const handleUpdateCartQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev =>
        prev.map(item => item.id === id ? { ...item, quantity } : item)
      );
    }
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Removed from Cart",
      description: "Item has been removed from your cart.",
    });
  };

  const handleAdminClick = () => {
    const password = prompt("Enter admin password:");
    if (password === "root") {
      setShowAdmin(true);
      toast({
        title: "Admin Access Granted 👑",
        description: "Welcome to the admin panel!",
      });
    } else if (password !== null) {
      toast({
        title: "Access Denied ❌",
        description: "Invalid password. Try 'root'",
        variant: "destructive"
      });
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setMinPrice(0);
    setMaxPrice(1000);
    setSearchTerm("");
  };

  // Compute cart count
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Show admin page if authenticated
  if (showAdmin) {
    return (
      <AdminPage
        toys={toys}
        onUpdateToys={setToys}
        onBackClick={() => setShowAdmin(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header Component */}
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        cartCount={cartCount}
        onAdminClick={handleAdminClick}
        cartItems={cartItems}
        onUpdateCartQuantity={handleUpdateCartQuantity}
        onRemoveFromCart={handleRemoveFromCart}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Filter Sidebar - Hidden on mobile, show in drawer */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterSidebar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onMinPriceChange={setMinPrice}
              onMaxPriceChange={setMaxPrice}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {/* Mobile Filter Bar */}
            <div className={`lg:hidden transition-all duration-300 z-30 bg-background/95 backdrop-blur-sm border-b border-border ${isFilterSticky
                ? 'fixed left-0 right-0' 
                : 'relative'
               }`}
            style={{
              top: isFilterSticky ? `${document.querySelector('header')?.offsetHeight || 64}px` : 'auto'
            }}>
              <div className="container mx-auto px-2 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <h2 className="text-base font-semibold">
                      {searchTerm ? `"${searchTerm}"` : 'All Toys'}
                    </h2>
                    <span className="text-muted-foreground text-sm">
                      {filteredToys.length} products
                    </span>
                  </div>

                  <FilterSidebar
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    onMinPriceChange={setMinPrice}
                    onMaxPriceChange={setMaxPrice}
                    onResetFilters={handleResetFilters}
                  />
                </div>
              </div>
            </div>

            {/* Spacer for sticky bar */}
            {isFilterSticky && <div className="lg:hidden mb-4" style={{ height: `${document.querySelector('header')?.offsetHeight || 64}px` }}></div>}

            {/* Desktop Filter Header */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  {searchTerm ? `Results for "${searchTerm}"` : 'All Toys'}
                </h2>
                <span className="text-muted-foreground text-lg">
                  ({filteredToys.length} products)
                </span>
              </div>
            </div>

            {/* Product Grid */}
            {loading ? (
              <div className="text-center py-8 sm:py-12">
                <div className="text-4xl sm:text-6xl mb-4 animate-bounce">🎮</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Loading Toys...</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Fetching amazing toys from our API
                </p>
              </div>
            ) : filteredToys.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredToys.map((toy) => (
                  <ProductCard
                    key={toy.id}
                    toy={toy}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <div className="text-4xl sm:text-6xl mb-4">🔍</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">No toys found</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Index;
