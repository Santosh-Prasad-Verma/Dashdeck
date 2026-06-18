import { useTranslations } from "next-intl";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AcquisitionView } from "./_components/acquisition-view";
import { AnalyticsKpiStrip } from "./_components/analytics-kpi-strip";
import { AnalyticsToolbar } from "./_components/analytics-toolbar";
import { AudienceView } from "./_components/audience-view";
import { ConversionsView } from "./_components/conversions-view";
import { EngagementView } from "./_components/engagement-view";
import { GeographicTraffic } from "./_components/geographic-traffic";
import { RealtimeVisitors } from "./_components/realtime-visitors";
import { TopPages } from "./_components/top-pages";
import { TopTrafficSources } from "./_components/top-traffic-sources";
import { TrafficQuality } from "./_components/traffic-quality";

// Import this stylesheet in any page or component that renders country flag classes.
import "@/styles/flag-icons/flags.css";

export default function Page() {
  const t = useTranslations("Dashboards.analytics");

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <h1 className="text-3xl tracking-tight">{t("greeting", { name: "Aiy" })}</h1>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>

      <Tabs defaultValue="overview" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <TabsList className="gap-1">
            <TabsTrigger value="overview">{t("tabs.overview")}</TabsTrigger>
            <TabsTrigger value="audience">{t("tabs.audience")}</TabsTrigger>
            <TabsTrigger value="acquisition">{t("tabs.acquisition")}</TabsTrigger>
            <TabsTrigger value="engagement">{t("tabs.engagement")}</TabsTrigger>
            <TabsTrigger value="conversions">{t("tabs.conversions")}</TabsTrigger>
          </TabsList>

          <AnalyticsToolbar />
        </div>

        <TabsContent value="overview" className="flex flex-col gap-4">
          <AnalyticsKpiStrip />

          <div className="grid grid-cols-1 items-stretch gap-4 xl:grid-cols-12">
            <div className="xl:col-span-7">
              <TrafficQuality />
            </div>
            <div className="xl:col-span-5">
              <RealtimeVisitors />
            </div>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-4 xl:grid-cols-12">
            <div className="xl:col-span-7 flex flex-col gap-4">
              <TopPages />
              <TopTrafficSources />
            </div>
            <div className="xl:col-span-5">
              <GeographicTraffic />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="audience">
          <AudienceView />
        </TabsContent>

        <TabsContent value="acquisition">
          <AcquisitionView />
        </TabsContent>

        <TabsContent value="engagement">
          <EngagementView />
        </TabsContent>

        <TabsContent value="conversions">
          <ConversionsView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
