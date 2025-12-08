"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthModal } from "@/components/layout/auth-modal";
import { useAuth } from "@/components/providers";
import { ProductGrid } from "@/components/products";
import { Product } from "@/lib/types";
import { Heart, Clock, Shield, Bookmark } from "lucide-react";

interface CozyCornerSectionProps {
  recentProducts?: Product[];
  favoriteProducts?: Product[];
}

export function CozyCornerSection({
  recentProducts = [],
  favoriteProducts = [],
}: CozyCornerSectionProps) {
  const { isAuthenticated, user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <>
        <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto max-w-7xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 mb-6">
                <Bookmark className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your cozy corner
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Sign in to save favorites, track price drops, and make Cozy Cove
                feel like your personal deal board.
              </p>

              {/* Features preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
                <Card className="bg-card/50">
                  <CardContent className="pt-6 text-center">
                    <Heart className="w-8 h-8 mx-auto mb-3 text-rose-500" />
                    <p className="font-medium">Save Favorites</p>
                    <p className="text-sm text-muted-foreground">
                      Build your wishlist
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="pt-6 text-center">
                    <Clock className="w-8 h-8 mx-auto mb-3 text-blue-500" />
                    <p className="font-medium">Recent Views</p>
                    <p className="text-sm text-muted-foreground">
                      Pick up where you left
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="pt-6 text-center">
                    <Shield className="w-8 h-8 mx-auto mb-3 text-green-500" />
                    <p className="font-medium">Privacy First</p>
                    <p className="text-sm text-muted-foreground">
                      Your data stays yours
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => setAuthModalOpen(true)}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                >
                  Sign in with email
                </Button>
                <Button variant="outline" size="lg">
                  Learn how we keep your data safe
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
      </>
    );
  }

  // Logged in view
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome back, {user?.displayName}!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s your personal cozy corner with your saves and recent
              views.
            </p>
          </div>

          {/* Favorites */}
          {favoriteProducts.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500" />
                Your Saved Favorites
              </h3>
              <ProductGrid
                products={favoriteProducts.slice(0, 4)}
                columns={4}
              />
            </div>
          )}

          {/* Recent */}
          {recentProducts.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                Recently Viewed
              </h3>
              <ProductGrid products={recentProducts.slice(0, 4)} columns={4} />
            </div>
          )}

          {/* Empty state */}
          {favoriteProducts.length === 0 && recentProducts.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Bookmark className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">
                  Your cozy corner is empty
                </p>
                <p className="text-muted-foreground mb-4">
                  Start exploring deals to fill this space with your favorites!
                </p>
                <Button asChild>
                  <a href="/shop">Browse deals</a>
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </section>
  );
}
