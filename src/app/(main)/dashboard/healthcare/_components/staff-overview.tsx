import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const staff = [
  { name: "Dr. Sarah Wilson", role: "Cardiologist", patients: 142, status: "on-duty", avatar: "SW" },
  { name: "Dr. Michael Chen", role: "Neurologist", patients: 118, status: "on-duty", avatar: "MC" },
  { name: "Dr. Amanda Lee", role: "Pediatrician", patients: 96, status: "on-duty", avatar: "AL" },
  { name: "Dr. Robert Kim", role: "Orthopedic Surgeon", patients: 85, status: "off-duty", avatar: "RK" },
  { name: "Dr. Lisa Patel", role: "Oncologist", patients: 72, status: "on-duty", avatar: "LP" },
  { name: "Dr. James Wright", role: "Emergency Medicine", patients: 156, status: "on-duty", avatar: "JW" },
];

export function StaffOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff Overview</CardTitle>
        <CardDescription>On-duty doctors and their patient load</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {staff.map((member) => (
            <div key={member.name} className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
              <div className="flex items-center gap-3">
                <Avatar className="size-9">
                  <AvatarFallback className="bg-muted text-muted-foreground text-xs">{member.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm">{member.name}</div>
                  <div className="text-muted-foreground text-xs">{member.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm tabular-nums">{member.patients} patients</span>
                <Badge className={member.status === "on-duty" ? "bg-foreground/10 text-foreground border border-foreground/25" : "bg-muted text-muted-foreground border-0"}>
                  {member.status === "on-duty" ? "On Duty" : "Off Duty"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
