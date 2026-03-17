"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface HeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function Header({ title, description, actions }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const today = format(new Date(), "EEEE, MMMM d");

  return (
    <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-border bg-background px-6">
      <div className="flex items-baseline gap-3">
        <h1 className="text-sm font-bold">{title}</h1>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className="hidden text-xs text-muted-foreground lg:block">{today}</span>
        {actions}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          <Sun className="size-3.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-3.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>
    </div>
  );
}
