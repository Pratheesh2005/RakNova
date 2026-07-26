import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Interview } from "@/data/company/interviews";

const statusStyles: Record<string, string> = {
  Scheduled: "bg-blue-50 text-blue-700",
  "In Progress": "bg-green-50 text-green-700",
  Completed: "bg-gray-100 text-gray-600",
  Cancelled: "bg-red-50 text-red-700",
  Rescheduled: "bg-yellow-50 text-yellow-700",
};

interface InterviewDetailDrawerProps {
  interview: Interview | null;
  onClose: () => void;
}

export function InterviewDetailDrawer({ interview, onClose }: InterviewDetailDrawerProps) {
  if (!interview) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex justify-end"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/30" />
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl"
        >
          <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between z-10">
            <h2 className="text-lg font-bold text-gray-900">{interview.candidate}</h2>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="default" className={statusStyles[interview.status]}>{interview.status}</Badge>
              <span className="text-sm text-gray-500">{interview.interviewType} Interview</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Applied Position", value: interview.appliedPosition },
                { label: "Date", value: interview.date },
                { label: "Time", value: interview.time },
                { label: "Duration", value: interview.duration },
                { label: "Interviewer", value: interview.interviewer },
                { label: "Mode", value: interview.meetingMode },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="text-sm font-medium text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>

            {interview.meetingLink && (
              <Button variant="primary" size="md" className="w-full" href={interview.meetingLink}>
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 00-2 2z" />
                </svg>
                Join Meeting
              </Button>
            )}

            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 uppercase">Candidate Links</p>
              <div className="flex flex-col gap-1">
                {interview.resume && <span className="text-sm text-blue-600 cursor-pointer hover:underline">Resume</span>}
                {interview.portfolio && <a href={interview.portfolio} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">Portfolio</a>}
                {interview.github && <a href={interview.github} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">GitHub</a>}
                {interview.linkedin && <a href={interview.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">LinkedIn</a>}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500 uppercase mb-1">Interview Notes</p>
              <textarea className="w-full p-3 border rounded-lg text-sm" rows={3} defaultValue={interview.notes || ""} placeholder="Add notes..." />
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
              <Button variant="primary" size="sm">Start Interview</Button>
              <Button variant="outline" size="sm">Download Resume</Button>
              <Button variant="outline" size="sm">Reschedule</Button>
              <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">Cancel</Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
