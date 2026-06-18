"use client";

import { useState } from "react";

import { Check, Coins, Server, Sparkles, TrendingDown } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  saving: number;
  service: string;
  applied: boolean;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function CostOptimizer() {
  const t = useTranslations("Dashboards.finops");

  // Local state to simulate live cost reduction
  const [totalSpend, setTotalSpend] = useState(14250);
  const [savings, setSavings] = useState(2260);
  const [recs, setRecs] = useState<Recommendation[]>([
    {
      id: "rec-1",
      title: "Idle RDS Database Instances",
      description: "Downsize staging database cluster from db.m5.large to db.t3.medium.",
      saving: 890,
      service: "Database",
      applied: false,
    },
    {
      id: "rec-2",
      title: "Unattached EBS Volumes",
      description: "Delete 12 unattached storage block volumes in US-East-1 region.",
      saving: 240,
      service: "Storage",
      applied: false,
    },
    {
      id: "rec-3",
      title: "S3 Storage Lifecycle Rules",
      description: "Transition dev/test assets older than 90 days to Glacier Deep Archive.",
      saving: 450,
      service: "Storage",
      applied: false,
    },
    {
      id: "rec-4",
      title: "Vercel Edge Routes Migration",
      description: "Rewrite 4 SSR serverless endpoints to Edge functions to reduce function duration bills.",
      saving: 680,
      service: "Compute",
      applied: false,
    },
  ]);

  const providerData = [
    { name: "AWS", spend: totalSpend * 0.6 },
    { name: "GCP", spend: totalSpend * 0.25 },
    { name: "Vercel", spend: totalSpend * 0.15 },
  ];

  const serviceData = [
    { name: "Compute", spend: totalSpend * 0.45 },
    { name: "Database", spend: totalSpend * 0.3 },
    { name: "Storage", spend: totalSpend * 0.15 },
    { name: "Network", spend: totalSpend * 0.1 },
  ];

  const handleApply = (id: string, saving: number, title: string) => {
    setRecs((prev) => prev.map((r) => (r.id === id ? { ...r, applied: true } : r)));
    setTotalSpend((prev) => prev - saving);
    setSavings((prev) => Math.max(0, prev - saving));
    toast.success(`Applied: "${title}". Spend reduced by $${saving}/mo!`);
  };

  return (
    <div className="space-y-4">
      {/* Small Cost Summary Cards */}
      <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs xl:grid-cols-4 dark:*:data-[slot=card]:bg-card">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>
              <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                <Coins className="size-4 text-emerald-500" />
              </div>
            </CardTitle>
            <CardDescription className="pt-2">{t("totalSpend")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-3xl tabular-nums leading-none tracking-tight">
              ${totalSpend.toLocaleString()}
            </div>
            <p className="mt-2 text-muted-foreground text-xs">Run-rate based on active providers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>
              <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                <Server className="size-4" />
              </div>
            </CardTitle>
            <CardDescription className="pt-2">{t("forecast")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-3xl tabular-nums leading-none tracking-tight">
              ${(totalSpend * 1.15).toLocaleString()}
            </div>
            <p className="mt-2 text-muted-foreground text-xs">Next month forecast spend</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>
              <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                <TrendingDown className="size-4 text-amber-500" />
              </div>
            </CardTitle>
            <CardDescription className="pt-2">{t("savings")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-3xl tabular-nums leading-none tracking-tight">
              ${savings.toLocaleString()}
            </div>
            <p className="mt-2 text-muted-foreground text-xs">Potential optimizations left</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>
              <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                <Sparkles className="size-4 text-purple-500" />
              </div>
            </CardTitle>
            <CardDescription className="pt-2">Optimization Rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-3xl tabular-nums leading-none tracking-tight">
              {Math.min(100, Math.floor((1 - savings / 4000) * 100))}%
            </div>
            <p className="mt-2 text-muted-foreground text-xs">Infrastructure efficiency score</p>
          </CardContent>
        </Card>
      </div>

      {/* Spend Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <Card className="lg:col-span-6">
          <CardHeader>
            <CardTitle className="font-semibold text-lg">{t("spendByProvider")}</CardTitle>
            <CardDescription>Multi-cloud monthly spend division.</CardDescription>
          </CardHeader>
          <CardContent className="flex h-[280px] items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={providerData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="spend"
                >
                  {providerData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                  contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))" }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-6">
          <CardHeader>
            <CardTitle className="font-semibold text-lg">{t("spendByService")}</CardTitle>
            <CardDescription>Breakdown by compute, database, and storage.</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                <XAxis dataKey="name" className="fill-muted-foreground text-xs" tickLine={false} />
                <YAxis className="fill-muted-foreground text-xs" tickLine={false} />
                <Tooltip
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                  contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))" }}
                />
                <Bar dataKey="spend" fill="#0088FE" radius={[4, 4, 0, 0]} name="Spend ($)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="font-semibold text-lg">{t("recommendations")}</CardTitle>
          <CardDescription>{t("recommendationsDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {recs.map((rec) => (
            <Card key={rec.id} className="relative overflow-hidden border border-muted/50 bg-muted/20">
              <div className="absolute top-3 right-3 rounded-full bg-emerald-500/10 px-2 py-0.5 font-semibold text-emerald-500 text-xs">
                Save ${rec.saving}/mo
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="pr-16 font-medium text-sm">{rec.title}</CardTitle>
                <CardDescription className="text-xs">{rec.service}</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="mb-4 text-muted-foreground text-xs">{rec.description}</p>
                {rec.applied ? (
                  <Button
                    disabled
                    variant="outline"
                    className="h-8 w-full border-emerald-500/20 bg-emerald-500/10 text-emerald-500 text-xs"
                  >
                    <Check className="mr-1 size-3" />
                    Applied
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="h-8 w-full text-xs"
                    onClick={() => handleApply(rec.id, rec.saving, rec.title)}
                  >
                    Apply Fix
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
