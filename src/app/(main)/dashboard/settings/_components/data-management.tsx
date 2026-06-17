import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RotateCcw, AlertTriangle } from "lucide-react";
import { useUsersStore } from "@/stores/users-store";
import { useKanbanStore } from "@/stores/kanban-store";
import { useChatStore } from "@/stores/chat-store";
import { useCalendarStore } from "@/stores/calendar-store";
import { useInvoiceStore } from "@/stores/invoice-store";
import { toast } from "sonner";

export function DataManagement() {
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
    toast.success("All data has been reset to defaults");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Management</CardTitle>
        <CardDescription>Reset application data to default values.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 mb-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 text-amber-600 mt-0.5" />
            <div>
              <p className="font-medium text-amber-600 dark:text-amber-400">Warning</p>
              <p className="text-muted-foreground text-sm mt-0.5">
                This will reset all user data, tasks, events, chat messages, and invoices to their default values. This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm">
            <span>Users, Kanban tasks, Chat messages, Calendar events, Invoices</span>
            <Button variant="destructive" size="sm" onClick={handleResetAll}>
              <RotateCcw className="size-4" />
              Reset All Data
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
