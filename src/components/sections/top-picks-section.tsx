"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/products";
import { Product } from "@/lib/types";
import { ArrowRight, Star } from "lucide-react";

interface TopPicksSectionProps {
  products: Product[];
  isLoading?: boolean;
}

export function TopPicksSection({
  products,
  isLoading = false,
}: TopPicksSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            Curated Selection
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Today&apos;s top cozy picks
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Highest rated AliExpress deals with strong reviews and big savings,
            updated through our Cozy Cove scoring system.
          </p>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ProductGrid
            products={products.slice(0, 8)}
            isLoading={isLoading}
            columns={4}
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mt-12"
        >
          <Button asChild size="lg">
            <Link href="/shop?sort=top-rated">
              View all top deals
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/shop">See more cozy categories</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
