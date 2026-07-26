import { knowledgeLibrary } from "@/data/candidate/assistant";

export function KnowledgeLibrary() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">📚</span>
        <h3 className="text-lg font-semibold text-gray-900">AI Knowledge Library</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {knowledgeLibrary.map((lib) => (
          <button
            key={lib.category}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all text-center hover:scale-[1.02] ${lib.color}`}
          >
            <span className="text-2xl">{lib.icon}</span>
            <p className="text-sm font-semibold text-gray-900">{lib.category}</p>
            <div className="space-y-0.5">
              {lib.articles.slice(0, 2).map((article, i) => (
                <p key={i} className="text-xs text-gray-500">
                  {article}
                </p>
              ))}
              {lib.articles.length > 2 && (
                <p className="text-xs text-brand-600 font-medium">
                  +{lib.articles.length - 2} more
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
