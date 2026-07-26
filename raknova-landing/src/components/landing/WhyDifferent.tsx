import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const differentiators = [
  "One unified platform for candidates, recruiters, and companies.",
  "AI-powered semantic matching, not just keyword filtering.",
  "Unified hiring workflow from application to analytics.",
  "Intelligent analytics and predictive hiring insights.",
  "Designed for modern, fast-paced recruitment teams.",
  "Continuously learning AI that improves over time.",
];

export function WhyDifferent() {
  return (
    <Section id="about" className="bg-gray-50">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why <span className="text-brand-600">RakNova</span> is Different
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We aren’t just another job board. We’re a comprehensive workforce intelligence ecosystem.
          </p>
        </div>
        <div className="max-w-3xl mx-auto grid gap-4">
          {differentiators.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700 font-medium">{item}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
