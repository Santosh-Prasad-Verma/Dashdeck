import { Archive, CircleHelp, File, Inbox, Keyboard, type LucideIcon, Send, Star, Trash2 } from "lucide-react";
import { siFigma, siGoogledocs, siGooglephotos } from "simple-icons";

const arhamKhan = {
  name: "Arham Khan",
  email: "hello@arhamkhnz.com",
};

const weblabsStudio = {
  name: "Weblabs Studio",
  email: "contact@weblabs.studio",
};

const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString();
const hoursAgo = (hours: number) => minutesAgo(hours * 60);
const daysAgo = (days: number) => hoursAgo(days * 24);

export type Recipient = {
  name: string;
  email: string;
};

export type Attachment = {
  id: string;
  name: string;
  size: string;
  icon: typeof siFigma;
};

export type Mail = {
  id: string;
  accountId: number;
  from: Recipient;
  to: Recipient[];
  cc?: Recipient[];
  subject: string;
  body: string;
  receivedAt: string;
  folder: "inbox" | "drafts" | "sent" | "archive" | "trash";
  isRead: boolean;
  isPinned: boolean;
  isPriority: boolean;
  labels: string[];
  attachments?: Attachment[];
  messageCount?: number;
};

export type MailNavItem = {
  id: string;
  title: string;
  label?: string;
  icon: LucideIcon;
  isActive: boolean;
};

type MailNavigation = {
  navMain: MailNavItem[];
  folders: MailNavItem[];
  navFooter: MailNavItem[];
};

