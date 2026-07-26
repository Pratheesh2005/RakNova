import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-lg bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 font-heading">Select Portal</h1>
        <p className="text-gray-500 text-sm">Choose your portal to continue into the RakNova ecosystem</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/candidate">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">Candidate Portal</Button>
          </Link>
          <Link href="/company">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">Company Portal</Button>
          </Link>
          <Link href="/recruiter">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">Recruiter Portal</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
