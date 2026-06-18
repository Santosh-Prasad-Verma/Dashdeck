"use client";

import { useState } from "react";

import { AlertCircle, CheckCircle2, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface WebhookLog {
  id: string;
  event: string;
  url: string;
  status: number;
  latency: string;
  timestamp: string;
  loading?: boolean;
}

const initialLogs: WebhookLog[] = [
  {
    id: "log-1",
    event: "user.created",
    url: "https://api.acme.com/v1/webhook",
    status: 200,
    latency: "142ms",
    timestamp: "2 mins ago",
  },
  {
    id: "log-2",
    event: "invoice.paid",
    url: "https://billing.provider.io/hooks",
    status: 200,
    latency: "284ms",
    timestamp: "10 mins ago",
  },
  {
    id: "log-3",
    event: "agent.completed",
    url: "https://slack.com/services/hooks/123",
    status: 500,
    latency: "1500ms",
    timestamp: "1 hour ago",
  },
  {
    id: "log-4",
    event: "user.updated",
    url: "https://api.acme.com/v1/webhook",
    status: 404,
    latency: "98ms",
    timestamp: "2 hours ago",
  },
];

export function WebhookLogs() {
  const t = useTranslations("Dashboards.developer");
  const [logs, setLogs] = useState<WebhookLog[]>(initialLogs);

  const handleResend = (id: string, event: string) => {
    setLogs((prev) => prev.map((l) => (l.id === id ? { ...l, loading: true } : l)));
    toast.promise(new Promise((resolve) => setTimeout(resolve, 800)), {
      loading: `Re-delivering webhook event "${event}"...`,
      success: () => {
        setLogs((prev) =>
          prev.map((l) =>
            l.id === id
              ? {
                  ...l,
                  loading: false,
                  status: 200,
                  latency: `${Math.floor(Math.random() * 200) + 50}ms`,
                  timestamp: "Just now",
                }
              : l,
          ),
        );
        return `Successfully redelivered event: "${event}" (Response Code: 200)`;
      },
      error: "Re-delivery failed",
    });
  };

  const getStatusBadge = (status: number) => {
    if (status >= 200 && status < 300) {
      return (
        <Badge className="flex w-fit items-center gap-1 bg-emerald-500 text-white hover:bg-emerald-600">
          <CheckCircle2 className="size-3" />
          {status} OK
        </Badge>
      );
    }
    return (
      <Badge variant="destructive" className="flex w-fit items-center gap-1">
        <AlertCircle className="size-3" />
        {status} Err
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold text-lg">{t("webhookLogs")}</CardTitle>
        <CardDescription>{t("webhookLogsDesc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("webhookEvent")}</TableHead>
                <TableHead>{t("webhookUrl")}</TableHead>
                <TableHead>{t("response")}</TableHead>
                <TableHead>{t("latency")}</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead className="text-right">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium font-mono">{log.event}</TableCell>
                  <TableCell className="max-w-[250px] truncate font-mono text-sm" title={log.url}>
                    {log.url}
                  </TableCell>
                  <TableCell>{getStatusBadge(log.status)}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{log.latency}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{log.timestamp}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={log.loading}
                      onClick={() => handleResend(log.id, log.event)}
                      className="h-8 px-2"
                    >
                      <RefreshCw className={`mr-1 size-3 ${log.loading ? "animate-spin" : ""}`} />
                      {t("resend")}
                    </Button>
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
