import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TrendingUp, TrendingDown, CreditCard, Wallet, Building2 } from "lucide-react";

const accounts = [
  {
    id: 1,
    name: "Main Business Account",
    type: "Checking",
    bank: "Chase Bank",
    balance: 124567.89,
    change: 5.2,
    accountNumber: "****4521",
    icon: Building2,
  },
  {
    id: 2,
    name: "Savings Account",
    type: "Savings",
    bank: "Chase Bank",
    balance: 89234.56,
    change: 2.1,
    accountNumber: "****7892",
    icon: Wallet,
  },
  {
    id: 3,
    name: "Business Credit Card",
    type: "Credit Card",
    bank: "American Express",
    balance: -4567.89,
    change: -12.3,
    accountNumber: "****3456",
    icon: CreditCard,
  },
  {
    id: 4,
    name: "Investment Portfolio",
    type: "Investment",
    bank: "Fidelity",
    balance: 234567.12,
    change: 8.7,
    accountNumber: "****9012",
    icon: TrendingUp,
  },
  {
    id: 5,
    name: "Payroll Account",
    type: "Checking",
    bank: "Bank of America",
    balance: 45678.90,
    change: -3.4,
    accountNumber: "****6789",
    icon: Building2,
  },
];

export function AccountsView() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Assets</CardDescription>
            <CardTitle className="text-2xl tabular-nums">$494,377.57</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-emerald-600 text-sm">
              <TrendingUp className="size-3" />
              +4.8% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Liabilities</CardDescription>
            <CardTitle className="text-2xl tabular-nums">$4,567.89</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-emerald-600 text-sm">
              <TrendingDown className="size-3" />
              -12.3% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Net Worth</CardDescription>
            <CardTitle className="text-2xl tabular-nums">$489,809.68</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-emerald-600 text-sm">
              <TrendingUp className="size-3" />
              +5.1% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Accounts</CardTitle>
          <CardDescription>Your connected bank accounts and cards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {accounts.map((account) => {
              const Icon = account.icon;
              return (
                <div
                  key={account.id}
                  className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="size-10">
                      <AvatarFallback className="bg-muted">
                        <Icon className="size-5 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{account.name}</div>
                      <div className="text-muted-foreground text-sm">
                        {account.bank} · {account.accountNumber}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium tabular-nums">
                      {account.balance < 0 ? "-" : ""}${Math.abs(account.balance).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </div>
                    <div
                      className={`text-sm ${account.change >= 0 ? "text-emerald-600" : "text-red-600"}`}
                    >
                      {account.change >= 0 ? "+" : ""}{account.change}% this month
                    </div>
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
