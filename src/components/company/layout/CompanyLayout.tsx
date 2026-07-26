import { ReactNode } from "react";
import { CompanySidebar } from "./CompanySidebar";
import { CompanyTopNav } from "./CompanyTopNav";
import { FloatingAI } from "@/components/ui/FloatingAI";

interface CompanyLayoutProps {
  children: ReactNode;
}

export function CompanyLayout({ children }: CompanyLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <CompanySidebar />
      <div className="lg:pl-72">
        <CompanyTopNav />
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
      <FloatingAI />
    </div>
  );
}
