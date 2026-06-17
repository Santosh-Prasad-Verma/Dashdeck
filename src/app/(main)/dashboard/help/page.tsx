import { Book, ExternalLink, FileText, LifeBuoy, MessageSquare, Search, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const faqs = [
  { q: "How do I change the theme?", a: "Click the theme switcher icon in the header, or go to Settings > Appearance to choose from 4 presets." },
  { q: "Can I export dashboard data?", a: "Yes. Most dashboards and tables have an Export button. Invoices support PDF export via the print dialog." },
  { q: "How do I use keyboard shortcuts?", a: "Press ? anywhere to see all available shortcuts, or check Settings > Keyboard Shortcuts." },
  { q: "Where are my saved items stored?", a: "All data persists in your browser's localStorage. No backend setup is required." },
  { q: "How do I add a new user?", a: "Go to Users page, click 'Add User' button, fill the form, and the user is saved locally." },
  { q: "Is there a dark mode?", a: "Yes. Toggle via the header, Settings > Appearance, or press ⌘+Shift+D." },
];

const guides = [
  { title: "Getting Started Guide", desc: "Learn the basics of Dashdeck", icon: Book },
  { title: "Dashboard Reference", desc: "Complete reference for all 22 dashboards", icon: FileText },
  { title: "Theme Customization", desc: "Customize colors, fonts, and presets", icon: Zap },
  { title: "API Documentation", desc: "Internal API endpoints and usage", icon: ExternalLink },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
        <p className="text-muted-foreground text-sm">Find answers, guides, and support resources.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search help articles..." className="h-12 pl-10 text-lg" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {guides.map((guide) => (
          <Card key={guide.title} className="group cursor-pointer transition-all hover:shadow-md">
            <CardContent className="flex items-start gap-4 p-5">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <guide.icon className="size-6" />
              </div>
              <div>
                <h3 className="font-semibold">{guide.title}</h3>
                <p className="text-muted-foreground text-sm">{guide.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Quick answers to common questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div key={i}>
                {i > 0 && <Separator className="mb-4" />}
                <h4 className="font-medium">{faq.q}</h4>
                <p className="mt-1 text-muted-foreground text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center gap-2 rounded-xl border bg-muted/30 p-4 text-sm">
        <LifeBuoy className="size-4 text-muted-foreground" />
        <span className="text-muted-foreground">Still need help?</span>
        <Button variant="link" className="h-auto p-0 text-sm" asChild>
          <Link href="https://github.com/Tarun/dashdeck/issues" target="_blank">
            Open an issue on GitHub
          </Link>
        </Button>
      </div>
    </div>
  );
}
