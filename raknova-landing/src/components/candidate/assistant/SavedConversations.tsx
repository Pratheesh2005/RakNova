import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { savedConversations } from "@/data/candidate/assistant";

export function SavedConversations() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">💾</span>
          <h3 className="text-lg font-semibold text-gray-900">Saved Conversations</h3>
        </div>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {savedConversations.map((conv) => (
          <div
            key={conv.id}
            className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer border border-transparent hover:border-gray-200"
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-semibold text-gray-900">{conv.title}</p>
              <Badge variant="default" size="sm">{conv.assistant}</Badge>
            </div>
            <p className="text-xs text-gray-500 line-clamp-2">{conv.preview}</p>
            <p className="text-xs text-gray-400 mt-2">{conv.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
