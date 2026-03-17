"use client";

import { useState } from "react";
import { format, parseISO, isToday, isTomorrow, isYesterday } from "date-fns";
import { Phone, Check, X, RotateCcw, Clock, Scissors, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Appointment, type AppointmentStatus } from "@/hooks/use-appointments";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  { stripe: string; pill: string; pillBg: string; label: string }
> = {
  upcoming:  { stripe: "bg-blue-500",    pill: "text-blue-700",    pillBg: "bg-blue-50 ring-1 ring-blue-200",        label: "Upcoming"  },
  completed: { stripe: "bg-emerald-500", pill: "text-emerald-700", pillBg: "bg-emerald-50 ring-1 ring-emerald-200",  label: "Completed" },
  cancelled: { stripe: "bg-rose-400",    pill: "text-rose-600",    pillBg: "bg-rose-50 ring-1 ring-rose-200",        label: "Cancelled" },
};

const ACTIONS: Record<AppointmentStatus, { status: AppointmentStatus; label: string; icon: React.ElementType; style: string }[]> = {
  upcoming: [
    { status: "completed", label: "Complete", icon: Check,       style: "text-emerald-600 hover:bg-emerald-50" },
    { status: "cancelled", label: "Cancel",   icon: X,           style: "text-rose-500 hover:bg-rose-50" },
  ],
  completed: [
    { status: "cancelled", label: "Cancel",   icon: X,           style: "text-rose-500 hover:bg-rose-50" },
    { status: "upcoming",  label: "Reopen",   icon: RotateCcw,   style: "text-blue-600 hover:bg-blue-50" },
  ],
  cancelled: [
    { status: "upcoming",  label: "Restore",  icon: RotateCcw,   style: "text-blue-600 hover:bg-blue-50" },
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
  const [cancelOpen, setCancelOpen] = useState(false);

  function handleAction(next: AppointmentStatus) {
    if (next === "cancelled") {
      setCancelOpen(true);
      return;
    }
    onStatusChange(id, next);
  }

  function confirmCancel() {
    onStatusChange(id, "cancelled");
    setCancelOpen(false);
  }

  return (
    <>
      <div className="group relative flex items-stretch overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm transition-all duration-200 hover:border-border hover:shadow-md">
        {/* Left status stripe */}
        <div className={cn("w-1.5 shrink-0 rounded-l-xl", cfg.stripe)} />

        {/* Content */}
        <div className="flex flex-1 items-center gap-5 px-5 py-4">
          {/* Avatar */}
          <div className={cn("flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm", color)}>
            {initials(customerName)}
          </div>

          {/* Customer info */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{customerName}</p>
            <div className="mt-1 flex items-center gap-3">
              {customerPhone && (
                <a
                  href={`tel:${customerPhone}`}
                  className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Phone className="size-3" />
                  {customerPhone}
                </a>
              )}
            </div>
          </div>

          {/* Service chip */}
          <div className="hidden shrink-0 sm:block">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-muted/80 px-3 py-1.5 text-xs font-medium">
              <Scissors className="size-3 text-muted-foreground" />
              {service}
            </span>
            {notes && (
              <p className="mt-1 max-w-[180px] truncate text-[11px] text-muted-foreground">{notes}</p>
            )}
          </div>

          {/* Date / time */}
          <div className="hidden shrink-0 text-right md:block">
            <p className="text-sm font-semibold">{friendlyDate(appointmentDate)}</p>
            <p className="mt-0.5 flex items-center justify-end gap-1 text-xs text-muted-foreground">
              <Clock className="size-3" />
              {fmt12(appointmentTime)}
            </p>
          </div>

          {/* Status pill */}
          <div className="shrink-0">
            <span className={cn("inline-block rounded-full px-3 py-1 text-xs font-semibold", cfg.pillBg, cfg.pill)}>
              {cfg.label}
            </span>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-1">
            {ACTIONS[status].map(({ status: next, label, icon: Icon, style }) => (
              <button
                key={next}
                onClick={() => handleAction(next)}
                title={label}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
                  style
                )}
              >
                <Icon className="size-3.5" />
                <span className="hidden xl:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cancel confirmation dialog */}
      <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-rose-50">
              <AlertTriangle className="size-6 text-rose-500" />
            </div>
            <DialogTitle className="text-center">Cancel Appointment</DialogTitle>
            <DialogDescription className="text-center">
              Are you sure you want to cancel <span className="font-medium text-foreground">{customerName}</span>&apos;s{" "}
              <span className="font-medium text-foreground">{service}</span> on{" "}
              <span className="font-medium text-foreground">{friendlyDate(appointmentDate)}</span> at{" "}
              <span className="font-medium text-foreground">{fmt12(appointmentTime)}</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelOpen(false)}>
              Keep it
            </Button>
            <Button variant="destructive" onClick={confirmCancel}>
              Yes, cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
