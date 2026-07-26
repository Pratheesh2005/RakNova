import { Button } from "@/components/ui/Button";
import { CompanyNotification } from "@/data/company/notifications";
import { cn } from "@/utils/cn";

const typeIcons: Record<string, React.ReactNode> = {
  application: (
    <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  interview: (
    <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  offer: (
    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  system: (
    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066" />
    </svg>
  ),
  deadline: (
    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const priorityStyles: Record<string, string> = {
  High: "text-red-700 bg-red-50",
  Medium: "text-yellow-700 bg-yellow-50",
  Low: "text-gray-600 bg-gray-100",
};

interface NotificationItemProps {
  notification: CompanyNotification;
  onMarkRead: (id: number) => void;
}

export function NotificationItem({ notification, onMarkRead }: NotificationItemProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 p-4 rounded-xl border transition-all",
        notification.read ? "bg-white border-gray-100" : "bg-blue-50/40 border-blue-200"
      )}
    >
      <div className="flex-shrink-0 mt-1">{typeIcons[notification.type]}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-900">{notification.title}</h3>
          {!notification.read && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
        </div>
        <p className="text-sm text-gray-600 mt-0.5">{notification.description}</p>
        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
        {notification.action && (
          <Button variant="primary" size="sm" className="mt-2">
            {notification.action.label}
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", priorityStyles[notification.priority])}>
          {notification.priority}
        </span>
        {!notification.read && (
          <button
            onClick={() => onMarkRead(notification.id)}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Mark read
          </button>
        )}
      </div>
    </div>
  );
}
