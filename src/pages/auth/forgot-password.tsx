import { useState } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";
import { PhoneInput } from "@/components/auth/PhoneInput";
import { validateEmail, validatePhone } from "@/utils/validation";
import { cn } from "@/utils/cn";
import Link from "next/link";

type RecoveryMethod = "email" | "phone";

export default function ForgotPasswordPage() {
  const [method, setMethod] = useState<RecoveryMethod>("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let validationError: string | null = null;
    if (method === "email") {
      validationError = validateEmail(email);
    } else {
      validationError = validatePhone(phone);
    }
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <AuthLayout
        title="Check Your Inbox"
        subtitle={
          method === "email"
            ? `We sent a password reset link to ${email}`
            : `We sent an OTP to ${countryCode} ${phone}`
        }
      >
        <div className="text-center">
          <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Didn&apos;t receive the email? Check spam or{" "}
            <button
              onClick={() => setSent(false)}
              className="text-brand-600 hover:text-brand-700 font-medium"
            >
              try again
            </button>
          </p>
          <Button variant="outline" size="md" href="/auth/login">
            Back to Login
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="We'll send you a reset link or OTP"
    >
      {/* Method tabs */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setMethod("email")}
          className={cn(
            "flex-1 py-2 text-sm font-medium rounded-md transition-all",
            method === "email"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          Email
        </button>
        <button
          onClick={() => setMethod("phone")}
          className={cn(
            "flex-1 py-2 text-sm font-medium rounded-md transition-all",
            method === "phone"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          Phone Number
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {method === "email" ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={cn(
                "w-full px-4 py-2.5 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all",
                error ? "border-red-300 bg-red-50" : "border-gray-300"
              )}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>
        ) : (
          <PhoneInput
            value={phone}
            onChange={setPhone}
            countryCode={countryCode}
            onCountryCodeChange={setCountryCode}
            error={error}
          />
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          className="w-full"
        >
          {method === "email" ? "Send Reset Link" : "Receive OTP"}
        </Button>

        <p className="text-center text-sm text-gray-600">
          <Link href="/auth/login" className="text-brand-600 hover:text-brand-700 font-medium">
            Back to Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
