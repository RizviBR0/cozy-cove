"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/layout/auth-modal";
import { useAuth } from "@/components/providers";
import { Sparkles, Star, Heart, Home, Coffee, Sofa } from "lucide-react";

// Floating decorative elements
const FLOATING_ELEMENTS = [
  {
    icon: Star,
    className: "top-[15%] left-[8%] text-amber-400",
    delay: 0,
    size: 20,
  },
  {
    icon: Heart,
    className: "top-[20%] right-[12%] text-rose-400",
    delay: 0.2,
    size: 18,
  },
  {
    icon: Home,
    className: "top-[35%] left-[5%] text-orange-400",
    delay: 0.4,
    size: 24,
  },
  {
    icon: Coffee,
    className: "top-[25%] right-[6%] text-amber-500",
    delay: 0.3,
    size: 16,
  },
  {
    icon: Sofa,
    className: "bottom-[35%] left-[10%] text-orange-300",
    delay: 0.5,
    size: 22,
  },
  {
    icon: Sparkles,
    className: "bottom-[30%] right-[8%] text-amber-300",
    delay: 0.1,
    size: 20,
  },
];

// Cloud SVG component
function Cloud({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 64 40" fill="currentColor">
      <path d="M56 30a8 8 0 01-8 8H16a12 12 0 01-2.4-23.8A16 16 0 0144 12a16 16 0 0112 18z" />
    </svg>
  );
}

export function HeroSection() {
  const { isAuthenticated } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-amber-50/50 via-white to-white dark:from-amber-950/20 dark:via-background dark:to-background">
        {/* Floating Clouds */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <Cloud className="absolute top-[18%] left-[3%] w-16 h-10 text-amber-200/60 dark:text-amber-800/30" />
          <Cloud className="absolute top-[12%] right-[5%] w-12 h-8 text-orange-200/50 dark:text-orange-800/30" />
          <Cloud className="absolute bottom-[25%] right-[3%] w-14 h-9 text-rose-200/40 dark:text-rose-800/20" />
        </motion.div>

        {/* Floating Icons */}
        {FLOATING_ELEMENTS.map((element, i) => {
          const Icon = element.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1, y: [0, -10, 0] }}
              transition={{
                opacity: { duration: 0.5, delay: element.delay + 0.3 },
                scale: { duration: 0.5, delay: element.delay + 0.3 },
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: element.delay,
                },
              }}
              className={`absolute pointer-events-none ${element.className}`}
            >
              <Icon size={element.size} />
            </motion.div>
          );
        })}

        <div className="container mx-auto max-w-4xl px-4 relative z-10">
          <div className="flex flex-col items-center text-center">
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge
                variant="outline"
                className="mb-8 px-4 py-2 text-xs tracking-widest uppercase font-medium border-amber-300 text-amber-700 dark:border-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-900/20"
              >
                Curated AliExpress Deals
              </Badge>
            </motion.div>

            {/* Main Heading - Elegant serif style */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]"
            >
              <span className="text-foreground">Discover </span>
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                cozy deals
              </span>
              <br />
              <span className="text-foreground">handpicked for you</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed"
            >
              Our team curates the best AliExpress discounts on home, fashion,
              and lifestyle. Save more without the endless scrolling.
            </motion.p>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-center gap-8 mb-10 text-muted-foreground/60"
            >
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                  <span className="text-lg">🏠</span>
                </div>
                <span className="font-medium">Home</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center">
                  <span className="text-lg">👗</span>
                </div>
                <span className="font-medium">Fashion</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center">
                  <span className="text-lg">✨</span>
                </div>
                <span className="font-medium">Lifestyle</span>
              </div>
            </motion.div>

            {/* Single CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                asChild
                size="lg"
                className="h-12 px-8 text-base rounded-full bg-foreground text-background hover:bg-foreground/90 shadow-lg"
              >
                <Link href="/shop">Browse deals</Link>
              </Button>
            </motion.div>

            {/* Secondary action */}
            {!isAuthenticated && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                onClick={() => setAuthModalOpen(true)}
                className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              >
                Sign in to save favorites
              </motion.button>
            )}

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-16 flex items-center gap-12 text-center"
            >
              <div>
                <div className="text-2xl font-bold text-foreground">500+</div>
                <div className="text-xs text-muted-foreground">Deals</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <div className="text-2xl font-bold text-foreground">70%</div>
                <div className="text-xs text-muted-foreground">Max Off</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <div className="text-2xl font-bold text-foreground">Daily</div>
                <div className="text-xs text-muted-foreground">Updates</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  );
}
