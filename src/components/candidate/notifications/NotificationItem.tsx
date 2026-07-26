import { cn } from "@/utils/cn";
import { formatRelativeTime } from "@/utils/formatDate";

interface NotificationItemProps {
  notification: {
    id: number;
    type: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
  };
  onClick: () => void;
}

const typeIcons: Record<string, { icon: string; color: string }> = {
  job_match: { icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "bg-brand-50 text-brand-600" },
  profile_view: { icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5", color: "bg-purple-50 text-purple-600" },
  interview: { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5", color: "bg-green-50 text-green-600" },
  status_update: { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2", color: "bg-blue-50 text-blue-600" },
  system: { icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0", color: "bg-gray-100 text-gray-600" },
};

export function NotificationItem({ notification, onClick }: NotificationItemProps) {
  const typeInfo = typeIcons[notification.type] || typeIcons.system;

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-colors hover:bg-gray-50",
        !notification.read && "bg-brand-50/50"
      )}
    >
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", typeInfo.color)}>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={typeInfo.icon} />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-900">{notification.title}</p>
          {!notification.read && <span className="w-2 h-2 bg-brand-500 rounded-full flex-shrink-0" />}
        </div>
        <p className="text-sm text-gray-600 mt-0.5">{notification.message}</p>
        <p className="text-xs text-gray-400 mt-1">{formatRelativeTime(notification.time)}</p>
      </div>
    </div>
  );
}
