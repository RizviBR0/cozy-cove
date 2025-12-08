"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/layout/auth-modal";
import { useAuth } from "@/components/providers";
import { ArrowRight, Mail, Sparkles } from "lucide-react";

export function FooterCtaSection() {
  const { isAuthenticated } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <>
      <section className="py-20 md:py-28 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center text-white"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Start saving today
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Ready to cozy up your deals?
            </h2>

            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Sign in once, discover handpicked AliExpress savings, and make
              every purchase feel a little cozier.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-orange-600 hover:bg-white/90 px-8"
              >
                <Link href="/shop">
                  Browse cozy deals now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              {!isAuthenticated && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setAuthModalOpen(true)}
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Sign in with email
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  );
}