export const mails: Mail[] = [
  {
    id: "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
    accountId: 1,
    from: {
      name: "William Smith",
      email: "williamsmith@example.com",
    },
    to: [arhamKhan],
    cc: [weblabsStudio],
    subject: "Meeting Tomorrow",
    body: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William",
    receivedAt: minutesAgo(24),
    folder: "inbox",
    isRead: true,
    isPinned: true,
    isPriority: true,
    labels: ["meeting", "work", "important"],
    attachments: [
      {
        id: "studio-admin-fig",
        name: "studio-admin.fig",
        size: "21 MB",
        icon: siFigma,
      },
      {
        id: "features-docx",
        name: "features.docx",
        size: "3.7 MB",
        icon: siGoogledocs,
      },
      {
        id: "preview-png",
        name: "preview.png",
        size: "2.3 MB",
        icon: siGooglephotos,
      },
    ],
  },
  {
    id: "110e8400-e29b-11d4-a716-446655440000",
    accountId: 2,
    from: {
      name: "Alice Smith",
      email: "alicesmith@example.com",
    },
    to: [weblabsStudio],
    subject: "Re: Project Update",
    body: "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in.\n\nI have a few minor suggestions that I'll include in the attached document.\n\nLet's discuss these during our next meeting. Keep up the excellent work!\n\nBest regards, Alice",
    receivedAt: hoursAgo(2),
    folder: "inbox",
    isRead: true,
    isPinned: true,
    isPriority: false,
    labels: ["work", "important"],
    attachments: [
      {
        id: "project-notes-docx",
        name: "project-notes.docx",
        size: "1.8 MB",
        icon: siGoogledocs,
      },
    ],
    messageCount: 3,
  },
  {
    id: "3e7c3f6d-bdf5-46ae-8d90-171300f27ae2",
    accountId: 1,
    from: {
      name: "Bob Johnson",
      email: "bobjohnson@example.com",
    },
    to: [arhamKhan],
    subject: "Weekend Plans",
    body: "Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun.\n\nIf you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature.\n\nLooking forward to your response!\n\nBest, Bob",
    receivedAt: daysAgo(1),
    folder: "inbox",
    isRead: true,
    isPinned: true,
    isPriority: false,
    labels: ["personal"],
  },
  {
    id: "61c35085-72d7-42b4-8d62-738f700d4b92",
    accountId: 1,
    from: {
      name: "Emily Davis",
      email: "emilydavis@example.com",
    },
    to: [arhamKhan],
    subject: "Re: Question about Budget",
    body: "I have a question about the budget for the upcoming project. It seems like there's a discrepancy in the allocation of resources.\n\nI've reviewed the budget report and identified a few areas where we might be able to optimize our spending without compromising the project's quality.\n\nI've attached a detailed analysis for your reference. Let's discuss this further in our next meeting.\n\nThanks, Emily",
    receivedAt: daysAgo(2),
    folder: "inbox",
    isRead: false,
    isPinned: true,
    isPriority: true,
    labels: ["work", "budget"],
    attachments: [
      {
        id: "budget-analysis-docx",
        name: "budget-analysis.docx",
        size: "2.1 MB",
        icon: siGoogledocs,
      },
    ],
    messageCount: 2,
  },
  {
    id: "8f7b5db9-d935-4e42-8e05-1f1d0a3dfb97",
    accountId: 2,
    from: {
      name: "Michael Wilson",
      email: "michaelwilson@example.com",
    },
    to: [weblabsStudio],
    subject: "Important Announcement",
    body: "I have an important announcement to make during our team meeting. It pertains to a strategic shift in our approach to the upcoming product launch. We've received valuable feedback from our beta testers, and I believe it's time to make some adjustments to better meet our customers' needs.\n\nThis change is crucial to our success, and I look forward to discussing it with the team. Please be prepared to share your insights during the meeting.\n\nRegards, Michael",
    receivedAt: daysAgo(3),
    folder: "inbox",
    isRead: false,
    isPinned: false,
    isPriority: true,
    labels: ["meeting", "work", "important"],
  },
  {
    id: "1f0f2c02-e299-40de-9b1d-86ef9e42126b",
    accountId: 1,
    from: {
      name: "Sarah Brown",
      email: "sarahbrown@example.com",
    },
    to: [arhamKhan],
    subject: "Re: Feedback on Proposal",
    body: "Thank you for your feedback on the proposal. It looks great! I'm pleased to hear that you found it promising. The team worked diligently to address all the key points you raised, and I believe we now have a strong foundation for the project.\n\nI've attached the revised proposal for your review.\n\nPlease let me know if you have any further comments or suggestions. Looking forward to your response.\n\nBest regards, Sarah",
    receivedAt: daysAgo(5),
    folder: "inbox",
    isRead: true,
    isPinned: false,
    isPriority: false,
    labels: ["work"],
    attachments: [
      {
        id: "proposal-layout-fig",
        name: "proposal-layout.fig",
        size: "14 MB",
        icon: siFigma,
      },
    ],
  },
  {
    id: "17c0a96d-4415-42b1-8b4f-764efab57f66",
    accountId: 2,
    from: {
      name: "David Lee",
      email: "davidlee@example.com",
    },
    to: [weblabsStudio],
    cc: [arhamKhan],
    subject: "New Project Idea",
    body: "I have an exciting new project idea to discuss with you. It involves expanding our services to target a niche market that has shown considerable growth in recent months.\n\nI've prepared a detailed proposal outlining the potential benefits and the strategy for execution.\n\nThis project has the potential to significantly impact our business positively. Let's set up a meeting to dive into the details and determine if it aligns with our current goals.\n\nBest regards, David",
    receivedAt: daysAgo(8),
    folder: "inbox",
    isRead: false,
    isPinned: false,
    isPriority: false,
    labels: ["meeting", "work", "important"],
  },
  {
    id: "2f0130cb-39fc-44c4-bb3c-0a4337edaaab",
    accountId: 1,
    from: {
      name: "Olivia Wilson",
      email: "oliviawilson@example.com",
    },
    to: [arhamKhan],
    subject: "Vacation Plans",
    body: "Let's plan our vacation for next month. What do you think? I've been thinking of visiting a tropical paradise, and I've put together some destination options.\n\nI believe it's time for us to unwind and recharge. Please take a look at the options and let me know your preferences.\n\nWe can start making arrangements to ensure a smooth and enjoyable trip.\n\nExcited to hear your thoughts! Olivia",
    receivedAt: daysAgo(12),
    folder: "inbox",
    isRead: true,
    isPinned: false,
    isPriority: false,
    labels: ["personal"],
  },
  {
    id: "de305d54-75b4-431b-adb2-eb6b9e546014",
    accountId: 2,
    from: {
      name: "James Martin",
      email: "jamesmartin@example.com",
    },
    to: [weblabsStudio],
    subject: "Re: Conference Registration",
    body: "I've completed the registration for the conference next month. The event promises to be a great networking opportunity, and I'm looking forward to attending the various sessions and connecting with industry experts.\n\nI've also attached the conference schedule for your reference.\n\nIf there are any specific topics or sessions you'd like me to explore, please let me know. It's an exciting event, and I'll make the most of it.\n\nBest regards, James",
    receivedAt: daysAgo(18),
    folder: "inbox",
    isRead: true,
    isPinned: false,
    isPriority: false,
    labels: ["work", "conference"],
    attachments: [
      {
        id: "conference-schedule-png",
        name: "conference-schedule.png",
        size: "860 KB",
        icon: siGooglephotos,
      },
    ],
  },
  {
    id: "7dd90c63-00f6-40f3-bd87-5060a24e8ee7",
    accountId: 1,
    from: {
      name: "Sophia White",
      email: "sophiawhite@example.com",
    },
    to: [arhamKhan],
    subject: "Team Dinner",
    body: "Let's have a team dinner next week to celebrate our success. We've achieved some significant milestones, and it's time to acknowledge our hard work and dedication.\n\nI've made reservations at a lovely restaurant, and I'm sure it'll be an enjoyable evening.\n\nPlease confirm your availability and any dietary preferences. Looking forward to a fun and memorable dinner with the team!\n\nBest, Sophia",
    receivedAt: daysAgo(24),
    folder: "inbox",
    isRead: false,
    isPinned: false,
    isPriority: false,
    labels: ["meeting", "work"],
  },
  {
    id: "99a88f78-3eb4-4d87-87b7-7b15a49a0a05",
    accountId: 2,
    from: {
      name: "Daniel Johnson",
      email: "danieljohnson@example.com",
    },
    to: [weblabsStudio],
    subject: "Feedback Request",
    body: "I'd like your feedback on the latest project deliverables. We've made significant progress, and I value your input to ensure we're on the right track.\n\nI've attached the deliverables for your review, and I'm particularly interested in any areas where you think we can further enhance the quality or efficiency.\n\nYour feedback is invaluable, and I appreciate your time and expertise. Let's work together to make this project a success.\n\nRegards, Daniel",
    receivedAt: daysAgo(31),
    folder: "inbox",
    isRead: false,
    isPinned: false,
    isPriority: false,
    labels: ["work"],
  },
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    accountId: 1,
    from: {
      name: "Ava Taylor",
      email: "avataylor@example.com",
    },
    to: [arhamKhan],
    subject: "Re: Meeting Agenda",
    body: "Here's the agenda for our meeting next week. I've included all the topics we need to cover, as well as time allocations for each.\n\nIf you have any additional items to discuss or any specific points to address, please let me know, and we can integrate them into the agenda.\n\nIt's essential that our meeting is productive and addresses all relevant matters.\n\nLooking forward to our meeting! Ava",
    receivedAt: daysAgo(45),
    folder: "inbox",
    isRead: true,
    isPinned: false,
    isPriority: false,
    labels: ["meeting", "work"],
  },
  {
    id: "c1a0ecb4-2540-49c5-86f8-21e5ce79e4e6",
    accountId: 2,
    from: {
      name: "William Anderson",
      email: "williamanderson@example.com",
    },
    to: [weblabsStudio],
    subject: "Product Launch Update",
    body: "The product launch is on track. I'll provide an update during our call. We've made substantial progress in the development and marketing of our new product.\n\nI'm excited to share the latest updates with you during our upcoming call. It's crucial that we coordinate our efforts to ensure a successful launch. Please come prepared with any questions or insights you may have.\n\nLet's make this product launch a resounding success!\n\nBest regards, William",
    receivedAt: daysAgo(62),
    folder: "inbox",
    isRead: false,
    isPinned: false,
    isPriority: false,
    labels: ["meeting", "work", "important"],
  },
  {
    id: "ba54eefd-4097-4949-99f2-2a9ae4d1a836",
    accountId: 1,
    from: {
      name: "Mia Harris",
      email: "miaharris@example.com",
    },
    to: [arhamKhan],
    subject: "Re: Travel Itinerary",
    body: "I've received the travel itinerary. It looks great! Thank you for your prompt assistance in arranging the details. I've reviewed the schedule and the accommodations, and everything seems to be in order. I'm looking forward to the trip, and I'm confident it'll be a smooth and enjoyable experience.\n\nIf there are any specific activities or attractions you recommend at our destination, please feel free to share your suggestions.\n\nExcited for the trip! Mia",
    receivedAt: daysAgo(75),
    folder: "inbox",
    isRead: true,
    isPinned: false,
    isPriority: false,
    labels: ["personal", "travel"],
  },
  {
    id: "df09b6ed-28bd-4e0c-85a9-9320ec5179aa",
    accountId: 2,
    from: {
      name: "Ethan Clark",
      email: "ethanclark@example.com",
    },
    to: [weblabsStudio],
    subject: "Team Building Event",
    body: "Let's plan a team-building event for our department. Team cohesion and morale are vital to our success, and I believe a well-organized team-building event can be incredibly beneficial. I've done some research and have a few ideas for fun and engaging activities.\n\nPlease let me know your thoughts and availability. We want this event to be both enjoyable and productive.\n\nTogether, we'll strengthen our team and boost our performance.\n\nRegards, Ethan",
    receivedAt: daysAgo(92),
    folder: "inbox",
    isRead: false,
    isPinned: false,
    isPriority: false,
    labels: ["meeting", "work"],
  },
  {
    id: "d67c1842-7f8b-4b4b-9be1-1b3b1ab4611d",
    accountId: 1,
    from: {
      name: "Chloe Hall",
      email: "chloehall@example.com",
    },
    to: [arhamKhan],
    subject: "Re: Budget Approval",
    body: "The budget has been approved. We can proceed with the project. I'm delighted to inform you that our budget proposal has received the green light from the finance department. This is a significant milestone, and it means we can move forward with the project as planned.\n\nI've attached the finalized budget for your reference. Let's ensure that we stay on track and deliver the project on time and within budget.\n\nIt's an exciting time for us! Chloe",
    receivedAt: daysAgo(118),
    folder: "inbox",
    isRead: true,
    isPinned: false,
    isPriority: false,
    labels: ["work", "budget"],
  },
  {
    id: "6c9a7f94-8329-4d70-95d3-51f68c186ae1",
    accountId: 2,
    from: {
      name: "Samuel Turner",
      email: "samuelturner@example.com",
    },
    to: [weblabsStudio],
    subject: "Weekend Hike",
    body: "Who's up for a weekend hike in the mountains? I've been craving some outdoor adventure, and a hike in the mountains sounds like the perfect escape. If you're up for the challenge, we can explore some scenic trails and enjoy the beauty of nature.\n\nI've done some research and have a few routes in mind.\n\nLet me know if you're interested, and we can plan the details.\n\nIt's sure to be a memorable experience! Samuel",
    receivedAt: daysAgo(145),
    folder: "inbox",
    isRead: false,
    isPinned: false,
    isPriority: false,
    labels: ["personal"],
  },
  {
    id: "welcome-001",
    accountId: 1,
    from: {
      name: "Dashdeck",
      email: "welcome@pulsedashboard.com",
    },
    to: [arhamKhan],
    subject: "Welcome to Dashdeck!",
    body: "Hi there! 👋\n\nWelcome to Dashdeck — your all-in-one admin solution.\n\nHere's what you can do:\n• Manage your team with 15+ dashboard views\n• Track AI/LLM usage and costs\n• Organize tasks with the Kanban board\n• Schedule events with the Calendar\n\nGet started by exploring the dashboard at /dashboard/default\n\nNeed help? Reply to this email anytime.\n\nBest,\nThe Pulse Team",
    receivedAt: minutesAgo(5),
    folder: "inbox",
    isRead: false,
    isPinned: false,
    isPriority: false,
    labels: ["onboarding", "welcome"],
  },
  {
    id: "invoice-002",
    accountId: 2,
    from: {
      name: "Billing Team",
      email: "billing@pulsedashboard.com",
    },
    to: [weblabsStudio],
    subject: "Invoice #INV-2024-001 — $499.00 Due",
    body: "Hello,\n\nYour invoice for the Pro Plan subscription is ready.\n\n━━━━━━━━━━━━━━━━━━━━\nInvoice: #INV-2024-001\nDate: June 16, 2026\nDue: July 16, 2026\nAmount: $499.00\n━━━━━━━━━━━━━━━━━━━━\n\nPlan: Pro (Annual)\nIncludes:\n✓ Unlimited dashboards\n✓ Priority support\n✓ Custom themes\n✓ Team collaboration\n\nPay online: [Pay Now]\n\nQuestions? Contact billing@pulsedashboard.com\n\nThank you for your business!",
    receivedAt: hoursAgo(1),
    folder: "inbox",
    isRead: false,
    isPinned: true,
    isPriority: true,
    labels: ["billing", "urgent"],
    attachments: [
      {
        id: "invoice-pdf",
        name: "INV-2024-001.pdf",
        size: "124 KB",
        icon: siGoogledocs,
      },
    ],
  },
  {
    id: "newsletter-003",
    accountId: 2,
    from: {
      name: "Pulse Newsletter",
      email: "newsletter@pulsedashboard.com",
    },
    to: [arhamKhan],
    subject: "🚀 June 2026 — What's New in Pulse",
    body: "Your monthly Pulse digest is here!\n\n━━━━ TOP STORIES ━━━━\n\n1. AI Dashboard Launched\nTrack model usage, token costs, and API performance across Claude, GPT-4o, Gemini, and Llama.\n\n2. Calendar Integration\nFull scheduling with color-coded events, reminders, and team visibility.\n\n3. Keyboard Shortcuts\nPress '?' to see all available shortcuts. Navigate faster than ever.\n\n━━━━ COMMUNITY ━━━━\n\n• 12,000+ active users\n• 500+ GitHub stars\n• 45+ contributors\n\n━━━━ TIP OF THE MONTH ━━━━\n\nUse ⌘+J to open the command palette and search across all dashboards instantly.\n\nSee you next month!\nThe Pulse Team",
    receivedAt: daysAgo(1),
    folder: "inbox",
    isRead: true,
    isPinned: false,
    isPriority: false,
    labels: ["newsletter", "updates"],
  },
  {
    id: "password-reset-004",
    accountId: 1,
    from: {
      name: "Security Team",
      email: "security@pulsedashboard.com",
    },
    to: [arhamKhan],
    subject: "🔐 Password Reset Request",
    body: "Hi,\n\nWe received a request to reset your password for tarun@dashboard.dev.\n\nClick the link below to set a new password:\n\n[Reset Password] — expires in 30 minutes\n\nIf you didn't request this, please ignore this email or contact support if you're concerned about your account security.\n\nFor your safety:\n• Never share this link\n• Use a strong, unique password\n• Enable 2FA in Settings > Security\n\n— Pulse Security Team",
    receivedAt: hoursAgo(3),
    folder: "inbox",
    isRead: false,
    isPinned: false,
    isPriority: true,
    labels: ["security", "urgent"],
  },
  {
    id: "product-launch-005",
    accountId: 2,
    from: {
      name: "Product Team",
      email: "product@pulsedashboard.com",
    },
    to: [weblabsStudio],
    cc: [arhamKhan],
    subject: "🎉 Introducing Pulse Analytics v2.0",
    body: "We're thrilled to announce Pulse Analytics v2.0!\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nNEW FEATURES:\n\n📊 Real-time Dashboards\nLive data streaming with sub-second refresh rates.\n\n🤖 AI-Powered Insights\nAutomatic anomaly detection and trend prediction.\n\n📈 Custom Report Builder\nDrag-and-drop report creation with 20+ chart types.\n\n🔔 Smart Alerts\nConfigurable thresholds with email/Slack notifications.\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nEarly adopters get 3 months free on the Analytics Pro plan.\n\n[Upgrade Now] | [Watch Demo] | [Read Docs]\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nBuilt with ❤️ by the Pulse Team",
    receivedAt: daysAgo(2),
    folder: "inbox",
    isRead: false,
    isPinned: false,
    isPriority: false,
    labels: ["product", "announcement"],
  },
  {
    id: "feedback-006",
    accountId: 1,
    from: {
      name: "Customer Success",
      email: "success@pulsedashboard.com",
    },
    to: [arhamKhan],
    subject: "How are we doing? Quick 2-minute survey",
    body: "Hi Tarun,\n\nYou've been using Dashdeck for 30 days now — we'd love to hear your thoughts!\n\n━━━━ YOUR STATS ━━━━\n• 47 dashboard views\n• 12 reports generated\n• 3 team members invited\n\n━━━━ QUICK FEEDBACK ━━━━\n\nRate your experience:\n⭐⭐⭐⭐⭐\n\nWhat do you love most?\n[ ] Dashboard variety\n[ ] Ease of use\n[ ] Theme system\n[ ] Keyboard shortcuts\n[ ] Other\n\n━━━━━━━━━━━━━━━━━━━\n\nComplete the survey and get a free month of Pro.\n\n[Take Survey — 2 min]\n\nThanks for being a valued user!\n— The Pulse Team",
    receivedAt: daysAgo(3),
    folder: "inbox",
    isRead: true,
    isPinned: false,
    isPriority: false,
    labels: ["feedback", "survey"],
  },
  {
    id: "event-007",
    accountId: 2,
    from: {
      name: "Events Team",
      email: "events@pulsedashboard.com",
    },
    to: [weblabsStudio],
    subject: "📅 You're Invited: Pulse Summit 2026",
    body: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nYOU'RE INVITED\n\nPulse Summit 2026\nThe Future of Admin Dashboards\n\n📅 July 15-16, 2026\n📍 San Francisco, CA + Virtual\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nAGENDA HIGHLIGHTS:\n\nDay 1:\n• Keynote: Next-Gen Dashboard Design\n• Workshop: Building with AI/LLM Integration\n• Panel: Open Source vs Commercial\n\nDay 2:\n• Hackathon: Build a Dashboard in 4 Hours\n• Product Roadmap Preview\n• Networking Dinner\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nSpeakers from Vercel, Stripe, Linear, and more.\n\nEarly bird pricing ends July 1st.\n\n[Register Now] | [View Agenda] | [Travel Info]\n\nSee you there!\nThe Pulse Events Team",
    receivedAt: daysAgo(4),
    folder: "inbox",
    isRead: false,
    isPinned: false,
    isPriority: false,
    labels: ["event", "invitation"],
  },
  {
    id: "order-008",
    accountId: 1,
    from: {
      name: "Pulse Store",
      email: "orders@pulsedashboard.com",
    },
    to: [arhamKhan],
    subject: "✅ Order Confirmed — #ORD-8842",
    body: "Thanks for your order!\n\n━━━━ ORDER DETAILS ━━━━\n\nOrder: #ORD-8842\nDate: June 16, 2026\nStatus: Confirmed ✓\n\n━━━━ ITEMS ━━━━\n\n1x Pulse Pro License (Annual)     $499.00\n1x Custom Theme Pack              $49.00\n1x Priority Support Add-on        $99.00\n\n━━━━━━━━━━━━━━━━━━\nSubtotal:                           $647.00\nDiscount (EARLY20):                -$129.40\n━━━━━━━━━━━━━━━━━━\nTotal:                             $517.60\n━━━━━━━━━━━━━━━━━━\n\nPayment: Visa ending in 4242\n\nYour license key has been emailed separately.\n\n[View Order] | [Download Receipt]\n\nQuestions? Reply to this email.\n\n— Pulse Store",
    receivedAt: hoursAgo(6),
    folder: "inbox",
    isRead: true,
    isPinned: false,
    isPriority: false,
    labels: ["order", "confirmation"],
    attachments: [
      {
        id: "receipt-pdf",
        name: "receipt-ORD-8842.pdf",
        size: "89 KB",
        icon: siGoogledocs,
      },
    ],
  },
  {
    id: "security-alert-009",
    accountId: 1,
    from: {
      name: "Pulse Security",
      email: "alerts@pulsedashboard.com",
    },
    to: [arhamKhan],
    subject: "⚠️ Security Alert: New login detected",
    body: "━━━━ SECURITY ALERT ━━━━\n\nWe detected a new sign-in to your account.\n\n━━━━ DETAILS ━━━━\n\nTime: June 16, 2026, 3:42 PM UTC\nLocation: San Francisco, CA, USA\nDevice: Chrome on macOS\nIP: 192.168.1.xxx\n\n━━━━━━━━━━━━━━━━━━\n\nWas this you?\n\n✅ Yes, this was me — [Confirm]\n❌ No, secure my account — [Lock Account]\n\n━━━━ RECOMMENDED ACTIONS ━━━━\n\n• Enable two-factor authentication\n• Review active sessions in Settings > Security\n• Update your password if you haven't recently\n\n━━━━━━━━━━━━━━━━━━\n\nIf you didn't make this sign-in, your account may be compromised. Take action immediately.\n\n— Pulse Security Team",
    receivedAt: minutesAgo(45),
    folder: "inbox",
    isRead: false,
    isPinned: false,
    isPriority: true,
    labels: ["security", "alert", "urgent"],
  },
  {
    id: "weekly-digest-010",
    accountId: 2,
    from: {
      name: "Weekly Digest",
      email: "digest@pulsedashboard.com",
    },
    to: [weblabsStudio],
    subject: "📊 Your Weekly Pulse Report — June 10-16",
    body: "━━━━ WEEKLY DIGEST ━━━━\nJune 10 - 16, 2026\n\n━━━━ TEAM ACTIVITY ━━━━\n\n• 24 dashboard views (↑12%)\n• 8 reports exported (↑5%)\n• 3 new team members\n• 156 API calls\n\n━━━━ TOP DASHBOARDS ━━━━\n\n1. AI & LLM Analytics — 89 views\n2. Finance Overview — 67 views\n3. CRM Pipeline — 45 views\n4. E-commerce — 34 views\n5. User Management — 28 views\n\n━━━━ AI USAGE ━━━━\n\n• Claude 3.5: 4,200 tokens ($12.60)\n• GPT-4o: 3,100 tokens ($18.60)\n• Total: $31.20 (↓8% from last week)\n\n━━━━ TEAM LEADERS ━━━━\n\n🥇 Sarah — 42 actions\n🥈 Mike — 38 actions\n🥉 Alex — 29 actions\n\n━━━━ NEXT WEEK ━━━━\n\n• Scheduled reports: 3\n• Upcoming deadlines: 5\n• Calendar events: 8\n\n[View Full Report] | [Manage Preferences]\n\nHave a great week!\n— Pulse Analytics",
    receivedAt: daysAgo(1),
    folder: "inbox",
    isRead: false,
    isPinned: false,
    isPriority: false,
    labels: ["digest", "report", "weekly"],
  },
];

