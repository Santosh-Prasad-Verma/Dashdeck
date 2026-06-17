"use client";

import { useState } from "react";

import { CheckCircle, Clock, AlertTriangle, Search, Filter, Eye, UserCheck, UserX } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getInitials } from "@/lib/utils";

interface AccessReview {
  id: number;
  user: string;
  email: string;
  role: string;
  lastAccess: string;
  riskLevel: "low" | "medium" | "high";
  status: "pending" | "reviewed" | "flagged";
  reviewedBy?: string;
}

const reviews: AccessReview[] = [
  {
    id: 1,
    user: "Olivia Rhye",
    email: "olivia@company.com",
    role: "Admin",
    lastAccess: "2 hours ago",
    riskLevel: "low",
    status: "reviewed",
    reviewedBy: "John Smith",
  },
  {
    id: 2,
    user: "Phoenix Baker",
    email: "phoenix@company.com",
    role: "Workspace Owner",
    lastAccess: "1 day ago",
    riskLevel: "low",
    status: "reviewed",
    reviewedBy: "John Smith",
  },
  {
    id: 3,
    user: "Lana Steiner",
    email: "lana@company.com",
    role: "Billing Admin",
    lastAccess: "5 days ago",
    riskLevel: "medium",
    status: "pending",
  },
  {
    id: 4,
    user: "Demi Wilkinson",
    email: "demi@company.com",
    role: "Security Admin",
    lastAccess: "30 days ago",
    riskLevel: "high",
    status: "flagged",
  },
  {
    id: 5,
    user: "Candice Wu",
    email: "candice@company.com",
    role: "Team Lead",
    lastAccess: "3 hours ago",
    riskLevel: "low",
    status: "reviewed",
    reviewedBy: "John Smith",
  },
  {
    id: 6,
    user: "Natali Craig",
    email: "natali@company.com",
    role: "Contributor",
    lastAccess: "90 days ago",
    riskLevel: "high",
    status: "flagged",
  },
  {
    id: 7,
    user: "Drew Cano",
    email: "drew@company.com",
    role: "Guest",
    lastAccess: "1 hour ago",
    riskLevel: "low",
    status: "pending",
  },
  {
    id: 8,
    user: "Orlando Diggs",
    email: "orlando@company.com",
    role: "Read-only",
    lastAccess: "14 days ago",
    riskLevel: "medium",
    status: "pending",
  },
];

function getRiskBadge(risk: AccessReview["riskLevel"]) {
  switch (risk) {
    case "high":
      return <Badge className="bg-red-500/10 text-red-600 dark:text-red-400">High Risk</Badge>;
    case "medium":
      return <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400">Medium Risk</Badge>;
    case "low":
      return <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Low Risk</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
}

function getStatusIcon(status: AccessReview["status"]) {
  switch (status) {
    case "reviewed":
      return <CheckCircle className="size-4 text-emerald-500" />;
    case "pending":
      return <Clock className="size-4 text-amber-500" />;
    case "flagged":
      return <AlertTriangle className="size-4 text-red-500" />;
    default:
      return null;
  }
}

export function AccessReviewsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch = review.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || review.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = reviews.filter((r) => r.status === "pending").length;
  const flaggedCount = reviews.filter((r) => r.status === "flagged").length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Access Reviews</h3>
          <p className="text-muted-foreground text-sm">Review and audit user access permissions</p>
        </div>
        <Button>
          <Eye className="size-4" />
          Start New Review
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Reviews</CardDescription>
            <CardTitle className="text-2xl tabular-nums">{pendingCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-amber-600 text-sm">
              <Clock className="size-3" />
              Requires attention
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Flagged Users</CardDescription>
            <CardTitle className="text-2xl tabular-nums">{flaggedCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-red-600 text-sm">
              <AlertTriangle className="size-3" />
              High risk access
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Reviewed This Month</CardDescription>
            <CardTitle className="text-2xl tabular-nums">24</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-emerald-600 text-sm">
              <CheckCircle className="size-3" />
              On track
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>User Access Reviews</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="h-8 w-48 pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger size="sm" className="w-32">
                  <Filter className="size-3" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="flex flex-col gap-2">
              {filteredReviews.map((review) => (
                <div
                  key={review.id}
                  className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9">
                      <AvatarFallback>{getInitials(review.user)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{review.user}</span>
                        {getStatusIcon(review.status)}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {review.email} · {review.role} · Last access: {review.lastAccess}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getRiskBadge(review.riskLevel)}
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="size-8">
                        <UserCheck className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="size-8 text-destructive">
                        <UserX className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
