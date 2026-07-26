import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

export function ResumePreviewPanel() {
  const [zoom, setZoom] = useState(100);
  const [fullScreen, setFullScreen] = useState(false);

  return (
    <div className={cn(
      "bg-white rounded-2xl border border-gray-100 overflow-hidden",
      fullScreen && "fixed inset-0 z-50 rounded-none"
    )}>
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-sm font-semibold text-gray-900">Resume Preview</h3>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setZoom(Math.max(50, zoom - 25))}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
            </svg>
          </Button>
          <span className="text-sm text-gray-600 min-w-[50px] text-center">{zoom}%</span>
          <Button variant="ghost" size="sm" onClick={() => setZoom(Math.min(200, zoom + 25))}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </Button>
          <div className="w-px h-5 bg-gray-300 mx-1" />
          <Button variant="ghost" size="sm" onClick={() => setFullScreen(!fullScreen)}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {fullScreen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              )}
            </svg>
          </Button>
        </div>
      </div>

      {/* Preview Area */}
      <div className={cn("bg-gray-100 flex items-center justify-center overflow-auto p-6", fullScreen ? "h-screen" : "h-[500px]")}>
        <div
          className="bg-white shadow-lg transition-transform duration-200"
          style={{ transform: `scale(${zoom / 100})`, width: "210mm", minHeight: "297mm" }}
        >
          {/* Mock Resume Content */}
          <div className="p-12">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-100 to-brand-200 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-brand-700">JD</div>
              <h2 className="text-2xl font-bold text-gray-900">John Doe</h2>
              <p className="text-gray-600 mt-1">Senior Frontend Developer</p>
              <div className="flex justify-center gap-4 mt-2 text-sm text-gray-500">
                <span>john@example.com</span>
                <span>+91 9876543210</span>
                <span>Mumbai, India</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b-2 border-brand-500 pb-2 mb-3 inline-block">Professional Summary</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Experienced frontend developer with 5+ years building scalable web applications using React, TypeScript, and Next.js.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b-2 border-brand-500 pb-2 mb-3 inline-block">Experience</h3>
              <div className="mb-4">
                <div className="flex justify-between">
                  <p className="font-semibold text-gray-900">Senior Frontend Developer</p>
                  <p className="text-sm text-gray-500">2022 - Present</p>
                </div>
                <p className="text-sm text-gray-600">TechCorp, Mumbai</p>
                <ul className="mt-2 list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li>Led a team of 5 developers building React-based SaaS platform</li>
                  <li>Improved page load time by 40% through code splitting and lazy loading</li>
                  <li>Implemented CI/CD pipeline reducing deployment time by 60%</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between">
                  <p className="font-semibold text-gray-900">Frontend Developer</p>
                  <p className="text-sm text-gray-500">2020 - 2022</p>
                </div>
                <p className="text-sm text-gray-600">WebSoft Solutions, Pune</p>
                <ul className="mt-2 list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li>Developed responsive web apps using React and TypeScript</li>
                  <li>Built 15+ reusable components used across multiple projects</li>
                </ul>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b-2 border-brand-500 pb-2 mb-3 inline-block">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "Git", "AWS", "Docker"].map((s) => (
                  <span key={s} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
