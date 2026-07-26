import { useState } from "react";
import { RecruiterLayout } from "@/components/recruiter/layout/RecruiterLayout";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchInput";
import { popularTopics, contactSupport, resources } from "@/data/recruiter/help";

export default function HelpSupportPage() {
  const [search, setSearch] = useState("");

  return (
    <RecruiterLayout>
      <div className="space-y-6 max-w-5xl">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
          <p className="text-sm text-gray-500 mt-1">Find answers and get assistance with RakNova.</p>
        </div>

        {/* Search Help */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Search Help</h2>
          <div className="max-w-md">
            <SearchInput value={search} onChange={setSearch} placeholder="Search help articles..." />
          </div>
        </section>

        {/* Popular Topics */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Topics</h2>
          <div className="space-y-2">
            {popularTopics.map((topic, idx) => (
              <div key={idx} className="text-sm text-blue-600 hover:underline cursor-pointer">
                {topic}
              </div>
            ))}
          </div>
        </section>

        {/* Support */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Support</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Email Support</p>
              <a href={`mailto:${contactSupport.email}`} className="text-blue-600 font-medium hover:underline">
                {contactSupport.email}
              </a>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Phone Support</p>
              <p className="font-medium text-gray-900">{contactSupport.phone}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg col-span-2">
              <p className="text-gray-500">Business Hours</p>
              <p className="font-medium text-gray-900">{contactSupport.businessHours}</p>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Resources</h2>
          <div className="flex flex-wrap gap-3">
            {resources.map((res, idx) => (
              <Button key={idx} variant="outline" size="sm">{res}</Button>
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
            <Button variant="primary" size="sm">Submit</Button>
          </div>
        </section>
      </div>
    </RecruiterLayout>
  );
}
