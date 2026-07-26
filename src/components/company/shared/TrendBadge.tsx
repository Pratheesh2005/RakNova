import { cn } from "@/utils/cn";

interface TrendBadgeProps {
  change: number; // positive = up, negative = down, 0 = unchanged
}

export function TrendBadge({ change }: TrendBadgeProps) {
  if (change === 0) return null;

  const isPositive = change > 0;
  const styles = isPositive
    ? "text-green-700 bg-green-50"
    : "text-red-700 bg-red-50";
  const arrow = isPositive ? "↑" : "↓";

  return (
    <span className={cn("inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-medium", styles)}>
      <span className="text-xs">{arrow}</span>
      {Math.abs(change)}%
    </span>
  );
}
