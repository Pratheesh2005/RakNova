import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showBackToHome?: boolean;
}

export function AuthLayout({
  children,
  title,
  subtitle,
  showBackToHome = true,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen auth-bg flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
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
          </Link>
          {showBackToHome && (
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-brand-600 transition-colors"
            >
              ← Back to Home
            </Link>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-gray-600">{subtitle}</p>
            )}
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {children}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} RakNova. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-600 transition-colors">
              Terms & Conditions
            </Link>
            <a href="mailto:support@raknova.com" className="hover:text-gray-600 transition-colors">
              Contact Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
