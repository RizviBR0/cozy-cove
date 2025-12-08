"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Calendar } from "lucide-react";

// Sample guides data - in production, this would come from your CMS or database
const SAMPLE_GUIDES = [
  {
    slug: "how-to-find-best-aliexpress-deals",
    title: "How to Find the Best AliExpress Deals in 2024",
    excerpt:
      "Master the art of finding hidden gems and exclusive discounts on AliExpress with our comprehensive guide.",
    date: "2024-12-01",
    readTime: "5 min read",
    category: "Tips & Tricks",
  },
  {
    slug: "aliexpress-flash-sales-guide",
    title: "AliExpress Flash Sales: Your Complete Guide",
    excerpt:
      "Learn when flash sales happen, how to prepare, and strategies to snag the best deals before they sell out.",
    date: "2024-11-28",
    readTime: "7 min read",
    category: "Flash Sales",
  },
  {
    slug: "cozy-home-decor-budget",
    title: "Create a Cozy Home on a Budget with AliExpress",
    excerpt:
      "Transform your living space without breaking the bank using our curated list of affordable home decor finds.",
    date: "2024-11-25",
    readTime: "6 min read",
    category: "Home & Decor",
  },
];

export function SavingsJournalSection() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Expert Tips
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cozy savings journal
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Short, helpful guides on finding the best AliExpress discounts,
            flash sales, and coupons for cozy living.
          </p>
        </motion.div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_GUIDES.map((guide, index) => (
            <motion.div
              key={guide.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/guides/${guide.slug}`}>
                <Card className="group h-full overflow-hidden border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    {/* Category & Date */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span className="px-2 py-1 rounded-full bg-muted">
                        {guide.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(guide.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {guide.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {guide.excerpt}
                    </p>

                    {/* Read time */}
                    <div className="flex items-center text-xs text-muted-foreground">
                      <BookOpen className="w-3 h-3 mr-1" />
                      {guide.readTime}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mt-12"
        >
          <Button asChild size="lg">
            <Link href="/guides">
              Read latest guides
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/guides">View all articles</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
