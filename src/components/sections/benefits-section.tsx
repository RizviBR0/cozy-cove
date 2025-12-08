"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Filter,
  Target,
  DollarSign,
  Zap,
  BookOpen,
} from "lucide-react";

const BENEFITS = [
  {
    icon: Filter,
    title: "Smart Filters",
    description:
      "Narrow down thousands of products to find exactly what matches your style and budget.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Target,
    title: "Cozy-Focused Curation",
    description:
      "Every product is handpicked for comfort and quality. No random junk, just cozy finds.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: DollarSign,
    title: "Transparent Affiliate Earnings",
    description:
      "We earn when you buy, but we never inflate prices. You always get the real deal.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Zap,
    title: "Fast & Clean Experience",
    description:
      "No pop-ups, no clutter. Just deals, discovery, and a smooth path to checkout.",
    color: "from-purple-500 to-violet-500",
  },
];

export function BenefitsSection() {
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
            Why deal hunters love Cozy Cove
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built for people who love cozy things and hate paying full price.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
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
              Start browsing deals
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/about">
              <BookOpen className="mr-2 h-4 w-4" />
              Read our story
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
