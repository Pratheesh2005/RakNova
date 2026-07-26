import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ResumePreview() {
  const [zoom, setZoom] = useState(100);
  const [fullScreen, setFullScreen] = useState(false);

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 overflow-hidden ${fullScreen ? "fixed inset-0 z-50 rounded-none" : ""}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-900">Resume Preview</h3>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setZoom(Math.max(50, zoom - 25))}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" /></svg>
          </Button>
          <span className="text-sm text-gray-600">{zoom}%</span>
          <Button variant="ghost" size="sm" onClick={() => setZoom(Math.min(200, zoom + 25))}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setFullScreen(!fullScreen)}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {fullScreen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              )}
            </svg>
          </Button>
          <Button variant="outline" size="sm">Download</Button>
        </div>
      </div>
      <div className="bg-gray-200 p-6 flex items-center justify-center" style={{ minHeight: fullScreen ? "calc(100vh - 64px)" : "400px" }}>
        <div
          className="bg-white shadow-lg transition-transform"
          style={{ transform: `scale(${zoom / 100})`, width: "210mm", minHeight: "297mm" }}
        >
          <div className="p-12 text-center text-gray-500">
            <p className="text-lg font-semibold">Resume Placeholder</p>
            <p className="text-sm">PDF preview will be embedded here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
