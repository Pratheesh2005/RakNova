import { messageTemplates, MessageTemplate } from "@/data/recruiter/candidateCommunication";

interface MessageTemplatesProps {
  onSelectTemplate: (template: MessageTemplate) => void;
}

export function MessageTemplates({ onSelectTemplate }: MessageTemplatesProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Message Templates</h2>
      <div className="grid grid-cols-2 gap-4">
        {messageTemplates.map((template) => (
          <div
            key={template.id}
            className="p-4 bg-gray-50 rounded-xl hover:bg-blue-50 cursor-pointer transition-colors border border-transparent hover:border-blue-200"
            onClick={() => onSelectTemplate(template)}
          >
            <h3 className="text-sm font-semibold text-gray-900">{template.name}</h3>
            <p className="text-xs text-gray-500 mt-1 truncate">{template.subject}</p>
            <p className="text-xs text-blue-600 mt-2 font-medium">Click to use</p>
          </div>
        ))}
      </div>
    </div>
  );
}
