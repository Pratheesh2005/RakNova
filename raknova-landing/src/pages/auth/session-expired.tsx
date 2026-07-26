import { AuthLayout } from "@/components/auth/AuthLayout";
import { ErrorState } from "@/components/auth/ErrorState";

export default function SessionExpiredPage() {
  return (
    <AuthLayout title="" subtitle="" showBackToHome={false}>
      <ErrorState
        title="Session Expired"
        message="Your session has timed out due to inactivity. Please log in again to continue."
        buttonLabel="Login Again"
        buttonHref="/auth/login"
        icon={
          <div className="w-20 h-20 mx-auto bg-yellow-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        }
      />
    </AuthLayout>
  );
}
