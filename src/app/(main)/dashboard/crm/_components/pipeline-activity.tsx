"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, FunnelChart, Funnel, LabelList } from "recharts";

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const pipelineChartValues = [34, 38, 31, 47, 42, 51, 44, 40, 58, 46, 43, 49] as const;

const pipelineChartConfig = {
  qualified: {
    label: "Qualified Leads",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const funnelConfig = {
  value: { label: "Leads" }
} satisfies ChartConfig;

const funnelData = [
  { value: 500, name: "Lead", fill: "var(--chart-1)" },
  { value: 380, name: "Contacted", fill: "var(--chart-2)" },
  { value: 240, name: "Proposal", fill: "var(--chart-3)" },
  { value: 140, name: "Negotiation", fill: "var(--chart-4)" },
  { value: 95, name: "Won", fill: "var(--chart-5)" },
];

const axisMonthFormatter = new Intl.DateTimeFormat("en-US", { month: "short" });
const tooltipMonthFormatter = new Intl.DateTimeFormat("en-US", { month: "short", year: "2-digit" });

function getRollingMonthData(values: readonly number[]) {
  return values.map((qualified, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (values.length - 1 - index));

    return {
      date: date.toISOString(),
      qualified,
    };
  });
}

export function PipelineActivity() {
  const pipelineChartData = getRollingMonthData(pipelineChartValues);
  const totalQualified = pipelineChartData.reduce((sum, item) => sum + item.qualified, 0);

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
      <Card className="xl:col-span-12">
        <CardHeader>
          <CardTitle>Lead Pipeline Analysis</CardTitle>
          <CardAction>
            <Select defaultValue="last-12-months">
              <SelectTrigger size="sm" className="min-w-40">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="last-30-days">Last 30 days</SelectItem>
                  <SelectItem value="last-quarter">Last quarter</SelectItem>
                  <SelectItem value="last-12-months">Last 12 months</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Qualified Lead Flow Bar Chart */}
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold text-muted-foreground block mb-4 uppercase tracking-wider">
                Qualified Lead Flow (Monthly)
              </span>
              <ChartContainer config={pipelineChartConfig} className="h-72 w-full">
                <BarChart data={pipelineChartData} margin={{ left: -20, right: 10, top: 0, bottom: 0 }} barSize={38}>
                  <defs>
                    <pattern
                      id="crm-qualified-pattern"
                      width="4"
                      height="4"
                      patternUnits="userSpaceOnUse"
                      patternTransform="rotate(45)"
                    >
                      <rect width="6" height="6" fill="var(--color-qualified)" fillOpacity="0.15" />
                      <line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="6"
                        stroke="var(--color-qualified)"
                        strokeWidth="1.25"
                        strokeOpacity="0.40"
                      />
                    </pattern>
                  </defs>
                  <CartesianGrid vertical={false} strokeOpacity={0.5} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => axisMonthFormatter.format(new Date(String(value)))}
                  />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        hideIndicator
                        labelFormatter={(value) => tooltipMonthFormatter.format(new Date(String(value)))}
                      />
                    }
                  />
                  <Bar
                    dataKey="qualified"
                    fill="url(#crm-qualified-pattern)"
                    radius={[6, 6, 0, 0]}
                    stroke="var(--color-qualified)"
                    strokeOpacity={0.5}
                    strokeWidth={0.5}
                  />
                </BarChart>
              </ChartContainer>
            </div>

            {/* Funnel Chart */}
            <div className="flex flex-col gap-4 lg:col-span-5 border-l pl-0 lg:pl-6 border-border/40">
              <span className="text-xs font-semibold text-muted-foreground block uppercase tracking-wider">
                Conversion Funnel ({totalQualified} qualified leads)
              </span>
              
              <ChartContainer config={funnelConfig} className="h-64 w-full">
                <FunnelChart margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Funnel
                    dataKey="value"
                    data={funnelData}
                    isAnimationActive
                  >
                    <LabelList 
                      position="right" 
                      dataKey="name" 
                      fill="currentColor" 
                      className="text-[11px] font-semibold fill-muted-foreground" 
                    />
                  </Funnel>
                </FunnelChart>
              </ChartContainer>

              <div className="flex justify-between items-center text-xs text-muted-foreground bg-muted/20 p-2.5 rounded-lg border border-border/40">
                <span>Overall Lead-to-Won:</span>
                <span className="font-semibold text-foreground">19.0%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
