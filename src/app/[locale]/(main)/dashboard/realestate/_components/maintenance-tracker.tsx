import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const tickets = [
  {
    id: "MT-384",
    property: "Skyline Tower",
    issue: "HVAC malfunction on floor 12",
    priority: "urgent",
    assigned: "Mike's HVAC",
    status: "in-progress",
    created: "2 hours ago",
  },
  {
    id: "MT-383",
    property: "Maple Residences",
    issue: "Water leak in Unit 45C",
    priority: "high",
    assigned: "AquaFix Plumbing",
    status: "in-progress",
    created: "5 hours ago",
  },
  {
    id: "MT-382",
    property: "Park Avenue Plaza",
    issue: "Elevator inspection due",
    priority: "medium",
    assigned: "ElevatorPro Inc",
    status: "scheduled",
    created: "1 day ago",
  },
  {
    id: "MT-381",
    property: "Willow Creek",
    issue: "Landscaping maintenance",
    priority: "low",
    assigned: "GreenThumb Services",
    status: "pending",
    created: "2 days ago",
  },
  {
    id: "MT-380",
    property: "Harbor Industrial",
    issue: "Loading dock door repair",
    priority: "high",
    assigned: "Industrial Repairs Co",
    status: "completed",
    created: "3 days ago",
  },
];

export function MaintenanceTracker() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance Tracker</CardTitle>
        <CardDescription>Active maintenance requests and status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-xs">{ticket.id}</span>
                  <span className="font-medium text-sm">{ticket.issue}</span>
                </div>
                <div className="mt-0.5 text-muted-foreground text-xs">
                  {ticket.property} · {ticket.assigned}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  className={
                    ticket.priority === "urgent"
                      ? "border-0 bg-red-500/10 text-red-600"
                      : ticket.priority === "high"
                        ? "border-0 bg-amber-500/10 text-amber-600"
                        : "border-0 bg-muted text-muted-foreground"
                  }
                >
                  {ticket.priority}
                </Badge>
                <span className="text-muted-foreground text-xs">{ticket.created}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
