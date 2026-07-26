import { AuthLayout } from "@/components/auth/AuthLayout";
import { ErrorState } from "@/components/auth/ErrorState";

export default function AccessDeniedPage() {
  return (
    <AuthLayout title="" subtitle="" showBackToHome={false}>
      <ErrorState
        title="Access Denied"
        message="You don't have permission to access this page. Please contact your administrator if you believe this is a mistake."
        buttonLabel="Go Back"
        buttonHref="/"
        icon={
          <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
        }
      />
    </AuthLayout>
  );
}
