import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Toy } from "@/services/toyApi";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  toy: Toy;
  onAddToCart: (toy: Toy) => void;
}

/**
 * ProductCard Component - Individual toy product display
 * Features: Product image, name, price, discount badge, rating, add to cart
 */
const ProductCard = ({ toy, onAddToCart }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${toy.id}`);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-2 hover:border-primary/20 cursor-pointer">
      <CardContent className="p-0">
        {/* Product Image with Discount Badge */}
        <div className="relative overflow-hidden rounded-t-lg" onClick={handleCardClick}>
          <img
            src={toy.image}
            alt={toy.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = `https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=400&fit=crop&crop=center`;
            }}
          />
          
          {/* Discount Badge */}
          {toy.discount && (
            <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground font-bold">
              -{toy.discount}%
            </Badge>
          )}

          {/* Out of Stock Overlay */}
          {!toy.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-sm font-bold">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4 space-y-3">
          {/* Category */}
         <div onClick={handleCardClick}>
            <Badge variant="secondary" className="text-xs">
              {toy.category}
            </Badge>

            {/* Product Name */}
            <h3 className="font-semibold text-lg line-clamp-2 text-card-foreground">
              {toy.name}
            </h3>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="text-sm font-medium">{toy.rating}</span>
            <span className="text-xs text-muted-foreground">(50+ reviews)</span>
          </div>

          {/* Price Section */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">
              ${toy.price.toFixed(2)}
            </span>
            {toy.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${toy.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
           onClick={(e) => {
              e.stopPropagation();
              onAddToCart(toy);
            }}
            disabled={!toy.inStock}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {toy.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;