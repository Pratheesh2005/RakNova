import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { PhoneInput } from "@/components/auth/PhoneInput";
import { DemoAccountsPanel } from "@/components/auth/DemoAccountsPanel";
import { DeveloperPanel } from "@/components/dev/DeveloperPanel";
import { validateEmail, validatePhone, validateRequired } from "@/utils/validation";
import { login, getDashboardRoute } from "@/services/authService";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

type LoginMethod = "email" | "phone";

const featureHighlights = [
  { icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", label: "AI Resume Screening" },
  { icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z", label: "Smart Candidate Matching" },
  { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", label: "Recruitment Analytics" },
  { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "Secure Cloud Platform" },
];

export default function LoginPage() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Record<string, string | null> = {};
    if (loginMethod === "email") {
      newErrors.email = validateEmail(email);
      newErrors.password = validateRequired(password, "Password");
    } else {
      newErrors.phone = validatePhone(phone);
    }
    setErrors(newErrors);
    return !Object.values(newErrors).some((e) => e !== null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!validate()) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (loginMethod === "email") {
      const user = login(email, password);

      if (user) {
        const route = getDashboardRoute(user.role);
        router.push(route);
      } else {
        setLoginError("Invalid email or password. Please try again.");
      }
    } else {
      // Phone login - simulated
      router.push("/auth/otp-verification");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-white">
        <header className="border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/RakNovaLogo.jpg" alt="RakNova" width={36} height={36} className="h-9 w-auto" />
              <span className="text-lg font-bold text-gray-900 font-heading">RakNova</span>
            </Link>
            <Link href="/" className="text-sm text-gray-500 hover:text-brand-600 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </header>

        <main className="flex-1 flex">
          {/* Left Side */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
            </div>
            <div className="relative z-10 flex flex-col justify-center px-12 lg:px-16 xl:px-20 w-full">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="text-3xl xl:text-4xl font-extrabold leading-tight">
                  Welcome Back to <span className="text-brand-200">RakNova</span>
                </h1>
                <p className="mt-4 text-lg text-brand-100 leading-relaxed max-w-md">
                  Access your AI-powered recruitment platform and continue hiring smarter with intelligent candidate matching.
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-10 space-y-4">
                {featureHighlights.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-brand-100">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} /></svg>
                    </div>
                    <span className="text-sm font-medium">{feature.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex-1 flex items-center justify-center px-4 py-12 lg:px-12 xl:px-20 bg-white">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-md">
              <div className="lg:hidden text-center mb-8">
                <Image src="/RakNovaLogo.jpg" alt="RakNova" width={48} height={48} className="h-12 w-auto mx-auto" />
                <h1 className="mt-4 text-2xl font-bold text-gray-900">Welcome Back</h1>
                <p className="mt-2 text-gray-600">Sign in to your RakNova account</p>
              </div>

              <div className="hidden lg:block mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
                <p className="mt-1 text-gray-600">Enter your credentials to access your account</p>
              </div>

              <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                <button onClick={() => setLoginMethod("email")} className={cn("flex-1 py-2 text-sm font-medium rounded-md transition-all", loginMethod === "email" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700")}>Email</button>
                <button onClick={() => setLoginMethod("phone")} className={cn("flex-1 py-2 text-sm font-medium rounded-md transition-all", loginMethod === "phone" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700")}>Phone Number</button>
              </div>

              {loginError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center gap-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {loginError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {loginMethod === "email" ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input id="email-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={cn("w-full px-4 py-2.5 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all", errors.email ? "border-red-300 bg-red-50" : "border-gray-300")} />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                    <PasswordInput value={password} onChange={setPassword} error={errors.password} />
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                        <span className="text-sm text-gray-600">Remember me</span>
                      </label>
                      <Link href="/auth/forgot-password" className="text-sm text-brand-600 hover:text-brand-700 font-medium">Forgot Password?</Link>
                    </div>
                  </>
                ) : (
                  <PhoneInput value={phone} onChange={setPhone} countryCode={countryCode} onCountryCodeChange={setCountryCode} error={errors.phone} />
                )}

                <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
                  {loading ? "Signing you in..." : "Login"}
                </Button>

                <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  Your information is securely encrypted
                </p>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
                  <div className="relative flex justify-center text-sm"><span className="bg-white px-4 text-gray-400">or continue with</span></div>
                </div>

                <Button type="button" variant="outline" size="lg" className="w-full">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                  Continue with Google
                </Button>

                <p className="text-center text-sm text-gray-600 mt-6">
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/account-type" className="text-brand-600 hover:text-brand-700 font-medium">Create New Account</Link>
                </p>
              </form>

              {/* Demo Accounts Panel */}
              <DemoAccountsPanel />
            </motion.div>
          </div>
        </main>

        <footer className="border-t border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-400">
            <p>© {new Date().getFullYear()} RakNova. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-gray-600">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-gray-600">Terms & Conditions</Link>
              <a href="mailto:support@raknova.com" className="hover:text-gray-600">Contact Support</a>
            </div>
          </div>
        </footer>
      </div>

      {/* Developer Panel (Dev Only) */}
      <DeveloperPanel />
    </>
  );
}
