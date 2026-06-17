import { differenceInDays } from "date-fns/differenceInDays";
import { format } from "date-fns/format";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import type { Mail } from "./data";
import { useMail } from "./use-mail";

type MailGroup = {
  id: string;
  title: string;
  items: Mail[];
};

interface MailListProps {
  groups: MailGroup[];
  onSelectMail?: (mail: Mail) => void;
}

export function MailList({ groups, onSelectMail }: MailListProps) {
  const [mail, setMail] = useMail();

  return (
    <ScrollArea className="min-h-0 flex-1">
      <div className="flex flex-col gap-1.5 pt-0">
        {groups.map((group) => (
          <section key={group.id} className="flex flex-col gap-1">
            <div className="mx-4 my-2 text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
              {group.title} ({group.items.length})
            </div>

            <div className="flex flex-col">
              {group.items.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={cn(
                    "group relative w-full border-b border-border/30 px-4 py-3.5 text-left transition-all duration-200",
                    "hover:bg-zinc-50/60 dark:hover:bg-zinc-900/40",
                    mail.selected === item.id
                      ? "bg-zinc-100/70 dark:bg-zinc-900/80 border-border/80 before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-indigo-500 shadow-2xs"
                      : "bg-transparent",
                  )}
                  onClick={(event) => {
                    event.currentTarget.blur();

                    setMail({
                      ...mail,
                      selected: item.id,
                    });
                    onSelectMail?.(item);
                  }}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="size-9 after:rounded-sm">
                      <AvatarFallback className="rounded-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-350 text-xs font-semibold">{item.from.name[0]}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div
                            className={cn(
                              "flex items-center gap-1.5 truncate font-normal text-sm text-zinc-700 dark:text-zinc-300",
                              !item.isRead && "font-bold text-zinc-950 dark:text-zinc-50",
                            )}
                          >
                            {item.from.name} {!item.isRead && <span className="size-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 shrink-0" />}
                          </div>
                          <div
                            className={cn(
                              "truncate font-semibold text-zinc-800 dark:text-zinc-150 text-xs mt-0.5",
                              item.isRead && "font-medium text-muted-foreground",
                            )}
                          >
                            {item.subject}
                          </div>
                        </div>

                        <div
                          className={cn(
                            "shrink-0 text-muted-foreground text-[10px] font-semibold",
                            mail.selected === item.id && "text-zinc-900 dark:text-zinc-100",
                          )}
                        >
                          {formatMailDate(item.receivedAt)}
                        </div>
                      </div>

                      <p className="line-clamp-2 text-muted-foreground text-xs leading-relaxed mt-1.5">{item.body}</p>
                      
                      {item.labels?.length ? (
                        <div className="flex flex-wrap gap-1.5 pt-1.5">
                          {item.labels.map((label) => (
                            <Badge
                              key={label}
                              variant="outline"
                              className="font-bold text-[8px] uppercase tracking-wider px-1.5 py-0 rounded-md bg-zinc-100/50 dark:bg-zinc-800/40 text-muted-foreground border-border/30"
                            >
                              {label}
                            </Badge>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </ScrollArea>
  );
}

function formatMailDate(date: string) {
  const mailDate = new Date(date);

  if (differenceInDays(new Date(), mailDate) <= 3) {
    return formatDistanceToNow(mailDate, { addSuffix: true });
  }

  return format(mailDate, "d MMM yyyy");
}
