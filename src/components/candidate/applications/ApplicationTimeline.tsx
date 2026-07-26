import { TimelineEvent } from "@/data/candidate/applications";

interface ApplicationTimelineProps {
  timeline: TimelineEvent[];
}

export function ApplicationTimeline({ timeline }: ApplicationTimelineProps) {
  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />

      <div className="space-y-6">
        {timeline.map((event, idx) => (
          <div key={idx} className="relative pl-12">
            {/* Dot */}
            <div className={`absolute left-2.5 top-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              idx === timeline.length - 1
                ? "border-brand-500 bg-brand-100"
                : "border-gray-300 bg-white"
            }`}>
              {idx === timeline.length - 1 && (
                <div className="w-2 h-2 bg-brand-500 rounded-full" />
              )}
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">{event.icon}</span>
                <span className="font-semibold text-gray-900">{event.status}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                <span>📅 {event.date}</span>
                <span>🕐 {event.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
