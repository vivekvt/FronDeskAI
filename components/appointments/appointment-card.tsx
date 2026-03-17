"use client";

import { format, parseISO, isToday, isTomorrow, isYesterday } from "date-fns";
import { Phone, Check, X, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Appointment, type AppointmentStatus } from "@/hooks/use-appointments";

/* ── helpers ─────────────────────────────────────────────────────────── */

const AVATAR_COLORS = [
  "bg-violet-500",
  "bg-blue-500",
  "bg-emerald-500",
  "bg-orange-500",
  "bg-rose-500",
  "bg-amber-500",
  "bg-cyan-500",
  "bg-pink-500",
];

function avatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function friendlyDate(dateStr: string) {
  const d = parseISO(dateStr);
  if (isToday(d))     return "Today";
  if (isTomorrow(d))  return "Tomorrow";
  if (isYesterday(d)) return "Yesterday";
  return format(d, "MMM d, yyyy");
}

function fmt12(time: string) {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${suffix}`;
}

const STATUS_CONFIG: Record<
  AppointmentStatus,
  { bar: string; pill: string; label: string }
> = {
  upcoming:  { bar: "bg-blue-500",    pill: "bg-blue-50 text-blue-600 ring-blue-200",      label: "Upcoming"  },
  completed: { bar: "bg-emerald-500", pill: "bg-emerald-50 text-emerald-600 ring-emerald-200", label: "Completed" },
  cancelled: { bar: "bg-rose-400",    pill: "bg-rose-50 text-rose-500 ring-rose-200",       label: "Cancelled" },
};

const ACTIONS: Record<AppointmentStatus, { status: AppointmentStatus; label: string; icon: React.ElementType; style: string }[]> = {
  upcoming:  [
    { status: "completed", label: "Complete", icon: Check, style: "hover:bg-emerald-50 hover:text-emerald-600" },
    { status: "cancelled", label: "Cancel",   icon: X,     style: "hover:bg-rose-50 hover:text-rose-500"      },
  ],
  completed: [
    { status: "cancelled", label: "Cancel",   icon: X,           style: "hover:bg-rose-50 hover:text-rose-500"    },
    { status: "upcoming",  label: "Reopen",   icon: RotateCcw,   style: "hover:bg-blue-50 hover:text-blue-600"    },
  ],
  cancelled: [
    { status: "upcoming",  label: "Restore",  icon: RotateCcw,   style: "hover:bg-blue-50 hover:text-blue-600"    },
  ],
};

/* ── component ───────────────────────────────────────────────────────── */

interface AppointmentCardProps {
  appointment: Appointment;
  onStatusChange: (id: string, status: AppointmentStatus) => void;
}

export function AppointmentCard({ appointment, onStatusChange }: AppointmentCardProps) {
  const { id, customerName, customerPhone, service, appointmentDate, appointmentTime, status, notes } = appointment;
  const cfg = STATUS_CONFIG[status];
  const color = avatarColor(customerName);

  return (
    <div className="group relative flex items-stretch overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:border-border/80 hover:shadow-md hover:shadow-black/5">
      {/* Left status stripe */}
      <div className={cn("w-1 shrink-0", cfg.bar)} />

      {/* Content */}
      <div className="flex flex-1 items-center gap-4 px-4 py-3.5">
        {/* Avatar */}
        <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm", color)}>
          {initials(customerName)}
        </div>

        {/* Customer info */}
        <div className="w-40 shrink-0">
          <p className="truncate text-sm font-semibold">{customerName}</p>
          <a
            href={`tel:${customerPhone}`}
            className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <Phone className="size-2.5" />
            {customerPhone}
          </a>
        </div>

        {/* Service */}
        <div className="hidden flex-1 sm:block">
          <span className="inline-block rounded-md bg-muted px-2.5 py-1 text-xs font-medium">
            {service}
          </span>
          {notes && (
            <p className="mt-1 truncate text-[11px] text-muted-foreground">{notes}</p>
          )}
        </div>

        {/* Date / time */}
        <div className="hidden shrink-0 text-right md:block">
          <p className="text-sm font-medium">{friendlyDate(appointmentDate)}</p>
          <p className="text-xs text-muted-foreground">{fmt12(appointmentTime)}</p>
        </div>

        {/* Status pill */}
        <div className="hidden shrink-0 lg:block">
          <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold ring-1", cfg.pill)}>
            {cfg.label}
          </span>
        </div>

        {/* Actions — visible on hover */}
        <div className="ml-auto flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          {ACTIONS[status].map(({ status: next, label, icon: Icon, style }) => (
            <button
              key={next}
              onClick={() => onStatusChange(id, next)}
              title={label}
              className={cn(
                "flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground transition-colors",
                style
              )}
            >
              <Icon className="size-3" />
              <span className="hidden xl:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* ID */}
        <span className="hidden shrink-0 font-mono text-[10px] text-muted-foreground/40 xl:block">
          #{id.slice(0, 6)}
        </span>
      </div>
    </div>
  );
}
