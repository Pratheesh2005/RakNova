import { achievements } from "@/data/candidate/assistant";
import { cn } from "@/utils/cn";

export function AIAchievements() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🏆</span>
        <h3 className="text-lg font-semibold text-gray-900">AI Achievements</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {achievements.map((achievement, idx) => (
          <div
            key={idx}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-xl text-center border transition-all",
              achievement.earned
                ? "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 hover:shadow-md"
                : "bg-gray-50 border-gray-100 opacity-50"
            )}
          >
            <span className="text-3xl">{achievement.icon}</span>
            <p className="text-sm font-semibold text-gray-900">{achievement.title}</p>
            <p className="text-xs text-gray-500">{achievement.description}</p>
            {achievement.earned ? (
              <span className="text-xs text-yellow-600 font-medium px-2 py-0.5 bg-yellow-100 rounded-full">
                🌟 Earned
              </span>
            ) : (
              <span className="text-xs text-gray-400">🔒 Locked</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
