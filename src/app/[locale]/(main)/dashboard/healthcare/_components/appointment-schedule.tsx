import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const appointments = [
  {
    id: 1,
    patient: "Emma Thompson",
    doctor: "Dr. Sarah Wilson",
    type: "Checkup",
    time: "09:00 AM",
    status: "completed",
    avatar: "ET",
  },
  {
    id: 2,
    patient: "James Rodriguez",
    doctor: "Dr. Michael Chen",
    type: "Surgery",
    time: "10:30 AM",
    status: "in-progress",
    avatar: "JR",
  },
  {
    id: 3,
    patient: "Sofia Patel",
    doctor: "Dr. Sarah Wilson",
    type: "Consultation",
    time: "11:00 AM",
    status: "upcoming",
    avatar: "SP",
  },
  {
    id: 4,
    patient: "Liam Johnson",
    doctor: "Dr. Amanda Lee",
    type: "Follow-up",
    time: "11:30 AM",
    status: "upcoming",
    avatar: "LJ",
  },
  {
    id: 5,
    patient: "Aria Brown",
    doctor: "Dr. Michael Chen",
    type: "Therapy",
    time: "01:00 PM",
    status: "upcoming",
    avatar: "AB",
  },
  {
    id: 6,
    patient: "Noah Garcia",
    doctor: "Dr. Amanda Lee",
    type: "Emergency",
    time: "02:30 PM",
    status: "upcoming",
    avatar: "NG",
  },
  {
    id: 7,
    patient: "Luna Williams",
    doctor: "Dr. Sarah Wilson",
    type: "Checkup",
    time: "03:00 PM",
    status: "upcoming",
    avatar: "LW",
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "completed":
      return <Badge className="border border-foreground/25 bg-foreground/10 text-foreground">Completed</Badge>;
    case "in-progress":
      return (
        <Badge className="border border-muted-foreground/25 bg-muted-foreground/10 text-muted-foreground">
          In Progress
        </Badge>
      );
    case "upcoming":
      return <Badge className="border-0 bg-muted text-muted-foreground/60">Upcoming</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

export function AppointmentSchedule() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Today's Appointments</CardTitle>
        <CardDescription>Scheduled patient visits for today</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ScrollArea className="h-[380px]">
          <div className="flex flex-col gap-2">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarFallback className="bg-muted text-muted-foreground text-xs">{appt.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{appt.patient}</div>
                    <div className="text-muted-foreground text-xs">
                      {appt.doctor} · {appt.type}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground text-sm">{appt.time}</span>
                  {getStatusBadge(appt.status)}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
