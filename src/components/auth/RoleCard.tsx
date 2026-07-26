import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface RoleCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export function RoleCard({ icon, title, description, selected, onClick }: RoleCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-6 rounded-2xl border-2 text-left transition-all duration-200 w-full",
        selected
          ? "border-brand-500 bg-brand-50 shadow-md"
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
      )}
    >
      <div
        className={cn(
          "w-12 h-12 flex items-center justify-center rounded-xl mb-4 transition-colors",
          selected ? "bg-brand-100 text-brand-600" : "bg-gray-100 text-gray-600"
        )}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
    </button>
  );
}
