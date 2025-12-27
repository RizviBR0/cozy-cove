"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useAuth } from "@/components/providers";
import { usePathname } from "next/navigation";

/**
 * Custom Cursor Component
 * =======================
 *
 * Shows a pill/chip following the cursor with the user's display name when signed in.
 *
 * Features:
 * - Only renders when user is signed in
 * - Smooth motion using spring physics
 * - Respects prefers-reduced-motion
 * - Uses pointer-events: none to not block interactions
 * - Repositions if near edge of viewport
 */
export function CustomCursor() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth cursor movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animation for smooth following
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Track mouse movement
  useEffect(() => {
    if (!isAuthenticated || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const cursorWidth = cursorRef.current?.offsetWidth || 100;
      const cursorHeight = cursorRef.current?.offsetHeight || 30;

      // Calculate position with edge detection
      let x = clientX + 15; // Offset from actual cursor
      let y = clientY + 15;

      // Prevent going off right edge
      if (x + cursorWidth > window.innerWidth - 10) {
        x = clientX - cursorWidth - 15;
      }

      // Prevent going off bottom edge
      if (y + cursorHeight > window.innerHeight - 10) {
        y = clientY - cursorHeight - 15;
      }

      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Set initial visibility
    setIsVisible(true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isAuthenticated, prefersReducedMotion, mouseX, mouseY]);

  // Don't render if:
  // - Not authenticated
  // - Still loading
  // - User prefers reduced motion
  // - No user data
  if (
    !isAuthenticated ||
    isLoading ||
    prefersReducedMotion ||
    !user ||
    pathname !== "/"
  ) {
    return null;
  }

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{
        x: cursorX,
        y: cursorY,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
      }}
      transition={{ duration: 0.15 }}
    >
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium shadow-lg backdrop-blur-sm">
        <span className="w-5 h-5 rounded-full bg-primary-foreground/20 flex items-center justify-center text-[10px]">
          {user.initials}
        </span>
        <span className="whitespace-nowrap">{user.displayName}</span>
      </div>
    </motion.div>
  );
}
