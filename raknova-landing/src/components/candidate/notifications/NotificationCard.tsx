import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/Button";
import { Notification } from "@/data/candidate/notifications";
import { formatRelativeTime } from "@/utils/formatDate";

interface NotificationCardProps {
  notification: Notification;
  onMarkRead: (id: number) => void;
  onDismiss: (id: number) => void;
}

const typeStyles: Record<string, { icon: string; bg: string; color: string }> = {
  application: {
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    bg: "bg-blue-50",
    color: "text-blue-600",
  },
  interview: {
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    bg: "bg-green-50",
    color: "text-green-600",
  },
  job_match: {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    bg: "bg-purple-50",
    color: "text-purple-600",
  },
  profile: {
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    bg: "bg-yellow-50",
    color: "text-yellow-600",
  },
  system: {
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066",
    bg: "bg-gray-100",
    color: "text-gray-600",
  },
};

export function NotificationCard({ notification, onMarkRead, onDismiss }: NotificationCardProps) {
  const typeStyle = typeStyles[notification.type] || typeStyles.system;

  return (
    <div
      className={cn(
        "flex items-start gap-4 p-4 rounded-xl transition-all border border-transparent",
        notification.read
          ? "bg-white hover:bg-gray-50 hover:border-gray-200"
          : "bg-brand-50/30 border-brand-100 hover:border-brand-200"
      )}
    >
      {/* Icon */}
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", typeStyle.bg)}>
        <svg className={cn("w-5 h-5", typeStyle.color)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={typeStyle.icon} />
        </svg>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold text-gray-900">{notification.title}</h4>
          {!notification.read && (
            <span className="w-2 h-2 bg-brand-500 rounded-full flex-shrink-0" />
          )}
        </div>
        <p className="text-sm text-gray-600 mt-0.5">{notification.description}</p>
        <p className="text-xs text-gray-400 mt-1">{formatRelativeTime(notification.time)}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {notification.actionLabel && notification.actionUrl && (
          <Button variant="primary" size="sm" href={notification.actionUrl}>
            {notification.actionLabel}
          </Button>
        )}
        <button
          onClick={() => onMarkRead(notification.id)}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          title="Mark as read"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </button>
        <button
          onClick={() => onDismiss(notification.id)}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          title="Dismiss"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
