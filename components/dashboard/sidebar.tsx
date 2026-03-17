"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Settings, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { businessConfig } from "@/lib/business-config";

const navItems = [
  { label: "Appointments", href: "/dashboard", icon: CalendarDays },
  { label: "Settings",     href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-60 flex-col border-r border-border bg-background">
      {/* Brand */}
      <div className="flex h-[60px] shrink-0 items-center gap-3 border-b border-border px-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary shadow-sm shadow-primary/30">
          <Phone className="size-4 text-primary-foreground" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-bold tracking-tight">FrontDeskAI</p>
          <p className="text-[10px] text-muted-foreground">Voice Booking Agent</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-0.5 p-3">
        <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          Menu
        </p>
        {navItems.map(({ label, href, icon: Icon }) => {
          const active =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-primary/8 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span
                className={cn(
                  "flex size-[30px] items-center justify-center rounded-md transition-colors",
                  active
                    ? "bg-primary/12 text-primary"
                    : "bg-muted/60 text-muted-foreground group-hover:bg-muted group-hover:text-foreground"
                )}
              >
                <Icon className="size-3.5" />
              </span>
              {label}
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: agent status */}
      <div className="shrink-0 border-t border-border p-4">
        <div className="rounded-xl border border-border bg-muted/30 p-3">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <p className="text-xs font-semibold text-emerald-600">Agent Live</p>
          </div>
          <p className="mt-1 truncate text-[11px] font-medium leading-tight">
            {businessConfig.name}
          </p>
          <p className="truncate text-[10px] text-muted-foreground">
            {businessConfig.phone}
          </p>
        </div>
      </div>
    </aside>
  );
}
