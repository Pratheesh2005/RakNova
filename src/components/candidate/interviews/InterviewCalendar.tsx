import { useState } from "react";
import { allInterviews } from "@/data/candidate/interviews";
import { cn } from "@/utils/cn";
import { Badge } from "@/components/ui/Badge";

type ViewMode = "monthly" | "weekly";

export function InterviewCalendar() {
  const [viewMode, setViewMode] = useState<ViewMode>("monthly");
  const [currentDate] = useState(new Date(2026, 6, 25)); // July 2026

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  const getEventsForDay = (day: number) => {
    const dateStr = `2026-07-${String(day).padStart(2, "0")}`;
    return allInterviews.filter((i) => i.date === dateStr);
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weeklyDays = ["Mon 21", "Tue 22", "Wed 23", "Thu 24", "Today 25", "Sat 26", "Sun 27"];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-900">{monthName} {year}</h3>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("monthly")}
              className={cn("px-3 py-1 text-xs font-medium rounded-md transition-all", viewMode === "monthly" ? "bg-white shadow-sm text-gray-900" : "text-gray-500")}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode("weekly")}
              className={cn("px-3 py-1 text-xs font-medium rounded-md transition-all", viewMode === "weekly" ? "bg-white shadow-sm text-gray-900" : "text-gray-500")}
            >
              Week
            </button>
          </div>
        </div>
        <div className="flex gap-1">
          <button className="p-1 rounded hover:bg-gray-100"><svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
          <button className="p-1 rounded hover:bg-gray-100"><svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
        </div>
      </div>

      {viewMode === "monthly" ? (
        <>
          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {weekDays.map((d) => (
              <div key={d} className="text-center text-xs font-medium text-gray-500 py-2">{d}</div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const events = getEventsForDay(day);
              const isToday = day === 25;
              const hasInterview = events.length > 0;

              return (
                <div
                  key={day}
                  className={cn(
                    "aspect-square rounded-xl p-1.5 text-sm relative transition-all",
                    isToday ? "bg-brand-600 text-white font-bold" : hasInterview ? "bg-brand-50" : "hover:bg-gray-50"
                  )}
                >
                  <span className={cn(isToday ? "text-white" : "text-gray-700")}>{day}</span>
                  {hasInterview && (
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-0.5">
                      {events.map((_, idx) => (
                        <div key={idx} className={cn("w-1.5 h-1.5 rounded-full", isToday ? "bg-white" : "bg-brand-500")} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="space-y-2">
          {weeklyDays.map((day) => {
            const isToday = day.includes("Today");
            const dayNum = parseInt(day.replace(/\D/g, ""));
            const dateStr = `2026-07-${String(dayNum).padStart(2, "0")}`;
            const events = allInterviews.filter((i) => i.date === dateStr);

            return (
              <div key={day} className={cn("flex items-center gap-4 p-3 rounded-xl", isToday ? "bg-brand-50 border border-brand-200" : "hover:bg-gray-50")}>
                <div className={cn("w-14 text-center", isToday && "font-bold text-brand-700")}>
                  <p className="text-xs text-gray-500">{day.split(" ")[0]}</p>
                  <p className="text-lg">{dayNum}</p>
                </div>
                <div className="flex-1">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-center gap-2 py-1">
                      <div className="w-2 h-2 rounded-full bg-brand-500" />
                      <span className="text-sm text-gray-700">{event.company} - {event.type} Interview</span>
                      <Badge variant="info" size="sm">{event.time}</Badge>
                    </div>
                  ))}
                  {events.length === 0 && <span className="text-sm text-gray-400">No interviews</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
        <span className="flex items-center gap-1"><div className="w-3 h-3 bg-brand-500 rounded-full" /> Interview</span>
        <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded-full" /> Offer Discussion</span>
        <span className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-500 rounded-full" /> Assessment</span>
      </div>
    </div>
  );
}
