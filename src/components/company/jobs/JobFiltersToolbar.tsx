import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

interface JobFiltersToolbarProps {
  search: string;
  onSearchChange: (val: string) => void;
  status: string;
  onStatusChange: (val: string) => void;
  department: string;
  onDepartmentChange: (val: string) => void;
  sort: string;
  onSortChange: (val: string) => void;
}

const statusOptions = ["All", "Active", "Draft", "Paused", "Closed"];
const departmentOptions = ["All Departments", "Engineering", "AI/ML", "Infrastructure", "Design", "Analytics"];
const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "applications", label: "Most Applications" },
  { value: "closing", label: "Closing Soon" },
];

export function JobFiltersToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  department,
  onDepartmentChange,
  sort,
  onSortChange,
}: JobFiltersToolbarProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      {/* Search */}
      <div className="relative flex-1 w-full">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by job title, department, location..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Status Tabs */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
        {statusOptions.map((opt) => (
          <button
            key={opt}
            onClick={() => onStatusChange(opt)}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
              status === opt ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Department Filter */}
      <select
        value={department}
        onChange={(e) => onDepartmentChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {departmentOptions.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>

      {/* Sort */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-500 whitespace-nowrap">Sort by:</span>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
