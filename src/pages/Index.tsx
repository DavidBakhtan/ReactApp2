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

  const { toast } = useToast();

  // Fetch toys data using useEffect
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
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
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
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {searchTerm ? `Search Results for "${searchTerm}"` : 'All Toys'}
                <span className="text-muted-foreground text-lg ml-2">
                  ({filteredToys.length} products)
                </span>
              </h2>
            </div>

            {/* Product Grid */}
            {loading ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 animate-bounce">🎮</div>
                <h3 className="text-xl font-semibold mb-2">Loading Toys...</h3>
                <p className="text-muted-foreground">
                  Fetching amazing toys from our API
                </p>
              </div>
            ) : filteredToys.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredToys.map((toy) => (
                  <ProductCard
                    key={toy.id}
                    toy={toy}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No toys found</h3>
                <p className="text-muted-foreground">
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
