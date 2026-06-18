import { useTranslations } from "next-intl";

import { CostOptimizer } from "./_components/cost-optimizer";

export default function Page() {
  const t = useTranslations("Dashboards.finops");

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <h1 className="text-3xl tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>

      <CostOptimizer />
    </div>
  );
}
