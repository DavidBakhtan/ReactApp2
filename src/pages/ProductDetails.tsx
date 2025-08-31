import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Toy, ToyApiService } from "@/services/toyApi";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";

interface CartItem extends Toy {
  quantity: number;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [toy, setToy] = useState<Toy | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchToy = async () => {
      if (!id) return;
      
      try {
        const toyData = await ToyApiService.getToyById(parseInt(id));
        setToy(toyData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load product details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchToy();
  }, [id, toast]);

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

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!toy) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
   {/* Header */}
      <Header
        searchTerm=""
        onSearchChange={() => {}}
        cartCount={cartCount}
        onAdminClick={() => {}}
        cartItems={cartItems}
        onUpdateCartQuantity={handleUpdateCartQuantity}
        onRemoveFromCart={handleRemoveFromCart}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4">
        {/* Back Button */}
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>
        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={toy.image}
                    alt={toy.name}
                    className="w-full h-96 lg:h-[500px] object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&h=800&fit=crop&crop=center`;
                    }}
                  />
                  
                  {/* Discount Badge */}
                  {toy.discount && (
                    <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground font-bold text-base px-3 py-1">
                      -{toy.discount}%
                    </Badge>
                  )}

                  {/* Out of Stock Overlay */}
                  {!toy.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive" className="text-lg font-bold px-4 py-2">
                        Out of Stock
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Category */}
            <Badge variant="secondary" className="text-sm">
              {toy.category}
            </Badge>

            {/* Product Name */}
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              {toy.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-accent text-accent" />
                <span className="text-lg font-semibold">{toy.rating}</span>
              </div>
              <span className="text-muted-foreground">(50+ reviews)</span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-primary">
                  ${toy.price.toFixed(2)}
                </span>
                {toy.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${toy.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {toy.discount && (
                <p className="text-green-600 font-medium">
                  You save ${((toy.originalPrice || toy.price) - toy.price).toFixed(2)} ({toy.discount}% off)
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {toy.description}
              </p>
            </div>

            {/* Add to Cart Button */}
            <div className="pt-4">
              <Button
                onClick={() => handleAddToCart(toy)}
                disabled={!toy.inStock}
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold text-lg py-6"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {toy.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>

            {/* Product Features */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Product Features</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Category:</span>
                    <p className="font-medium">{toy.category}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Rating:</span>
                    <p className="font-medium">{toy.rating}/5 Stars</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Availability:</span>
                    <p className={`font-medium ${toy.inStock ? 'text-green-600' : 'text-destructive'}`}>
                      {toy.inStock ? 'In Stock' : 'Out of Stock'}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Product ID:</span>
                    <p className="font-medium">#{toy.id}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;