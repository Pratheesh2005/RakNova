import { Button } from "@/components/ui/Button";

export function InterviewFeedbackHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Interview Feedback</h1>
        <p className="text-sm text-gray-500 mt-1">
          Evaluate interview performance and submit hiring recommendations.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="md">Save Draft</Button>
        <Button variant="primary" size="md">Submit Feedback</Button>
      </div>
    </div>
  );
}
