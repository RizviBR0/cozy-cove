"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Mail,
  Search,
  ShoppingCart,
  HelpCircle,
} from "lucide-react";

const STEPS = [
  {
    number: 1,
    title: "Sign in with a magic link",
    description:
      "No password needed. Just enter your email and click the link we send you.",
    icon: Mail,
  },
  {
    number: 2,
    title: "Discover curated cozy deals",
    description:
      "Browse our handpicked selection of AliExpress products ranked by quality and savings.",
    icon: Search,
  },
  {
    number: 3,
    title: "Checkout on AliExpress",
    description:
      "We redirect you to the official AliExpress store for a secure checkout experience.",
    icon: ShoppingCart,
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Cozy Cove works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We scan AliExpress, curate the coziest offers, and send you to the
            official store to check out with full peace of mind.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-24 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step number */}
                  <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-6 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Number badge */}
                  <div className="absolute top-0 right-1/2 translate-x-12 -translate-y-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mt-16"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
          >
            Start in one tap
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg">
            <HelpCircle className="mr-2 h-4 w-4" />
            Why we use AliExpress
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
