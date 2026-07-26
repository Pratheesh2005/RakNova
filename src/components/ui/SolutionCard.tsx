import { cn } from "@/utils/cn";

interface SolutionCardProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
  className?: string;
}

export function SolutionCard({ icon, title, items, className }: SolutionCardProps) {
  return (
    <div
      className={cn(
        "p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100",
        className
      )}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-accent-500/10 text-accent-500">
        {icon}
      </div>
      <h3 className="mt-5 text-xl font-semibold text-gray-900">{title}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start text-gray-600">
            <svg
              className="w-5 h-5 mr-2 text-green-500 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
