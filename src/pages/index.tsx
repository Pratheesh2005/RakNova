import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { TrustedStats } from "@/components/landing/TrustedStats";
import { WhyChooseSection } from "@/components/landing/WhyChooseSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Solutions } from "@/components/landing/Solutions";
import { CoreAIFeatures } from "@/components/landing/CoreAIFeatures";
import { WhyDifferent } from "@/components/landing/WhyDifferent";
import { CTA } from "@/components/landing/CTA";
import { Contact } from "@/components/landing/Contact";   // ← New import
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustedStats />
        <WhyChooseSection />
        <HowItWorks />
        <Solutions />
        <CoreAIFeatures />
        <WhyDifferent />
        <CTA />
        <Contact />   {/* ← Added contact section here */}
      </main>
      <Footer />
    </>
  );
}
