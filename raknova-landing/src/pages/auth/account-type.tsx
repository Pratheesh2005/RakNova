import { useState } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { RoleCard } from "@/components/auth/RoleCard";
import { Button } from "@/components/ui/Button";

type Role = "candidate" | "company" | "recruiter";

const roles: { id: Role; title: string; description: string }[] = [
  {
    id: "candidate",
    title: "Candidate",
    description: "Looking for internships or jobs.",
  },
  {
    id: "company",
    title: "Company",
    description: "Hire skilled candidates using AI-powered recruitment.",
  },
  {
    id: "recruiter",
    title: "Recruiter",
    description: "Manage hiring and candidate screening efficiently.",
  },
];

const roleIcons = {
  candidate: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  company: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  recruiter: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
};

export default function AccountTypePage() {
  const [selected, setSelected] = useState<Role | null>(null);

  const getRegisterPath = (role: Role) => {
    const paths: Record<Role, string> = {
      candidate: "/auth/register/candidate",
      company: "/auth/register/company",
      recruiter: "/auth/register/recruiter",
    };
    return paths[role];
  };

  return (
    <AuthLayout
      title="Choose Account Type"
      subtitle="Select the role that best describes you"
    >
      <div className="space-y-4">
        {roles.map((role) => (
          <RoleCard
            key={role.id}
            icon={roleIcons[role.id]}
            title={role.title}
            description={role.description}
            selected={selected === role.id}
            onClick={() => setSelected(role.id)}
          />
        ))}

        <Button
          variant="primary"
          size="lg"
          className="w-full mt-6"
          disabled={!selected}
          href={selected ? getRegisterPath(selected) : undefined}
        >
          Continue
        </Button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/auth/login" className="text-brand-600 hover:text-brand-700 font-medium">
            Login
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
