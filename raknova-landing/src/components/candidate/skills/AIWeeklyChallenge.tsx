import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { weeklyChallenge } from "@/data/candidate/skills";

export function AIWeeklyChallenge() {
  return (
    <div className="bg-gradient-to-r from-brand-50 to-purple-50 rounded-2xl border border-brand-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">🏆 {weeklyChallenge.title}</h3>
          <p className="text-sm text-gray-500">Complete all tasks to earn: <span className="font-semibold text-brand-700">{weeklyChallenge.reward}</span></p>
        </div>
        <span className="text-sm font-bold text-brand-600">{weeklyChallenge.completed}/{weeklyChallenge.total}</span>
      </div>
      <ProgressBar value={(weeklyChallenge.completed / weeklyChallenge.total) * 100} size="md" color="brand" className="mb-4" />
      <div className="space-y-2">
        {weeklyChallenge.tasks.map((task, idx) => (
          <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl">
            <div className={`w-5 h-5 rounded-md flex items-center justify-center ${idx < weeklyChallenge.completed ? "bg-green-100" : "bg-gray-100"}`}>
              {idx < weeklyChallenge.completed ? (
                <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              ) : (
                <div className="w-2 h-2 bg-gray-400 rounded-full" />
              )}
            </div>
            <span className={`text-sm ${idx < weeklyChallenge.completed ? "text-gray-500 line-through" : "text-gray-700"}`}>{task}</span>
          </div>
        ))}
      </div>
      <Button variant="primary" size="sm" className="mt-4">View All Challenges</Button>
    </div>
  );
}
