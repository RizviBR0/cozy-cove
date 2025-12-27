"use client";

import { useState, useRef, useEffect } from "react";
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
import { Mail, Loader2, ChevronLeft, ArrowRight } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type AuthStep = "email" | "otp";

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const { signIn, verifyOtp } = useAuth();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [step, setStep] = useState<AuthStep>("email");
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSendCode = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signIn(email.trim());

      if (error) {
        toast.error("Failed to send verification code. Please try again.");
        console.error("Sign in error:", error);
      } else {
        setStep("otp");
        setResendTimer(180); // 3 minutes
        toast.success("Verification code sent to your email!");
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error("Sign in error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    e?.preventDefault();

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter the complete 6-digit code");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await verifyOtp(email.trim(), otpString);

      if (error) {
        toast.error("Invalid verification code. Please try again.");
        console.error("Verify OTP error:", error);
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      } else {
        toast.success("Successfully signed in!");
        handleOpenChange(false);
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error("Verify OTP error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (digit && index === 5 && newOtp.every((d) => d !== "")) {
      setTimeout(() => handleVerifyOtp(), 100);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pastedData) {
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pastedData[i] || "";
      }
      setOtp(newOtp);
      const nextEmpty = newOtp.findIndex((d) => d === "");
      inputRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();

      if (pastedData.length === 6) {
        setTimeout(() => handleVerifyOtp(), 100);
      }
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setTimeout(() => {
        setEmail("");
        setOtp(["", "", "", "", "", ""]);
        setStep("email");
        setResendTimer(0);
      }, 200);
    }
    onOpenChange(newOpen);
  };

  const handleBack = () => {
    setOtp(["", "", "", "", "", ""]);
    setStep("email");
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    await handleSendCode();
  };

  const getBoxStyle = (index: number) => {
    const isFilled = otp[index] !== "";
    const isActive =
      index === otp.findIndex((d) => d === "") ||
      (otp.every((d) => d !== "") && index === 5);

    if (isFilled) {
      const saturation = 85 - index * 5;
      const lightness = 75 + index * 2;
      return {
        backgroundColor: `hsl(160, ${saturation}%, ${lightness}%)`,
        borderColor: "hsl(160, 70%, 45%)",
      };
    }

    if (isActive) {
      return {
        borderColor: "hsl(160, 70%, 45%)",
        borderWidth: "2px",
      };
    }

    return {};
  };

  // Calculate total width of OTP inputs for alignment
  const otpContainerWidth = "w-full max-w-[336px]"; // 6 * 48px + 5 * 8px gaps

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[400px] p-6">
        {step === "email" ? (
          <>
            <DialogHeader className="space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <DialogTitle className="text-center text-xl font-semibold">
                Sign in to Cozy Cove
              </DialogTitle>
              <DialogDescription className="text-center text-muted-foreground">
                Enter your email and we&apos;ll send you a 6-digit code to sign
                in. No password needed!
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSendCode} className="space-y-4 mt-6">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="h-12"
                autoComplete="email"
                autoFocus
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending code...
                  </>
                ) : (
                  "Send verification code"
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground pt-2">
                By signing in, you agree to our terms of service and privacy
                policy.
              </p>
            </form>
          </>
        ) : (
          <>
            <DialogHeader className="space-y-4">
              {/* Back button - positioned nicely */}
              <button
                onClick={handleBack}
                disabled={isLoading}
                className="absolute left-4 top-4 p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
                aria-label="Go back"
              >
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>

              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Mail className="w-6 h-6 text-muted-foreground" />
              </div>
              <DialogTitle className="text-center text-xl font-semibold">
                Enter verification code
              </DialogTitle>
              <DialogDescription className="text-center text-muted-foreground">
                <span className="block">
                  Please enter the code we emailed you
                </span>
                <span className="block font-medium text-foreground mt-1">
                  {email}
                </span>
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleVerifyOtp} className="mt-6">
              {/* OTP Input Grid - centered and aligned */}
              <div
                className={`flex justify-center gap-2 mx-auto ${otpContainerWidth}`}
                onPaste={handlePaste}
              >
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    disabled={isLoading}
                    className="w-12 h-14 text-center text-2xl font-semibold rounded-lg border-2 border-border bg-background transition-all duration-200 focus:outline-none focus:ring-0 disabled:opacity-50"
                    style={getBoxStyle(index)}
                    autoComplete="one-time-code"
                  />
                ))}
              </div>

              {/* Continue Button - same width as OTP container */}
              <div className={`mx-auto mt-6 ${otpContainerWidth}`}>
                <Button
                  type="submit"
                  disabled={isLoading || otp.some((d) => d === "")}
                  className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium justify-between px-5"
                >
                  <span>Continue</span>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Resend Timer */}
              <p className="text-center text-sm text-muted-foreground mt-6">
                {resendTimer > 0 ? (
                  <>Resend code in {formatTime(resendTimer)}</>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={isLoading}
                    className="text-primary hover:underline font-medium disabled:opacity-50"
                  >
                    Resend code
                  </button>
                )}
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
