import { useState } from "react";
import { SearchInput } from "@/components/ui/SearchInput";
import { Button } from "@/components/ui/Button";

interface SavedJobFiltersProps {
  onFilter: (filters: any) => void;
}

const workModeOptions = ["All", "Remote", "Hybrid", "On-site"];
const experienceOptions = ["All", "Fresher", "1–2 Years", "3–5 Years", "5+ Years"];
const jobTypeOptions = ["All", "Full Time", "Part Time", "Internship", "Contract", "Freelance"];
const matchOptions = ["All", "90%+", "80%+", "70%+", "Below 70%"];
const savedOptions = ["All", "Today", "Yesterday", "Last Week", "Last Month"];

export function SavedJobFilters({ onFilter }: SavedJobFiltersProps) {
  const [search, setSearch] = useState("");
  const [workMode, setWorkMode] = useState("All");
  const [experience, setExperience] = useState("All");
  const [jobType, setJobType] = useState("All");
  const [match, setMatch] = useState("All");
  const [savedDate, setSavedDate] = useState("All");

  const handleApply = () => {
    onFilter({ search, workMode, experience, jobType, match, savedDate });
  };

  const handleClear = () => {
    setSearch("");
    setWorkMode("All");
    setExperience("All");
    setJobType("All");
    setMatch("All");
    setSavedDate("All");
  };

  const SelectFilter = ({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) => (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button onClick={handleClear} className="text-sm text-brand-600 hover:text-brand-700 font-medium">Clear All</button>
      </div>

      <SearchInput value={search} onChange={setSearch} placeholder="Search saved jobs..." />

      <div className="grid grid-cols-2 gap-4">
        <SelectFilter label="Work Mode" value={workMode} options={workModeOptions} onChange={setWorkMode} />
        <SelectFilter label="Experience" value={experience} options={experienceOptions} onChange={setExperience} />
        <SelectFilter label="Job Type" value={jobType} options={jobTypeOptions} onChange={setJobType} />
        <SelectFilter label="AI Match" value={match} options={matchOptions} onChange={setMatch} />
        <SelectFilter label="Date Saved" value={savedDate} options={savedOptions} onChange={setSavedDate} />
      </div>

      <Button variant="primary" size="sm" className="w-full" onClick={handleApply}>Apply Filters</Button>
    </div>
  );
}
