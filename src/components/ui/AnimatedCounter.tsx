import { useCounter } from "@/hooks/useCounter";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
}

export function AnimatedCounter({ end, suffix, prefix, duration, label }: AnimatedCounterProps) {
  const { count, ref } = useCounter({ end, duration });

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-brand-600">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-2 text-gray-500 font-medium">{label}</div>
    </div>
  );
}
