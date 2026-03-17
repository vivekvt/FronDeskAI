import { Header } from "@/components/dashboard/header";
import { businessConfig } from "@/lib/business-config";
import { MapPin, Phone, Clock, Layers } from "lucide-react";

function SectionCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center gap-2.5 border-b border-border px-5 py-3.5">
        <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="size-3.5 text-primary" />
        </div>
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
        {label}
      </label>
      <div className="rounded-lg border border-border bg-muted/30 px-3.5 py-2.5 text-sm">
        {value}
      </div>
    </div>
  );
}

function fmt12(t: string) {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

const DAY_LABELS: Record<string, string> = {
  monday: "Mon", tuesday: "Tue", wednesday: "Wed",
  thursday: "Thu", friday: "Fri", saturday: "Sat", sunday: "Sun",
};

export default function SettingsPage() {
  return (
    <>
      <Header title="Settings" description="Business configuration" />

      <div className="flex-1 overflow-y-auto bg-muted/20 p-6">
        <div className="mx-auto max-w-2xl space-y-4">

          {/* Business info */}
          <SectionCard icon={Layers} title="Business Info">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Name"    value={businessConfig.name}  />
              <Field label="Tagline" value={businessConfig.title} />
              <div className="sm:col-span-2">
                <Field label="About" value={businessConfig.about} />
              </div>
            </div>
          </SectionCard>

          {/* Contact */}
          <SectionCard icon={Phone} title="Contact & Location">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Phone"   value={businessConfig.phone}   />
              <Field label="Address" value={businessConfig.address} />
            </div>
          </SectionCard>

          {/* Services */}
          <SectionCard icon={MapPin} title="Services Offered">
            <div className="flex flex-wrap gap-2">
              {businessConfig.services.map((s) => (
                <span
                  key={s}
                  className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </SectionCard>

          {/* Hours */}
          <SectionCard icon={Clock} title="Business Hours">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {Object.entries(businessConfig.weeklyHours).map(([day, hours]) => (
                <div
                  key={day}
                  className={`rounded-lg border px-3 py-2.5 text-center ${
                    hours
                      ? "border-border bg-background"
                      : "border-dashed border-border/50 bg-muted/30 opacity-50"
                  }`}
                >
                  <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                    {DAY_LABELS[day]}
                  </p>
                  {hours ? (
                    <>
                      <p className="mt-1 text-xs font-semibold">{fmt12(hours.open)}</p>
                      <p className="text-[10px] text-muted-foreground">to {fmt12(hours.close)}</p>
                    </>
                  ) : (
                    <p className="mt-1 text-xs text-muted-foreground">Closed</p>
                  )}
                </div>
              ))}
            </div>
          </SectionCard>

        </div>
      </div>
    </>
  );
}
