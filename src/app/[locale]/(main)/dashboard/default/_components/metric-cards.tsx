import { DollarSign, TrendingDown, TrendingUp, UserPlus, Users, Waves } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function MetricCards() {
  const t = useTranslations("Dashboards.default");

  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs xl:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <DollarSign className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>{t("totalRevenue")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">$1,250.00</div>
            <Badge>
              <TrendingUp className="size-3" />
              +12.5%
            </Badge>
          </div>
          <p className="text-muted-foreground text-xs">Visitors for the last 6 months</p>
          {/* Sparkline */}
          <div className="mt-3 h-8 w-full text-emerald-500">
            <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
              <path
                d="M 0,25 C 10,24 20,28 30,15 C 40,5 50,22 60,12 C 70,5 80,18 100,6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <UserPlus className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>{t("newCustomers")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">1,234</div>
            <Badge variant="destructive">
              <TrendingDown className="size-3" />
              -20%
            </Badge>
          </div>
          <p className="text-muted-foreground text-xs">Acquisition needs attention</p>
          {/* Sparkline */}
          <div className="mt-3 h-8 w-full text-rose-500">
            <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
              <path
                d="M 0,5 C 15,8 25,4 35,18 C 45,28 55,10 65,22 C 75,28 85,20 100,28"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Users className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>{t("activeAccounts")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">45,678</div>
            <Badge>
              <TrendingUp className="size-3" />
              +12.5%
            </Badge>
          </div>
          <p className="text-muted-foreground text-xs">Engagement exceeds targets</p>
          {/* Sparkline */}
          <div className="mt-3 h-8 w-full text-emerald-500">
            <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
              <path
                d="M 0,22 C 15,18 25,24 35,12 C 45,2 55,14 65,8 C 75,2 85,10 100,2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Waves className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>{t("growthRate")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">4.5%</div>
            <Badge>
              <TrendingUp className="size-3" />
              +4.5%
            </Badge>
          </div>
          <p className="text-muted-foreground text-xs">Meets growth projections</p>
          {/* Sparkline */}
          <div className="mt-3 h-8 w-full text-emerald-500">
            <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
              <path
                d="M 0,20 C 15,18 25,22 35,15 C 45,8 55,18 65,10 C 75,5 85,12 100,4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
