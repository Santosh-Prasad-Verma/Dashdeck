"use client";

import { useState } from "react";

import { Copy, Edit, Plus, Search, Shield, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface PermissionSet {
  id: number;
  name: string;
  description: string;
  permissions: number;
  roles: number;
  lastUpdated: string;
  isDefault: boolean;
}

const permissionSets: PermissionSet[] = [
  {
    id: 1,
    name: "Full Access",
    description: "Complete access to all system features and settings",
    permissions: 48,
    roles: 3,
    lastUpdated: "2 hours ago",
    isDefault: true,
  },
  {
    id: 2,
    name: "Read Only",
    description: "View-only access to dashboards and reports",
    permissions: 12,
    roles: 2,
    lastUpdated: "1 day ago",
    isDefault: false,
  },
  {
    id: 3,
    name: "Content Manager",
    description: "Manage content, pages, and media files",
    permissions: 24,
    roles: 4,
    lastUpdated: "3 days ago",
    isDefault: false,
  },
  {
    id: 4,
    name: "Finance Admin",
    description: "Access to financial data, invoices, and billing",
    permissions: 18,
    roles: 2,
    lastUpdated: "1 week ago",
    isDefault: false,
  },
  {
    id: 5,
    name: "Support Agent",
    description: "Handle customer support tickets and inquiries",
    permissions: 15,
    roles: 5,
    lastUpdated: "2 weeks ago",
    isDefault: false,
  },
  {
    id: 6,
    name: "Developer",
    description: "Access to code repositories, deployments, and logs",
    permissions: 32,
    roles: 3,
    lastUpdated: "3 days ago",
    isDefault: false,
  },
];

export function PermissionSetsView() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSets = permissionSets.filter((set) => set.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-lg">Permission Sets</h3>
          <p className="text-muted-foreground text-sm">Manage reusable permission collections</p>
        </div>
        <Button>
          <Plus className="size-4" />
          Create Set
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search permission sets..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredSets.map((set) => (
          <Card key={set.id} className="relative">
            {set.isDefault && (
              <Badge className="absolute top-3 right-3" variant="secondary">
                Default
              </Badge>
            )}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="size-4 text-muted-foreground" />
                {set.name}
              </CardTitle>
              <CardDescription>{set.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Permissions</span>
                  <span className="font-medium">{set.permissions}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Used by roles</span>
                  <span className="font-medium">{set.roles}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last updated</span>
                  <span className="text-muted-foreground">{set.lastUpdated}</span>
                </div>
                <div className="flex items-center gap-2 border-t pt-2">
                  <Button variant="ghost" size="sm" className="h-8">
                    <Edit className="size-3" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8">
                    <Copy className="size-3" />
                    Clone
                  </Button>
                  {!set.isDefault && (
                    <Button variant="ghost" size="sm" className="h-8 text-destructive">
                      <Trash2 className="size-3" />
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
