import {
  Activity,
  Banknote,
  Bot,
  Building2,
  Calendar,
  ChartBar,
  Fingerprint,
  FolderKanban,
  Forklift,
  Gauge,
  GraduationCap,
  HeartPulse,
  Kanban,
  LayoutDashboard,
  LifeBuoy,
  ListTodo,
  Lock,
  type LucideIcon,
  Mail,
  MessageSquare,
  Package,
  ReceiptText,
  ScrollText,
  Server,
  Settings,
  Share2,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";

export interface NavSubItem {
  titleKey: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  titleKey: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  labelKey: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    labelKey: "Sidebar.groups.dashboards",
    items: [
      {
        titleKey: "Sidebar.items.default",
        url: "/dashboard/default",
        icon: LayoutDashboard,
      },
      {
        titleKey: "Sidebar.items.ai",
        url: "/dashboard/ai",
        icon: Bot,
        isNew: true,
      },
      {
        titleKey: "Sidebar.items.crm",
        url: "/dashboard/crm",
        icon: ChartBar,
      },
      {
        titleKey: "Sidebar.items.finance",
        url: "/dashboard/finance",
        icon: Banknote,
      },
      {
        titleKey: "Sidebar.items.analytics",
        url: "/dashboard/analytics",
        icon: Gauge,
      },
      {
        titleKey: "Sidebar.items.productivity",
        url: "/dashboard/productivity",
        icon: ListTodo,
      },
      {
        titleKey: "Sidebar.items.ecommerce",
        url: "/dashboard/ecommerce",
        icon: ShoppingBag,
      },
      {
        titleKey: "Sidebar.items.academy",
        url: "/dashboard/academy",
        icon: GraduationCap,
        isNew: true,
      },
      {
        titleKey: "Sidebar.items.logistics",
        url: "/dashboard/logistics",
        icon: Forklift,
      },
      {
        titleKey: "Sidebar.items.devops",
        url: "/dashboard/devops",
        icon: Server,
      },
      {
        titleKey: "Sidebar.items.healthcare",
        url: "/dashboard/healthcare",
        icon: HeartPulse,
      },
      {
        titleKey: "Sidebar.items.inventory",
        url: "/dashboard/inventory",
        icon: Package,
      },
      {
        titleKey: "Sidebar.items.projects",
        url: "/dashboard/projects",
        icon: FolderKanban,
      },
      {
        titleKey: "Sidebar.items.saas",
        url: "/dashboard/saas",
        icon: TrendingUp,
      },
      {
        titleKey: "Sidebar.items.realestate",
        url: "/dashboard/realestate",
        icon: Building2,
      },
      {
        titleKey: "Sidebar.items.social",
        url: "/dashboard/social",
        icon: Share2,
        isNew: true,
      },
    ],
  },
  {
    id: 2,
    labelKey: "Sidebar.groups.pages",
    items: [
      {
        titleKey: "Sidebar.items.email",
        url: "/dashboard/mail",
        icon: Mail,
      },
      {
        titleKey: "Sidebar.items.chat",
        url: "/dashboard/chat",
        icon: MessageSquare,
      },
      {
        titleKey: "Sidebar.items.calendar",
        url: "/dashboard/calendar",
        icon: Calendar,
      },
      {
        titleKey: "Sidebar.items.kanban",
        url: "/dashboard/kanban",
        icon: Kanban,
      },
      {
        titleKey: "Sidebar.items.invoice",
        url: "/dashboard/invoice",
        icon: ReceiptText,
      },
      {
        titleKey: "Sidebar.items.users",
        url: "/dashboard/users",
        icon: Users,
      },
      {
        titleKey: "Sidebar.items.roles",
        url: "/dashboard/roles",
        icon: Lock,
      },
      {
        titleKey: "Sidebar.items.settings",
        url: "/dashboard/settings",
        icon: Settings,
      },
      {
        titleKey: "Sidebar.items.authentication",
        url: "/auth",
        icon: Fingerprint,
        subItems: [
          { titleKey: "Sidebar.items.loginV1", url: "/auth/v1/login", newTab: true },
          { titleKey: "Sidebar.items.loginV2", url: "/auth/v2/login", newTab: true },
          { titleKey: "Sidebar.items.registerV1", url: "/auth/v1/register", newTab: true },
          { titleKey: "Sidebar.items.registerV2", url: "/auth/v2/register", newTab: true },
        ],
      },
    ],
  },
  {
    id: 3,
    labelKey: "Sidebar.groups.legacy",
    items: [
      {
        titleKey: "Sidebar.items.dashboardsGroup",
        url: "/dashboard/default-v1",
        subItems: [
          { titleKey: "Sidebar.items.defaultV1", url: "/dashboard/default-v1" },
          { titleKey: "Sidebar.items.crmV1", url: "/dashboard/crm-v1" },
          { titleKey: "Sidebar.items.financeV1", url: "/dashboard/finance-v1" },
          { titleKey: "Sidebar.items.analyticsV1", url: "/dashboard/analytics-v1" },
        ],
      },
    ],
  },
  {
    id: 4,
    labelKey: "Sidebar.groups.misc",
    items: [
      {
        titleKey: "Sidebar.items.helpCenter",
        url: "/dashboard/help",
        icon: LifeBuoy,
      },
      {
        titleKey: "Sidebar.items.changelog",
        url: "/dashboard/changelog",
        icon: ScrollText,
      },
      {
        titleKey: "Sidebar.items.systemStatus",
        url: "/dashboard/status",
        icon: Activity,
        isNew: true,
      },
    ],
  },
];
