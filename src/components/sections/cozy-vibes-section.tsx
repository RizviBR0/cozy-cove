"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Shuffle,
  Home,
  Shirt,
  Monitor,
  Heart,
  Gift,
} from "lucide-react";

const COLLECTIONS = [
  {
    id: "home-decor",
    name: "Cozy Home & Decor",
    description: "Blankets, pillows, candles & more",
    icon: Home,
    color: "from-amber-500 to-orange-500",
    href: "/shop?category=home-decor",
  },
  {
    id: "loungewear",
    name: "Soft Loungewear & Sleepwear",
    description: "Pajamas, robes & comfortable fits",
    icon: Shirt,
    color: "from-pink-500 to-rose-500",
    href: "/shop?category=loungewear",
  },
  {
    id: "desk-comfort",
    name: "Desk & Tech Comfort",
    description: "Ergonomic accessories & desk setup",
    icon: Monitor,
    color: "from-blue-500 to-cyan-500",
    href: "/shop?category=desk-comfort",
  },
  {
    id: "self-care",
    name: "Self Care & Wellness",
    description: "Skincare, massage & relaxation",
    icon: Heart,
    color: "from-purple-500 to-violet-500",
    href: "/shop?category=self-care",
  },
  {
    id: "gifts-under-20",
    name: "Gifts Under $20",
    description: "Affordable finds for everyone",
    icon: Gift,
    color: "from-green-500 to-emerald-500",
    href: "/shop?maxPrice=20",
  },
];

export function CozyVibesSection() {
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Shop by cozy vibes
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Jump straight into curated collections built for how you relax,
            work, or recharge.
          </p>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {COLLECTIONS.map((collection, index) => {
            const Icon = collection.icon;
            return (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={collection.href}>
                  <Card className="group h-full overflow-hidden border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${collection.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {collection.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {collection.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mt-12"
        >
          <Button asChild size="lg">
            <Link href="/shop">
              Explore all cozy collections
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg">
            <Shuffle className="mr-2 h-4 w-4" />
            Surprise me with a random collection
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
