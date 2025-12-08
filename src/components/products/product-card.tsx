"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";
import { useAuth } from "@/components/providers";
import { Heart, Star, ExternalLink, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  onFavoriteToggle?: (productId: string, isFavorite: boolean) => void;
  isFavorite?: boolean;
}

export function ProductCard({
  product,
  priority = false,
  onFavoriteToggle,
  isFavorite = false,
}: ProductCardProps) {
  const { isAuthenticated } = useAuth();
  const [isFavorited, setIsFavorited] = useState(isFavorite);
  const [imageError, setImageError] = useState(false);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please sign in to save favorites");
      return;
    }

    const newState = !isFavorited;
    setIsFavorited(newState);
    onFavoriteToggle?.(product.id, newState);

    try {
      const response = await fetch("/api/favorites", {
        method: newState ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to update favorite");
      }

      toast.success(
        newState ? "Added to favorites!" : "Removed from favorites"
      );
    } catch (error) {
      setIsFavorited(!newState);
      toast.error("Failed to update favorites");
    }
  };

  const handleProductClick = async () => {
    try {
      await fetch("/api/clicks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });
    } catch (error) {
      console.error("Failed to track click:", error);
    }
  };

  // Extract brand from title (first few words)
  const getBrandName = () => {
    const words = product.title.split(" ");
    return words.slice(0, 2).join(" ");
  };

  // Get product description (rest of title)
  const getProductDescription = () => {
    const words = product.title.split(" ");
    if (words.length <= 2) return product.title;
    return words.slice(2).join(" ");
  };

  const formatReviewCount = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group"
    >
      <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-3xl m-2">
          {!imageError ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={priority}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
              <ShoppingBag className="h-12 w-12 text-amber-300 dark:text-amber-600" />
              <span className="text-xs text-muted-foreground mt-2">
                No image
              </span>
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className={cn(
              "absolute top-3 right-3 h-10 w-10 rounded-full flex items-center justify-center",
              "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg",
              "hover:bg-white dark:hover:bg-gray-800 transition-all duration-200",
              "hover:scale-110 active:scale-95"
            )}
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-colors duration-200",
                isFavorited ? "fill-rose-500 text-rose-500" : "text-gray-400"
              )}
            />
          </button>

          {/* Ribbon Badge - shows most important one */}
          {(() => {
            // Priority: HOT > NEW > BEST > TOP
            let ribbonText = "";
            let ribbonColor = "";

            if (product.discountPercent && product.discountPercent >= 50) {
              ribbonText = "HOT DEAL";
              ribbonColor = "bg-gradient-to-r from-rose-500 to-pink-500";
            } else if (
              product.firstSeenAt &&
              Date.now() - product.firstSeenAt.getTime() <
                7 * 24 * 60 * 60 * 1000
            ) {
              ribbonText = "NEW";
              ribbonColor = "bg-gradient-to-r from-blue-500 to-cyan-500";
            } else if (product.orders && product.orders > 1000) {
              ribbonText = "BEST SELLER";
              ribbonColor = "bg-gradient-to-r from-amber-500 to-orange-500";
            } else if (product.rating && product.rating >= 4.5) {
              ribbonText = "TOP RATED";
              ribbonColor = "bg-gradient-to-r from-emerald-500 to-teal-500";
            }

            if (!ribbonText) return null;

            return (
              <div className="absolute top-0 left-0 overflow-hidden w-28 h-28 pointer-events-none z-10">
                <div
                  className={cn(
                    "absolute top-4 -left-7 w-32 text-center py-1",
                    "text-[9px] font-bold text-white uppercase tracking-wider",
                    "shadow-lg -rotate-45 transform",
                    ribbonColor
                  )}
                >
                  {ribbonText}
                </div>
              </div>
            );
          })()}
        </div>

        {/* Content */}
        <div className="px-4 pb-4 pt-2">
          {/* Brand & Rating Row */}
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-base text-foreground truncate">
              {getBrandName()}
            </h3>
            {product.rating && (
              <div className="flex items-center gap-1 text-sm shrink-0">
                <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                <span className="font-medium text-foreground">
                  {product.rating.toFixed(1)}
                </span>
                {product.orders > 0 && (
                  <>
                    <span className="text-muted-foreground">|</span>
                    <span className="text-muted-foreground">
                      {formatReviewCount(product.orders)}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Product Description */}
          <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
            {getProductDescription()}
          </p>

          {/* Price Row */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-lg font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  ${product.oldPrice.toFixed(2)}
                </span>
                <span className="text-sm font-medium text-rose-500">
                  {product.discountPercent}% OFF
                </span>
              </>
            )}
          </div>

          {/* CTA Button */}
          <Button
            asChild
            className="w-full h-11 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Link
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleProductClick}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Deal
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
