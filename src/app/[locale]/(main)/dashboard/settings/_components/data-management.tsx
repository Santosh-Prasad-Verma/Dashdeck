import { AlertTriangle, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCalendarStore } from "@/stores/calendar-store";
import { useChatStore } from "@/stores/chat-store";
import { useInvoiceStore } from "@/stores/invoice-store";
import { useKanbanStore } from "@/stores/kanban-store";
import { useUsersStore } from "@/stores/users-store";

export function DataManagement() {
  const t = useTranslations("Settings.data");

  const resetUsers = useUsersStore((s) => s.resetUsers);
  const resetKanban = useKanbanStore((s) => s.resetBoard);
  const resetChat = useChatStore((s) => s.resetConversations);
  const resetCalendar = useCalendarStore((s) => s.resetEvents);
  const resetInvoice = useInvoiceStore((s) => s.resetInvoice);

  const handleResetAll = () => {
    resetUsers();
    resetKanban();
    resetChat();
    resetCalendar();
    resetInvoice();
    localStorage.removeItem("pulse-users-storage");
    localStorage.removeItem("pulse-kanban-storage");
    localStorage.removeItem("pulse-chat-storage");
    localStorage.removeItem("pulse-calendar-storage");
    localStorage.removeItem("pulse-invoice-storage");
    toast.success(t("resetToast"));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 mb-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 text-amber-600 mt-0.5" />
            <div>
              <p className="font-medium text-amber-600 dark:text-amber-400">{t("warning")}</p>
              <p className="text-muted-foreground text-sm mt-0.5">{t("warningBody")}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm">
            <span>{t("dataScope")}</span>
            <Button variant="destructive" size="sm" onClick={handleResetAll}>
              <RotateCcw className="size-4" />
              {t("resetAllData")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
