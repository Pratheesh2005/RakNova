import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import Image from "next/image";

export function Hero() {
  return (
    <section
      id="home"
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-gradient-to-b from-white to-brand-50/30 overflow-hidden"
    >
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            AI-Powered{" "}
            <span className="text-brand-600">Workforce Intelligence</span> Platform
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Help companies discover top talent while empowering candidates with AI-driven career tools.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/auth/account-type">
              Get Started
            </Button>
            <Button variant="secondary" size="lg" href="#features">
              Learn More
            </Button>
          </div>
        </div>

        <div className="mt-16 relative mx-auto max-w-5xl">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            <Image
              src="/dashboard-mockup.png"
              alt="RakNova AI recruitment dashboard"
              width={1200}
              height={675}
              className="w-full h-auto"
              priority
            />
          </div>
          <div className="absolute -inset-4 bg-brand-500/10 blur-3xl rounded-full -z-10" />
        </div>
      </Container>
    </section>
  );
}
