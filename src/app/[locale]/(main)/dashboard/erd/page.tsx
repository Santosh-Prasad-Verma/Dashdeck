"use client";

import { useState } from "react";

import { Database, HelpCircle } from "lucide-react";
import { useTranslations } from "next-intl";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ErdTable {
  id: string;
  name: string;
  fields: { name: string; type: string; isPk?: boolean; isFk?: boolean }[];
  x: number;
  y: number;
  width: number;
  height: number;
}

const tablesData: ErdTable[] = [
  {
    id: "users",
    name: "Users",
    x: 40,
    y: 80,
    width: 200,
    height: 180,
    fields: [
      { name: "id", type: "UUID", isPk: true },
      { name: "name", type: "VARCHAR" },
      { name: "email", type: "VARCHAR" },
      { name: "role", type: "VARCHAR" },
      { name: "created_at", type: "TIMESTAMP" },
    ],
  },
  {
    id: "invoices",
    name: "Invoices",
    x: 40,
    y: 360,
    width: 200,
    height: 180,
    fields: [
      { name: "id", type: "UUID", isPk: true },
      { name: "user_id", type: "UUID", isFk: true },
      { name: "amount", type: "DECIMAL" },
      { name: "status", type: "VARCHAR" },
      { name: "created_at", type: "TIMESTAMP" },
    ],
  },
  {
    id: "keys",
    name: "ApiKeys",
    x: 340,
    y: 80,
    width: 220,
    height: 210,
    fields: [
      { name: "id", type: "UUID", isPk: true },
      { name: "user_id", type: "UUID", isFk: true },
      { name: "label", type: "VARCHAR" },
      { name: "token_hash", type: "VARCHAR" },
      { name: "scopes", type: "VARCHAR[]" },
      { name: "status", type: "VARCHAR" },
      { name: "created_at", type: "TIMESTAMP" },
    ],
  },
  {
    id: "runs",
    name: "AgentRuns",
    x: 660,
    y: 80,
    width: 220,
    height: 180,
    fields: [
      { name: "id", type: "UUID", isPk: true },
      { name: "key_id", type: "UUID", isFk: true },
      { name: "agent_name", type: "VARCHAR" },
      { name: "status", type: "VARCHAR" },
      { name: "tokens_used", type: "INTEGER" },
    ],
  },
  {
    id: "logs",
    name: "AgentLogs",
    x: 660,
    y: 360,
    width: 220,
    height: 180,
    fields: [
      { name: "id", type: "UUID", isPk: true },
      { name: "run_id", type: "UUID", isFk: true },
      { name: "step_type", type: "VARCHAR" },
      { name: "message", type: "TEXT" },
      { name: "timestamp", type: "TIMESTAMP" },
    ],
  },
];

interface RelationLink {
  fromTable: string;
  toTable: string;
  path: string;
}

const relationLinks: RelationLink[] = [
  // Users (right) -> ApiKeys (left)
  { fromTable: "users", toTable: "keys", path: "M 240,110 L 340,110" },
  // Users (bottom) -> Invoices (top)
  { fromTable: "users", toTable: "invoices", path: "M 140,260 L 140,360" },
  // ApiKeys (right) -> AgentRuns (left)
  { fromTable: "keys", toTable: "runs", path: "M 560,110 L 660,110" },
  // AgentRuns (bottom) -> AgentLogs (top)
  { fromTable: "runs", toTable: "logs", path: "M 770,260 L 770,360" },
];

export default function Page() {
  const t = useTranslations("Dashboards.erd");
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const isHighlighted = (tableId: string) => {
    if (!selectedTable) return true;
    if (selectedTable === tableId) return true;
    // Check connections
    return relationLinks.some(
      (link) =>
        (link.fromTable === selectedTable && link.toTable === tableId) ||
        (link.toTable === selectedTable && link.fromTable === tableId),
    );
  };

  const isLinkHighlighted = (link: RelationLink) => {
    if (!selectedTable) return true;
    return link.fromTable === selectedTable || link.toTable === selectedTable;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <h1 className="text-3xl tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>

      <Card className="overflow-hidden border border-muted/50 bg-linear-to-b from-card to-background">
        <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20 pb-3">
          <div className="space-y-0.5">
            <CardTitle className="flex items-center gap-2 font-semibold text-lg">
              <Database className="size-5 text-primary" />
              {t("erdCanvas")}
            </CardTitle>
            <CardDescription>Click any schema table node to highlight its relational keys.</CardDescription>
          </div>
          <div className="flex items-center gap-1.5 rounded-md border border-muted/40 bg-muted/40 px-2 py-1 text-muted-foreground text-xs">
            <HelpCircle className="size-3.5" />
            <span>Interactive Node Selection</span>
          </div>
        </CardHeader>
        <CardContent className="overflow-auto p-0">
          <div className="relative h-[600px] min-w-[940px] select-none bg-neutral-950/20">
            {/* SVG Canvas for drawing connecting keys lines */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full">
              <defs>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary/60" />
                </marker>
                <marker
                  id="arrow-selected"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary" />
                </marker>
              </defs>

              {relationLinks.map((link) => {
                const highlighted = isLinkHighlighted(link);
                return (
                  <path
                    key={`${link.fromTable}-${link.toTable}`}
                    d={link.path}
                    fill="none"
                    stroke={highlighted ? "hsl(var(--primary))" : "hsl(var(--muted)/0.3)"}
                    strokeWidth={highlighted ? 2.5 : 1.5}
                    markerEnd={highlighted ? "url(#arrow-selected)" : "url(#arrow)"}
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>

            {/* Render schema tables */}
            {tablesData.map((table) => {
              const active = isHighlighted(table.id);
              const isSelf = selectedTable === table.id;

              return (
                <div
                  key={table.id}
                  onClick={() => setSelectedTable(isSelf ? null : table.id)}
                  style={{
                    left: `${table.x}px`,
                    top: `${table.y}px`,
                    width: `${table.width}px`,
                    height: `${table.height}px`,
                  }}
                  className={`absolute flex cursor-pointer flex-col overflow-hidden rounded-xl border bg-card/90 shadow-xl backdrop-blur-xs transition-all duration-300 ${
                    isSelf
                      ? "border-primary shadow-primary/10 ring-2 ring-primary/20"
                      : active
                        ? "border-muted/80 hover:border-primary/50"
                        : "border-muted/20 opacity-30"
                  }`}
                >
                  {/* Table Header */}
                  <div
                    className={`flex items-center gap-1.5 border-b p-2 px-3 font-bold font-mono text-xs transition-colors ${
                      isSelf ? "bg-primary text-primary-foreground" : "bg-muted/40 text-foreground"
                    }`}
                  >
                    <Database className="size-3.5" />
                    {table.name}
                  </div>

                  {/* Fields List */}
                  <div className="flex flex-1 flex-col justify-center gap-1.5 bg-card/50 p-2 px-3 font-mono text-[11px]">
                    {table.fields.map((f) => (
                      <div key={f.name} className="flex items-center justify-between py-0.5 leading-none">
                        <div className="flex items-center gap-1">
                          {f.isPk && (
                            <span className="rounded border border-yellow-500/30 bg-yellow-500/10 px-0.5 font-extrabold text-[9px] text-yellow-500">
                              PK
                            </span>
                          )}
                          {f.isFk && (
                            <span className="rounded border border-blue-500/30 bg-blue-500/10 px-0.5 font-extrabold text-[9px] text-blue-500">
                              FK
                            </span>
                          )}
                          <span className="font-semibold text-foreground">{f.name}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground">{f.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
