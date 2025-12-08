"use client";

import { AuthProvider } from "./auth-provider";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast: "bg-background border-border",
            title: "text-foreground",
            description: "text-muted-foreground",
          },
        }}
      />
    </AuthProvider>
  );
}

export { AuthProvider, useAuth } from "./auth-provider";
