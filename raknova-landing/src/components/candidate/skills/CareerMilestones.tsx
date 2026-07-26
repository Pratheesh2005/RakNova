import { milestones } from "@/data/candidate/skills";
import { cn } from "@/utils/cn";

export function CareerMilestones() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Career Milestones</h3>
      <div className="relative">
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200" />
        <div className="space-y-4">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative pl-10">
              <div className={cn("absolute left-1 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center", m.achieved ? "border-green-500 bg-green-100" : "border-gray-300 bg-white")}>
                {m.achieved && <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
              </div>
              <div className={cn("p-3 rounded-xl", m.achieved ? "bg-green-50" : "bg-gray-50")}>
                <div className="flex items-center gap-2">
                  <span>{m.icon}</span>
                  <span className="text-sm font-semibold text-gray-900">{m.title}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{m.description}</p>
                <p className="text-xs text-gray-400 mt-0.5">{new Date(m.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
