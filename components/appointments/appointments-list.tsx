"use client";

import { useState } from "react";
import { CalendarDays, Loader2, PhoneCall, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppointmentCard } from "./appointment-card";
import { useAppointments, type AppointmentStatus } from "@/hooks/use-appointments";

/* ── stat card ───────────────────────────────────────────────────────── */

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  active,
  onClick,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-1 items-center gap-3.5 rounded-xl border p-4 text-left transition-all duration-200",
        active
          ? "border-primary/30 bg-primary/5 shadow-sm"
          : "border-border bg-card hover:border-border/80 hover:shadow-sm hover:shadow-black/5"
      )}
    >
      <div className={cn("flex size-10 items-center justify-center rounded-lg", color)}>
        <Icon className="size-5 text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold tabular-nums leading-none">{value}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
      </div>
    </button>
  );
}

/* ── main ────────────────────────────────────────────────────────────── */

type Filter = "all" | AppointmentStatus;

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All",       value: "all"       },
  { label: "Upcoming",  value: "upcoming"  },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export function AppointmentsList() {
  const { appointments, loading, error, changeStatus } = useAppointments();
  const [filter, setFilter] = useState<Filter>("all");

  const counts = {
    all:       appointments.length,
    upcoming:  appointments.filter((a) => a.status === "upcoming").length,
    completed: appointments.filter((a) => a.status === "completed").length,
    cancelled: appointments.filter((a) => a.status === "cancelled").length,
  };

  const filtered =
    filter === "all" ? appointments : appointments.filter((a) => a.status === filter);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Stats row */}
      <div className="shrink-0 border-b border-border bg-muted/20 px-6 py-4">
        <div className="flex gap-3">
          <StatCard
            label="Total Bookings"
            value={counts.all}
            icon={CalendarDays}
            color="bg-primary"
            active={filter === "all"}
            onClick={() => setFilter("all")}
          />
          <StatCard
            label="Upcoming"
            value={counts.upcoming}
            icon={PhoneCall}
            color="bg-blue-500"
            active={filter === "upcoming"}
            onClick={() => setFilter("upcoming")}
          />
          <StatCard
            label="Completed"
            value={counts.completed}
            icon={CheckCircle2}
            color="bg-emerald-500"
            active={filter === "completed"}
            onClick={() => setFilter("completed")}
          />
          <StatCard
            label="Cancelled"
            value={counts.cancelled}
            icon={XCircle}
            color="bg-rose-400"
            active={filter === "cancelled"}
            onClick={() => setFilter("cancelled")}
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex shrink-0 items-center gap-1 border-b border-border bg-background px-6 py-2.5">
        {FILTERS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
              filter === value
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {label}
            <span
              className={cn(
                "rounded-full px-1.5 py-px text-[10px] font-bold tabular-nums",
                filter === value ? "bg-background/20 text-background" : "bg-muted"
              )}
            >
              {counts[value]}
            </span>
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {loading && (
          <div className="flex h-48 items-center justify-center gap-2.5 text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            <span className="text-sm">Loading appointments…</span>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="flex h-48 flex-col items-center justify-center gap-3 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl border-2 border-dashed border-border">
              <CalendarDays className="size-6 text-muted-foreground/40" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {filter === "all"
                  ? "No appointments yet"
                  : `No ${filter} appointments`}
              </p>
              {filter === "all" && (
                <p className="mt-0.5 text-xs text-muted-foreground/60">
                  They&apos;ll appear here the moment your voice agent books one.
                </p>
              )}
            </div>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="flex flex-col gap-2">
            {filtered.map((appt) => (
              <AppointmentCard
                key={appt.id}
                appointment={appt}
                onStatusChange={changeStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
