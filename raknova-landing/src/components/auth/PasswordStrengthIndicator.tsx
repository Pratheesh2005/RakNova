import { getPasswordStrength } from "@/utils/validation";

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  if (!password) return null;

  const { score, label, color } = getPasswordStrength(password);
  const segments = 6;

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {Array.from({ length: segments }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i < score ? color : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <p className="mt-1 text-xs text-gray-500">Password strength: <span className="font-medium">{label}</span></p>
    </div>
  );
}
