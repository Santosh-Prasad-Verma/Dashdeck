"use client";

import { useTranslations } from "next-intl";

import { Bell, Database, Palette, Shield, User } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AccountSettings } from "./account-settings";
import { AppearanceSettings } from "./appearance-settings";
import { DataManagement } from "./data-management";
import { NotificationSettings } from "./notification-settings";
import { SecuritySettings } from "./security-settings";

export function SettingsView() {
  const t = useTranslations("Settings");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>

      <Tabs defaultValue="account" className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        <div className="lg:w-48">
          <TabsList className="flex w-full flex-row flex-wrap gap-1 lg:flex-col lg:items-start lg:gap-0.5 lg:p-1">
            <TabsTrigger value="account" className="w-full justify-start gap-2">
              <User className="size-4" />
              {t("tabs.account")}
            </TabsTrigger>
            <TabsTrigger value="appearance" className="w-full justify-start gap-2">
              <Palette className="size-4" />
              {t("tabs.appearance")}
            </TabsTrigger>
            <TabsTrigger value="notifications" className="w-full justify-start gap-2">
              <Bell className="size-4" />
              {t("tabs.notifications")}
            </TabsTrigger>
            <TabsTrigger value="security" className="w-full justify-start gap-2">
              <Shield className="size-4" />
              {t("tabs.security")}
            </TabsTrigger>
            <TabsTrigger value="data" className="w-full justify-start gap-2">
              <Database className="size-4" />
              {t("tabs.data")}
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1">
          <TabsContent value="account" className="mt-0">
            <AccountSettings />
          </TabsContent>
          <TabsContent value="appearance" className="mt-0">
            <AppearanceSettings />
          </TabsContent>
          <TabsContent value="notifications" className="mt-0">
            <NotificationSettings />
          </TabsContent>
          <TabsContent value="security" className="mt-0">
            <SecuritySettings />
          </TabsContent>
          <TabsContent value="data" className="mt-0">
            <DataManagement />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
