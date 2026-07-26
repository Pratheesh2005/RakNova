import { useState, useEffect } from "react";

interface SalaryRangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export function SalaryRangeSlider({ min, max, step = 100000, value, onChange }: SalaryRangeSliderProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), localValue[1] - step);
    const newValue: [number, number] = [newMin, localValue[1]];
    setLocalValue(newValue);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), localValue[0] + step);
    const newValue: [number, number] = [localValue[0], newMax];
    setLocalValue(newValue);
  };

  const formatLPA = (val: number) => `₹${(val / 100000).toFixed(0)} LPA`;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{formatLPA(localValue[0])}</span>
        <span className="text-sm text-gray-400">—</span>
        <span className="text-sm font-medium text-gray-700">{formatLPA(localValue[1])}</span>
      </div>

      <div className="relative h-2 bg-gray-200 rounded-full">
        <div
          className="absolute h-2 bg-brand-500 rounded-full"
          style={{
            left: `${((localValue[0] - min) / (max - min)) * 100}%`,
            right: `${100 - ((localValue[1] - min) / (max - min)) * 100}%`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue[0]}
          onChange={(e) => { handleMinChange(e); onChange([Math.min(Number(e.target.value), localValue[1] - step), localValue[1]]); }}
          className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-brand-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue[1]}
          onChange={(e) => { handleMaxChange(e); onChange([localValue[0], Math.max(Number(e.target.value), localValue[0] + step)]); }}
          className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-brand-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
        />
      </div>
    </div>
  );
}
