"use client";

import { useState } from "react";

import { Check, Save } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const themes = [
  { id: "default", nameKey: "default", colors: ["#3b82f6", "#10b981", "#f59e0b"] },
  { id: "tangerine", nameKey: "tangerine", colors: ["#f97316", "#eab308", "#ef4444"] },
  { id: "brutalist", nameKey: "brutalist", colors: ["#000000", "#ffffff", "#ff0000"] },
  { id: "soft-pop", nameKey: "softPop", colors: ["#ec4899", "#8b5cf6", "#06b6d4"] },
];

const fonts = [
  { id: "inter", name: "Inter", className: "font-sans" },
  { id: "geist", name: "Geist", className: "font-sans" },
  { id: "poppins", name: "Poppins", className: "font-sans" },
];

export function AppearanceSettings() {
  const t = useTranslations("Settings.appearance");
  const [selectedTheme, setSelectedTheme] = useState("default");
  const [selectedFont, setSelectedFont] = useState("inter");

  const handleSave = () => {
    toast.success(t("savedToast"));
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("themeTitle")}</CardTitle>
          <CardDescription>{t("themeDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors hover:bg-muted/50",
                  selectedTheme === theme.id ? "border-primary" : "border-transparent",
                )}
              >
                <div className="flex gap-1">
                  {theme.colors.map((color, i) => (
                    <div key={i} className="size-6 rounded-full" style={{ backgroundColor: color }} />
                  ))}
                </div>
                <span className="text-sm font-medium">{t(`themeNames.${theme.nameKey}`)}</span>
                {selectedTheme === theme.id && <Check className="size-4 text-primary" />}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("fontTitle")}</CardTitle>
          <CardDescription>{t("fontDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {fonts.map((font) => (
              <button
                key={font.id}
                onClick={() => setSelectedFont(font.id)}
                className={cn(
                  "flex items-center justify-between rounded-lg border-2 p-4 transition-colors hover:bg-muted/50",
                  selectedFont === font.id ? "border-primary" : "border-transparent",
                )}
              >
                <span className={font.className}>{font.name}</span>
                {selectedFont === font.id && <Check className="size-4 text-primary" />}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("sidebarTitle")}</CardTitle>
          <CardDescription>{t("sidebarDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>{t("compactMode")}</Label>
                <p className="text-muted-foreground text-sm">{t("compactModeDescription")}</p>
              </div>
              <Button variant="outline" size="sm">
                {t("configure")}
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>{t("fixedSidebar")}</Label>
                <p className="text-muted-foreground text-sm">{t("fixedSidebarDescription")}</p>
              </div>
              <Button variant="outline" size="sm">
                {t("configure")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="size-4" />
          {t("savePreferences")}
        </Button>
      </div>
    </div>
  );
}
