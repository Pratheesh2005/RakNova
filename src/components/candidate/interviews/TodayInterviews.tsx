import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Interview } from "@/data/candidate/interviews";

interface TodayInterviewsProps {
  interviews: Interview[];
}

function CountdownTimer({ targetTime }: { targetTime: string }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const calculate = () => {
      const now = new Date();
      const [hours, minutes] = targetTime.split(":");
      const target = new Date();
      target.setHours(parseInt(hours), parseInt(minutes.replace(/[^0-9]/g, "")), 0, 0);
      const diff = target.getTime() - now.getTime();

      if (diff <= 0 && diff > -3600000) {
        setIsLive(true);
        setTimeLeft("Live Now");
      } else if (diff <= -3600000) {
        setTimeLeft("Ended");
      } else {
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        setTimeLeft(`${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m`);
      }
    };
    calculate();
    const interval = setInterval(calculate, 60000);
    return () => clearInterval(interval);
  }, [targetTime]);

  return (
    <span className={`font-mono font-bold ${isLive ? "text-red-500 animate-pulse" : "text-brand-600"}`}>
      {isLive ? "🔴 Live Now" : timeLeft}
    </span>
  );
}

export function TodayInterviews({ interviews }: TodayInterviewsProps) {
  if (interviews.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-gray-900">No interviews today</p>
        <p className="text-sm text-gray-500">Your next interview is coming up. Keep preparing!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
        Today's Interviews
      </h3>
      {interviews.map((interview) => (
        <motion.div
          key={interview.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-brand-50 to-white rounded-2xl border border-brand-200 p-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-xl font-bold text-gray-500 shadow-sm">
                {interview.company.charAt(0)}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{interview.company}</h4>
                <p className="text-sm text-gray-600">{interview.position}</p>
                <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-500">
                  <Badge variant="info" size="sm">{interview.type} Interview</Badge>
                  <span>🕐 {interview.time}</span>
                  <span>⏱️ {interview.duration}</span>
                  <span>{interview.mode === "Online" ? "💻 Online" : "📍 Offline"}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <CountdownTimer targetTime={interview.time} />
              {interview.meetingLink && (
                <Button variant="primary" size="sm" href={interview.meetingLink}>
                  <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Join Interview
                </Button>
              )}
              <Badge variant="success" size="sm">{interview.status === "upcoming" ? "Upcoming" : interview.status}</Badge>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
