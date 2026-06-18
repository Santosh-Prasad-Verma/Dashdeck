"use client";

import { format } from "date-fns/format";
import {
  Archive,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Forward,
  MailOpen,
  Paperclip,
  Pin,
  Reply,
  ReplyAll,
  Send,
  Smile,
  Star as StarIcon,
  Tag,
  Trash2,
  X,
} from "lucide-react";

import { SimpleIcon } from "@/components/simple-icon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import type { Mail } from "./data";
import { useMail } from "./use-mail";

interface MailDisplayProps {
  mail: Mail | null;
  onClose?: () => void;
}

export function MailView({ mail, onClose }: MailDisplayProps) {
  const [, setMail] = useMail();

  function handleClose() {
    setMail({ selected: null });
    onClose?.();
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 px-2 py-3">
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Close message" onClick={handleClose}>
                <X />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Close message</TooltipContent>
          </Tooltip>
          <Separator className="h-4 data-vertical:self-center" orientation="vertical" />
          <div className="flex items-center gap-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label="Previous message">
                  <ChevronLeft />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Previous message</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label="Next message">
                  <ChevronRight />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Next message</TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Pin thread">
                <Pin />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Pin thread</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Archive">
                <Archive />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Archive</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Reply">
                <Reply />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply</TooltipContent>
          </Tooltip>
          <Tooltip>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon-sm" aria-label="More actions">
                    <EllipsisVertical />
                  </Button>
                </TooltipTrigger>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <ReplyAll />
                    Reply all
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Forward />
                    Forward
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <MailOpen />
                    Mark as unread
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Tag />
                    Add label
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <TooltipContent>More actions</TooltipContent>
          </Tooltip>
          <Separator className="h-4 data-vertical:self-center" orientation="vertical" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Move to trash">
                <Trash2 className="text-destructive" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move to trash</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <Separator />

      <div className="flex min-h-0 flex-1 flex-col">
        {mail ? (
          <div className="flex min-h-0 flex-1 flex-col gap-3">
            <div className="space-y-1.5">
              <div className="font-medium leading-none">{mail.subject}</div>

              <div className="text-muted-foreground text-xs leading-none">
                {format(new Date(mail.receivedAt), "EEE, d MMM yyyy, h:mm a")}
              </div>
            </div>

            <Separator />

            <div className="flex gap-2">
              <Avatar className="size-9 after:rounded-sm">
                <AvatarFallback className="rounded-sm bg-background">{mail.from.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex h-full flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="text-xs">{mail.from.name}</div>
                  <Separator className="h-3 data-vertical:self-center" orientation="vertical" />
                  <div className="text-muted-foreground text-xs">{mail.from.email}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-muted-foreground text-xs">
                    To: <span className="text-foreground">{mail.to.map((recipient) => recipient.name).join(", ")}</span>
                  </div>

                  {mail.cc?.length ? (
                    <div className="text-muted-foreground text-xs">
                      Cc:{" "}
                      <span className="text-foreground">{mail.cc.map((recipient) => recipient.name).join(", ")}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <Separator />

            {mail.attachments?.length ? (
              <>
                <Collapsible defaultOpen>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "group p-0 font-normal text-muted-foreground",
                        "hover:bg-transparent hover:text-muted-foreground dark:hover:bg-transparent",
                        "data-[state=open]:bg-transparent data-[state=open]:text-muted-foreground",
                      )}
                    >
                      Attachments ({mail.attachments.length})
                      <ChevronDown className="group-data-[state=open]:rotate-180" />
                    </Button>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="flex flex-wrap gap-2">
                      {mail.attachments.map((attachment) => (
                        <Button size="xs" variant="secondary" key={attachment.id}>
                          <SimpleIcon icon={attachment.icon} className="size-3 fill-current" />
                          <span className="font-normal">{attachment.name}</span>
                          <span className="font-normal text-muted-foreground">{attachment.size}</span>
                        </Button>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Separator className="my-2" />
              </>
            ) : null}

            <div className="scrollbar-none min-h-0 flex-1 overflow-y-auto text-sm">
              <EmailBodyRenderer body={mail.body} />
            </div>

            <div className="mt-auto pt-4 border-t border-border/30">
              <div className="flex gap-2 items-end bg-zinc-50 dark:bg-zinc-900/50 border border-border/40 rounded-2xl p-2.5 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-lg text-muted-foreground hover:text-foreground shrink-0"
                >
                  <Reply className="size-4" />
                </Button>
                <textarea
                  className="flex-1 bg-transparent border-0 outline-none text-sm placeholder:text-muted-foreground/60 resize-none min-h-[40px] max-h-[160px] py-1 px-1 h-10 align-middle leading-relaxed w-full focus:ring-0"
                  placeholder={`Reply to ${mail.from.name}...`}
                />
                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-lg text-muted-foreground hover:text-foreground"
                  >
                    <Smile className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-lg text-muted-foreground hover:text-foreground"
                  >
                    <Paperclip className="size-4" />
                  </Button>
                  <Button
                    size="icon"
                    className="size-8 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white dark:bg-indigo-500 dark:hover:bg-indigo-400 shadow-sm shrink-0"
                  >
                    <Send className="size-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid h-full place-items-center text-muted-foreground text-sm">No email selected</div>
        )}
      </div>
    </div>
  );
}

function EmailBodyRenderer({ body }: { body: string }) {
  const blocks = body.split(/\n\n+/);

  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block, index) => {
        const trimmed = block.trim();

        // 1. Separators
        if (/^[━\s=\-_]{3,}$/.test(trimmed)) {
          return <Separator key={index} className="my-4 bg-border/80" />;
        }

        // 2. Section Labeled Divider
        if (/^[━\s=\-_]{3,}(.+?)[━\s=\-_]{3,}$/.test(trimmed)) {
          const match = trimmed.match(/^[━\s=\-_]{3,}(.+?)[━\s=\-_]{3,}$/);
          const title = match ? match[1].trim() : "";
          return (
            <div key={index} className="my-4 flex items-center gap-3">
              <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase whitespace-nowrap">
                {title}
              </span>
              <div className="h-[1px] flex-1 bg-border/50" />
            </div>
          );
        }

        // 3. Checklist / Survey
        if (trimmed.split("\n").some((line) => /^\[([ xX]?)\]/.test(line.trim()))) {
          const lines = trimmed.split("\n");
          return (
            <div key={index} className="flex flex-col gap-2 my-2 bg-muted/10 p-3 rounded-lg border border-border/40">
              {lines.map((line, lIdx) => {
                const match = line.match(/^\[([ xX]?)\]\s*(.+)$/);
                if (match) {
                  const checked = match[1].toLowerCase() === "x";
                  const text = match[2].trim();
                  return (
                    <div key={lIdx} className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex size-4 shrink-0 items-center justify-center rounded border border-border bg-background transition-colors",
                          checked && "bg-foreground text-background",
                        )}
                      >
                        {checked && <Check className="size-3 stroke-[3]" />}
                      </div>
                      <span className="text-sm font-normal text-muted-foreground">{text}</span>
                    </div>
                  );
                }
                return (
                  <p key={lIdx} className="text-sm text-muted-foreground leading-normal">
                    {line}
                  </p>
                );
              })}
            </div>
          );
        }

        // 4. Bullet lists, Ticks, Podium/Leaders
        if (
          trimmed.split("\n").some((line) => {
            const t = line.trim();
            return (
              t.startsWith("•") ||
              t.startsWith("✓") ||
              /^\d+\./.test(t) ||
              t.startsWith("🥇") ||
              t.startsWith("🥈") ||
              t.startsWith("🥉")
            );
          })
        ) {
          const lines = trimmed.split("\n");
          return (
            <div key={index} className="flex flex-col gap-2 my-2 pl-1">
              {lines.map((line, lIdx) => {
                const trimmedLine = line.trim();
                if (trimmedLine.startsWith("•")) {
                  const text = trimmedLine.replace(/^•\s*/, "");
                  return (
                    <div key={lIdx} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                      <div className="size-1.5 rounded-full bg-foreground/60 mt-2 shrink-0" />
                      <span>{text}</span>
                    </div>
                  );
                }
                if (trimmedLine.startsWith("✓")) {
                  const text = trimmedLine.replace(/^✓\s*/, "");
                  return (
                    <div key={lIdx} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                      <Check className="size-4 text-foreground/80 shrink-0 mt-0.5" />
                      <span>{text}</span>
                    </div>
                  );
                }
                const numMatch = trimmedLine.match(/^(\d+)\.\s*(.+)$/);
                if (numMatch) {
                  const num = numMatch[1];
                  const text = numMatch[2];
                  return (
                    <div key={lIdx} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="font-mono font-semibold text-foreground/70 shrink-0">{num}.</span>
                      <span>{text}</span>
                    </div>
                  );
                }
                if (trimmedLine.startsWith("🥇") || trimmedLine.startsWith("🥈") || trimmedLine.startsWith("🥉")) {
                  return (
                    <div key={lIdx} className="flex items-center gap-2 text-sm font-medium text-foreground py-0.5">
                      <span>{trimmedLine}</span>
                    </div>
                  );
                }
                return (
                  <p key={lIdx} className="text-sm text-muted-foreground leading-relaxed">
                    {line}
                  </p>
                );
              })}
            </div>
          );
        }

        // 5. Actions / Buttons
        const buttonsMatches = [...trimmed.matchAll(/\[(.*?)\]/g)].map((m) => m[1]);
        if (buttonsMatches.length > 0) {
          // Check for security-alert inline confirmations
          const lines = trimmed.split("\n");
          const hasSecurityConfirmations = lines.some((l) => l.includes("[Confirm]") || l.includes("[Lock Account]"));
          if (hasSecurityConfirmations) {
            return (
              <div
                key={index}
                className="flex flex-col gap-3 my-4 p-4 rounded-xl border border-border bg-muted/40 max-w-sm"
              >
                {lines.map((line, lIdx) => {
                  if (line.includes("[Confirm]")) {
                    const text = line.replace(/—\s*\[Confirm\]/, "").trim();
                    return (
                      <div key={lIdx} className="flex items-center justify-between gap-4">
                        <span className="text-sm font-medium text-foreground">{text}</span>
                        <Button
                          size="xs"
                          className="bg-zinc-950 hover:bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 font-medium"
                        >
                          Confirm
                        </Button>
                      </div>
                    );
                  }
                  if (line.includes("[Lock Account]")) {
                    const text = line.replace(/—\s*\[Lock Account\]/, "").trim();
                    return (
                      <div key={lIdx} className="flex items-center justify-between gap-4">
                        <span className="text-sm font-medium text-destructive">{text}</span>
                        <Button
                          size="xs"
                          variant="outline"
                          className="text-destructive hover:bg-destructive/10 border-destructive/20 hover:text-destructive"
                        >
                          Lock Account
                        </Button>
                      </div>
                    );
                  }
                  return (
                    <p key={lIdx} className="text-sm text-muted-foreground">
                      {line}
                    </p>
                  );
                })}
              </div>
            );
          }

          // Check if it's a list of links (e.g. [Upgrade Now] | [Watch Demo] | [Read Docs])
          if (trimmed.includes("|")) {
            return (
              <div key={index} className="flex flex-wrap items-center gap-3 my-4">
                {buttonsMatches.map((btnText, bIdx) => {
                  const isPrimary = bIdx === 0;
                  return (
                    <Button
                      key={bIdx}
                      variant={isPrimary ? "default" : "outline"}
                      className={cn(
                        isPrimary
                          ? "bg-zinc-950 hover:bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 font-medium"
                          : "font-medium",
                      )}
                      size="xs"
                    >
                      {btnText}
                    </Button>
                  );
                })}
              </div>
            );
          }

          // Single button (e.g. [Reset Password] — expires in 30 minutes)
          const singleMatch = trimmed.match(/^\[(.*?)\](?:\s*—\s*(.+))?$/);
          if (singleMatch) {
            const btnText = singleMatch[1];
            const subtext = singleMatch[2];
            return (
              <div key={index} className="flex flex-col items-start gap-2 my-4">
                <Button
                  className="bg-zinc-950 hover:bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 font-medium"
                  size="sm"
                >
                  {btnText}
                </Button>
                {subtext && <span className="text-xs text-muted-foreground">{subtext}</span>}
              </div>
            );
          }
        }

        // 6. Key-Value invoice / summary list
        const kvLines = trimmed.split("\n").filter((l) => l.trim() !== "");
        const parsedRows = kvLines.map((line) => {
          const gapMatch = line.match(/^(.+?)\s{3,}(.+)$/);
          if (gapMatch) {
            return { key: gapMatch[1].trim(), value: gapMatch[2].trim() };
          }
          const colonMatch = line.match(/^([^:]+):\s*(.+)$/);
          if (colonMatch) {
            return { key: colonMatch[1].trim(), value: colonMatch[2].trim() };
          }
          return null;
        });
        const validRowsCount = parsedRows.filter((r) => r !== null).length;
        if (validRowsCount > 0 && validRowsCount >= kvLines.length * 0.6) {
          return (
            <div key={index} className="my-4 rounded-xl border border-border bg-muted/10 p-4 font-normal">
              <div className="flex flex-col gap-2">
                {parsedRows.map((row, rIdx) => {
                  if (!row) {
                    return (
                      <div key={rIdx} className="text-sm text-muted-foreground leading-normal">
                        {kvLines[rIdx]}
                      </div>
                    );
                  }
                  const isTotal = row.key.toLowerCase().includes("total") || row.key.toLowerCase() === "amount";
                  return (
                    <div
                      key={rIdx}
                      className={cn(
                        "flex justify-between items-center text-sm py-1 border-b border-border/40 last:border-0 last:pb-0 pb-1",
                        isTotal && "font-semibold text-foreground border-t border-border/80 pt-2 mt-1",
                      )}
                    >
                      <span className={cn(isTotal ? "text-foreground" : "text-muted-foreground")}>{row.key}</span>
                      <span
                        className={cn("font-mono", isTotal ? "text-base text-foreground font-bold" : "text-foreground")}
                      >
                        {row.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        // 7. Star ratings (e.g. ⭐⭐⭐⭐⭐)
        if (/^[⭐\s]+$/.test(trimmed)) {
          const starCount = (trimmed.match(/⭐/g) || []).length;
          return (
            <div key={index} className="flex items-center gap-1 my-2">
              {[...Array(starCount)].map((_, i) => (
                <StarIcon key={i} className="size-4 fill-foreground text-foreground" />
              ))}
            </div>
          );
        }

        // 8. Default block
        const pLines = trimmed.split("\n");
        return (
          <div key={index} className="my-2 flex flex-col gap-2">
            {pLines.map((line, lIdx) => (
              <p key={lIdx} className="text-muted-foreground leading-relaxed text-sm font-normal">
                {line}
              </p>
            ))}
          </div>
        );
      })}
    </div>
  );
}
