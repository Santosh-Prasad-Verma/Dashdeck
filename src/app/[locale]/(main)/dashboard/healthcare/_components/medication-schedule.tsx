import { Clock, Pill } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const schedule = [
  { time: "06:00", patient: "Emma Thompson", medication: "Metformin 500mg", route: "Oral", status: "administered" },
  { time: "08:00", patient: "James Rodriguez", medication: "Ceftriaxone 1g", route: "IV", status: "administered" },
  { time: "09:00", patient: "Sofia Patel", medication: "Ibuprofen 400mg", route: "Oral", status: "administered" },
  { time: "10:30", patient: "Liam Johnson", medication: "Warfarin 5mg", route: "Oral", status: "pending" },
  { time: "12:00", patient: "Aria Brown", medication: "Insulin Glargine 20u", route: "SubQ", status: "upcoming" },
  { time: "14:00", patient: "Noah Garcia", medication: "Morphine 5mg", route: "IV", status: "upcoming" },
  { time: "16:00", patient: "Luna Williams", medication: "Amoxicillin 500mg", route: "Oral", status: "upcoming" },
  { time: "18:00", patient: "Emma Thompson", medication: "Metformin 500mg", route: "Oral", status: "upcoming" },
];

export function MedicationSchedule() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Medication Schedule</CardTitle>
        <CardDescription>Today's medication administration timeline</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-[19px] w-0.5 bg-muted" />
          <div className="flex flex-col gap-4">
            {schedule.map((item, i) => (
              <div key={i} className="relative flex gap-4">
                <div
                  className={`relative z-10 mt-1 flex size-10 items-center justify-center rounded-full ${
                    item.status === "administered"
                      ? "bg-foreground/10 text-foreground border border-foreground/25"
                      : item.status === "pending"
                        ? "bg-muted-foreground/10 text-muted-foreground"
                        : "bg-muted text-muted-foreground/60"
                  }`}
                >
                  <Pill className="size-5" />
                </div>
                <div className="flex-1 min-w-0 rounded-lg border p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{item.medication}</span>
                        <Badge className="border-0 text-[10px]" variant="secondary">
                          {item.route}
                        </Badge>
                      </div>
                      <p className="mt-0.5 text-muted-foreground text-xs">{item.patient}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="text-sm font-medium">{item.time}</div>
                      <div
                        className={`text-[10px] ${
                          item.status === "administered"
                            ? "text-foreground font-semibold"
                            : item.status === "pending"
                              ? "text-muted-foreground"
                              : "text-muted-foreground/60"
                        }`}
                      >
                        {item.status}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
