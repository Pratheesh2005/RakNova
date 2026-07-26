import { useState } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";
import { OtpInput } from "@/components/auth/OtpInput";
import { useCountdown } from "@/hooks/useCountdown";
import Link from "next/link";

export default function OtpVerificationPage() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { formatted, isRunning, reset } = useCountdown(60);
  const [resent, setResent] = useState(false);

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }
    setError(null);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    // Redirect to dashboard or appropriate page
  };

  const handleResend = () => {
    if (isRunning) return;
    setResent(true);
    reset(60);
    setOtp(Array(6).fill(""));
    setError(null);
    // In production: trigger resend API
  };

  return (
    <AuthLayout
      title="Verify OTP"
      subtitle="Enter the 6-digit code sent to your phone"
    >
      <div className="space-y-6">
        <OtpInput value={otp} onChange={setOtp} error={error} />

        <Button
          variant="primary"
          size="lg"
          loading={loading}
          onClick={handleVerify}
          className="w-full"
        >
          Verify
        </Button>

        <div className="text-center space-y-2">
          {isRunning ? (
            <p className="text-sm text-gray-500">
              Resend code in{" "}
              <span className="text-brand-600 font-medium">{formatted}</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-sm text-brand-600 hover:text-brand-700 font-medium"
            >
              {resent ? "Resend OTP again" : "Resend OTP"}
            </button>
          )}
          <p>
            <Link
              href="/auth/login"
              className="text-sm text-gray-500 hover:text-brand-600"
            >
              Change Phone Number
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
