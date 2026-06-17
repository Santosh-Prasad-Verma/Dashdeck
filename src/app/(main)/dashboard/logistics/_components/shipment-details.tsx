import { AlertTriangleIcon, Copy, Plane, Ship, Star, Truck } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import type { Shipment } from "./shipment-data";
import { ShipmentRouteMap } from "./shipment-route-map";

const modeIcons = {
  air: Plane,
  land: Truck,
  sea: Ship,
} as const;

const progressRingClasses: Record<Shipment["status"], string> = {
  Scheduled: "text-muted-foreground",
  "In Transit": "text-primary",
  "Out for Delivery": "text-primary",
  Delivered: "text-green-600",
  Delayed: "text-destructive",
  "On Hold": "text-amber-500",
  "Customs Hold": "text-amber-500",
};

const statusBadgeClasses: Record<Shipment["status"], string> = {
  Scheduled: "border-muted bg-muted/50 text-muted-foreground",
  "In Transit": "border-primary/20 bg-primary/10 text-primary",
  "Out for Delivery": "border-primary/20 bg-primary/10 text-primary",
  Delivered: "border-green-600/20 bg-green-600/10 text-green-600",
  Delayed: "border-destructive/20 bg-destructive/10 text-destructive",
  "On Hold": "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Customs Hold": "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

type ShipmentDetailsProps = {
  shipment: Shipment | null;
};

function getContactLabel(mode: Shipment["mode"]) {
  if (mode === "land") {
    return "Call Driver";
  }

  if (mode === "air") {
    return "Call Airline Support";
  }

  return "Call Captain";
}

function getTransportNumberLabel(mode: Shipment["mode"]) {
  if (mode === "land") {
    return "Vehicle number";
  }

  if (mode === "air") {
    return "Flight number";
  }

  return "Vessel number";
}

function EmptyShipmentOverview() {
  return (
    <div className="grid min-h-48 place-items-center rounded-lg border border-dashed text-muted-foreground text-sm">
      Select a shipment to view details.
    </div>
  );
}

function ShipmentOverview({ shipment }: { shipment: Shipment }) {
  const ContactIcon = modeIcons[shipment.mode];
  const contactLabel = getContactLabel(shipment.mode);
  const transportNumberLabel = getTransportNumberLabel(shipment.mode);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="flex items-center gap-2">
          <h1 className="font-medium text-lg tabular-nums tracking-tight sm:text-xl">#{shipment.id}</h1>
          <Button variant="ghost" size="icon-sm" aria-label="Copy shipment ID">
            <Copy />
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <Badge variant="outline" className={cn("gap-1.5", statusBadgeClasses[shipment.status])}>
            <span className={cn("size-1.5 rounded-full bg-current", progressRingClasses[shipment.status])} />
            {shipment.status}
          </Badge>
          <span className="text-muted-foreground">·</span>
          <span className="text-foreground tabular-nums">{shipment.progress}% complete</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-foreground tabular-nums">
            ETA: {shipment.eta} {shipment.etaMeta}
          </span>
        </div>
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="size-9 after:rounded-sm">
            <AvatarFallback className="rounded-sm">{shipment.customer.initials}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1">
            <div className="font-medium text-sm leading-none">{shipment.customer.name}</div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-xs tabular-nums leading-none tracking-tight">{shipment.customer.id}</span>{" "}
              <Copy className="size-3" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <Badge variant="secondary">
            <Star />
            {shipment.customer.tier}
          </Badge>
          <div className="text-muted-foreground text-xs leading-none">{shipment.customer.tierLabel}</div>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-8">
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-medium">Cargo details</h2>

          <Button variant="outline" size="sm">
            <ContactIcon data-icon="inline-start" />
            {contactLabel}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-[1.35fr_1fr_1.1fr_1.15fr_1fr]">
          <div className="col-span-2 flex flex-col gap-1 md:col-span-1 md:gap-2">
            <div className="text-muted-foreground text-xs leading-none md:invisible md:text-sm">Cargo</div>
            <div className="whitespace-nowrap text-sm leading-none">{shipment.cargo}</div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-muted-foreground text-xs leading-none md:text-sm">Total weight</div>
            <div className="text-sm leading-none">{shipment.weight}</div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-muted-foreground text-xs leading-none md:text-sm">Transport mode</div>
            <div className="text-sm capitalize leading-none">
              {shipment.mode} · {shipment.routeType}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-muted-foreground text-xs leading-none md:text-sm">{transportNumberLabel}</div>
            <div className="text-sm leading-none">{shipment.transportNumber}</div>
          </div>

          <div className="flex flex-col gap-2 md:text-right">
            <div className="text-muted-foreground text-xs leading-none md:text-sm">Status</div>
            <div className="text-sm leading-none">{shipment.progress}% complete</div>
          </div>
        </div>
      </div>

      <Separator />

      <Alert className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
        <AlertTriangleIcon />
        <AlertTitle>{shipment.handling.label}</AlertTitle>
        <AlertDescription className="space-y-2">
          <div className="border-amber-900 text-amber-900 leading-none dark:border-amber-50 dark:text-amber-50">
            {shipment.handling.note}
          </div>

          <Separator className="bg-amber-800 dark:bg-amber-50" />

          <div className="flex flex-wrap gap-2">
            {shipment.handling.tags.map(({ icon: TagIcon, label }) => (
              <Badge
                className="rounded-sm border-amber-200 bg-background/50 text-amber-900 dark:border-amber-900 dark:text-amber-50"
                key={label}
                variant="outline"
              >
                <TagIcon data-icon="inline-start" />
                {label}
              </Badge>
            ))}
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}

export function ShipmentDetails({ shipment }: ShipmentDetailsProps) {
  if (!shipment) {
    return (
      <div className="grid h-full min-h-0 grid-rows-[320px_1fr] overflow-hidden lg:grid-rows-[420px_1fr]">
        <div className="min-h-0 overflow-hidden">
          <ShipmentRouteMap shipment={null} />
        </div>
        <div className="min-h-0 overflow-hidden p-4">
          <EmptyShipmentOverview />
        </div>
      </div>
    );
  }

  return (
    <div className="grid h-full min-h-0 grid-rows-[320px_1fr] overflow-hidden lg:grid-rows-[420px_1fr]">
      <div className="min-h-0 overflow-hidden">
        <ShipmentRouteMap shipment={shipment} />
      </div>
      <div className="min-h-0 overflow-hidden">
        <div className="h-full min-h-0 py-2">
          <Tabs defaultValue="overview" className="h-full gap-0">
            <TabsList
              className="w-full justify-start gap-2 border-b px-4 **:data-[slot=tabs-trigger]:text-xs sm:gap-4 sm:**:data-[slot=tabs-trigger]:text-sm"
              variant="line"
            >
              <TabsTrigger className="flex-none" value="overview">
                Overview
              </TabsTrigger>
              <TabsTrigger className="flex-none" value="route">
                Route
              </TabsTrigger>
              <TabsTrigger className="flex-none" value="cargo">
                Cargo
              </TabsTrigger>
              <TabsTrigger className="flex-none" value="documents">
                Documents
              </TabsTrigger>
              <TabsTrigger className="flex-none" value="activity">
                Activity
              </TabsTrigger>
            </TabsList>
            <TabsContent className="min-h-0 overflow-auto p-4" value="overview">
              <ShipmentOverview shipment={shipment} />
            </TabsContent>
            <TabsContent className="min-h-0 overflow-auto p-4" value="route">
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold text-sm">Shipment Stops</h3>
                <div className="relative border-l border-border pl-6 ml-2 space-y-6">
                  {/* Origin stop */}
                  <div className="relative">
                    <span className="absolute -left-[30px] top-1 flex size-4 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-background">
                      <span className="size-1.5 rounded-full bg-background" />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-foreground">Origin: {shipment.origin.display}</span>
                      <span className="text-xs text-muted-foreground">{shipment.origin.country}</span>
                    </div>
                  </div>
                  {/* Transit midpoint */}
                  <div className="relative">
                    <span className={cn(
                      "absolute -left-[30px] top-1 flex size-4 items-center justify-center rounded-full ring-4 ring-background",
                      shipment.progress >= 50 ? "bg-primary" : "bg-muted"
                    )}>
                      <span className="size-1.5 rounded-full bg-background" />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-foreground">Customs Gate</span>
                      <span className="text-xs text-muted-foreground">
                        {shipment.status === "Customs Hold" ? "Held in Customs" : "Customs Clearance Passed"}
                      </span>
                    </div>
                  </div>
                  {/* Destination stop */}
                  <div className="relative">
                    <span className={cn(
                      "absolute -left-[30px] top-1 flex size-4 items-center justify-center rounded-full ring-4 ring-background",
                      shipment.status === "Delivered" ? "bg-emerald-500" : "bg-muted"
                    )}>
                      <span className="size-1.5 rounded-full bg-background" />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-foreground">Destination: {shipment.destination.display}</span>
                      <span className="text-xs text-muted-foreground">{shipment.destination.country}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent className="min-h-0 overflow-auto p-4" value="cargo">
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold text-sm">Cargo Inventory</h3>
                <div className="grid grid-cols-2 gap-4 rounded-lg border p-4 bg-muted/20">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Type</span>
                    <span className="text-sm font-medium">{shipment.cargo}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Weight</span>
                    <span className="text-sm font-medium">{shipment.weight}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Carrier / Mode</span>
                    <span className="text-sm font-medium capitalize">{shipment.mode} - {shipment.routeType}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Ref Number</span>
                    <span className="text-sm font-medium font-mono">{shipment.transportNumber}</span>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="text-xs font-semibold text-muted-foreground mb-2">Handling Instruction Note</h4>
                  <p className="text-sm text-foreground leading-normal">{shipment.handling.note}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent className="min-h-0 overflow-auto p-4" value="documents">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">Shipment Documents</h3>
                  <Badge variant="outline" className="text-xs">4 Files</Badge>
                </div>
                <div className="divide-y rounded-lg border bg-card">
                  {[
                    { name: "Bill of Lading", code: "BOL-" + shipment.id, size: "142 KB", status: "Signed" },
                    { name: "Commercial Invoice", code: "INV-" + shipment.id, size: "88 KB", status: "Verified" },
                    { name: "Packing List", code: "PKL-" + shipment.id, size: "210 KB", status: "Completed" },
                    { name: "Customs Declaration Form", code: "CST-" + shipment.id, size: "305 KB", status: shipment.status === "Customs Hold" ? "Pending" : "Approved" }
                  ].map((doc) => (
                    <div key={doc.name} className="flex items-center justify-between p-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium text-foreground">{doc.name}</span>
                        <span className="text-xs text-muted-foreground font-mono">{doc.code} · {doc.size}</span>
                      </div>
                      <Badge variant={doc.status === "Pending" ? "outline" : "secondary"} className={cn(
                        doc.status === "Approved" || doc.status === "Completed" || doc.status === "Signed" || doc.status === "Verified"
                          ? "bg-emerald-500/10 text-emerald-500 border-none" 
                          : ""
                      )}>
                        {doc.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent className="min-h-0 overflow-auto p-4" value="activity">
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold text-sm">Activity Audit Trail</h3>
                <div className="relative border-l border-border pl-6 ml-2 space-y-6">
                  {/* Out for delivery / Delivered */}
                  {shipment.progress >= 80 && (
                    <div className="relative">
                      <span className="absolute -left-[30px] top-1 flex size-4 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-background">
                        <span className="size-1.5 rounded-full bg-background" />
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold text-foreground">
                          {shipment.status === "Delivered" ? "Delivered successfully" : "Out for delivery"}
                        </span>
                        <span className="text-xs text-muted-foreground">30 mins ago</span>
                      </div>
                    </div>
                  )}
                  {/* Customs Clearance */}
                  <div className="relative">
                    <span className={cn(
                      "absolute -left-[30px] top-1 flex size-4 items-center justify-center rounded-full ring-4 ring-background",
                      shipment.status === "Customs Hold" ? "bg-amber-500 animate-pulse" : "bg-primary"
                    )}>
                      <span className="size-1.5 rounded-full bg-background" />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-foreground">Customs Gate Processing</span>
                      <span className="text-xs text-muted-foreground">
                        {shipment.status === "Customs Hold" 
                          ? "Held for import tariff classification review" 
                          : "Customs cleared at border point"
                        }
                      </span>
                    </div>
                  </div>
                  {/* Departed / Transit */}
                  <div className="relative">
                    <span className="absolute -left-[30px] top-1 flex size-4 items-center justify-center rounded-full bg-primary ring-4 ring-background">
                      <span className="size-1.5 rounded-full bg-background" />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-foreground">Departed Origin Hub</span>
                      <span className="text-xs text-muted-foreground">{shipment.origin.display}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
