import { useState } from "react";
import { todayInterviews, upcomingInterviews, RecruiterInterview } from "@/data/recruiter/interviewSchedule";
import { cn } from "@/utils/cn";

// Simple weekly view starting from Monday July 27, 2026 (for demo)
const days = [
  { label: "Mon 27", date: "2026-07-27" },
  { label: "Today 28", date: "2026-07-28", isToday: true },
  { label: "Wed 29", date: "2026-07-29" },
  { label: "Thu 30", date: "2026-07-30" },
  { label: "Fri 31", date: "2026-07-31" },
];

export function InterviewCalendar() {
  const [selectedDay, setSelectedDay] = useState(days[1]); // Today

  const allInterviews = [...todayInterviews, ...upcomingInterviews];
  const filteredInterviews = allInterviews.filter((i) => i.date === selectedDay.date);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Interview Calendar</h2>
        <div className="flex gap-2">
          {["Weekly", "Monthly"].map((view) => (
            <button
              key={view}
              className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200"
            >
              {view}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        {days.map((day) => (
          <button
            key={day.date}
            onClick={() => setSelectedDay(day)}
            className={cn(
              "flex-1 p-2 rounded-lg text-xs font-medium transition-all",
              selectedDay.date === day.date
                ? "bg-blue-600 text-white shadow-sm"
                : day.isToday
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            )}
          >
            {day.label}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {filteredInterviews.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">No interviews on this day.</p>
        ) : (
          filteredInterviews.map((interview) => (
            <div key={interview.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">{interview.candidate} — {interview.appliedRole}</p>
                <p className="text-xs text-gray-500">{interview.time} | {interview.interviewRound} | {interview.interviewMode}</p>
              </div>
              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{interview.status}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
