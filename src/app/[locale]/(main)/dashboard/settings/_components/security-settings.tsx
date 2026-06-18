"use client";

import { useState } from "react";

import { Copy, Key, RefreshCw, Save, Shield } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function SecuritySettings() {
  const t = useTranslations("Settings.security");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [apiKey, setApiKey] = useState("pk_live_51Px9X4GkZ7Q9q3r0wV1l7pM4");
  const [copied, setCopied] = useState(false);

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast.error(t("toasts.passwordsDoNotMatch"));
      return;
    }
    if (newPassword.length < 8) {
      toast.error(t("toasts.passwordMinLength"));
      return;
    }
    toast.success(t("toasts.passwordUpdated"));
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    toast.success(t("toasts.apiKeyCopied"));
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateKey = () => {
    const randomHex = Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    setApiKey(`pk_live_${randomHex}`);
    toast.success(t("toasts.apiKeyGenerated"));
  };

  const handleSave = () => {
    toast.success(t("toasts.settingsSaved"));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* API Key Credentials */}
      <Card>
        <CardHeader>
          <CardTitle>{t("apiCredentialsTitle")}</CardTitle>
          <CardDescription>{t("apiCredentialsDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="api-key">{t("productionApiKey")}</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input id="api-key" value={apiKey} readOnly className="font-mono text-xs pr-16 h-10 select-all" />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {copied ? (
                    <span className="text-emerald-500 font-bold text-xs">{t("copied")}</span>
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
              </div>
              <Button variant="outline" onClick={handleGenerateKey} className="h-10 shrink-0">
                <RefreshCw className="size-4 mr-2" />
                {t("regenerate")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password Changes */}
      <Card>
        <CardHeader>
          <CardTitle>{t("changePasswordTitle")}</CardTitle>
          <CardDescription>{t("changePasswordDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="current-password">{t("currentPassword")}</Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-password">{t("newPassword")}</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">{t("confirmNewPassword")}</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handlePasswordChange}>
              <Key className="size-4" />
              {t("updatePassword")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Two Factor */}
      <Card>
        <CardHeader>
          <CardTitle>{t("twoFactorTitle")}</CardTitle>
          <CardDescription>{t("twoFactorDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <Label>{t("enable2FA")}</Label>
              <p className="text-muted-foreground text-sm">{t("twoFactorEnabledDescription")}</p>
            </div>
            <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
          </div>
          {twoFactorEnabled && (
            <div className="mt-4 rounded-lg border bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="size-4 text-emerald-500" />
                <span>{t("twoFactorEnabledStatus")}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>{t("activeSessionsTitle")}</CardTitle>
          <CardDescription>{t("activeSessionsDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex flex-col gap-1">
                <span className="font-medium text-sm">{t("currentSession")}</span>
                <span className="text-muted-foreground text-xs">{t("currentSessionDetail")}</span>
              </div>
              <span className="text-emerald-600 text-xs font-semibold">{t("active")}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex flex-col gap-1">
                <span className="font-medium text-sm">{t("mobileApp")}</span>
                <span className="text-muted-foreground text-xs">{t("mobileSessionDetail")}</span>
              </div>
              <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                {t("revoke")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="size-4" />
          {t("saveSettings")}
        </Button>
      </div>
    </div>
  );
}
