"use client";

import { useState } from "react";

import { Copy, Key, ShieldAlert, ShieldCheck, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  scopes: string[];
  created: string;
  lastUsed: string;
  status: "active" | "revoked";
}

const initialKeys: ApiKey[] = [
  {
    id: "key-1",
    name: "Production Web SDK",
    prefix: "dd_live_7a9f...",
    scopes: ["read", "write"],
    created: "2026-05-10",
    lastUsed: "2 mins ago",
    status: "active",
  },
  {
    id: "key-2",
    name: "Staging CLI Auth",
    prefix: "dd_test_0e3a...",
    scopes: ["read", "write", "admin"],
    created: "2026-06-01",
    lastUsed: "1 day ago",
    status: "active",
  },
  {
    id: "key-3",
    name: "Vercel Deploy Webhook",
    prefix: "dd_live_b82e...",
    scopes: ["read"],
    created: "2026-04-12",
    lastUsed: "30 days ago",
    status: "revoked",
  },
];

export function ApiKeysManager() {
  const t = useTranslations("Dashboards.developer");
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys);
  const [newKeyName, setNewKeyName] = useState("");
  const [scopes, setScopes] = useState({ read: true, write: false, admin: false });
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateKey = () => {
    if (!newKeyName.trim()) {
      toast.error("Please enter a key name");
      return;
    }

    const randomSuffix = Array.from({ length: 24 })
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");
    const fullKey = `dd_live_${randomSuffix}`;

    const newKey: ApiKey = {
      id: `key-${Date.now()}`,
      name: newKeyName,
      prefix: `${fullKey.slice(0, 12)}...`,
      scopes: Object.entries(scopes)
        .filter(([_, val]) => val)
        .map(([key]) => key),
      created: new Date().toISOString().split("T")[0],
      lastUsed: "Never",
      status: "active",
    };

    setKeys((prev) => [newKey, ...prev]);
    setGeneratedKey(fullKey);
    toast.success("API key created successfully!");
  };

  const handleCopy = (val: string) => {
    navigator.clipboard.writeText(val);
    toast.success("API Key copied to clipboard");
  };

  const handleRevoke = (id: string, name: string) => {
    setKeys((prev) => prev.map((k) => (k.id === id ? { ...k, status: "revoked" as const } : k)));
    toast.warning(`API Key "${name}" has been revoked.`);
  };

  const handleResetDialog = () => {
    setNewKeyName("");
    setScopes({ read: true, write: false, admin: false });
    setGeneratedKey(null);
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-0.5">
          <CardTitle className="font-semibold text-lg">{t("apiKeys")}</CardTitle>
          <CardDescription>{t("apiKeysDesc")}</CardDescription>
        </div>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            if (!open) handleResetDialog();
            else setIsDialogOpen(true);
          }}
        >
          <DialogTrigger asChild>
            <Button className="h-9">
              <Key className="mr-2 size-4" />
              {t("createKey")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New API Key</DialogTitle>
              <DialogDescription>Provide a label and select access scopes for your key.</DialogDescription>
            </DialogHeader>

            {!generatedKey ? (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="key-name">Key Label</Label>
                  <Input
                    id="key-name"
                    placeholder="e.g. Mobile App Client"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <Label>Scopes</Label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="scope-read"
                        checked={scopes.read}
                        onCheckedChange={(checked) => setScopes((prev) => ({ ...prev, read: !!checked }))}
                      />
                      <label htmlFor="scope-read" className="font-medium text-sm leading-none">
                        read (Read analytics & resources)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="scope-write"
                        checked={scopes.write}
                        onCheckedChange={(checked) => setScopes((prev) => ({ ...prev, write: !!checked }))}
                      />
                      <label htmlFor="scope-write" className="font-medium text-sm leading-none">
                        write (Modify dashboard resources)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="scope-admin"
                        checked={scopes.admin}
                        onCheckedChange={(checked) => setScopes((prev) => ({ ...prev, admin: !!checked }))}
                      />
                      <label htmlFor="scope-admin" className="font-medium text-sm leading-none">
                        admin (Full administrative controls)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 py-4">
                <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3 text-xs text-yellow-500">
                  <ShieldAlert className="mr-2 inline size-4 align-bottom" />
                  Make sure to copy your API key now. For security reasons, you won't be able to see it again.
                </div>
                <div className="grid gap-2">
                  <Label>Secret Token</Label>
                  <div className="flex items-center gap-2">
                    <Input readOnly value={generatedKey} className="select-all font-mono text-xs" />
                    <Button size="icon" onClick={() => handleCopy(generatedKey)} className="h-9 w-9">
                      <Copy className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              {!generatedKey ? (
                <Button onClick={handleCreateKey}>Generate Key</Button>
              ) : (
                <Button onClick={handleResetDialog}>Done</Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("keyName")}</TableHead>
                <TableHead>Secret prefix</TableHead>
                <TableHead>Scopes</TableHead>
                <TableHead>{t("created")}</TableHead>
                <TableHead>{t("lastUsed")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead className="text-right">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keys.map((k) => (
                <TableRow key={k.id}>
                  <TableCell className="font-medium">{k.name}</TableCell>
                  <TableCell className="font-mono text-sm">{k.prefix}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {k.scopes.map((s) => (
                        <Badge key={s} variant="outline" className="text-xs">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{k.created}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{k.lastUsed}</TableCell>
                  <TableCell>
                    <Badge variant={k.status === "active" ? "default" : "secondary"}>
                      {k.status === "active" ? (
                        <ShieldCheck className="mr-1 inline size-3" />
                      ) : (
                        <ShieldAlert className="mr-1 inline size-3" />
                      )}
                      {k.status === "active" ? t("active") : t("revoked")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {k.status === "active" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRevoke(k.id, k.name)}
                        className="h-8 w-8 text-rose-500 hover:bg-rose-500/10 hover:text-rose-600"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
