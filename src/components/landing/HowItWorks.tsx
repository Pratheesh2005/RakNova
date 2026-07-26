import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const steps = [
  { label: "Candidate applies", desc: "Uploads resume and builds profile." },
  { label: "AI Analysis", desc: "Resume parsed, skills extracted, scored." },
  { label: "Job Matching", desc: "AI matches candidate to relevant jobs." },
  { label: "Recruiter Review", desc: "Top-ranked candidates presented." },
  { label: "Interview", desc: "Scheduling and interview management." },
  { label: "Hiring", desc: "Data-driven hiring decisions." },
];

export function HowItWorks() {
  return (
    <Section className="bg-gray-50">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How <span className="text-brand-600">RakNova</span> Works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            A seamless, AI-driven workflow from candidate application to final hiring.
          </p>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-brand-200 transform -translate-x-1/2" />
          <div className="space-y-12 relative">
            {steps.map((step, idx) => (
              <div
                key={step.label}
                className={`flex flex-col md:flex-row items-center ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="flex-1 md:text-right md:pr-12">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900">{step.label}</h3>
                    <p className="mt-1 text-gray-600">{step.desc}</p>
                  </div>
                </div>
                <div className="my-4 md:my-0 flex-shrink-0 z-10">
                  <div className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold shadow-md">
                    {idx + 1}
                  </div>
                </div>
                <div className="flex-1 md:pl-12" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
