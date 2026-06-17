"use client";

import { useState } from "react";

import { Key, Save, Shield, Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [apiKey, setApiKey] = useState("pk_live_51Px9X4GkZ7Q9q3r0wV1l7pM4");
  const [copied, setCopied] = useState(false);

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    toast.success("Password updated successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    toast.success("API key copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateKey = () => {
    const randomHex = Array.from({ length: 24 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    setApiKey(`pk_live_${randomHex}`);
    toast.success("New API key generated");
  };

  const handleSave = () => {
    toast.success("Security settings saved");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* API Key Credentials */}
      <Card>
        <CardHeader>
          <CardTitle>API Credentials</CardTitle>
          <CardDescription>
            Use this key to authenticate requests to the Dashdeck API. Keep this key secret and secure.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="api-key">Production API Key</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="api-key"
                  value={apiKey}
                  readOnly
                  className="font-mono text-xs pr-16 h-10 select-all"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {copied ? (
                    <span className="text-emerald-500 font-bold text-xs">Copied!</span>
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
              </div>
              <Button variant="outline" onClick={handleGenerateKey} className="h-10 shrink-0">
                <RefreshCw className="size-4 mr-2" />
                Regenerate
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password Changes */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
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
              Update Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Two Factor */}
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <Label>Enable 2FA</Label>
              <p className="text-muted-foreground text-sm">
                Require a verification code when signing in
              </p>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={setTwoFactorEnabled}
            />
          </div>
          {twoFactorEnabled && (
            <div className="mt-4 rounded-lg border bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="size-4 text-emerald-500" />
                <span>Two-factor authentication is enabled</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>
            Manage your active login sessions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex flex-col gap-1">
                <span className="font-medium text-sm">Current Session</span>
                <span className="text-muted-foreground text-xs">
                  Chrome on Linux · Last active now
                </span>
              </div>
              <span className="text-emerald-600 text-xs font-semibold">Active</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex flex-col gap-1">
                <span className="font-medium text-sm">Mobile App</span>
                <span className="text-muted-foreground text-xs">
                  iPhone · Last active 2 hours ago
                </span>
              </div>
              <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                Revoke
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="size-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
