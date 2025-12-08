"use client";

import { useState } from "react";
import { useAuth } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Mail, Loader2, CheckCircle } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signIn(email.trim());

      if (error) {
        toast.error("Failed to send magic link. Please try again.");
        console.error("Sign in error:", error);
      } else {
        setIsSent(true);
        toast.success("Check your email for the magic link!");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error("Sign in error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset state when closing
      setTimeout(() => {
        setEmail("");
        setIsSent(false);
      }, 200);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        {!isSent ? (
          <>
            <DialogHeader>
              <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <DialogTitle className="text-center text-xl">
                Sign in to Cozy Cove
              </DialogTitle>
              <DialogDescription className="text-center">
                Enter your email and we&apos;ll send you a magic link to sign
                in. No password needed!
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="h-11"
                  autoComplete="email"
                  autoFocus
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending magic link...
                  </>
                ) : (
                  "Send magic link"
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By signing in, you agree to our terms of service and privacy
                policy.
              </p>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <DialogTitle className="text-center text-xl">
                Check your email!
              </DialogTitle>
              <DialogDescription className="text-center space-y-2">
                <span className="block">We&apos;ve sent a magic link to:</span>
                <span className="block font-medium text-foreground">
                  {email}
                </span>
                <span className="block mt-4">
                  Click the link in the email to sign in. The link will expire
                  in 24 hours.
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-3">
              <Button
                variant="outline"
                onClick={() => setIsSent(false)}
                className="w-full"
              >
                Use a different email
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleOpenChange(false)}
                className="w-full"
              >
                Close
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
