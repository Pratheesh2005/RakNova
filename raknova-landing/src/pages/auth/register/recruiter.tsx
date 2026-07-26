import { useState } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { PhoneInput } from "@/components/auth/PhoneInput";
import { PasswordStrengthIndicator } from "@/components/auth/PasswordStrengthIndicator";
import { validateEmail, validatePhone, validatePassword, validateConfirmPassword, validateRequired } from "@/utils/validation";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { useRouter } from "next/router";

export default function RecruiterRegistrationPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string | null> = {
      fullName: validateRequired(fullName, "Full name"),
      email: validateEmail(email),
      phone: validatePhone(phone),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
      terms: !acceptTerms ? "You must accept the Terms & Conditions." : null,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((e) => e !== null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    router.push("/auth/registration-success");
  };

  return (
    <AuthLayout
      title="Create Recruiter Account"
      subtitle="Manage hiring and candidate screening efficiently"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Jane Smith"
            className={cn(
              "w-full px-4 py-2.5 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all",
              errors.fullName ? "border-red-300 bg-red-50" : "border-gray-300"
            )}
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
        </div>

        {/* Official Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Official Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@recruitment.com"
            className={cn(
              "w-full px-4 py-2.5 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all",
              errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
            )}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        {/* Phone */}
        <PhoneInput
          value={phone}
          onChange={setPhone}
          countryCode={countryCode}
          onCountryCodeChange={setCountryCode}
          error={errors.phone}
        />

        {/* Password */}
        <PasswordInput
          value={password}
          onChange={setPassword}
          error={errors.password}
        />
        <PasswordStrengthIndicator password={password} />

        {/* Confirm Password */}
        <PasswordInput
          value={confirmPassword}
          onChange={setConfirmPassword}
          label="Confirm Password"
          placeholder="Re-enter your password"
          error={errors.confirmPassword}
        />

        {/* Terms */}
        <div className="space-y-2">
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="w-4 h-4 mt-1 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
            />
            <span className="text-sm text-gray-600">
              I accept the{" "}
              <Link href="/terms" className="text-brand-600 hover:text-brand-700">
                Terms & Conditions
              </Link>
            </span>
          </label>
          {errors.terms && <p className="text-sm text-red-600">{errors.terms}</p>}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          className="w-full"
        >
          Create Account
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-brand-600 hover:text-brand-700 font-medium">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
