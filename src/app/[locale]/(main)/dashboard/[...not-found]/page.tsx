"use client";

import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link as I18nLink } from "@/i18n/navigation";

export default function DashboardNotFound() {
  const t = useTranslations("DashboardNotFound");

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <div className="font-bold text-8xl text-muted-foreground/20">404</div>
      <h1 className="font-semibold text-xl">{t("title")}</h1>
      <p className="max-w-md text-muted-foreground">{t("description")}</p>
      <div className="flex items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <I18nLink href="/dashboard/default">
            <ArrowLeft className="size-4" />
            {t("backToDashboard")}
          </I18nLink>
        </Button>
      </div>
    </div>
  );
}
