const formats = [
  { label: "PDF", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", color: "text-red-500", bg: "bg-red-50" },
  { label: "DOC", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", color: "text-blue-500", bg: "bg-blue-50" },
  { label: "DOCX", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", color: "text-blue-600", bg: "bg-blue-50" },
];

export function SupportedFormats() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Supported Formats</h3>
      <div className="flex gap-3">
        {formats.map((fmt) => (
          <div key={fmt.label} className={`flex-1 ${fmt.bg} rounded-xl p-4 text-center`}>
            <svg className={`w-7 h-7 ${fmt.color} mx-auto mb-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={fmt.icon} />
            </svg>
            <p className="text-sm font-semibold text-gray-900">{fmt.label}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 text-center mt-3">Maximum file size: 5 MB</p>
    </div>
  );
}
