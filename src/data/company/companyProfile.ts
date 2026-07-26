export interface CompanyProfileData {
  name: string;
  logo: string;
  banner: string;
  industry: string;
  headquarters: string;
  foundedYear: number;
  companySize: string;
  website: string;
  verified: boolean;
  description: string;
  openPositions: number;
  departmentsHiring: number;
  avgHiringTime: string;
  remoteAvailability: boolean;
  internshipsAvailable: boolean;
  graduateHiring: boolean;
  mission: string;
  vision: string;
  culture: string;
  coreValues: string[];
  benefits: string[];
  offices: {
    name: string;
    city: string;
    country: string;
    employees: number;
    hiring: boolean;
    primary: boolean;
  }[];
  hrManager: string;
  recruitmentEmail: string;
  recruitmentPhone: string;
  workingHours: string;
  responseTime: string;
  documents: {
    name: string;
    type: string;
  }[];
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    businessRegNumber: string;
  };
}

export const companyProfile: CompanyProfileData = {
  name: "TechNova Solutions",
  logo: "/company-logos/technova.png",
  banner: "/company-banners/technova-banner.jpg",
  industry: "Information Technology",
  headquarters: "Bangalore, India",
  foundedYear: 2018,
  companySize: "200-500 employees",
  website: "https://technovasolutions.com",
  verified: true,
  description: "TechNova Solutions is a fast-growing technology company specializing in AI-driven enterprise software. We build intelligent platforms that transform how businesses operate and hire.",
  openPositions: 12,
  departmentsHiring: 4,
  avgHiringTime: "14 days",
  remoteAvailability: true,
  internshipsAvailable: true,
  graduateHiring: true,
  mission: "To build intelligent software that empowers businesses to make better decisions.",
  vision: "To become the leading AI workforce intelligence platform globally.",
  culture: "We foster innovation, collaboration, and continuous learning. Our team is our greatest asset.",
  coreValues: [
    "Customer First",
    "Innovation",
    "Integrity",
    "Teamwork",
    "Excellence",
    "Diversity",
  ],
  benefits: [
    "Health Insurance",
    "Flexible Working Hours",
    "Hybrid Work Options",
    "Learning Budget (₹50,000/year)",
    "Paid Leave (24 days)",
    "Performance Bonus",
    "Stock Options",
    "Gym Membership",
  ],
  offices: [
    {
      name: "Headquarters",
      city: "Bangalore",
      country: "India",
      employees: 300,
      hiring: true,
      primary: true,
    },
    {
      name: "Development Center",
      city: "Hyderabad",
      country: "India",
      employees: 120,
      hiring: true,
      primary: false,
    },
    {
      name: "Sales Office",
      city: "Mumbai",
      country: "India",
      employees: 45,
      hiring: false,
      primary: false,
    },
  ],
  hrManager: "Rajesh Kumar",
  recruitmentEmail: "careers@technova.com",
  recruitmentPhone: "+91 80 1234 5678",
  workingHours: "9:00 AM – 6:00 PM IST",
  responseTime: "Within 24 hours",
  documents: [
    { name: "Company Brochure", type: "PDF" },
    { name: "Policy Document", type: "PDF" },
    { name: "Internship Guide", type: "PDF" },
    { name: "Campus Hiring Brochure", type: "PDF" },
  ],
  contact: {
    email: "info@technova.com",
    phone: "+91 80 1234 5678",
    linkedin: "https://linkedin.com/company/technova-solutions",
    businessRegNumber: "U72900KA2018PTC123456",
  },
};
