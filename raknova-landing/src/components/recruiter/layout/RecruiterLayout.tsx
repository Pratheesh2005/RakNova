import { ReactNode } from "react";
import { RecruiterSidebar } from "./RecruiterSidebar";
import { RecruiterTopNav } from "./RecruiterTopNav";
import { FloatingAI } from "@/components/ui/FloatingAI";

interface RecruiterLayoutProps {
  children: ReactNode;
}

export function RecruiterLayout({ children }: RecruiterLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <RecruiterSidebar />
      <div className="lg:pl-72">
        <RecruiterTopNav />
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
      <FloatingAI />
    </div>
  );
}
