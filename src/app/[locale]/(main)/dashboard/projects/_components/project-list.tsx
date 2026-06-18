import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

const projects = [
  {
    id: 1,
    name: "Dashdeck v2",
    lead: "Sarah Chen",
    progress: 75,
    status: "on-track",
    team: ["SC", "ML", "AK"],
    deadline: "Jul 30",
  },
  {
    id: 2,
    name: "API Gateway Migration",
    lead: "Mike Lee",
    progress: 92,
    status: "on-track",
    team: ["ML", "JD", "LP"],
    deadline: "Jul 15",
  },
  {
    id: 3,
    name: "Mobile App Redesign",
    lead: "Alex Kim",
    progress: 45,
    status: "at-risk",
    team: ["AK", "SC", "EB"],
    deadline: "Aug 20",
  },
  {
    id: 4,
    name: "Analytics Platform",
    lead: "Sarah Chen",
    progress: 88,
    status: "on-track",
    team: ["SC", "JW", "NG"],
    deadline: "Jul 28",
  },
  {
    id: 5,
    name: "Design System v3",
    lead: "Emma Brooks",
    progress: 62,
    status: "on-track",
    team: ["EB", "AK"],
    deadline: "Aug 10",
  },
  {
    id: 6,
    name: "Security Audit",
    lead: "John Doe",
    progress: 30,
    status: "at-risk",
    team: ["JD", "LP"],
    deadline: "Aug 05",
  },
  {
    id: 7,
    name: "Documentation Site",
    lead: "Nora Garcia",
    progress: 55,
    status: "on-track",
    team: ["NG", "JW", "ML"],
    deadline: "Sep 01",
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "on-track":
      return <Badge className="border-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">On Track</Badge>;
    case "at-risk":
      return <Badge className="border-0 bg-amber-500/10 text-amber-600 dark:text-amber-400">At Risk</Badge>;
    case "blocked":
      return <Badge className="border-0 bg-red-500/10 text-red-600 dark:text-red-400">Blocked</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

export function ProjectList() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>All Projects</CardTitle>
        <CardDescription>Current project status and progress</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[400px]">
          <div className="flex flex-col gap-3 px-4 pb-4">
            {projects.map((project) => (
              <div key={project.id} className="rounded-lg border p-4 transition-colors hover:bg-muted/50">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-sm">{project.name}</h4>
                    <p className="mt-0.5 text-muted-foreground text-xs">
                      Lead: {project.lead} · Due {project.deadline}
                    </p>
                  </div>
                  {getStatusBadge(project.status)}
                </div>
                <div className="mt-3 flex items-center gap-4">
                  <Progress value={project.progress} className="h-2 flex-1" />
                  <span className="w-10 text-right font-medium text-sm tabular-nums">{project.progress}%</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <AvatarGroup>
                    {project.team.map((initials, i) => (
                      <Avatar key={i} className="size-7">
                        <AvatarFallback className="bg-muted text-[10px] text-muted-foreground">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </AvatarGroup>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
