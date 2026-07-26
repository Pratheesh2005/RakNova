export const companySettings = {
  organization: {
    name: "TechNova Solutions",
    timezone: "Asia/Kolkata (IST)",
    language: "English",
    currency: "INR (₹)",
  },
  recruitment: {
    defaultWorkflow: "Standard (Review → Interview → Offer)",
    defaultInterviewDuration: "60 minutes",
    defaultOfferValidity: "7 days",
    applicationAutoClose: true,
  },
  notifications: {
    emailNotifications: true,
    interviewReminders: true,
    applicationAlerts: true,
    offerUpdates: true,
    systemAnnouncements: false,
  },
  security: {
    twoFactorAuth: false,
    activeSessions: 3,
    passwordPolicy: "Minimum 8 characters, 1 uppercase, 1 number",
  },
  integrations: {
    googleCalendar: false,
    microsoftOutlook: false,
    slack: false,
    microsoftTeams: true,
  },
};
