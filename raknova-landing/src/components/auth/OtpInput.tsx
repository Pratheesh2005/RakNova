import { useRef, useEffect, KeyboardEvent, ClipboardEvent } from "react";
import { cn } from "@/utils/cn";

interface OtpInputProps {
  length?: number;
  value: string[];
  onChange: (otp: string[]) => void;
  error?: string | null;
}

export function OtpInput({ length = 6, value, onChange, error }: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const newOtp = [...value];
    newOtp[index] = val;
    onChange(newOtp);
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    const newOtp = [...value];
    for (let i = 0; i < length; i++) {
      newOtp[i] = pasted[i] || "";
    }
    onChange(newOtp);
    const focusIndex = Math.min(pasted.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div>
      <div className="flex gap-2 justify-center">
        {Array.from({ length }, (_, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[i] || ""}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={i === 0 ? handlePaste : undefined}
            className={cn(
              "w-12 h-14 text-center text-xl font-semibold border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all",
              error ? "border-red-300 bg-red-50" : "border-gray-300"
            )}
          />
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-red-600 text-center">{error}</p>}
    </div>
  );
}
