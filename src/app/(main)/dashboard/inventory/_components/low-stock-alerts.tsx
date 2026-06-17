import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const lowStockItems = [
  { id: "SKU-3847", name: "Wireless Headphones", stock: 12, reorder: 25, category: "Electronics", supplier: "TechSupply Co" },
  { id: "SKU-2194", name: "USB-C Cable 2m", stock: 8, reorder: 50, category: "Accessories", supplier: "CablePro Ltd" },
  { id: "SKU-5612", name: "Mechanical Keyboard", stock: 5, reorder: 20, category: "Electronics", supplier: "KeyTech Inc" },
  { id: "SKU-7834", name: "Monitor Stand", stock: 15, reorder: 30, category: "Office", supplier: "ErgoWorks" },
  { id: "SKU-9023", name: "Laptop Sleeve 15\"", stock: 3, reorder: 40, category: "Accessories", supplier: "BagMasters" },
  { id: "SKU-1456", name: "Webcam HD", stock: 9, reorder: 35, category: "Electronics", supplier: "CamWorld" },
];

export function LowStockAlerts() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Low Stock Alerts</CardTitle>
        <CardDescription>Items below reorder threshold</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[360px]">
          <div className="flex flex-col gap-2 px-4 pb-4">
            {lowStockItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{item.id}</span>
                    <span className="font-medium text-sm">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-muted-foreground text-xs">
                    <span>{item.category}</span>
                    <span>·</span>
                    <span>{item.supplier}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm tabular-nums">
                      <span className="text-red-600 font-medium">{item.stock}</span>
                      <span className="text-muted-foreground"> / {item.reorder}</span>
                    </div>
                    <div className="text-muted-foreground text-xs">min: {item.reorder}</div>
                  </div>
                  <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 border-0">Restock</Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
