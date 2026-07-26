import { cn } from "@/utils/cn";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  countryCode: string;
  onCountryCodeChange: (code: string) => void;
  error?: string | null;
  label?: string;
  className?: string;
}

const countryCodes = [
  { code: "+1", label: "US" },
  { code: "+91", label: "IN" },
  { code: "+44", label: "UK" },
  { code: "+61", label: "AU" },
  { code: "+81", label: "JP" },
  { code: "+49", label: "DE" },
  { code: "+33", label: "FR" },
  { code: "+86", label: "CN" },
  { code: "+55", label: "BR" },
  { code: "+7", label: "RU" },
];

export function PhoneInput({
  value,
  onChange,
  countryCode,
  onCountryCodeChange,
  error,
  label = "Phone Number",
  className,
}: PhoneInputProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex gap-2">
        <select
          value={countryCode}
          onChange={(e) => onCountryCodeChange(e.target.value)}
          className="px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all w-[110px]"
        >
          {countryCodes.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label} {c.code}
            </option>
          ))}
        </select>
        <input
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Phone number"
          className={cn(
            "flex-1 px-4 py-2.5 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all",
            error ? "border-red-300 bg-red-50" : "border-gray-300"
          )}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
