import { cn } from "@/utils/cn";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "brand" | "green" | "yellow" | "red";
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  size = "md",
  color = "brand",
  className,
}: ProgressBarProps) {
  const percentage = Math.round((value / max) * 100);

  const sizes = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  const colors = {
    brand: "bg-brand-600",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };

  return (
    <div className={className}>
      {(label || showPercentage) && (
        <div className="flex justify-between mb-1">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercentage && <span className="text-sm text-gray-500">{percentage}%</span>}
        </div>
      )}
      <div className={cn("w-full bg-gray-200 rounded-full overflow-hidden", sizes[size])}>
        <div
          className={cn("rounded-full transition-all duration-500 ease-out", sizes[size], colors[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
