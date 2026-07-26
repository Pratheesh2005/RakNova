const resources = [
  { icon: "📊", label: "DSA Sheet", desc: "Top 100 coding problems", color: "bg-red-50 text-red-600" },
  { icon: "🗄️", label: "SQL Questions", desc: "50 most asked SQL queries", color: "bg-blue-50 text-blue-600" },
  { icon: "🐍", label: "Python Revision", desc: "Quick Python refresher", color: "bg-green-50 text-green-600" },
  { icon: "🤖", label: "ML Notes", desc: "Machine Learning cheatsheet", color: "bg-purple-50 text-purple-600" },
  { icon: "💬", label: "Behavioral Q&A", desc: "STAR method examples", color: "bg-yellow-50 text-yellow-600" },
  { icon: "🏗️", label: "System Design", desc: "Frontend system design guide", color: "bg-indigo-50 text-indigo-600" },
  { icon: "📄", label: "Resume Revision", desc: "ATS-friendly resume tips", color: "bg-pink-50 text-pink-600" },
  { icon: "🎯", label: "Company Questions", desc: "Recently asked questions", color: "bg-orange-50 text-orange-600" },
];

export function InterviewResources() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 Interview Resources</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {resources.map((resource) => (
          <button
            key={resource.label}
            className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-center border border-gray-100 hover:border-gray-200"
          >
            <div className={`w-10 h-10 ${resource.color} rounded-xl flex items-center justify-center text-lg`}>
              {resource.icon}
            </div>
            <p className="text-sm font-semibold text-gray-900">{resource.label}</p>
            <p className="text-xs text-gray-500">{resource.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
