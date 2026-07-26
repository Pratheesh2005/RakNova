import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function Contact() {
  return (
    <Section id="contact" className="bg-white">
      <Container className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Get in Touch
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
          Have questions or want to learn more? Reach out to our team.
        </p>
        <div className="mt-8">
          <a
            href="mailto:hello@raknova.com"
            className="inline-flex items-center gap-2 text-brand-600 font-medium text-lg hover:text-brand-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            hello@raknova.com
          </a>
        </div>
      </Container>
    </Section>
  );
}
