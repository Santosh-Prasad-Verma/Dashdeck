import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const properties = [
  {
    id: 1,
    name: "Skyline Tower",
    type: "Commercial",
    city: "New York",
    units: 48,
    occupancy: 96,
    rent: 3400,
    status: "occupied",
  },
  {
    id: 2,
    name: "Maple Residences",
    type: "Residential",
    city: "Austin",
    units: 120,
    occupancy: 92,
    rent: 1850,
    status: "occupied",
  },
  {
    id: 3,
    name: "Harbor Industrial",
    type: "Industrial",
    city: "Seattle",
    units: 24,
    occupancy: 88,
    rent: 4200,
    status: "occupied",
  },
  {
    id: 4,
    name: "Park Avenue Plaza",
    type: "Commercial",
    city: "Chicago",
    units: 36,
    occupancy: 98,
    rent: 5100,
    status: "occupied",
  },
  {
    id: 5,
    name: "Willow Creek",
    type: "Residential",
    city: "Portland",
    units: 80,
    occupancy: 85,
    rent: 1600,
    status: "maintenance",
  },
  {
    id: 6,
    name: "Tech Park Campus",
    type: "Commercial",
    city: "San Francisco",
    units: 60,
    occupancy: 100,
    rent: 6200,
    status: "occupied",
  },
  {
    id: 7,
    name: "Lakeside Marina",
    type: "Residential",
    city: "Miami",
    units: 150,
    occupancy: 78,
    rent: 2200,
    status: "occupied",
  },
];

function getTypeBadge(type: string) {
  switch (type) {
    case "Commercial":
      return <Badge className="border-0 bg-blue-500/10 text-blue-600 dark:text-blue-400">Commercial</Badge>;
    case "Residential":
      return <Badge className="border-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Residential</Badge>;
    case "Industrial":
      return <Badge className="border-0 bg-amber-500/10 text-amber-600 dark:text-amber-400">Industrial</Badge>;
    default:
      return <Badge variant="secondary">{type}</Badge>;
  }
}

export function PropertyList() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Property Portfolio</CardTitle>
        <CardDescription>All properties and their performance</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[400px]">
          <div className="flex flex-col gap-2 px-4 pb-4">
            {properties.map((prop) => (
              <div
                key={prop.id}
                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{prop.name}</span>
                    {getTypeBadge(prop.type)}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {prop.city} · {prop.units} units
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-medium text-sm tabular-nums">${prop.rent.toLocaleString()}</div>
                    <div className="text-muted-foreground text-xs">avg rent/mo</div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-medium text-sm tabular-nums ${prop.occupancy >= 90 ? "text-emerald-600" : prop.occupancy >= 80 ? "text-amber-600" : "text-red-600"}`}
                    >
                      {prop.occupancy}%
                    </div>
                    <div className="text-muted-foreground text-xs">occupancy</div>
                  </div>
                  <Badge
                    className={
                      prop.status === "occupied"
                        ? "border-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "border-0 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    }
                  >
                    {prop.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
