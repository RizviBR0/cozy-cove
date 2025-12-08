"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/products";
import { Product } from "@/lib/types";
import { ArrowRight, TrendingUp, Bell } from "lucide-react";

interface TrendingSectionProps {
  products: Product[];
  isLoading?: boolean;
}

export function TrendingSection({
  products,
  isLoading = false,
}: TrendingSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            Hot Right Now
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trending right now on Cozy Cove
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Fast-rising AliExpress products based on clicks, saves, and recent
            discounts from Cozy Cove shoppers.
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
            <Link href="/shop?sort=trending">
              Shop all trending deals
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg">
            <Bell className="mr-2 h-4 w-4" />
            Set alerts for similar deals
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
