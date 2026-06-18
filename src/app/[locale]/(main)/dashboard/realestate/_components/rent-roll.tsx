import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const leases = [
  {
    tenant: "TechCorp Inc",
    property: "Skyline Tower",
    unit: "12A",
    start: "Jan 2024",
    end: "Dec 2026",
    rent: 4800,
    status: "active",
  },
  {
    tenant: "BlueWave LLC",
    property: "Park Avenue Plaza",
    unit: "8B",
    start: "Mar 2024",
    end: "Aug 2026",
    rent: 6200,
    status: "active",
  },
  {
    tenant: "GreenLeaf Co",
    property: "Maple Residences",
    unit: "45C",
    start: "Jun 2024",
    end: "May 2027",
    rent: 2100,
    status: "active",
  },
  {
    tenant: "Nexus Labs",
    property: "Tech Park Campus",
    unit: "3A",
    start: "Sep 2024",
    end: "Sep 2026",
    rent: 7500,
    status: "active",
  },
  {
    tenant: "CloudBase",
    property: "Skyline Tower",
    unit: "15F",
    start: "Apr 2024",
    end: "Apr 2026",
    rent: 5200,
    status: "expiring",
  },
  {
    tenant: "DataStream",
    property: "Harbor Industrial",
    unit: "W2",
    start: "Nov 2024",
    end: "Nov 2027",
    rent: 3800,
    status: "active",
  },
  {
    tenant: "PixelArts",
    property: "Willow Creek",
    unit: "22D",
    start: "Feb 2024",
    end: "Feb 2026",
    rent: 1800,
    status: "expiring",
  },
];

export function RentRoll() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Rent Roll Calendar</CardTitle>
        <CardDescription>Upcoming lease expirations and renewals</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[380px]">
          <div className="flex flex-col gap-2 px-4 pb-4">
            {leases.map((lease) => (
              <div
                key={lease.tenant}
                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{lease.tenant}</span>
                    <Badge
                      className={`border-0 text-[10px] ${
                        lease.status === "expiring"
                          ? "bg-red-500/10 text-red-600 dark:text-red-400"
                          : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {lease.status === "expiring" ? "Expiring Soon" : "Active"}
                    </Badge>
                  </div>
                  <div className="mt-0.5 text-muted-foreground text-xs">
                    {lease.property} — Unit {lease.unit}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {lease.start} → {lease.end}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-sm tabular-nums">${lease.rent.toLocaleString()}</div>
                  <div className="text-muted-foreground text-xs">/month</div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
