import { cn } from "@/utils/cn";

interface AICapabilityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function AICapabilityCard({ icon, title, description, className }: AICapabilityCardProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow transition-all border border-gray-100",
        className
      )}
    >
      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-brand-50 text-brand-600">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
        <p className="mt-1 text-gray-600">{description}</p>
      </div>
    </div>
  );
}
