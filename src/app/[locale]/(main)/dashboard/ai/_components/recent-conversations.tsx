import { Bot, Clock, User } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const conversations = [
  {
    id: 1,
    model: "Claude 3.5",
    prompt: "Explain quantum computing in simple terms",
    tokens: 1247,
    cost: "$0.008",
    time: "2 min ago",
    status: "success",
  },
  {
    id: 2,
    model: "GPT-4o",
    prompt: "Write a Python function for binary search",
    tokens: 892,
    cost: "$0.012",
    time: "5 min ago",
    status: "success",
  },
  {
    id: 3,
    model: "Gemini Pro",
    prompt: "Summarize this research paper on climate change",
    tokens: 3421,
    cost: "$0.006",
    time: "12 min ago",
    status: "success",
  },
  {
    id: 4,
    model: "Claude 3.5",
    prompt: "Debug this React component that won't render",
    tokens: 2156,
    cost: "$0.014",
    time: "18 min ago",
    status: "success",
  },
  {
    id: 5,
    model: "Llama 3.1",
    prompt: "Translate this text to Spanish",
    tokens: 567,
    cost: "$0.001",
    time: "25 min ago",
    status: "success",
  },
  {
    id: 6,
    model: "GPT-4o",
    prompt: "Generate unit tests for authentication module",
    tokens: 4523,
    cost: "$0.018",
    time: "32 min ago",
    status: "success",
  },
  {
    id: 7,
    model: "Claude 3.5",
    prompt: "Review this code for security vulnerabilities",
    tokens: 1892,
    cost: "$0.012",
    time: "45 min ago",
    status: "success",
  },
];

function getModelColor(model: string) {
  switch (model) {
    case "Claude 3.5":
      return "bg-violet-500/10 text-violet-600 dark:text-violet-400";
    case "GPT-4o":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    case "Gemini Pro":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
    case "Llama 3.1":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function getModelIcon(model: string) {
  return model === "Llama 3.1" ? User : Bot;
}

export function RecentConversations() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Recent Conversations</CardTitle>
        <CardDescription>Latest API calls across all models</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ScrollArea className="h-[360px]">
          <div className="flex flex-col gap-3">
            {conversations.map((conv) => {
              const ModelIcon = getModelIcon(conv.model);
              return (
                <div
                  key={conv.id}
                  className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <Avatar className="size-8 shrink-0">
                    <AvatarFallback className={getModelColor(conv.model)}>
                      <ModelIcon className="size-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <Badge variant="secondary" className={getModelColor(conv.model)}>
                        {conv.model}
                      </Badge>
                      <span className="flex items-center gap-1 text-muted-foreground text-xs">
                        <Clock className="size-3" />
                        {conv.time}
                      </span>
                    </div>
                    <p className="truncate text-sm">{conv.prompt}</p>
                    <div className="mt-1 flex items-center gap-3 text-muted-foreground text-xs">
                      <span>{conv.tokens.toLocaleString()} tokens</span>
                      <span>{conv.cost}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
