import { TrendingUp, Users } from "lucide-react";

import { AudienceDemographics } from "./_components/audience-demographics";
import { BestPostingTimes } from "./_components/best-posting-times";
import { CompetitorComparison } from "./_components/competitor-comparison";
import { FollowerGrowth } from "./_components/follower-growth";
import { PostingHeatmap } from "./_components/posting-heatmap";
import { SentimentGauge } from "./_components/sentiment-gauge";
import { TopPosts } from "./_components/top-posts";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Social Media Analytics</h1>
          <p className="text-muted-foreground text-sm">Track post performance, follower growth, and engagement.</p>
        </div>
      </div>

      {/* Clean Platform Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Instagram", followers: "84.5K", change: "+12.4%", up: true },
          { label: "TikTok", followers: "92K", change: "+24.1%", up: true },
          { label: "X/Twitter", followers: "38.4K", change: "+5.2%", up: true },
          { label: "LinkedIn", followers: "22.1K", change: "+18.3%", up: true },
        ].map((p) => (
          <div key={p.label} className="rounded-xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">{p.label}</p>
            <p className="mt-1 text-3xl font-bold tabular-nums">{p.followers}</p>
            <p className="mt-1 flex items-center gap-1 text-emerald-600 text-sm">
              <TrendingUp className="size-3" />
              {p.change}
            </p>
          </div>
        ))}
      </div>

      {/* Second Row: KPI Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Total Followers", value: "248.5K", sub: "Across all platforms" },
          { label: "Engagement Rate", value: "4.8%", sub: "Average per post" },
          { label: "Total Posts", value: "1,284", sub: "This month" },
          { label: "Total Shares", value: "42.3K", sub: "Viral reach" },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">{kpi.label}</p>
            <p className="mt-1 text-2xl font-bold tabular-nums">{kpi.value}</p>
            <p className="mt-0.5 text-muted-foreground text-xs">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Heatmap + Sentiment */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <PostingHeatmap />
        </div>
        <div className="xl:col-span-5">
          <SentimentGauge />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <FollowerGrowth />
        </div>
        <div className="xl:col-span-4">
          <BestPostingTimes />
        </div>
      </div>

      {/* Competitor + Demographics */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <CompetitorComparison />
        </div>
        <div className="xl:col-span-5">
          <AudienceDemographics />
        </div>
      </div>

      <TopPosts />
    </div>
  );
}
