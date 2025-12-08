"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { MOCK_PRODUCTS } from "@/lib/aliexpress";
import { Product, ProductSortOption } from "@/lib/types";
import {
  Search,
  SlidersHorizontal,
  X,
  Star,
  Percent,
  ArrowUpDown,
  MapPin,
  Truck,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { value: "all", label: "All Categories", icon: "🏠" },
  { value: "home", label: "Home & Garden", icon: "🪴" },
  { value: "clothing", label: "Clothing", icon: "👗" },
  { value: "beauty", label: "Beauty & Health", icon: "💄" },
  { value: "office", label: "Office & School", icon: "📚" },
  { value: "lights", label: "Lights & Lighting", icon: "💡" },
];

const SORT_OPTIONS: { value: ProductSortOption; label: string }[] = [
  { value: "trending", label: "Trending" },
  { value: "top-rated", label: "Top Rated" },
  { value: "biggest-savings", label: "Biggest Savings" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

const SHIP_TO_COUNTRIES = [
  { value: "all", label: "Worldwide" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
];

function ShopPageContent() {
  const searchParams = useSearchParams();

  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [isLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [sort, setSort] = useState<ProductSortOption>(
    (searchParams.get("sort") as ProductSortOption) || "trending"
  );
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [minRating, setMinRating] = useState(0);
  const [minDiscount, setMinDiscount] = useState(0);
  const [shipTo, setShipTo] = useState("all");
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.category?.toLowerCase().includes(query)
      );
    }

    if (category !== "all") {
      result = result.filter((p) =>
        p.category?.toLowerCase().includes(category.toLowerCase())
      );
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (minRating > 0) {
      result = result.filter((p) => (p.rating || 0) >= minRating);
    }

    if (minDiscount > 0) {
      result = result.filter((p) => (p.discountPercent || 0) >= minDiscount);
    }

    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "top-rated":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "biggest-savings":
        result.sort(
          (a, b) => (b.discountPercent || 0) - (a.discountPercent || 0)
        );
        break;
      case "newest":
        result.sort(
          (a, b) =>
            (b.firstSeenAt?.getTime() || 0) - (a.firstSeenAt?.getTime() || 0)
        );
        break;
      default:
        break;
    }

    return result;
  }, [
    products,
    searchQuery,
    category,
    sort,
    priceRange,
    minRating,
    minDiscount,
  ]);

  const activeFiltersCount = [
    category !== "all",
    priceRange[0] > 0 || priceRange[1] < 100,
    minRating > 0,
    minDiscount > 0,
    shipTo !== "all",
    freeShippingOnly,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setCategory("all");
    setPriceRange([0, 100]);
    setMinRating(0);
    setMinDiscount(0);
    setShipTo("all");
    setFreeShippingOnly(false);
    setSearchQuery("");
  };

  // Inline filter content to avoid component-during-render issue
  const filterContent = (
    <div className="space-y-6 py-4 px-1">
      {/* Category */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Category
        </h3>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-all",
                category === cat.value
                  ? "bg-foreground text-background font-medium"
                  : "hover:bg-muted text-foreground"
              )}
            >
              <span className="text-base">{cat.icon}</span>
              <span>{cat.label}</span>
              {category === cat.value && <span className="ml-auto">✓</span>}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-border" />

      {/* Ship To */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5" />
          Ship To
        </h3>
        <Select value={shipTo} onValueChange={setShipTo}>
          <SelectTrigger className="w-full h-10">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {SHIP_TO_COUNTRIES.map((country) => (
              <SelectItem key={country.value} value={country.value}>
                {country.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Free Shipping Toggle */}
      <button
        onClick={() => setFreeShippingOnly(!freeShippingOnly)}
        className={cn(
          "w-full flex items-center justify-between p-4 rounded-xl transition-all",
          freeShippingOnly
            ? "bg-green-50 dark:bg-green-900/20 ring-2 ring-green-500"
            : "bg-muted/50 hover:bg-muted"
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center",
              freeShippingOnly ? "bg-green-500 text-white" : "bg-background"
            )}
          >
            <Truck className="w-4 h-4" />
          </div>
          <div className="text-left">
            <p className="font-medium text-sm">Free Shipping</p>
            <p className="text-xs text-muted-foreground">Only free delivery</p>
          </div>
        </div>
        <div
          className={cn(
            "w-10 h-5 rounded-full p-0.5 transition-colors",
            freeShippingOnly ? "bg-green-500" : "bg-muted-foreground/30"
          )}
        >
          <div
            className={cn(
              "w-4 h-4 rounded-full bg-white shadow transition-transform",
              freeShippingOnly ? "translate-x-5" : "translate-x-0"
            )}
          />
        </div>
      </button>

      <hr className="border-border" />

      {/* Price Range */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Price Range
          </h3>
          <span className="text-sm font-medium">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={100}
          step={5}
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>$0</span>
          <span>$100+</span>
        </div>
      </div>

      <hr className="border-border" />

      {/* Min Rating */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
          <Star className="w-3.5 h-3.5" />
          Min Rating
        </h3>
        <div className="grid grid-cols-5 gap-1">
          {[0, 3, 3.5, 4, 4.5].map((rating) => (
            <button
              key={rating}
              onClick={() => setMinRating(rating)}
              className={cn(
                "py-2 rounded-lg text-xs font-medium transition-all border",
                minRating === rating
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background hover:bg-muted border-border text-foreground"
              )}
            >
              {rating === 0 ? "Any" : `${rating}★`}
            </button>
          ))}
        </div>
      </div>

      {/* Min Discount */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
          <Percent className="w-3.5 h-3.5" />
          Min Discount
        </h3>
        <div className="grid grid-cols-5 gap-1">
          {[0, 20, 30, 50, 70].map((disc) => (
            <button
              key={disc}
              onClick={() => setMinDiscount(disc)}
              className={cn(
                "py-2 rounded-lg text-xs font-medium transition-all border",
                minDiscount === disc
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background hover:bg-muted border-border text-foreground"
              )}
            >
              {disc === 0 ? "Any" : `${disc}%`}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <>
          <hr className="border-border" />
          <Button
            variant="outline"
            className="w-full h-10"
            onClick={clearFilters}
          >
            Clear All ({activeFiltersCount})
          </Button>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Sticky Search Bar */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b"
          >
            <div className="container mx-auto max-w-7xl px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-xl">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search deals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10 rounded-full bg-muted/50"
                  />
                </div>
                <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full h-10 px-4"
                    >
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <Badge
                          className="ml-2 h-5 min-w-5 p-0 flex items-center justify-center text-xs"
                          variant="secondary"
                        >
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-full sm:max-w-md overflow-y-auto"
                  >
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="px-4">{filterContent}</div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 text-xs tracking-wider uppercase"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            {filteredProducts.length} Deals
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Shop All Cozy Deals
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Filter by price, rating, shipping, and category to find your perfect
            find.
          </p>
        </motion.div>

        {/* Main Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-muted/30 rounded-2xl p-4 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search deals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base rounded-xl bg-background border-0 shadow-sm"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex gap-2">
              {/* Sort */}
              <Select
                value={sort}
                onValueChange={(v) => setSort(v as ProductSortOption)}
              >
                <SelectTrigger className="w-auto min-w-[140px] h-12 rounded-xl bg-background border-0 shadow-sm">
                  <ArrowUpDown className="mr-2 h-4 w-4 shrink-0" />
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Filter Sheet */}
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger asChild>
                  <Button className="h-12 px-5 rounded-xl bg-background text-foreground border-0 shadow-sm hover:bg-muted">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge className="ml-2" variant="secondary">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-full sm:max-w-md overflow-y-auto"
                >
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="px-4">{filterContent}</div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border/50">
              <span className="text-sm text-muted-foreground">Active:</span>
              {category !== "all" && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-destructive/20"
                  onClick={() => setCategory("all")}
                >
                  {CATEGORIES.find((c) => c.value === category)?.label}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              )}
              {shipTo !== "all" && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-destructive/20"
                  onClick={() => setShipTo("all")}
                >
                  Ship to:{" "}
                  {SHIP_TO_COUNTRIES.find((c) => c.value === shipTo)?.label}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              )}
              {freeShippingOnly && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-destructive/20"
                  onClick={() => setFreeShippingOnly(false)}
                >
                  Free Shipping
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              )}
              {minRating > 0 && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-destructive/20"
                  onClick={() => setMinRating(0)}
                >
                  {minRating}+ stars
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              )}
              {minDiscount > 0 && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-destructive/20"
                  onClick={() => setMinDiscount(0)}
                >
                  {minDiscount}%+ off
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              )}
              {(priceRange[0] > 0 || priceRange[1] < 100) && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-destructive/20"
                  onClick={() => setPriceRange([0, 100])}
                >
                  ${priceRange[0]} - ${priceRange[1]}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-muted-foreground hover:text-foreground ml-2"
              >
                Clear all
              </button>
            </div>
          )}
        </motion.div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filteredProducts.length}
            </span>{" "}
            deals
          </p>
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          isLoading={isLoading}
          columns={4}
          emptyMessage="No deals match your filters"
          emptyAction={{ label: "Clear filters", href: "/shop" }}
        />
      </div>
    </div>
  );
}

import { Suspense } from "react";

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="animate-pulse">
            <div className="h-10 bg-muted rounded w-1/3 mx-auto mb-4" />
            <div className="h-6 bg-muted rounded w-1/2 mx-auto mb-8" />
            <div className="h-16 bg-muted rounded-2xl mb-8" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-4/5 bg-muted rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ShopPageContent />
    </Suspense>
  );
}
