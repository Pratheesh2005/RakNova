import { useState } from "react";
import { RecruiterLayout } from "@/components/recruiter/layout/RecruiterLayout";
import { CommunicationHeader } from "@/components/recruiter/candidateCommunication/CommunicationHeader";
import { TodayCommunicationTasks } from "@/components/recruiter/candidateCommunication/TodayCommunicationTasks";
import { CommunicationListTable } from "@/components/recruiter/candidateCommunication/CommunicationListTable";
import { CommunicationTimeline } from "@/components/recruiter/candidateCommunication/CommunicationTimeline";
import { NewCommunicationModal } from "@/components/recruiter/candidateCommunication/NewCommunicationModal";
import { MessageTemplates } from "@/components/recruiter/candidateCommunication/MessageTemplates";
import { FollowUpTracker } from "@/components/recruiter/candidateCommunication/FollowUpTracker";
import { QuickActions } from "@/components/recruiter/candidateCommunication/QuickActions";
import { EmptyCommunicationState } from "@/components/recruiter/candidateCommunication/EmptyCommunicationState";
import { communicationList, CommunicationItem, MessageTemplate } from "@/data/recruiter/candidateCommunication";

export default function CandidateCommunicationPage() {
  const [selectedCandidate, setSelectedCandidate] = useState<CommunicationItem | null>(null);
  const [newCommModalOpen, setNewCommModalOpen] = useState(false);

  const hasCommunications = communicationList.length > 0;

  const handleSelectTemplate = (template: MessageTemplate) => {
    // fill editor placeholder
    setNewCommModalOpen(true);
  };

  return (
    <RecruiterLayout>
      {!hasCommunications ? (
        <EmptyCommunicationState />
      ) : (
        <div className="space-y-6">
          <CommunicationHeader onNewCommunication={() => setNewCommModalOpen(true)} />
          <TodayCommunicationTasks />
          <CommunicationListTable
            communications={communicationList}
            onSelectCandidate={setSelectedCandidate}
          />
          {selectedCandidate && selectedCandidate.history && (
            <CommunicationTimeline
              candidateName={selectedCandidate.candidate}
              history={selectedCandidate.history}
              onClose={() => setSelectedCandidate(null)}
            />
          )}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <FollowUpTracker />
            </div>
            <div className="space-y-6">
              <MessageTemplates onSelectTemplate={handleSelectTemplate} />
              <QuickActions />
            </div>
          </div>
        </div>
      )}
      <NewCommunicationModal isOpen={newCommModalOpen} onClose={() => setNewCommModalOpen(false)} />
    </RecruiterLayout>
  );
}
