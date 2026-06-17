"use client";

import { useState } from "react";

import { ArrowDownLeft, ArrowUpRight, Search, Filter } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Transaction {
  id: number;
  description: string;
  category: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  type: "income" | "expense";
}

const transactions: Transaction[] = [
  { id: 1, description: "Stripe Payment", category: "Revenue", amount: 4500.00, date: "Today, 2:30 PM", status: "completed", type: "income" },
  { id: 2, description: "AWS Hosting", category: "Infrastructure", amount: -234.56, date: "Today, 11:00 AM", status: "completed", type: "expense" },
  { id: 3, description: "Client Invoice #1024", category: "Revenue", amount: 8750.00, date: "Yesterday", status: "completed", type: "income" },
  { id: 4, description: "Slack Subscription", category: "Software", amount: -125.00, date: "Yesterday", status: "completed", type: "expense" },
  { id: 5, description: "GitHub Pro", category: "Software", amount: -21.00, date: "2 days ago", status: "completed", type: "expense" },
  { id: 6, description: "Figma Team Plan", category: "Software", amount: -75.00, date: "2 days ago", status: "completed", type: "expense" },
  { id: 7, description: "Payroll - Engineering", category: "Payroll", amount: -15000.00, date: "3 days ago", status: "completed", type: "expense" },
  { id: 8, description: "Client Payment", category: "Revenue", amount: 12500.00, date: "3 days ago", status: "completed", type: "income" },
  { id: 9, description: "Google Workspace", category: "Software", amount: -48.00, date: "4 days ago", status: "completed", type: "expense" },
  { id: 10, description: "Notion Subscription", category: "Software", amount: -96.00, date: "5 days ago", status: "pending", type: "expense" },
];

export function TransactionsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || t.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Income (This Month)</CardDescription>
            <CardTitle className="text-2xl tabular-nums text-emerald-600">$25,750.00</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-emerald-600 text-sm">
              <ArrowDownLeft className="size-3" />
              +18% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Expenses (This Month)</CardDescription>
            <CardTitle className="text-2xl tabular-nums text-red-600">$15,599.56</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-red-600 text-sm">
              <ArrowUpRight className="size-3" />
              +5% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Net Cash Flow</CardDescription>
            <CardTitle className="text-2xl tabular-nums text-emerald-600">$10,150.44</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-emerald-600 text-sm">
              <ArrowDownLeft className="size-3" />
              +32% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>All your recent transactions</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  className="h-8 w-48 pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger size="sm" className="w-32">
                  <Filter className="size-3" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="software">Software</SelectItem>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="payroll">Payroll</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button size="sm" variant="outline">
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="flex flex-col gap-2">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex size-9 items-center justify-center rounded-full ${
                        transaction.type === "income"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-red-500/10 text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <ArrowDownLeft className="size-4" />
                      ) : (
                        <ArrowUpRight className="size-4" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{transaction.description}</div>
                      <div className="text-muted-foreground text-xs">{transaction.category} · {transaction.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={transaction.status === "completed" ? "default" : transaction.status === "pending" ? "secondary" : "destructive"}
                      className="text-xs"
                    >
                      {transaction.status}
                    </Badge>
                    <div
                      className={`font-medium tabular-nums text-sm ${
                        transaction.amount >= 0 ? "text-emerald-600" : "text-foreground"
                      }`}
                    >
                      {transaction.amount >= 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
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
