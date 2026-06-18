import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const warehouses = [
  { name: "Warehouse A", capacity: 15000, used: 12400, location: "Dallas, TX" },
  { name: "Warehouse B", capacity: 12000, used: 8900, location: "Phoenix, AZ" },
  { name: "Warehouse C", capacity: 18000, used: 15200, location: "Chicago, IL" },
  { name: "Warehouse D", capacity: 8000, used: 6200, location: "Atlanta, GA" },
  { name: "Warehouse E", capacity: 14000, used: 9800, location: "Portland, OR" },
];

export function CapacityGauge() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Warehouse Capacity</CardTitle>
        <CardDescription>Storage utilization across facilities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {warehouses.map((wh) => {
            const pct = Math.round((wh.used / wh.capacity) * 100);
            const radius = 32;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (pct / 100) * circumference;
            const color = pct > 85 ? "#ef4444" : pct > 70 ? "#f59e0b" : "#10b981";

            return (
              <div key={wh.name} className="flex items-center gap-4">
                <div className="relative flex size-16 items-center justify-center">
                  <svg className="size-full -rotate-90" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
                    <circle
                      cx="40"
                      cy="40"
                      r={radius}
                      fill="none"
                      stroke={color}
                      strokeWidth="6"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-xs font-bold">{pct}%</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{wh.name}</div>
                  <div className="text-muted-foreground text-xs">{wh.location}</div>
                  <div className="mt-1 text-muted-foreground text-xs tabular-nums">
                    {wh.used.toLocaleString()} / {wh.capacity.toLocaleString()} items
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
