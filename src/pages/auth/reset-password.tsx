import { useState } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { PasswordStrengthIndicator } from "@/components/auth/PasswordStrengthIndicator";
import { validatePassword, validateConfirmPassword } from "@/utils/validation";
import { useRouter } from "next/router";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string | null> = {
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e !== null)) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <AuthLayout title="" subtitle="" showBackToHome={false}>
        <div className="text-center">
          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Password Reset Successful</h2>
          <p className="mt-2 text-gray-600">Your password has been updated. You can now log in with your new password.</p>
          <div className="mt-8">
            <Button variant="primary" size="lg" href="/auth/login">
              Go to Login
            </Button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Create a new secure password"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <PasswordInput
          value={password}
          onChange={setPassword}
          label="New Password"
          placeholder="Enter new password"
          error={errors.password}
        />
        <PasswordStrengthIndicator password={password} />

        <PasswordInput
          value={confirmPassword}
          onChange={setConfirmPassword}
          label="Confirm Password"
          placeholder="Re-enter new password"
          error={errors.confirmPassword}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          className="w-full"
        >
          Save Password
        </Button>
      </form>
    </AuthLayout>
  );
}
