import { ErrorState } from "@/components/auth/ErrorState";
import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found — RakNova</title>
      </Head>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <ErrorState
            title="Page Not Found"
            message="The page you're looking for doesn't exist or has been moved. Let's get you back on track."
            buttonLabel="Back to Home"
            buttonHref="/"
            icon={
              <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            }
          />
        </div>
      </div>
    </>
  );
}
