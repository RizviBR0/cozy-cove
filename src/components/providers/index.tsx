"use client";

import { AuthProvider } from "./auth-provider";
import { LocationProvider } from "@/lib/location";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <LocationProvider>
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
      </LocationProvider>
    </AuthProvider>
  );
}

export { AuthProvider, useAuth } from "./auth-provider";
export {
  LocationProvider,
  useLocation,
  SUPPORTED_COUNTRIES,
} from "@/lib/location";