export const mailNavigation: MailNavigation = {
  navMain: [
    {
      id: "inbox",
      title: "Inbox",
      label: "28",
      icon: Inbox,
      isActive: true,
    },
    {
      id: "priority",
      title: "Priority",
      label: "3",
      icon: Star,
      isActive: false,
    },
  ],
  folders: [
    {
      id: "drafts",
      title: "Drafts",
      label: "9",
      icon: File,
      isActive: false,
    },
    {
      id: "sent",
      title: "Sent",
      icon: Send,
      isActive: false,
    },
    {
      id: "archive",
      title: "Archive",
      icon: Archive,
      isActive: false,
    },
    {
      id: "trash",
      title: "Trash",
      icon: Trash2,
      isActive: false,
    },
  ],
  navFooter: [
    {
      id: "help-feedback",
      title: "Help & feedback",
      icon: CircleHelp,
      isActive: false,
    },
    {
      id: "keyboard-shortcuts",
      title: "Keyboard shortcuts",
      icon: Keyboard,
      isActive: false,
    },
  ],
};

export const accounts = [
  {
    id: 1,
    label: "Arham Khan",
    email: "hello@arhamkhnz.com",
  },
  {
    id: 2,
    label: "Weblabs Studio",
    email: "contact@weblabs.studio",
  },
];
