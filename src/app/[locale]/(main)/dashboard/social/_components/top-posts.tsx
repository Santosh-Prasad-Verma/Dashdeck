import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const posts = [
  {
    id: 1,
    platform: "Instagram",
    content: "Excited to launch our new AI-powered analytics...",
    likes: 4523,
    comments: 289,
    shares: 567,
    date: "2 hours ago",
    status: "published",
  },
  {
    id: 2,
    platform: "TikTok",
    content: "Behind the scenes of our latest product update 🚀",
    likes: 12450,
    comments: 892,
    shares: 2340,
    date: "5 hours ago",
    status: "published",
  },
  {
    id: 3,
    platform: "LinkedIn",
    content: "We're hiring! Join our engineering team...",
    likes: 1280,
    comments: 156,
    shares: 89,
    date: "1 day ago",
    status: "published",
  },
  {
    id: 4,
    platform: "X/Twitter",
    content: "Big announcement coming next week. Stay tuned! 👀",
    likes: 3200,
    comments: 445,
    shares: 1200,
    date: "1 day ago",
    status: "published",
  },
  {
    id: 5,
    platform: "Instagram",
    content: "Customer spotlight: How @acmecorp increased revenue by 200%",
    likes: 2800,
    comments: 198,
    shares: 340,
    date: "2 days ago",
    status: "published",
  },
  {
    id: 6,
    platform: "TikTok",
    content: "Quick tutorial: Building dashboards in 60 seconds ⚡",
    likes: 8900,
    comments: 623,
    shares: 1560,
    date: "2 days ago",
    status: "published",
  },
  {
    id: 7,
    platform: "LinkedIn",
    content: "Our founder shared insights on the future of AI at TechConf 2026",
    likes: 4500,
    comments: 312,
    shares: 198,
    date: "3 days ago",
    status: "published",
  },
];

function getPlatformBadge(platform: string) {
  switch (platform) {
    case "Instagram":
      return <Badge className="border-0 bg-pink-500/10 text-pink-600 dark:text-pink-400">Instagram</Badge>;
    case "TikTok":
      return <Badge className="border-0 bg-black/10 text-foreground dark:bg-white/10">TikTok</Badge>;
    case "LinkedIn":
      return <Badge className="border-0 bg-blue-500/10 text-blue-600 dark:text-blue-400">LinkedIn</Badge>;
    case "X/Twitter":
      return <Badge className="border-0 bg-sky-500/10 text-sky-600 dark:text-sky-400">Twitter</Badge>;
    default:
      return <Badge variant="secondary">{platform}</Badge>;
  }
}

export function TopPosts() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Top Posts</CardTitle>
        <CardDescription>Best performing content this week</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[400px]">
          <div className="flex flex-col gap-2 px-4 pb-4">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className="flex items-start gap-4 rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted font-bold text-muted-foreground text-sm">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    {getPlatformBadge(post.platform)}
                    <span className="text-muted-foreground text-xs">{post.date}</span>
                  </div>
                  <p className="line-clamp-2 text-sm">{post.content}</p>
                  <div className="mt-2 flex items-center gap-4 text-muted-foreground text-xs">
                    <span>❤️ {post.likes.toLocaleString()}</span>
                    <span>💬 {post.comments.toLocaleString()}</span>
                    <span>🔄 {post.shares.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
