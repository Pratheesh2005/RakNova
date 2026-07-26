import { useState, useMemo } from "react";
import { CandidateLayout } from "@/components/candidate/layout/CandidateLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { NotificationCard } from "@/components/candidate/notifications/NotificationCard";
import { EmptyNotifications } from "@/components/candidate/notifications/EmptyNotifications";
import { notifications, notificationCategories } from "@/data/candidate/notifications";
import { cn } from "@/utils/cn";

const filters = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
];

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(notifications);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredNotifications = useMemo(() => {
    let result = [...notifs];

    // Category filter
    if (activeCategory !== "all") {
      result = result.filter((n) => n.type === activeCategory);
    }

    // Time/read filter
    const now = new Date();
    if (activeFilter === "unread") {
      result = result.filter((n) => !n.read);
    } else if (activeFilter === "today") {
      result = result.filter((n) => {
        const notifDate = new Date(n.time);
        return notifDate.toDateString() === now.toDateString();
      });
    } else if (activeFilter === "week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      result = result.filter((n) => new Date(n.time) >= weekAgo);
    }

    // Sort by newest first
    result.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

    return result;
  }, [notifs, activeCategory, activeFilter]);

  const markAsRead = (id: number) => {
    setNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const dismiss = (id: number) => {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <CandidateLayout>
      <Breadcrumb items={[{ label: "Notifications" }]} className="mb-4" />

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
        <p className="text-sm text-gray-500 mt-1">
          Stay informed about important updates related to your career journey.
          {unreadCount > 0 && (
            <span className="ml-2 text-brand-600 font-medium">
              {unreadCount} unread
            </span>
          )}
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-4">
        {notificationCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all",
              activeCategory === cat.id
                ? "bg-brand-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 mb-6">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-full border transition-all",
              activeFilter === filter.id
                ? "border-brand-500 bg-brand-50 text-brand-700"
                : "border-gray-200 text-gray-500 hover:border-gray-300"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      {filteredNotifications.length === 0 ? (
        <EmptyNotifications />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
          {filteredNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onMarkRead={markAsRead}
              onDismiss={dismiss}
            />
          ))}
        </div>
      )}
    </CandidateLayout>
  );
}
