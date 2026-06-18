"use client";

import { useState } from "react";

import { DollarSign, Percent, Target, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Campaign {
  id: string;
  name: string;
  platform: "Google" | "Meta" | "X";
  spend: number;
  budget: number;
  ctr: string;
  roas: number;
  active: boolean;
}

const funnelData = [
  { stage: "Impressions", count: 120000, fill: "#3b82f6" },
  { stage: "Clicks", count: 24000, fill: "#60a5fa" },
  { stage: "Signups", count: 4800, fill: "#93c5fd" },
  { stage: "Customers", count: 960, fill: "#bfdbfe" },
];

const initialCampaigns: Campaign[] = [
  {
    id: "camp-1",
    name: "Google Search - High Intent Devs",
    platform: "Google",
    spend: 4500,
    budget: 10000,
    ctr: "4.2%",
    roas: 3.2,
    active: true,
  },
  {
    id: "camp-2",
    name: "Meta Lookalike Retargeting",
    platform: "Meta",
    spend: 3200,
    budget: 8000,
    ctr: "2.8%",
    roas: 2.7,
    active: true,
  },
  {
    id: "camp-3",
    name: "X Sponsored Ads - Dev Community",
    platform: "X",
    spend: 1500,
    budget: 5000,
    ctr: "1.5%",
    roas: 1.2,
    active: false,
  },
];

export function CampaignFunnel() {
  const t = useTranslations("Dashboards.martech");
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);

  const handleToggle = (id: string, name: string, active: boolean) => {
    setCampaigns((prev) => prev.map((c) => (c.id === id ? { ...c, active } : c)));
    if (active) {
      toast.success(`Campaign "${name}" has been activated.`);
    } else {
      toast.info(`Campaign "${name}" has been paused.`);
    }
  };

  const activeCount = campaigns.filter((c) => c.active).length;
  const totalSpend = campaigns.filter((c) => c.active).reduce((sum, c) => sum + c.spend, 0);
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);

  return (
    <div className="space-y-4">
      {/* Campaign Summary KPI Cards */}
      <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs xl:grid-cols-4 dark:*:data-[slot=card]:bg-card">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>
              <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                <Target className="size-4 text-emerald-500" />
              </div>
            </CardTitle>
            <CardDescription className="pt-2">Active Campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-3xl tabular-nums leading-none tracking-tight">
              {activeCount} / {campaigns.length}
            </div>
            <p className="mt-2 text-muted-foreground text-xs">Currently generating traffic</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>
              <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                <DollarSign className="size-4 text-emerald-500" />
              </div>
            </CardTitle>
            <CardDescription className="pt-2">Active Spend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-3xl tabular-nums leading-none tracking-tight">
              ${totalSpend.toLocaleString()}
            </div>
            <p className="mt-2 text-muted-foreground text-xs">Total budget: ${totalBudget.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>
              <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                <TrendingUp className="size-4 text-blue-500" />
              </div>
            </CardTitle>
            <CardDescription className="pt-2">Average ROAS</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-3xl tabular-nums leading-none tracking-tight">2.65x</div>
            <p className="mt-2 text-muted-foreground text-xs">Target benchmark: 2.50x</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>
              <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                <Percent className="size-4 text-purple-500" />
              </div>
            </CardTitle>
            <CardDescription className="pt-2">Overall Click CTR</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-3xl tabular-nums leading-none tracking-tight">3.15%</div>
            <p className="mt-2 text-muted-foreground text-xs">Average click through rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Campaign List */}
        <Card className="lg:col-span-7">
          <CardHeader>
            <CardTitle className="font-semibold text-lg">{t("campaigns")}</CardTitle>
            <CardDescription>{t("campaignsDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("campaigns")}</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Spend / Budget</TableHead>
                    <TableHead>CTR</TableHead>
                    <TableHead>{t("roas")}</TableHead>
                    <TableHead className="text-right">{t("status")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((camp) => (
                    <TableRow key={camp.id}>
                      <TableCell className="font-medium">{camp.name}</TableCell>
                      <TableCell>
                        <span className="rounded bg-muted px-2 py-0.5 font-mono font-semibold text-xs">
                          {camp.platform}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm">
                        ${camp.spend.toLocaleString()} / ${camp.budget.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-sm">{camp.ctr}</TableCell>
                      <TableCell className="font-semibold text-sm">{camp.roas}x</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <Switch
                            checked={camp.active}
                            onCheckedChange={(checked) => handleToggle(camp.id, camp.name, checked)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Funnel Analysis */}
        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle className="font-semibold text-lg">{t("conversionFunnel")}</CardTitle>
            <CardDescription>{t("funnelDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={funnelData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" horizontal={false} />
                <XAxis type="number" className="fill-muted-foreground text-xs" tickLine={false} />
                <YAxis dataKey="stage" type="category" className="fill-muted-foreground text-xs" tickLine={false} />
                <Tooltip
                  formatter={(value) => Number(value).toLocaleString()}
                  contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))" }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {funnelData.map((entry) => (
                    <Cell key={entry.stage} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
