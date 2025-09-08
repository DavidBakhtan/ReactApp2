import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toyCategories } from "@/services/toyApi";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { useState } from "react";

interface FilterSidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  minPrice: number;
  maxPrice: number;
  onMinPriceChange: (price: number) => void;
  onMaxPriceChange: (price: number) => void;
  onResetFilters: () => void;
}

/**
 * FilterSidebar Component - Product filtering controls
 * Features: Category selection, price range filtering, filter reset
 */
const FilterSidebar = ({
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onResetFilters
}: FilterSidebarProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    onCategoryChange(category);
    setIsSheetOpen(false); // Auto-close on mobile
  };

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    if (type === 'min') {
      onMinPriceChange(value);
    } else {
      onMaxPriceChange(value);
    }
    setIsSheetOpen(false); // Auto-close on mobile
  };

  const handleQuickFilter = (minPrice: number, maxPrice: number, category: string = "All") => {
    onCategoryChange(category);
    onMinPriceChange(minPrice);
    onMaxPriceChange(maxPrice);
    setIsSheetOpen(false); // Auto-close on mobile
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Category</Label>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
          {toyCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "ghost"}
              size="sm"
              onClick={() => handleCategoryChange(category)}
              className="w-full justify-start text-left text-xs lg:text-sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Price Range</Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="min-price" className="text-xs text-muted-foreground">
              Min Price
            </Label>
            <Input
              id="min-price"
              type="number"
              value={minPrice}
              onChange={(e) => handlePriceChange('min', Number(e.target.value))}
              placeholder="0"
              className="mt-1 h-9"
            />
          </div>
          <div>
            <Label htmlFor="max-price" className="text-xs text-muted-foreground">
              Max Price
            </Label>
            <Input
              id="max-price"
              type="number"
              value={maxPrice}
              onChange={(e) => handlePriceChange('max', Number(e.target.value))}
              placeholder="1000"
              className="mt-1 h-9"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Quick Filters */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Quick Filters</Label>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickFilter(0, 30)}
            className="w-full justify-start text-xs lg:text-sm"
          >
            🎯 Under $30
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickFilter(0, 1000)}
            className="w-full justify-start text-xs lg:text-sm"
          >
            🔥 All Deals
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Sheet */}
      <div className="lg:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="min-w-0 px-3">
              <Filter className="w-4 h-4 mr-1" />
              Filters
            </Button>
          </SheetTrigger>
         <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl">
            <SheetHeader className="mb-6">
              <div className="flex items-center justify-between">
                <SheetTitle>Filters</SheetTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onResetFilters();
                    setIsSheetOpen(false);
                  }}
                  className="text-xs"
                >
                  Reset All
                </Button>
              </div>
            </SheetHeader>
           <div className="overflow-y-auto max-h-[calc(85vh-120px)] pb-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filter Card */}
      <div className="hidden lg:block">
        <Card className="h-fit sticky top-24">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center justify-between">
              Filters
              <Button
                variant="outline"
                size="sm"
                onClick={onResetFilters}
                className="text-xs"
              >
                Reset
              </Button>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <FilterContent />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default FilterSidebar;