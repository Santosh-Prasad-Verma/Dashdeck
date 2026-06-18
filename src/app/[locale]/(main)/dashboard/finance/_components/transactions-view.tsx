"use client";

import { useMemo, useState } from "react";

import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Transaction {
  id: string;
  date: string;
  description: string;
  detail: string;
  account: string;
  accountLogo: string;
  accountDetail: string;
  category: string;
  amount: number;
  status: "Posted" | "Pending";
}

export function TransactionsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [accountFilter, setAccountFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const transactions: Transaction[] = [
    {
      id: "tx-1",
      date: "May 18, 6:12 PM",
      description: "Tesco Express · Camden",
      detail: "POS-8821",
      account: "Revolut Premium",
      accountLogo: "R",
      accountDetail: "**** 4182",
      category: "Groceries",
      amount: -42.15,
      status: "Posted",
    },
    {
      id: "tx-2",
      date: "May 18, 5:48 PM",
      description: "Pret a Manger",
      detail: "POS-8804",
      account: "Revolut Premium",
      accountLogo: "R",
      accountDetail: "**** 4182",
      category: "Dining",
      amount: -6.95,
      status: "Posted",
    },
    {
      id: "tx-3",
      date: "May 18, 8:48 AM",
      description: "Spot buy · BTC",
      detail: "EX-BNC-4421",
      account: "Bitcoin",
      accountLogo: "₿",
      accountDetail: "Binance",
      category: "Crypto",
      amount: -1500.0,
      status: "Posted",
    },
    {
      id: "tx-4",
      date: "May 18, 5:04 AM",
      description: "Uber · Trip to Soho",
      detail: "POS-8771",
      account: "Revolut Premium",
      accountLogo: "R",
      accountDetail: "**** 4182",
      category: "Travel",
      amount: -18.4,
      status: "Posted",
    },
    {
      id: "tx-5",
      date: "May 18, 12:18 AM",
      description: "Sainsbury's",
      detail: "POS-8762",
      account: "Barclays Bank",
      accountLogo: "B",
      accountDetail: "**** 9912",
      category: "Groceries",
      amount: -68.22,
      status: "Posted",
    },
    {
      id: "tx-6",
      date: "May 17, 7:02 PM",
      description: "Transfer to savings",
      detail: "TRF-9001",
      account: "Revolut Savings",
      accountLogo: "R",
      accountDetail: "High-yield · 4.50% APY",
      category: "Transfers",
      amount: 500.0,
      status: "Posted",
    },
    {
      id: "tx-7",
      date: "May 17, 7:02 PM",
      description: "Transfer to savings",
      detail: "TRF-9001",
      account: "Revolut Premium",
      accountLogo: "R",
      accountDetail: "**** 4182",
      category: "Transfers",
      amount: -500.0,
      status: "Posted",
    },
    {
      id: "tx-8",
      date: "May 17, 4:31 AM",
      description: "Pending - Apple Pay",
      detail: "POS-8748",
      account: "Revolut Premium",
      accountLogo: "R",
      accountDetail: "**** 4182",
      category: "Subscriptions",
      amount: -2.99,
      status: "Pending",
    },
    {
      id: "tx-9",
      date: "May 16, 7:00 PM",
      description: "Standing order · Rent",
      detail: "STO-1185",
      account: "HSBC Bank",
      accountLogo: "H",
      accountDetail: "**** 1004",
      category: "Rent",
      amount: -1180.0,
      status: "Posted",
    },
    {
      id: "tx-10",
      date: "May 16, 5:24 PM",
      description: "Spotify Family",
      detail: "SUB-SP-44",
      account: "Revolut Premium",
      accountLogo: "R",
      accountDetail: "**** 4182",
      category: "Subscriptions",
      amount: -17.99,
      status: "Posted",
    },
  ];

  // Filtering Logic
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.detail.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesAccount = accountFilter === "all" || tx.account === accountFilter;
      const matchesCategory = categoryFilter === "all" || tx.category === categoryFilter;

      let matchesType = true;
      if (typeFilter === "income") matchesType = tx.amount > 0;
      else if (typeFilter === "expense") matchesType = tx.amount < 0;

      return matchesSearch && matchesAccount && matchesCategory && matchesType;
    });
  }, [searchQuery, accountFilter, categoryFilter, typeFilter]);

  // Bulk Selection Logic
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredTransactions.map((tx) => tx.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="bg-card/50 backdrop-blur-xs">
          <CardContent className="p-5 flex flex-col gap-1">
            <p className="text-muted-foreground text-xs font-medium tracking-wide">Inflow this month</p>
            <p className="text-3xl font-bold tracking-tight text-emerald-500">$8,744</p>
            <p className="text-muted-foreground text-[11px]">12 credits</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xs">
          <CardContent className="p-5 flex flex-col gap-1">
            <p className="text-muted-foreground text-xs font-medium tracking-wide">Outflow this month</p>
            <p className="text-3xl font-bold tracking-tight">-$6,628</p>
            <p className="text-muted-foreground text-[11px]">38 debits</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xs">
          <CardContent className="p-5 flex flex-col gap-1">
            <p className="text-muted-foreground text-xs font-medium tracking-wide">Net this month</p>
            <p className="text-3xl font-bold tracking-tight text-emerald-500">+$2,116</p>
            <p className="text-muted-foreground text-[11px]">50 transactions to date</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Transactions List */}
      <Card className="bg-card/30 backdrop-blur-xs">
        <CardHeader className="pb-3 border-b">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Transactions</CardTitle>
              <CardDescription className="text-xs">Every credit and debit across your linked accounts.</CardDescription>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-48">
                <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  className="h-9 pl-8 bg-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Account Filter */}
              <Select value={accountFilter} onValueChange={setAccountFilter}>
                <SelectTrigger className="w-32 h-9 bg-transparent text-xs">
                  <SelectValue placeholder="Account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Accounts</SelectItem>
                  <SelectItem value="Revolut Premium">Revolut Premium</SelectItem>
                  <SelectItem value="Barclays Bank">Barclays Bank</SelectItem>
                  <SelectItem value="HSBC Bank">HSBC Bank</SelectItem>
                  <SelectItem value="Bitcoin">Bitcoin</SelectItem>
                  <SelectItem value="Revolut Savings">Revolut Savings</SelectItem>
                </SelectContent>
              </Select>

              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-32 h-9 bg-transparent text-xs">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Groceries">Groceries</SelectItem>
                  <SelectItem value="Dining">Dining</SelectItem>
                  <SelectItem value="Crypto">Crypto</SelectItem>
                  <SelectItem value="Travel">Travel</SelectItem>
                  <SelectItem value="Transfers">Transfers</SelectItem>
                  <SelectItem value="Subscriptions">Subscriptions</SelectItem>
                  <SelectItem value="Rent">Rent</SelectItem>
                </SelectContent>
              </Select>

              {/* Type Filter */}
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-24 h-9 bg-transparent text-xs">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="income">Credits</SelectItem>
                  <SelectItem value="expense">Debits</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-12 px-6">
                    <Checkbox
                      checked={selectedIds.length === filteredTransactions.length && filteredTransactions.length > 0}
                      onCheckedChange={(checked) => handleSelectAll(!!checked)}
                    />
                  </TableHead>
                  <TableHead className="text-xs font-semibold tracking-wider text-muted-foreground px-4 py-3">
                    Date
                  </TableHead>
                  <TableHead className="text-xs font-semibold tracking-wider text-muted-foreground px-4 py-3">
                    Description
                  </TableHead>
                  <TableHead className="text-xs font-semibold tracking-wider text-muted-foreground px-4 py-3">
                    Account
                  </TableHead>
                  <TableHead className="text-xs font-semibold tracking-wider text-muted-foreground px-4 py-3">
                    Category
                  </TableHead>
                  <TableHead className="text-xs font-semibold tracking-wider text-muted-foreground px-4 py-3 text-right">
                    Amount
                  </TableHead>
                  <TableHead className="text-xs font-semibold tracking-wider text-muted-foreground px-4 py-3">
                    Status
                  </TableHead>
                  <TableHead className="w-10 px-6" />
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y">
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground text-sm">
                      No transactions found matching the filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((tx) => (
                    <TableRow key={tx.id} className="hover:bg-muted/10 group">
                      <TableCell className="px-6">
                        <Checkbox
                          checked={selectedIds.includes(tx.id)}
                          onCheckedChange={(checked) => handleSelectRow(tx.id, !!checked)}
                        />
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap px-4 py-4">
                        {tx.date}
                      </TableCell>
                      <TableCell className="px-4 py-4">
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-sm text-foreground">{tx.description}</span>
                          <span className="text-[10px] text-muted-foreground mt-0.5">{tx.detail}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex size-6 shrink-0 items-center justify-center rounded bg-neutral-800 text-white font-bold text-[10px]">
                            {tx.accountLogo}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-xs text-foreground">{tx.account}</span>
                            <span className="text-[9px] text-muted-foreground mt-0.5">{tx.accountDetail}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-4">
                        <Badge
                          variant="outline"
                          className="text-[9px] font-bold py-0.5 px-1.5 border-muted-foreground/25 text-muted-foreground bg-muted/20"
                        >
                          {tx.category}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={`px-4 py-4 text-right font-bold tabular-nums text-sm ${tx.amount > 0 ? "text-emerald-500" : "text-foreground"}`}
                      >
                        {tx.amount > 0 ? "+" : ""}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="px-4 py-4">
                        <Badge
                          className={`text-[10px] font-bold py-0 px-2 border-0 ${
                            tx.status === "Posted"
                              ? "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400"
                              : "bg-amber-500/10 text-amber-500 dark:text-amber-400"
                          }`}
                        >
                          {tx.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-6">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="text-xs">View details</DropdownMenuItem>
                            <DropdownMenuItem className="text-xs">Edit category</DropdownMenuItem>
                            <DropdownMenuItem className="text-xs text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination Row */}
      <div className="flex items-center justify-between px-2">
        <p className="text-xs text-muted-foreground">Showing 10 of 81 transactions</p>

        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1 border" disabled>
            <ChevronLeft className="size-3.5" />
            Previous
          </Button>

          <Button variant="outline" size="sm" className="h-8 w-8 text-xs p-0 border bg-muted text-foreground font-bold">
            1
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 text-xs p-0 border hover:bg-muted">
            2
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 text-xs p-0 border hover:bg-muted">
            3
          </Button>
          <span className="text-xs text-muted-foreground px-1">...</span>

          <Button variant="outline" size="sm" className="h-8 text-xs gap-1 border">
            Next
            <ChevronRight className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
