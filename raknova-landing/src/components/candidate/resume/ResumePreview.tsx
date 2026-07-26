export function ResumePreview() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 min-h-[600px]">
      <div className="max-w-2xl mx-auto">
        {/* Mock resume content */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">John Doe</h2>
          <p className="text-gray-600 mt-1">Senior Frontend Developer</p>
          <div className="flex justify-center gap-4 mt-2 text-sm text-gray-500">
            <span>john@example.com</span>
            <span>+91 9876543210</span>
            <span>Mumbai, India</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-3">Professional Summary</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Experienced frontend developer with 5+ years building scalable web applications using React, TypeScript, and Next.js.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-3">Experience</h3>
          <div className="mb-4">
            <div className="flex justify-between">
              <p className="font-medium text-gray-900">Senior Frontend Developer</p>
              <p className="text-sm text-gray-500">2022 - Present</p>
            </div>
            <p className="text-sm text-gray-600">TechCorp</p>
            <p className="text-sm text-gray-700 mt-1">Leading frontend team, building React applications.</p>
          </div>
          <div>
            <div className="flex justify-between">
              <p className="font-medium text-gray-900">Frontend Developer</p>
              <p className="text-sm text-gray-500">2020 - 2022</p>
            </div>
            <p className="text-sm text-gray-600">WebSoft Solutions</p>
            <p className="text-sm text-gray-700 mt-1">Developed responsive web apps using React and TypeScript.</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-3">Education</h3>
          <div className="flex justify-between">
            <p className="font-medium text-gray-900">Bachelor of Technology, Computer Science</p>
            <p className="text-sm text-gray-500">2018 - 2022</p>
          </div>
          <p className="text-sm text-gray-600">Mumbai University — 8.5 CGPA</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {["React", "TypeScript", "Next.js", "Tailwind CSS", "JavaScript", "Node.js", "Git", "AWS"].map((skill) => (
              <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
