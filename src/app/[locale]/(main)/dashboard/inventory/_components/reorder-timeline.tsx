import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const items = [
  {
    name: "USB-C Cable 2m",
    sku: "SKU-2194",
    stock: 8,
    reorder: 50,
    leadTime: "5 days",
    supplier: "CablePro Ltd",
    orderPlaced: "No",
  },
  {
    name: "Mechanical Keyboard",
    sku: "SKU-5612",
    stock: 5,
    reorder: 20,
    leadTime: "7 days",
    supplier: "KeyTech Inc",
    orderPlaced: "Yes — Arrives Jun 20",
  },
  {
    name: 'Laptop Sleeve 15"',
    sku: "SKU-9023",
    stock: 3,
    reorder: 40,
    leadTime: "3 days",
    supplier: "BagMasters",
    orderPlaced: "No",
  },
  {
    name: "Webcam HD",
    sku: "SKU-1456",
    stock: 9,
    reorder: 35,
    leadTime: "10 days",
    supplier: "CamWorld",
    orderPlaced: "Yes — Arrives Jun 25",
  },
  {
    name: "Monitor Stand",
    sku: "SKU-7834",
    stock: 15,
    reorder: 30,
    leadTime: "4 days",
    supplier: "ErgoWorks",
    orderPlaced: "No",
  },
  {
    name: "Wireless Headphones",
    sku: "SKU-3847",
    stock: 12,
    reorder: 25,
    leadTime: "6 days",
    supplier: "TechSupply Co",
    orderPlaced: "No",
  },
];

export function ReorderTimeline() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Reorder Timeline</CardTitle>
        <CardDescription>Items needing restock with lead times</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {items.map((item) => {
            const stockPercent = Math.min((item.stock / item.reorder) * 100, 100);
            return (
              <div key={item.sku} className="rounded-lg border p-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-medium text-sm">{item.name}</span>
                    <span className="ml-2 text-muted-foreground text-xs">{item.sku}</span>
                  </div>
                  <Badge
                    className={
                      item.orderPlaced.includes("Yes")
                        ? "bg-emerald-500/10 text-emerald-600 border-0"
                        : "bg-red-500/10 text-red-600 border-0"
                    }
                  >
                    {item.orderPlaced.includes("Yes") ? "Ordered" : "Need Order"}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-muted-foreground text-xs w-16">Stock</span>
                  <div className="flex-1">
                    <Progress value={stockPercent} className="h-2" />
                  </div>
                  <span className="text-sm font-medium tabular-nums w-24 text-right">
                    <span className="text-red-600">{item.stock}</span>
                    <span className="text-muted-foreground"> / {item.reorder}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2 text-muted-foreground text-xs">
                  <span>
                    {item.supplier} · Lead: {item.leadTime}
                  </span>
                  <span>{item.orderPlaced}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
