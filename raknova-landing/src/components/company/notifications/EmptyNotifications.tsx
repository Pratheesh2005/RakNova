import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function EmptyNotifications() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
      <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900">No new notifications</h3>
      <p className="text-sm text-gray-500 mt-1">You're all caught up.</p>
      <Link href="/company">
        <Button variant="primary" size="sm" className="mt-4">
          Return to Dashboard
        </Button>
      </Link>
    </div>
  );
}
