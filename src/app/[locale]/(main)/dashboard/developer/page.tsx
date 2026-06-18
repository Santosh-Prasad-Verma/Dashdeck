import { Activity, Code, Key, Webhook } from "lucide-react";
import { useTranslations } from "next-intl";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { ApiKeysManager } from "./_components/api-keys-manager";
import { WebhookLogs } from "./_components/webhook-logs";

export default function Page() {
  const t = useTranslations("Dashboards.developer");

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <h1 className="text-3xl tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>

      {/* Developer KPI Cards */}
      <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs xl:grid-cols-4 dark:*:data-[slot=card]:bg-card">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>
              <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                <Key className="size-4" />
              </div>
            </CardTitle>
            <CardDescription className="pt-2">{t("apiKeys")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-3xl tabular-nums leading-none tracking-tight">2 Active</div>
            <p className="mt-2 text-muted-foreground text-xs">1 revoked developer key</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>
              <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                <Webhook className="size-4" />
              </div>
            </CardTitle>
            <CardDescription className="pt-2">Webhook Endpoints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-3xl tabular-nums leading-none tracking-tight">3 Configured</div>
            <p className="mt-2 text-muted-foreground text-xs">Events: user.*, invoice.*, agent.*</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>
              <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                <Code className="size-4" />
              </div>
            </CardTitle>
            <CardDescription className="pt-2">API Request Count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-3xl tabular-nums leading-none tracking-tight">145,201</div>
            <p className="mt-2 text-muted-foreground text-xs">+18.4% monthly request growth</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>
              <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                <Activity className="size-4 text-emerald-500" />
              </div>
            </CardTitle>
            <CardDescription className="pt-2">Avg Response Latency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-3xl tabular-nums leading-none tracking-tight">124ms</div>
            <p className="mt-2 text-muted-foreground text-xs">99.9% uptime over last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Api Keys Section */}
      <ApiKeysManager />

      {/* Webhook Logs Section */}
      <WebhookLogs />
    </div>
  );
}
