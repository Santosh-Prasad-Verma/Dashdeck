"use client";

import { useState } from "react";

import { Save } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

interface NotificationOption {
  id: string;
  titleKey: string;
  descriptionKey: string;
  enabled: boolean;
}

const emailNotificationKeys = [
  { id: "weekly-report", titleKey: "weeklyReport", descriptionKey: "weeklyReport" },
  { id: "new-member", titleKey: "newTeamMember", descriptionKey: "newTeamMember" },
  { id: "security-alerts", titleKey: "securityAlerts", descriptionKey: "securityAlerts" },
  { id: "product-updates", titleKey: "productUpdates", descriptionKey: "productUpdates" },
];

const pushNotificationKeys = [
  { id: "real-time", titleKey: "realTimeUpdates", descriptionKey: "realTimeUpdates" },
  { id: "mentions", titleKey: "mentions", descriptionKey: "mentions" },
  { id: "task-updates", titleKey: "taskUpdates", descriptionKey: "taskUpdates" },
  { id: "calendar-reminders", titleKey: "calendarReminders", descriptionKey: "calendarReminders" },
];

export function NotificationSettings() {
  const t = useTranslations("Settings.notifications");

  const [email, setEmail] = useState(
    emailNotificationKeys.map((key, i) => ({
      id: key.id,
      titleKey: key.titleKey,
      descriptionKey: key.descriptionKey,
      enabled: i < 3,
    })),
  );

  const [push, setPush] = useState(
    pushNotificationKeys.map((key, i) => ({
      id: key.id,
      titleKey: key.titleKey,
      descriptionKey: key.descriptionKey,
      enabled: i !== 2,
    })),
  );

  const toggleEmail = (id: string) => {
    setEmail((prev) => prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item)));
  };

  const togglePush = (id: string) => {
    setPush((prev) => prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item)));
  };

  const handleSave = () => {
    toast.success(t("savedToast"));
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("emailTitle")}</CardTitle>
          <CardDescription>{t("emailDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {email.map((option, index) => (
              <div key={option.id}>
                {index > 0 && <Separator className="mb-4" />}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label>{t(`items.${option.titleKey}.title`)}</Label>
                    <p className="text-muted-foreground text-sm">{t(`items.${option.descriptionKey}.description`)}</p>
                  </div>
                  <Switch checked={option.enabled} onCheckedChange={() => toggleEmail(option.id)} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("pushTitle")}</CardTitle>
          <CardDescription>{t("pushDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {push.map((option, index) => (
              <div key={option.id}>
                {index > 0 && <Separator className="mb-4" />}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label>{t(`items.${option.titleKey}.title`)}</Label>
                    <p className="text-muted-foreground text-sm">{t(`items.${option.descriptionKey}.description`)}</p>
                  </div>
                  <Switch checked={option.enabled} onCheckedChange={() => togglePush(option.id)} />
                </div>
              </div>
            ))}
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
