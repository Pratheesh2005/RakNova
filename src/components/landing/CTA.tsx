import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <Section className="bg-brand-600 text-white">
      <Container className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Transform Hiring with AI?
        </h2>
        <p className="mt-4 text-lg text-brand-100 max-w-2xl mx-auto">
          Join forward-thinking companies and candidates who are already benefiting from intelligent recruitment.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="secondary" size="lg" href="/auth/account-type">
            Create Free Account
          </Button>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" href="#contact">
            Contact Us
          </Button>
        </div>
      </Container>
    </Section>
  );
}
