import { useState } from "react";
import { RecruiterLayout } from "@/components/recruiter/layout/RecruiterLayout";
import { Button } from "@/components/ui/Button";
import { NotificationItem } from "@/components/recruiter/notifications/NotificationItem";
import { EmptyNotifications } from "@/components/recruiter/notifications/EmptyNotifications";
import { recruiterNotifications } from "@/data/recruiter/notifications";
import { cn } from "@/utils/cn";

const tabs = ["All", "Unread", "Candidates", "Interviews", "Feedback", "System"];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(recruiterNotifications);
  const [activeTab, setActiveTab] = useState("All");

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "All") return true;
    if (activeTab === "Unread") return !n.read;
    if (activeTab === "Candidates") return n.type === "candidates";
    if (activeTab === "Interviews") return n.type === "interviews";
    if (activeTab === "Feedback") return n.type === "feedback";
    if (activeTab === "System") return n.type === "system";
    return true;
  });

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <RecruiterLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-sm text-gray-500 mt-1">
              Stay updated with your assigned recruitment activities.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="md">Notification Preferences</Button>
            <Button variant="primary" size="md" onClick={markAllRead}>Mark All as Read</Button>
          </div>
        </div>

        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-all",
                activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {filteredNotifications.length === 0 ? (
          <EmptyNotifications />
        ) : (
          <div className="space-y-2">
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkRead={markRead}
              />
            ))}
          </div>
        )}
      </div>
    </RecruiterLayout>
  );
}
