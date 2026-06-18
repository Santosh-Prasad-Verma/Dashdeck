"use client";

import { useState } from "react";

import { AlertTriangle, BellOff, CheckCircle, ShieldAlert, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Vulnerability {
  id: string;
  cveId: string;
  component: string;
  severity: "critical" | "high" | "medium" | "low";
  detected: string;
  status: "active" | "snoozed" | "assigned";
}

const initialVulnerabilities: Vulnerability[] = [
  {
    id: "vuln-1",
    cveId: "CVE-2026-3021",
    component: "next-auth-middleware",
    severity: "critical",
    detected: "2 hours ago",
    status: "active",
  },
  {
    id: "vuln-2",
    cveId: "CVE-2026-1942",
    component: "pg-pool-connector",
    severity: "high",
    detected: "1 day ago",
    status: "active",
  },
  {
    id: "vuln-3",
    cveId: "CVE-2026-8843",
    component: "node-jose-library",
    severity: "medium",
    detected: "3 days ago",
    status: "snoozed",
  },
  {
    id: "vuln-4",
    cveId: "CVE-2026-0012",
    component: "tailwind-preprocessor",
    severity: "low",
    detected: "5 days ago",
    status: "active",
  },
];

export function VulnerabilitiesTable() {
  const t = useTranslations("Dashboards.secops");
  const [vulns, setVulns] = useState<Vulnerability[]>(initialVulnerabilities);

  const handleSnooze = (id: string, cveId: string) => {
    setVulns((prev) => prev.map((v) => (v.id === id ? { ...v, status: "snoozed" } : v)));
    toast.info(`${cveId} has been snoozed for 30 days.`);
  };

  const handleAssign = (id: string, cveId: string) => {
    setVulns((prev) => prev.map((v) => (v.id === id ? { ...v, status: "assigned" } : v)));
    toast.success(`Jira Ticket created and assigned for ${cveId}.`);
  };

  const getSeverityBadge = (severity: Vulnerability["severity"]) => {
    switch (severity) {
      case "critical":
        return (
          <Badge className="flex w-fit items-center gap-1 bg-red-500 text-white hover:bg-red-600">
            <ShieldAlert className="size-3" />
            Critical
          </Badge>
        );
      case "high":
        return (
          <Badge className="flex w-fit items-center gap-1 bg-orange-500 text-white hover:bg-orange-600">
            <AlertTriangle className="size-3" />
            High
          </Badge>
        );
      case "medium":
        return (
          <Badge variant="secondary" className="flex w-fit items-center gap-1">
            Medium
          </Badge>
        );
      case "low":
        return (
          <Badge variant="outline" className="flex w-fit items-center gap-1">
            Low
          </Badge>
        );
    }
  };

  const getStatusBadge = (status: Vulnerability["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="destructive">Active</Badge>;
      case "snoozed":
        return (
          <Badge variant="outline" className="flex w-fit items-center gap-1 text-muted-foreground">
            <BellOff className="size-3" />
            Snoozed
          </Badge>
        );
      case "assigned":
        return (
          <Badge className="flex w-fit items-center gap-1 bg-blue-500 text-white hover:bg-blue-600">
            <CheckCircle className="size-3" />
            Assigned
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold text-lg">{t("vulnerabilityLog")}</CardTitle>
        <CardDescription>{t("vulnerabilityLogDesc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("cveId")}</TableHead>
                <TableHead>{t("component")}</TableHead>
                <TableHead>{t("severity")}</TableHead>
                <TableHead>{t("detected")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead className="text-right">{t("action")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vulns.map((vuln) => (
                <TableRow key={vuln.id}>
                  <TableCell className="font-medium font-mono">{vuln.cveId}</TableCell>
                  <TableCell className="font-mono text-sm">{vuln.component}</TableCell>
                  <TableCell>{getSeverityBadge(vuln.severity)}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{vuln.detected}</TableCell>
                  <TableCell>{getStatusBadge(vuln.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {vuln.status === "active" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSnooze(vuln.id, vuln.cveId)}
                            className="h-8 px-2"
                          >
                            <BellOff className="mr-1 size-3" />
                            {t("snooze")}
                          </Button>
                          <Button size="sm" onClick={() => handleAssign(vuln.id, vuln.cveId)} className="h-8 px-2">
                            <UserPlus className="mr-1 size-3" />
                            {t("assign")}
                          </Button>
                        </>
                      )}
                      {vuln.status !== "active" && (
                        <span className="text-muted-foreground text-xs italic">Triaged</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
