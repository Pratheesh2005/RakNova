import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-accent-500/5 flex flex-col">
      <header className="absolute top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/RakNovaLogo.jpg"
              alt="RakNova"
              width={36}
              height={36}
              className="h-9 w-auto"
            />
            <span className="text-lg font-bold text-gray-900 font-heading">
              RakNova
            </span>
          </div>
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-brand-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-lg text-center"
        >
          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/RakNovaLogo.jpg"
              alt="RakNova"
              width={64}
              height={64}
              className="h-16 w-auto mx-auto"
            />
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Welcome to{" "}
            <span className="text-brand-600">RakNova</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto">
            AI-powered workforce intelligence platform connecting talent with opportunities.
          </p>

          {/* Decorative line */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-brand-200" />
            <div className="w-2 h-2 rounded-full bg-brand-500" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-brand-200" />
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/auth/login">
              Login
            </Button>
            <Button variant="secondary" size="lg" href="/auth/account-type">
              Create Account
            </Button>
          </div>

          <p className="mt-8 text-sm text-gray-400">
            Secure, intelligent, and built for modern recruitment.
          </p>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} RakNova. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-gray-600 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-gray-600 transition-colors">
              Terms & Conditions
            </a>
            <a href="mailto:support@raknova.com" className="hover:text-gray-600 transition-colors">
              Contact Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
