import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchInput";
import { SalaryRangeSlider } from "./SalaryRangeSlider";
import { locationOptions, industryOptions, experienceOptions, jobTypeOptions, workModeOptions, companySizeOptions, postedOptions } from "@/data/candidate/jobs";
import { cn } from "@/utils/cn";

interface JobFiltersProps {
  onFilter: (filters: any) => void;
}

export function JobFilters({ onFilter }: JobFiltersProps) {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [workType, setWorkType] = useState<string[]>([]);
  const [jobType, setJobType] = useState<string[]>([]);
  const [experience, setExperience] = useState("All Experience");
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 3000000]);
  const [industry, setIndustry] = useState("All Industries");
  const [companySize, setCompanySize] = useState("All Sizes");
  const [postedDate, setPostedDate] = useState("Any Time");

  const toggleFilter = (current: string[], value: string, setter: (val: string[]) => void) => {
    if (current.includes(value)) {
      setter(current.filter((v) => v !== value));
    } else {
      setter([...current, value]);
    }
  };

  const handleApply = () => {
    onFilter({ keyword, location, workType, jobType, experience, salaryRange, industry, companySize, postedDate });
  };

  const handleClear = () => {
    setKeyword("");
    setLocation("All Locations");
    setWorkType([]);
    setJobType([]);
    setExperience("All Experience");
    setSalaryRange([0, 3000000]);
    setIndustry("All Industries");
    setCompanySize("All Sizes");
    setPostedDate("Any Time");
  };

  const FilterSection = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <h4 className="text-sm font-semibold text-gray-700 mb-3">{label}</h4>
      {children}
    </div>
  );

  const ChipGroup = ({ options, selected, onToggle }: { options: string[]; selected: string[]; onToggle: (val: string) => void }) => (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onToggle(opt)}
          className={cn(
            "px-3 py-1.5 text-xs rounded-lg border transition-all",
            selected.includes(opt)
              ? "border-brand-500 bg-brand-50 text-brand-700 font-medium"
              : "border-gray-200 text-gray-600 hover:border-gray-300"
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button onClick={handleClear} className="text-sm text-brand-600 hover:text-brand-700 font-medium">Clear All</button>
      </div>

      <SearchInput value={keyword} onChange={setKeyword} placeholder="Job title, company, skills..." />

      <FilterSection label="Job Type">
        <ChipGroup options={jobTypeOptions.slice(1)} selected={jobType} onToggle={(v) => toggleFilter(jobType, v, setJobType)} />
      </FilterSection>

      <FilterSection label="Work Mode">
        <ChipGroup options={workModeOptions.slice(1)} selected={workType} onToggle={(v) => toggleFilter(workType, v, setWorkType)} />
      </FilterSection>

      <FilterSection label="Experience">
        <div className="space-y-1">
          {experienceOptions.slice(1).map((opt) => (
            <label key={opt} className="flex items-center gap-2 py-1 cursor-pointer">
              <input
                type="radio"
                name="experience"
                checked={experience === opt}
                onChange={() => setExperience(opt)}
                className="w-4 h-4 text-brand-600 focus:ring-brand-500"
              />
              <span className="text-sm text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection label="Salary Range">
        <SalaryRangeSlider min={0} max={3000000} step={100000} value={salaryRange} onChange={setSalaryRange} />
      </FilterSection>

      <FilterSection label="Location">
        <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
          {locationOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </FilterSection>

      <FilterSection label="Industry">
        <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
          {industryOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </FilterSection>

      <FilterSection label="Company Size">
        <div className="space-y-1">
          {companySizeOptions.slice(1).map((opt) => (
            <label key={opt} className="flex items-center gap-2 py-1 cursor-pointer">
              <input
                type="radio"
                name="companySize"
                checked={companySize === opt}
                onChange={() => setCompanySize(opt)}
                className="w-4 h-4 text-brand-600 focus:ring-brand-500"
              />
              <span className="text-sm text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection label="Posted Date">
        <select value={postedDate} onChange={(e) => setPostedDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
          {postedOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </FilterSection>

      <Button variant="primary" size="md" className="w-full" onClick={handleApply}>
        Apply Filters
      </Button>
    </div>
  );
}
