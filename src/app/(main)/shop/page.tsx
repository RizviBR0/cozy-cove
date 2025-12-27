"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { InfiniteProductGrid } from "@/components/products/infinite-product-grid";
import { getProducts } from "@/app/actions/products";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
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
  Globe,
  Loader2,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, SUPPORTED_COUNTRIES } from "@/components/providers";

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

function ShopPageContent() {
  const searchParams = useSearchParams();
  const {
    countryCode,
    countryName,
    isLoading: locationLoading,
    setCountry,
  } = useLocation();

  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
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
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProducts = products; // Compatibility alias

  // Fetch products when filters change
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Debounce search a bit if needed, but for now direct call
        const response = await getProducts({
          page: 1,
          limit: 12,
          search: searchQuery,
          category,
          sort,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          minRating,
          minDiscount,
          countryCode,
          freeShippingOnly,
        });
        setProducts(response.products);
        setTotalProducts(response.total);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchProducts();
    }, 300); // 300ms debounce for all filter changes

    return () => clearTimeout(timer);
  }, [
    searchQuery,
    category,
    sort,
    priceRange,
    minRating,
    minDiscount,
    countryCode,
    freeShippingOnly,
  ]);

  const activeFiltersCount = [
    category !== "all",
    priceRange[0] > 0 || priceRange[1] < 100,
    minRating > 0,
    minDiscount > 0,
    countryCode !== "GLOBAL",
    freeShippingOnly,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setCategory("all");
    setPriceRange([0, 100]);
    setMinRating(0);
    setMinDiscount(0);
    setCountry("GLOBAL");
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
        <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={categoryOpen}
              className="w-full h-10 justify-between font-normal"
            >
              <span className="flex items-center gap-2 truncate">
                <span>
                  {CATEGORIES.find((c) => c.value === category)?.icon}
                </span>
                <span>
                  {CATEGORIES.find((c) => c.value === category)?.label ||
                    "Select category"}
                </span>
              </span>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="min-w-[var(--radix-popover-trigger-width)] w-full p-0"
            align="start"
            sideOffset={4}
          >
            <Command>
              <CommandInput placeholder="Search category..." />
              <CommandList className="max-h-[200px]">
                <CommandEmpty>No category found.</CommandEmpty>
                <CommandGroup>
                  {CATEGORIES.map((cat) => (
                    <CommandItem
                      key={cat.value}
                      value={cat.label}
                      onSelect={() => {
                        setCategory(cat.value);
                        setCategoryOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          category === cat.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <span className="mr-2">{cat.icon}</span>
                      {cat.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <hr className="border-border" />

      {/* Ship To */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5" />
          Ship To
          {locationLoading && <Loader2 className="w-3 h-3 animate-spin" />}
        </h3>
        <Popover open={countryOpen} onOpenChange={setCountryOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={countryOpen}
              className="w-full h-10 justify-between font-normal"
            >
              <span className="flex items-center gap-2 truncate">
                <Globe className="w-4 h-4" />
                <span>
                  {SUPPORTED_COUNTRIES.find((c) => c.code === countryCode)
                    ?.name || "Select country"}
                </span>
              </span>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="min-w-[var(--radix-popover-trigger-width)] w-full p-0"
            align="start"
            sideOffset={4}
          >
            <Command>
              <CommandInput placeholder="Search country..." />
              <CommandList className="max-h-[200px]">
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup>
                  {SUPPORTED_COUNTRIES.map((country) => (
                    <CommandItem
                      key={country.code}
                      value={country.name}
                      onSelect={() => {
                        setCountry(country.code);
                        setCountryOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          countryCode === country.code
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {country.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {countryCode !== "GLOBAL" && (
          <p className="text-xs text-muted-foreground mt-2">
            📍 Auto-detected: {countryName}
          </p>
        )}
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
                <SelectTrigger className="w-[160px] !h-12 rounded-xl bg-background border-0 shadow-sm">
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
              {countryCode !== "GLOBAL" && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-destructive/20"
                  onClick={() => setCountry("GLOBAL")}
                >
                  Ship to: {countryName}
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
              {totalProducts}
            </span>{" "}
            deals
          </p>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/5] bg-muted rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <InfiniteProductGrid
            initialProducts={products}
            initialTotal={totalProducts}
            searchParams={{
              search: searchQuery,
              category,
              sort,
              minPrice: priceRange[0],
              maxPrice: priceRange[1],
              minRating,
              minDiscount,
              countryCode,
              freeShippingOnly,
            }}
          />
        )}
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
