import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const stats = [
  { end: 500, suffix: "+", label: "Companies" },
  { end: 12000, suffix: "+", label: "Candidates" },
  { end: 45000, suffix: "+", label: "Interviews" },
  { end: 98000, suffix: "+", label: "AI Matches" },
];

export function TrustedStats() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              end={stat.end}
              suffix={stat.suffix}
              label={stat.label}
              duration={2500}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
