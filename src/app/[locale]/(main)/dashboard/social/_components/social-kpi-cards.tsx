import { BarChart3, Heart, MessageCircle, Share2, TrendingDown, TrendingUp, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SocialKpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs sm:grid-cols-2 xl:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Users className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Total Followers</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">248.5K</div>
            <Badge>
              <TrendingUp className="size-3" />
              +8.2%
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Across all platforms</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Heart className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Engagement Rate</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">4.8%</div>
            <Badge>
              <TrendingUp className="size-3" />
              +0.6%
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Average across posts</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <BarChart3 className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Total Posts</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">1,284</div>
            <Badge variant="destructive">
              <TrendingDown className="size-3" />
              -3.1%
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Posted this month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Share2 className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Total Shares</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">42.3K</div>
            <Badge>
              <TrendingUp className="size-3" />
              +15.4%
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Viral reach this month</p>
        </CardContent>
      </Card>
    </div>
  );
}
