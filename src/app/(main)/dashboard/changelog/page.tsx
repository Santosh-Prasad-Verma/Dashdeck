import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sparkles, Zap, Bug, Rocket, Palette } from "lucide-react";

const releases = [
  {
    version: "v1.0.0",
    date: "June 16, 2026",
    type: "release",
    icon: Rocket,
    changes: [
      { label: "feature", text: "Added 22 interactive dashboards including AI/LLM Analytics, DevOps Monitor, and Healthcare" },
      { label: "feature", text: "Theme system with 4 presets — Default, Tangerine, Brutalist, and Soft Pop" },
      { label: "feature", text: "Full client-side state management with Zustand — no backend required" },
      { label: "feature", text: "Keyboard shortcuts dialog (press ? to view)" },
      { label: "feature", text: "Notification bell with dropdown in header" },
      { label: "feature", text: "Calendar with event scheduling, color coding, and localStorage persistence" },
      { label: "improvement", text: "Redesigned landing page with hero section, features grid, and testimonials" },
      { label: "improvement", text: "Filled all 'Coming Soon' tabs across Finance, Analytics, and Roles" },
      { label: "improvement", text: "Email client now has 10 unique templated email messages" },
      { label: "improvement", text: "Invoice page with save-to-localStorage and PDF export" },
      { label: "improvement", text: "Breadcrumb navigation in dashboard header" },
    ],
  },
  {
    version: "v0.9.0",
    date: "May 28, 2026",
    type: "beta",
    icon: Sparkles,
    changes: [
      { label: "feature", text: "Added Kanban board with drag-and-drop task management" },
      { label: "feature", text: "Added Chat system with conversation management" },
      { label: "feature", text: "Added Settings page with Account, Appearance, Notifications, and Security tabs" },
      { label: "improvement", text: "Improved sidebar navigation with collapsible groups" },
      { label: "fix", text: "Fixed hydration issues in auth pages" },
    ],
  },
];

function getBadge(label: string) {
  switch (label) {
    case "feature": return <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-0"><Sparkles className="size-3 mr-1 inline" />New</Badge>;
    case "improvement": return <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-0"><Zap className="size-3 mr-1 inline" />Improved</Badge>;
    case "fix": return <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0"><Bug className="size-3 mr-1 inline" />Fixed</Badge>;
    default: return <Badge variant="secondary">{label}</Badge>;
  }
}

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Changelog</h1>
        <p className="text-muted-foreground text-sm">Track updates, new features, and improvements.</p>
      </div>

      <div className="flex flex-col gap-6">
        {releases.map((release, ri) => (
          <div key={release.version}>
            {ri > 0 && <Separator className="mb-6" />}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <release.icon className="size-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">{release.version}</span>
                  <Badge variant="outline" className="text-[10px]">{release.type}</Badge>
                </div>
                <p className="text-muted-foreground text-xs">{release.date}</p>
              </div>
            </div>
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-2">
                  {release.changes.map((change, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <div className="pt-0.5">{getBadge(change.label)}</div>
                      <span>{change.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
