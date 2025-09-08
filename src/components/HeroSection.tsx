import { ArrowRight, Star, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * HeroSection Component - Main landing section
 * Features: Hero banner, call-to-action, featured offers
 */
const HeroSection = () => {
  return (
    <section data-hero-section className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <Badge variant="secondary" className="w-fit">
              <Gift className="w-4 h-4 mr-2" />
              New Arrivals Daily!
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Amazing Toys
              </span>
              <br />
              For Amazing Kids! 🎈
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg">
              Discover thousands of incredible toys that spark imagination, 
              creativity, and endless hours of fun. From educational games 
              to action figures - we have it all!
            </p>

            <div className="flex items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                Shop Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-2">
                  4.9/5 from 10,000+ reviews
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Happy Kids</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">1000+</div>
                <div className="text-sm text-muted-foreground">Toy Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-8 backdrop-blur-sm">
              <div className="text-center space-y-4">
                <div className="text-8xl">🎁</div>
                <h3 className="text-2xl font-bold">Special Launch Offer!</h3>
                <p className="text-muted-foreground">Get 20% off on your first order</p>
                <Badge variant="destructive" className="text-lg px-4 py-2">
                  LIMITED TIME
                </Badge>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl animate-bounce">
                🏆
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-xl animate-pulse">
                ⭐
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;