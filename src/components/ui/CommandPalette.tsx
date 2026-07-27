import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

interface SearchItem {
  id: string;
  label: string;
  category: string;
  url: string;
}

const allSearchItems: SearchItem[] = [
  { id: "1", label: "Priya Sharma", category: "Candidate", url: "/company/candidates" },
  { id: "2", label: "Arun Kumar", category: "Candidate", url: "/company/candidates" },
  { id: "3", label: "Senior Frontend Developer", category: "Job", url: "/company/jobs" },
  { id: "4", label: "ML Engineer", category: "Job", url: "/company/jobs" },
  { id: "5", label: "Interview: Priya Sharma", category: "Interview", url: "/company/interviews" },
  { id: "6", label: "Dashboard", category: "Navigation", url: "/company" },
  { id: "7", label: "Candidate Management", category: "Navigation", url: "/company/candidates" },
  { id: "8", label: "Job Management", category: "Navigation", url: "/company/jobs" },
  { id: "9", label: "Recruitment Pipeline", category: "Navigation", url: "/company/pipeline" },
  { id: "10", label: "Interview Management", category: "Navigation", url: "/company/interviews" },
  { id: "11", label: "Hiring Analytics", category: "Navigation", url: "/company/analytics" },
  { id: "12", label: "AI Candidate Matching", category: "Navigation", url: "/company/ai-matching" },
  { id: "13", label: "Team Management", category: "Navigation", url: "/company/team" },
  { id: "14", label: "Company Profile", category: "Navigation", url: "/company/profile" },
  { id: "15", label: "Notifications", category: "Navigation", url: "/company/notifications" },
  { id: "16", label: "Settings", category: "Navigation", url: "/company/settings" },
];

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onClose(); // parent toggles
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const filteredItems = query
    ? allSearchItems.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : allSearchItems.slice(0, 8);

  const handleSelect = (url: string) => {
    onClose();
    router.push(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search candidates, jobs, interviews..."
                className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
              />
              <kbd className="px-2 py-0.5 text-xs text-gray-400 bg-gray-100 border border-gray-200 rounded font-mono">ESC</kbd>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {filteredItems.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No results found.</p>
              )}
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.url)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm font-medium text-blue-700">
                    {item.category.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                  <span className="ml-auto text-xs text-gray-400">↵</span>
                </button>
              ))}
            </div>
            <div className="border-t border-gray-100 px-4 py-2 flex items-center gap-2 text-xs text-gray-400">
              <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-gray-100 border rounded text-[10px]">↑↓</kbd> Navigate</span>
              <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-gray-100 border rounded text-[10px]">↵</kbd> Open</span>
              <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-gray-100 border rounded text-[10px]">Esc</kbd> Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
