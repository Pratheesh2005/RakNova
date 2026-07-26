import { AuthLayout } from "@/components/auth/AuthLayout";
import { SuccessState } from "@/components/auth/SuccessState";

export default function EmailVerifiedPage() {
  return (
    <AuthLayout title="" subtitle="" showBackToHome={false}>
      <SuccessState
        title="Email Verified Successfully"
        message="Your email has been confirmed. You can now access all features of RakNova."
        buttonLabel="Continue to Login"
        buttonHref="/auth/login"
        icon={
          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        }
      />
    </AuthLayout>
  );
}
