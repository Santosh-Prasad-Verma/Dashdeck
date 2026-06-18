"use client";

import { ArrowLeft, FileQuestion, Home } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link as I18nLink } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-4">
      <Card className="max-w-md text-center">
        <CardContent className="flex flex-col items-center gap-6 p-8">
          <div className="relative">
            <div className="flex size-24 items-center justify-center rounded-full bg-muted/50">
              <FileQuestion className="size-12 text-muted-foreground" />
            </div>
            <div className="absolute -top-2 -right-2 flex size-10 items-center justify-center rounded-full bg-primary font-bold text-lg text-primary-foreground">
              4
            </div>
            <div className="absolute -bottom-2 -left-2 flex size-10 items-center justify-center rounded-full bg-primary font-bold text-lg text-primary-foreground">
              4
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="font-bold text-3xl tracking-tight">{t("title")}</h1>
            <p className="text-muted-foreground">{t("description")}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="outline">
              <I18nLink href="/">
                <ArrowLeft className="size-4" />
                {t("backToHome")}
              </I18nLink>
            </Button>
            <Button asChild>
              <I18nLink href="/dashboard/default">
                <Home className="size-4" />
                {t("goToDashboard")}
              </I18nLink>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
