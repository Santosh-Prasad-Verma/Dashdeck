"use client";

import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronRight,
  FileText,
  Globe,
  Lock,
  Plus,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Wallet as WalletIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AccountItem {
  id: string;
  name: string;
  type: string;
  subtype: string;
  changeText: string;
  changeType: "up" | "down" | "flat";
  balance: number;
  sparklinePoints: number[];
  logoText: string;
}

interface AccountGroup {
  categoryName: string;
  categoryTotal: number;
  items: AccountItem[];
}

export function AccountsView() {
  const accountGroups: AccountGroup[] = [
    {
      categoryName: "BANK",
      categoryTotal: 17101,
      items: [
        {
          id: "revolut-prem",
          name: "Revolut Premium",
          type: "BANK",
          subtype: "**** 4182",
          changeText: "+$240 this month",
          changeType: "up",
          balance: 12451,
          sparklinePoints: [30, 32, 28, 35, 34, 42, 45],
          logoText: "R",
        },
        {
          id: "hsbc-bank",
          name: "HSBC Bank",
          type: "BANK",
          subtype: "**** 1004",
          changeText: "-$180 this month",
          changeType: "down",
          balance: 3200,
          sparklinePoints: [40, 38, 32, 35, 28, 25, 20],
          logoText: "H",
        },
        {
          id: "barclays-bank",
          name: "Barclays Bank",
          type: "BANK",
          subtype: "**** 9912",
          changeText: "+$45 this month",
          changeType: "up",
          balance: 1450,
          sparklinePoints: [15, 16, 14, 18, 17, 18, 19],
          logoText: "B",
        },
      ],
    },
    {
      categoryName: "SAVINGS",
      categoryTotal: 48320,
      items: [
        {
          id: "revolut-sav",
          name: "Revolut Savings",
          type: "SAVINGS",
          subtype: "High-yield · 4.50% APY",
          changeText: "+$1,200 this month",
          changeType: "up",
          balance: 28400,
          sparklinePoints: [10, 15, 20, 25, 30, 35, 40],
          logoText: "R",
        },
        {
          id: "barclays-isa",
          name: "Barclays ISA",
          type: "SAVINGS",
          subtype: "Tax-free savings",
          changeText: "+$320 this month",
          changeType: "up",
          balance: 19920,
          sparklinePoints: [25, 26, 28, 30, 32, 33, 35],
          logoText: "B",
        },
      ],
    },
    {
      categoryName: "INVESTMENT",
      categoryTotal: 36780,
      items: [
        {
          id: "brokerage",
          name: "Brokerage Account",
          type: "INVESTMENT",
          subtype: "Index portfolio · 78% equities",
          changeText: "+$2,140 this month",
          changeType: "up",
          balance: 36780,
          sparklinePoints: [28, 26, 32, 30, 38, 34, 45],
          logoText: "B",
        },
      ],
    },
    {
      categoryName: "CRYPTO",
      categoryTotal: 36570,
      items: [
        {
          id: "bitcoin",
          name: "Bitcoin",
          type: "CRYPTO",
          subtype: "0.42 BTC · Binance",
          changeText: "+$1,820 this month",
          changeType: "up",
          balance: 24150,
          sparklinePoints: [20, 35, 15, 40, 25, 48, 50],
          logoText: "₿",
        },
        {
          id: "ethereum",
          name: "Ethereum",
          type: "CRYPTO",
          subtype: "4.85 ETH · MetaMask",
          changeText: "-$310 this month",
          changeType: "down",
          balance: 12420,
          sparklinePoints: [45, 48, 42, 38, 35, 32, 30],
          logoText: "Ξ",
        },
      ],
    },
    {
      categoryName: "RESERVE",
      categoryTotal: 27256,
      items: [
        {
          id: "cold-vault",
          name: "Cold Storage Vault",
          type: "RESERVE",
          subtype: "Ledger Nano X · Air-gapped",
          changeText: "Flat this month",
          changeType: "flat",
          balance: 27256,
          sparklinePoints: [30, 30, 30, 30, 30, 30, 30],
          logoText: "V",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Top Summary KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur-xs">
          <CardContent className="p-5 flex flex-col gap-1">
            <p className="text-muted-foreground text-xs font-medium tracking-wide">Total balance</p>
            <p className="text-3xl font-bold tracking-tight">$166,027</p>
            <p className="text-muted-foreground text-[11px]">Across 9 linked accounts</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xs">
          <CardContent className="p-5 flex flex-col gap-1">
            <p className="text-muted-foreground text-xs font-medium tracking-wide">Accounts</p>
            <p className="text-3xl font-bold tracking-tight">9</p>
            <p className="text-muted-foreground text-[11px] truncate">
              3 bank · 2 savings · 1 investment · 2 crypto · 1 reserve
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xs">
          <CardContent className="p-5 flex flex-col gap-1">
            <p className="text-muted-foreground text-xs font-medium tracking-wide">Largest account</p>
            <p className="text-3xl font-bold tracking-tight">$36,780</p>
            <p className="text-muted-foreground text-[11px]">Brokerage Account · 22% of total</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xs relative overflow-hidden">
          <CardContent className="p-5 flex flex-col gap-1">
            <p className="text-muted-foreground text-xs font-medium tracking-wide">30-day net flow</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-emerald-500">+$5,275</span>
            </div>
            <p className="text-muted-foreground text-[11px] truncate">Inflows minus outflows across all accounts</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Accounts Breakdown Panel */}
      <Card className="bg-card/30 backdrop-blur-xs">
        <CardHeader className="pb-3 border-b">
          <CardTitle className="text-lg font-semibold">All accounts</CardTitle>
          <CardDescription className="text-xs">Tap a row to see its transactions.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col">
            {accountGroups.map((group, groupIdx) => (
              <div key={group.categoryName} className="flex flex-col">
                {/* Category Header Row */}
                <div className="flex justify-between items-center bg-muted/20 px-6 py-2.5 text-[11px] font-semibold tracking-wider text-muted-foreground border-b">
                  <span>{group.categoryName}</span>
                  <span className="tabular-nums font-bold text-foreground/80">
                    ${group.categoryTotal.toLocaleString()}
                  </span>
                </div>

                {/* Account Rows */}
                <div className="flex flex-col divide-y">
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between px-6 py-4 transition-all hover:bg-muted/30 cursor-pointer"
                    >
                      {/* Left Block: Logo + Name & Change text */}
                      <div className="flex items-center gap-4 flex-1 min-w-0 max-w-[280px]">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-neutral-800 border border-neutral-700 text-white font-bold text-sm">
                          {item.logoText}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm truncate">{item.name}</span>
                            <Badge
                              variant="outline"
                              className="text-[9px] font-bold py-0 px-1 border-muted-foreground/30 text-muted-foreground bg-muted/40"
                            >
                              {item.type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                            <span>{item.subtype}</span>
                            <span>·</span>
                            <span
                              className={
                                item.changeType === "up"
                                  ? "text-emerald-500 font-medium"
                                  : item.changeType === "down"
                                    ? "text-red-500 font-medium"
                                    : "text-muted-foreground"
                              }
                            >
                              {item.changeText}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Middle Block: Custom Sparkline */}
                      <div className="hidden md:block w-36 h-8 shrink-0">
                        <svg className="w-full h-full" viewBox="0 0 140 40" preserveAspectRatio="none">
                          <path
                            d={item.sparklinePoints.reduce((path, pt, i) => {
                              const x = (i / (item.sparklinePoints.length - 1)) * 140;
                              const y = 35 - pt; // scale 0-40
                              return path + `${i === 0 ? "M" : "L"} ${x},${y}`;
                            }, "")}
                            fill="none"
                            stroke={
                              item.changeType === "up"
                                ? "rgba(16, 185, 129, 0.7)"
                                : item.changeType === "down"
                                  ? "rgba(239, 68, 68, 0.7)"
                                  : "rgba(156, 163, 175, 0.5)"
                            }
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      {/* Right Block: Balance & Action icon */}
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="font-bold text-sm tabular-nums">${item.balance.toLocaleString()}</span>
                        </div>
                        <ChevronRight className="size-4 text-muted-foreground/40 shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grid of bottom widgets */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Widget 1: Allocation by type */}
        <Card className="bg-card/30 backdrop-blur-xs flex flex-col justify-between">
          <CardHeader className="pb-3 border-b">
            <CardTitle className="text-base font-semibold">Allocation by type</CardTitle>
            <div className="flex flex-col mt-2">
              <span className="text-2xl font-bold tracking-tight">$166,027</span>
              <span className="text-muted-foreground text-[10px] uppercase font-semibold mt-0.5">Total</span>
            </div>
          </CardHeader>
          <CardContent className="p-6 flex flex-col gap-6">
            {/* Segmented bar graph */}
            <div className="flex h-3 w-full rounded-full overflow-hidden bg-muted/50 border border-muted">
              <div className="bg-neutral-100 dark:bg-white" style={{ width: "10%" }} title="Bank (10%)" />
              <div className="bg-neutral-400" style={{ width: "29%" }} title="Savings (29%)" />
              <div className="bg-neutral-600" style={{ width: "22%" }} title="Investment (22%)" />
              <div className="bg-neutral-700" style={{ width: "22%" }} title="Crypto (22%)" />
              <div className="bg-neutral-800" style={{ width: "17%" }} title="Reserve (17%)" />
            </div>

            {/* Allocation Details */}
            <div className="flex flex-col gap-2">
              {[
                { name: "Bank", amount: 17101, percent: "10%", colorClass: "bg-neutral-100 dark:bg-white" },
                { name: "Savings", amount: 48320, percent: "29%", colorClass: "bg-neutral-400" },
                { name: "Investment", amount: 36780, percent: "22%", colorClass: "bg-neutral-600" },
                { name: "Crypto", amount: 36570, percent: "22%", colorClass: "bg-neutral-700" },
                { name: "Reserve", amount: 27256, percent: "17%", colorClass: "bg-neutral-800" },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className={`size-2.5 rounded-full ${item.colorClass}`} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold tabular-nums">${item.amount.toLocaleString()}</span>
                    <span className="text-muted-foreground text-[10px] w-8 text-right font-medium">{item.percent}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <div className="px-6 py-3 border-t bg-muted/10 text-muted-foreground text-[10px] font-medium">
            Liquid 39% · Locked 61%
          </div>
        </Card>

        {/* Widget 2: Recent activity */}
        <Card className="bg-card/30 backdrop-blur-xs flex flex-col justify-between">
          <CardHeader className="pb-3 border-b">
            <CardTitle className="text-base font-semibold">Recent activity</CardTitle>
            <CardDescription className="text-xs">Latest transactions across all accounts</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              {[
                {
                  name: "Tesco Express",
                  amount: -42.15,
                  account: "Revolut Premium",
                  time: "Today · 18:12",
                  type: "debit",
                },
                {
                  name: "Apple Pay top-up",
                  amount: 250.0,
                  account: "Revolut Premium",
                  time: "Yesterday · 09:11",
                  type: "credit",
                },
                {
                  name: "Standing order - Rent",
                  amount: -1180.0,
                  account: "HSBC Bank",
                  time: "May 16 · 09:00",
                  type: "debit",
                },
                { name: "Spot buy - BTC", amount: -1500.0, account: "Bitcoin", time: "May 15 · 22:48", type: "debit" },
                {
                  name: "Dividend - VWRL",
                  amount: 86.4,
                  account: "Brokerage Account",
                  time: "May 14 · 16:00",
                  type: "credit",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex size-8 shrink-0 items-center justify-center rounded-lg bg-neutral-800 text-white font-bold text-xs`}
                    >
                      {item.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-muted-foreground text-[10px] mt-0.5">
                        {item.account} · {item.time}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-semibold tabular-nums text-sm ${item.amount < 0 ? "text-foreground" : "text-emerald-500"}`}
                  >
                    {item.amount < 0 ? "-" : "+"}$
                    {Math.abs(item.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Widget 3: Upcoming inflows */}
        <Card className="bg-card/30 backdrop-blur-xs flex flex-col justify-between">
          <CardHeader className="pb-3 border-b">
            <CardTitle className="text-base font-semibold">Upcoming inflows</CardTitle>
            <div className="flex flex-col mt-2">
              <span className="text-2xl font-bold tracking-tight">$6,058</span>
              <span className="text-muted-foreground text-[10px] uppercase font-semibold mt-0.5">
                3 deposits expected this cycle
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 text-emerald-500 text-xs">
              <TrendingUp className="size-4 shrink-0" />
              <span>Net positive cash flow forecast</span>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { name: "Acme Corp - Salary", amount: 4560, date: "May 25", account: "HSBC Bank", logo: "A" },
                {
                  name: "Upwork - Project payout",
                  amount: 1412,
                  date: "May 28",
                  account: "Revolut Premium",
                  logo: "U",
                },
                {
                  name: "VWRL - Quarterly dividend",
                  amount: 86,
                  date: "Jun 12",
                  account: "Brokerage Account",
                  logo: "V",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded bg-neutral-800 text-white font-bold text-xs">
                      {item.logo}
                    </div>
                    <div>
                      <p className="font-semibold text-xs">{item.name}</p>
                      <p className="text-muted-foreground text-[10px] mt-0.5">
                        {item.date} · {item.account}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-500 text-sm tabular-nums">
                    +${item.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Widget 4: Add an account */}
        <Card className="bg-card/30 backdrop-blur-xs flex flex-col justify-between">
          <CardHeader className="pb-3 border-b">
            <CardTitle className="text-base font-semibold">Add an account</CardTitle>
            <CardDescription className="text-xs">
              Link a new bank, custodial wallet, or manual ledger to see it across your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                className="flex flex-col items-center justify-center border rounded-lg p-3 hover:bg-muted/30 transition-all text-center gap-2 cursor-pointer group"
              >
                <Globe className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-[10px] font-semibold">Connect bank</span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center justify-center border rounded-lg p-3 hover:bg-muted/30 transition-all text-center gap-2 cursor-pointer group"
              >
                <WalletIcon className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-[10px] font-semibold">Crypto wallet</span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center justify-center border rounded-lg p-3 hover:bg-muted/30 transition-all text-center gap-2 cursor-pointer group"
              >
                <FileText className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-[10px] font-semibold">Manual account</span>
              </button>
            </div>

            <Button
              className="w-full gap-2 border h-10 bg-transparent hover:bg-muted text-foreground hover:text-foreground shadow-none mt-2"
              variant="outline"
            >
              <Plus className="size-4" />
              New account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
