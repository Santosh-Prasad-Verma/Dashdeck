"use client";

import { useEffect, useState } from "react";

import { Download, FileBarChart, FileText, Loader2, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface GeneratedReport {
  id: string;
  name: string;
  type: string;
  range: string;
  size: string;
  created: string;
}

const initialReports: GeneratedReport[] = [
  {
    id: "rep-1",
    name: "Q2_SecOps_Compliance_Report.pdf",
    type: "SecOps",
    range: "Last Quarter",
    size: "2.4 MB",
    created: "2026-06-15",
  },
  {
    id: "rep-2",
    name: "Finance_Cost_Optimization_Summary.pdf",
    type: "FinOps",
    range: "Last 30 days",
    size: "1.8 MB",
    created: "2026-06-08",
  },
  {
    id: "rep-3",
    name: "AI_Agent_Token_Consumption_Audit.pdf",
    type: "AI Agents",
    range: "Last 7 days",
    size: "820 KB",
    created: "2026-06-01",
  },
];

export default function Page() {
  const t = useTranslations("Dashboards.reports");
  const [reports, setReports] = useState<GeneratedReport[]>(initialReports);
  const [reportType, setReportType] = useState("SecOps");
  const [dateRange, setDateRange] = useState("last-30");
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeLogs, setIncludeLogs] = useState(false);

  // Generation progress state
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");

  const handleGenerate = () => {
    setIsGenerating(true);
    setProgress(0);
    setStatusText("Fetching database records...");
  };

  useEffect(() => {
    if (!isGenerating) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 15) + 5;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const finalReport: GeneratedReport = {
              id: `rep-${Date.now()}`,
              name: `${reportType}_Report_${new Date().toISOString().slice(0, 10)}.pdf`,
              type: reportType,
              range: dateRange === "last-7" ? "Last 7 Days" : dateRange === "last-30" ? "Last 30 Days" : "Year to Date",
              size: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`,
              created: new Date().toISOString().split("T")[0],
            };
            setReports((prevList) => [finalReport, ...prevList]);
            setIsGenerating(false);
            toast.success(`Report "${finalReport.name}" generated successfully!`);
          }, 500);
          return 100;
        }

        // Update status messages during generation
        if (next < 25) setStatusText("Compiling query records...");
        else if (next < 55) setStatusText("Building Recharts vector layouts...");
        else if (next < 80) setStatusText("Structuring PDF margins and alignments...");
        else setStatusText("Signing PDF security certificate...");

        return next;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isGenerating, reportType, dateRange]);

  const handleDownload = (name: string) => {
    toast.success(`Started download: ${name}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <h1 className="text-3xl tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Report Builder Form */}
        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-semibold text-lg">
              <FileBarChart className="size-5 text-primary" />
              {t("generator")}
            </CardTitle>
            <CardDescription>Configure and compile custom metrics summaries.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="report-type" className="font-medium text-sm">
                {t("reportType")}
              </label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Select Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SecOps">SecOps & Security Compliance</SelectItem>
                  <SelectItem value="FinOps">FinOps Cost Optimization</SelectItem>
                  <SelectItem value="AI-Agents">AI Agent Performance</SelectItem>
                  <SelectItem value="DevOps">DevOps Systems Logs</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="date-range" className="font-medium text-sm">
                {t("dateRange")}
              </label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger id="date-range">
                  <SelectValue placeholder="Select Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7">Last 7 Days</SelectItem>
                  <SelectItem value="last-30">Last 30 Days</SelectItem>
                  <SelectItem value="ytd">Year to Date (YTD)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 pt-2">
              <span className="font-medium text-sm">Layout Parameters</span>
              <div className="flex flex-col gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-charts"
                    checked={includeCharts}
                    onCheckedChange={(checked) => setIncludeCharts(!!checked)}
                  />
                  <label htmlFor="include-charts" className="font-medium text-sm leading-none">
                    {t("includeCharts")}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-logs"
                    checked={includeLogs}
                    onCheckedChange={(checked) => setIncludeLogs(!!checked)}
                  />
                  <label htmlFor="include-logs" className="font-medium text-sm leading-none">
                    Include Detailed JSON Logs
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleGenerate}>
              <Sparkles className="mr-2 size-4 animate-pulse" />
              {t("generate")}
            </Button>
          </CardFooter>
        </Card>

        {/* Report History Grid */}
        <Card className="lg:col-span-7">
          <CardHeader>
            <CardTitle className="font-semibold text-lg">{t("reportsHistory")}</CardTitle>
            <CardDescription>Recently generated PDF downloads.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Filename</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date Range</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Download</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((rep) => (
                    <TableRow key={rep.id}>
                      <TableCell className="flex items-center gap-2 font-medium">
                        <FileText className="size-4 shrink-0 text-muted-foreground" />
                        <span className="max-w-[200px] truncate" title={rep.name}>
                          {rep.name}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {rep.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{rep.range}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{rep.size}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{rep.created}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownload(rep.name)}
                          className="h-8 w-8"
                          title={t("download")}
                        >
                          <Download className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Dialog */}
      <Dialog open={isGenerating}>
        <DialogContent className="border-primary/20 bg-card/95 backdrop-blur-md sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Loader2 className="size-5 animate-spin text-primary" />
              {t("generating")}
            </DialogTitle>
            <DialogDescription>Please wait while we compile the PDF bundle.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Progress value={progress} className="w-full" />
            <p className="text-center font-medium text-muted-foreground text-xs">{statusText}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
