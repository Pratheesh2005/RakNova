import { useState } from "react";
import { CompanyLayout } from "@/components/company/layout/CompanyLayout";
import { CompanyProfileHeader } from "@/components/company/profile/CompanyProfileHeader";
import { CompanyOverview } from "@/components/company/profile/CompanyOverview";
import { HiringProfile } from "@/components/company/profile/HiringProfile";
import { CompanyDetails } from "@/components/company/profile/CompanyDetails";
import { AboutCompany } from "@/components/company/profile/AboutCompany";
import { Benefits } from "@/components/company/profile/Benefits";
import { OfficeLocations } from "@/components/company/profile/OfficeLocations";
import { HiringContact } from "@/components/company/profile/HiringContact";
import { Documents } from "@/components/company/profile/Documents";
import { EditCompanyModal } from "@/components/company/profile/EditCompanyModal";
import { EmptyCompanyState } from "@/components/company/profile/EmptyCompanyState";
import { companyProfile } from "@/data/company/companyProfile";

export default function CompanyProfilePage() {
  const [editModalOpen, setEditModalOpen] = useState(false);

  // if no profile data, show empty state
  const hasData = companyProfile.name !== ""; // replace with real check

  return (
    <CompanyLayout>
      {!hasData ? (
        <EmptyCompanyState />
      ) : (
        <div className="space-y-6">
          <CompanyProfileHeader />
          <CompanyOverview company={companyProfile} />
          <HiringProfile company={companyProfile} />
          <div className="grid lg:grid-cols-2 gap-6">
            <CompanyDetails contact={companyProfile.contact} company={companyProfile} />
            <AboutCompany company={companyProfile} />
          </div>
          <Benefits benefits={companyProfile.benefits} />
          <OfficeLocations offices={companyProfile.offices} />
          <div className="grid lg:grid-cols-2 gap-6">
            <HiringContact company={companyProfile} />
            <Documents documents={companyProfile.documents} />
          </div>
        </div>
      )}

      <EditCompanyModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} company={companyProfile} />
      {/* The "Edit Company Profile" button in header can trigger editModalOpen; we'll wire it via the header onClick later */}
    </CompanyLayout>
  );
}
