"use client";

import { cn } from "@/lib/utils";
import React from "react";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };

  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <div
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#f59e0b,transparent),radial-gradient(circle_farthest-side_at_100%_0,#ea580c,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#fcd34d,transparent),radial-gradient(circle_farthest-side_at_0_0,#f97316,#f59e0b)]"
        )}
      />
      <div
        className={cn(
          "absolute inset-0 rounded-3xl z-[1]",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#f59e0b,transparent),radial-gradient(circle_farthest-side_at_100%_0,#ea580c,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#fcd34d,transparent),radial-gradient(circle_farthest-side_at_0_0,#f97316,#f59e0b)]"
        )}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
