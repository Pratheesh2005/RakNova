import { cn } from "@/utils/cn";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-brand-200",
        className
      )}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-brand-50 text-brand-600 group-hover:bg-brand-100 transition-colors">
        {icon}
      </div>
      <h3 className="mt-5 text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
