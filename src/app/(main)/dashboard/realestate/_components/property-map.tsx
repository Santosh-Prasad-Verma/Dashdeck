import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, Home, Warehouse } from "lucide-react";

const locations = [
  { name: "Skyline Tower", address: "350 5th Ave, New York, NY", type: "Commercial", occupancy: 96, value: "$4.2M", icon: Building2 },
  { name: "Park Avenue Plaza", address: "55 E 52nd St, New York, NY", type: "Commercial", occupancy: 98, value: "$5.5M", icon: Building2 },
  { name: "Maple Residences", address: "2200 Barton Springs Rd, Austin, TX", type: "Residential", occupancy: 92, value: "$2.8M", icon: Home },
  { name: "Harbor Industrial", address: "Airport Way S, Seattle, WA", type: "Industrial", occupancy: 88, value: "$3.1M", icon: Warehouse },
  { name: "Tech Park Campus", address: "345 Spear St, San Francisco, CA", type: "Commercial", occupancy: 100, value: "$6.2M", icon: Building2 },
  { name: "Willow Creek", address: "4500 NE Halsey St, Portland, OR", type: "Residential", occupancy: 85, value: "$1.9M", icon: Home },
  { name: "Lakeside Marina", address: "1500 Ocean Dr, Miami, FL", type: "Residential", occupancy: 78, value: "$3.8M", icon: Home },
];

export function PropertyMap() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Property Directory</CardTitle>
        <CardDescription>All properties across the portfolio</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {locations.map((loc) => (
            <div key={loc.name} className="flex items-center rounded-lg border p-4 transition-colors hover:bg-muted/50">
              <div className="flex size-12 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <loc.icon className="size-5" />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{loc.name}</span>
                  <Badge variant="secondary" className="text-[10px]">{loc.type}</Badge>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-xs mt-0.5">
                  <MapPin className="size-3" />
                  {loc.address}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">{loc.value}</div>
                <div className={`text-sm ${loc.occupancy >= 90 ? "text-emerald-600" : "text-amber-600"}`}>{loc.occupancy}% occupied</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
