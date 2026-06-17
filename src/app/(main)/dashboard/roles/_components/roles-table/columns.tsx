"use client";
"use no memo";

import type { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Role } from "./data";

export const rolesColumns: ColumnDef<Role>[] = [
  {
    id: "group",
    accessorKey: "group",
    filterFn: "equalsString",
    enableHiding: true,
  },
  {
    id: "search",
    accessorFn: (row) => [row.role, row.owner, ...row.permissionSets].join(" "),
    filterFn: "includesString",
    enableHiding: true,
  },
  {
    id: "role",
    accessorKey: "role",
    header: "Role",
    size: 180,
    minSize: 180,
    cell: ({ row }) => <span className="font-medium text-sm">{row.original.role}</span>,
  },
  {
    id: "accessLevel",
    accessorKey: "accessLevel",
    header: "Access level",
    size: 120,
    cell: ({ row }) => (
      <Badge className="font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-border/40" variant="outline">
        {row.original.accessLevel}
      </Badge>
    ),
  },
  {
    id: "users",
    accessorKey: "users",
    header: "Users",
    size: 70,
    cell: ({ row }) => <span className="text-sm font-medium text-zinc-950 dark:text-zinc-50">{row.original.users}</span>,
  },
  {
    id: "permissionSets",
    accessorFn: (row) => row.permissionSets.join(" "),
    header: "Permission sets",
    size: 310,
    cell: ({ row }) => (
      <div className="flex flex-wrap items-center justify-start gap-1.5">
        {row.original.permissionSets.slice(0, 3).map((set) => (
          <Badge className="font-medium text-[10px] px-1.5 py-0.5 rounded-md bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border border-border/30" variant="outline" key={set}>
            {set}
          </Badge>
        ))}
        {row.original.permissionSets.length > 3 ? (
          <span className="text-[10px] font-bold text-muted-foreground bg-muted border border-border/40 px-1.5 py-0.5 rounded-md">+{row.original.permissionSets.length - 3}</span>
        ) : null}
      </div>
    ),
  },
  {
    id: "lastReview",
    accessorKey: "lastReview",
    header: "Last review",
    size: 120,
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.lastReview}</span>,
  },
  {
    id: "owner",
    accessorKey: "owner",
    header: "Owner",
    size: 110,
    filterFn: "equalsString",
    cell: ({ row }) => <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{row.original.owner}</span>,
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    size: 130,
    filterFn: "equalsString",
    cell: ({ row }) => {
      const active = row.original.status === "Active";
      return (
        <Badge
          className={cn(
            "font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md gap-1.5",
            active
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
              : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
          )}
          variant="outline"
        >
          <span className={cn("size-1 rounded-full", active ? "bg-emerald-500" : "bg-amber-500")} />
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "",
    size: 70,
    cell: ({ row }) => {
      const isSystemRole = row.original.group === "System roles";
      const needsReview = row.original.status === "Needs review";

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" align="end">
            <DropdownMenuGroup>
              {needsReview ? <DropdownMenuItem>Review changes</DropdownMenuItem> : null}
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem disabled={isSystemRole}>Edit role</DropdownMenuItem>
              <DropdownMenuItem disabled={isSystemRole}>Duplicate role</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Review permissions</DropdownMenuItem>
              <DropdownMenuItem>Manage members</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem disabled={isSystemRole} variant="destructive">
                Archive role
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableColumnFilter: false,
  },
];
