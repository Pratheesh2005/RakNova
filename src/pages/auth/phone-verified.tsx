import { AuthLayout } from "@/components/auth/AuthLayout";
import { SuccessState } from "@/components/auth/SuccessState";

export default function PhoneVerifiedPage() {
  return (
    <AuthLayout title="" subtitle="" showBackToHome={false}>
      <SuccessState
        title="Phone Verified Successfully"
        message="Your phone number has been confirmed. You can now access all features of RakNova."
        buttonLabel="Continue"
        buttonHref="/auth/login"
        icon={
          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
        }
      />
    </AuthLayout>
  );
}
