import { ShieldAlert, ShieldCheck, ShieldX, Terminal } from "lucide-react";
import { useTranslations } from "next-intl";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { SecurityCharts } from "./_components/security-charts";
import { VulnerabilitiesTable } from "./_components/vulnerabilities-table";

export default function Page() {
  const t = useTranslations("Dashboards.secops");

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <h1 className="text-3xl tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>

      {/* Security KPI Cards */}
      <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs xl:grid-cols-4 dark:*:data-[slot=card]:bg-card">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>
              <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                <ShieldCheck className="size-4 text-emerald-500" />
              </div>
            </CardTitle>
            <CardDescription className="pt-2">{t("securityScore")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-3xl tabular-nums leading-none tracking-tight">96/100</div>
            <p className="mt-2 text-muted-foreground text-xs">Grade A+ (SOC2 Audit Ready)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>
              <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                <ShieldAlert className="size-4 text-amber-500" />
              </div>
            </CardTitle>
            <CardDescription className="pt-2">{t("openVulnerabilities")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-3xl tabular-nums leading-none tracking-tight">14</div>
            <p className="mt-2 text-muted-foreground text-xs">4 critical, 10 high/medium</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>
              <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                <ShieldX className="size-4 text-emerald-500" />
              </div>
            </CardTitle>
            <CardDescription className="pt-2">{t("activeIncidents")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-3xl tabular-nums leading-none tracking-tight">0</div>
            <p className="mt-2 text-muted-foreground text-xs">All services running securely</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>
              <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                <Terminal className="size-4" />
              </div>
            </CardTitle>
            <CardDescription className="pt-2">{t("complianceStatus")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-3xl tabular-nums leading-none tracking-tight">3/4</div>
            <p className="mt-2 text-muted-foreground text-xs">SOC2, ISO, GDPR Compliant</p>
          </CardContent>
        </Card>
      </div>

      {/* Visual Analytics */}
      <SecurityCharts />

      {/* Vulnerabilities Table */}
      <VulnerabilitiesTable />
    </div>
  );
}
