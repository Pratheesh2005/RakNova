import { CompanyLayout } from "@/components/company/layout/CompanyLayout";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchInput";
import { popularQuestions, supportCategories, contactInfo } from "@/data/company/help";
import { useState } from "react";

export default function HelpSupportPage() {
  const [search, setSearch] = useState("");

  return (
    <CompanyLayout>
      <div className="space-y-6 max-w-5xl">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
          <p className="text-sm text-gray-500 mt-1">Find answers, contact support and learn how to use RakNova.</p>
        </div>

        {/* Quick Help */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Help</h2>
          <div className="max-w-md mb-4">
            <SearchInput value={search} onChange={setSearch} placeholder="Search help articles..." />
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Popular Questions</h3>
            <ul className="space-y-2">
              {popularQuestions.map((q, idx) => (
                <li key={idx} className="text-sm text-blue-600 hover:underline cursor-pointer">
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Support Categories */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Support Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {supportCategories.map((cat) => (
              <button
                key={cat.name}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors text-left"
              >
                <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={cat.icon} />
                </svg>
                <span className="text-sm font-medium text-gray-700">{cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Contact Support */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Support</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Email Support</p>
              <a href={`mailto:${contactInfo.email}`} className="text-blue-600 font-medium hover:underline">
                {contactInfo.email}
              </a>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Phone Support</p>
              <p className="font-medium text-gray-900">{contactInfo.phone}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg col-span-2">
              <p className="text-gray-500">Business Hours</p>
              <p className="font-medium text-gray-900">{contactInfo.businessHours}</p>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Resources</h2>
          <div className="flex flex-wrap gap-3">
            {["User Guide", "Recruitment Best Practices", "Platform Updates", "Release Notes"].map((res) => (
              <Button key={res} variant="outline" size="sm">
                {res}
              </Button>
            ))}
          </div>
        </section>

        {/* Feedback */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Feedback</h2>
          <div className="space-y-3 max-w-md">
            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
            />
            <textarea
              rows={4}
              placeholder="Your message..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
            />
            <Button variant="primary" size="sm">Submit Feedback</Button>
          </div>
        </section>
      </div>
    </CompanyLayout>
  );
}
