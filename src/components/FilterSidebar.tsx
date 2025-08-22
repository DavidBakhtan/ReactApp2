import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toyCategories } from "@/services/toyApi";

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
  return (
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
      
      <CardContent className="space-y-6 max-h-[calc(100vh-12rem)] overflow-y-auto">
        {/* Category Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Category</Label>
          <div className="space-y-2">
            {toyCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                size="sm"
                onClick={() => onCategoryChange(category)}
                className="w-full justify-start text-left"
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
          <div className="space-y-2">
            <div>
              <Label htmlFor="min-price" className="text-xs text-muted-foreground">
                Min Price
              </Label>
              <Input
                id="min-price"
                type="number"
                value={minPrice}
                onChange={(e) => onMinPriceChange(Number(e.target.value))}
                placeholder="0"
                className="mt-1"
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
                onChange={(e) => onMaxPriceChange(Number(e.target.value))}
                placeholder="1000"
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Quick Filters */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Quick Filters</Label>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onCategoryChange("All");
                onMaxPriceChange(30);
              }}
              className="w-full justify-start"
            >
              🎯 Under $30
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onCategoryChange("All");
                onMinPriceChange(0);
                onMaxPriceChange(1000);
              }}
              className="w-full justify-start"
            >
              🔥 All Deals
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;