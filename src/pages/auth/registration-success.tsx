import { AuthLayout } from "@/components/auth/AuthLayout";
import { SuccessState } from "@/components/auth/SuccessState";

export default function RegistrationSuccessPage() {
  return (
    <AuthLayout
      title=""
      subtitle=""
      showBackToHome={false}
    >
      <SuccessState
        title="Registration Successful!"
        message="Your account has been created. Please check your email to verify your account, then you can log in and get started."
        buttonLabel="Go to Login"
        buttonHref="/auth/login"
        icon={
          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        }
      />
    </AuthLayout>
  );
}
