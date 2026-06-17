"use client";

import { useState } from "react";

import { Save } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

interface NotificationOption {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

const emailNotifications: NotificationOption[] = [
  { id: "weekly-report", title: "Weekly Report", description: "Receive a weekly summary of your dashboard activity", enabled: true },
  { id: "new-member", title: "New Team Member", description: "Get notified when someone joins your team", enabled: true },
  { id: "security-alerts", title: "Security Alerts", description: "Important security notifications for your account", enabled: true },
  { id: "product-updates", title: "Product Updates", description: "News about new features and improvements", enabled: false },
];

const pushNotifications: NotificationOption[] = [
  { id: "real-time", title: "Real-time Updates", description: "Get notified about live changes in your dashboards", enabled: true },
  { id: "mentions", title: "Mentions", description: "When someone mentions you in comments", enabled: true },
  { id: "task-updates", title: "Task Updates", description: "Status changes on tasks you're assigned to", enabled: false },
  { id: "calendar-reminders", title: "Calendar Reminders", description: "Reminders for upcoming events and meetings", enabled: true },
];

export function NotificationSettings() {
  const [email, setEmail] = useState(emailNotifications);
  const [push, setPush] = useState(pushNotifications);

  const toggleEmail = (id: string) => {
    setEmail((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  const togglePush = (id: string) => {
    setPush((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  const handleSave = () => {
    toast.success("Notification preferences saved");
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>
            Configure which emails you'd like to receive.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {email.map((option, index) => (
              <div key={option.id}>
                {index > 0 && <Separator className="mb-4" />}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label>{option.title}</Label>
                    <p className="text-muted-foreground text-sm">
                      {option.description}
                    </p>
                  </div>
                  <Switch
                    checked={option.enabled}
                    onCheckedChange={() => toggleEmail(option.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>
            Manage your browser push notification preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {push.map((option, index) => (
              <div key={option.id}>
                {index > 0 && <Separator className="mb-4" />}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label>{option.title}</Label>
                    <p className="text-muted-foreground text-sm">
                      {option.description}
                    </p>
                  </div>
                  <Switch
                    checked={option.enabled}
                    onCheckedChange={() => togglePush(option.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="size-4" />
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
