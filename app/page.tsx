import Link from "next/link";
import {
  Phone,
  CalendarDays,
  Zap,
  Shield,
  Clock,
  ChevronRight,
  Check,
  Star,
  ArrowRight,
  Mic,
  LayoutDashboard,
  BrainCircuit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { businessConfig } from "@/lib/business-config";

/* ─── tiny reusable primitives ─────────────────────────────────────────── */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
      {children}
    </span>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
      <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
        <Icon className="size-5 text-primary" />
      </div>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

function StepCard({
  step,
  icon: Icon,
  title,
  description,
  last,
}: {
  step: string;
  icon: React.ElementType;
  title: string;
  description: string;
  last?: boolean;
}) {
  return (
    <div className="relative flex flex-col items-center text-center">
      <div className="relative mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
        <Icon className="size-7" />
        <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-background text-[10px] font-bold text-foreground ring-2 ring-border">
          {step}
        </span>
      </div>
      {!last && (
        <div className="absolute left-1/2 top-8 hidden h-px w-full translate-x-8 border-t border-dashed border-border md:block" />
      )}
      <h3 className="mb-1.5 font-semibold">{title}</h3>
      <p className="max-w-[200px] text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

/* ─── page ──────────────────────────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-md bg-primary">
              <Phone className="size-3.5 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold">FrontDeskAI</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#how-it-works" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#business" className="transition-colors hover:text-foreground">Business</a>
          </nav>
          <Button asChild size="sm">
            <Link href="/dashboard">
              Open Dashboard <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[80px]" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pb-24 pt-20 text-center">
          <Badge>
            <Zap className="size-3" />
            Powered by ElevenLabs · Twilio · Firebase
          </Badge>

          <h1 className="mt-6 max-w-3xl text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Your AI receptionist
            <span className="block bg-gradient-to-r from-primary via-[oklch(0.623_0.214_259.815)] to-[oklch(0.809_0.105_251.813)] bg-clip-text text-transparent">
              never misses a call
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            FrontDeskAI answers your phone 24/7, books appointments in real time, and keeps your calendar full. No extra hires needed.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="gap-2 px-6 shadow-lg shadow-primary/25">
              <Link href="/dashboard">
                <LayoutDashboard className="size-4" />
                View Dashboard
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 px-6">
              <a href="#how-it-works">
                See how it works <ChevronRight className="size-4" />
              </a>
            </Button>
          </div>

          {/* Social proof chips */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            {["No missed calls", "Instant booking", "Real-time dashboard", "Works 24/7"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check className="size-3.5 text-primary" /> {t}
              </span>
            ))}
          </div>

          {/* Hero visual */}
          <div className="mt-16 w-full max-w-3xl">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10">
              {/* Fake browser chrome */}
              <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-4 py-2.5">
                <div className="size-2.5 rounded-full bg-red-400/70" />
                <div className="size-2.5 rounded-full bg-yellow-400/70" />
                <div className="size-2.5 rounded-full bg-green-400/70" />
                <div className="ml-3 flex-1 rounded-md bg-muted px-3 py-0.5 text-center text-[11px] text-muted-foreground">
                  frondeskai-app.vercel.app/dashboard
                </div>
              </div>

              {/* Mock dashboard */}
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold">Appointments</p>
                  <div className="flex gap-1.5">
                    {["All 4", "Upcoming 2", "Completed 1", "Cancelled 1"].map((tab, i) => (
                      <span
                        key={tab}
                        className={`rounded-md px-2.5 py-1 text-[11px] font-medium ${
                          i === 0
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {tab}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {[
                    { name: "Sarah Johnson", service: "Haircut & Styling", time: "Today · 2:00 PM", status: "upcoming", color: "text-blue-500 bg-blue-500/10" },
                    { name: "Mark Thompson", service: "Facial", time: "Today · 4:30 PM", status: "upcoming", color: "text-blue-500 bg-blue-500/10" },
                    { name: "Emily Chen", service: "Manicure", time: "Yesterday · 11:00 AM", status: "completed", color: "text-green-500 bg-green-500/10" },
                    { name: "James Park", service: "Hair Coloring", time: "Mon · 10:00 AM", status: "cancelled", color: "text-red-500 bg-red-500/10" },
                  ].map((appt) => (
                    <div
                      key={appt.name}
                      className="rounded-xl border border-border bg-background p-3"
                    >
                      <div className="flex items-start justify-between">
                        <p className="text-xs font-semibold">{appt.name}</p>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${appt.color}`}>
                          {appt.status}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">{appt.service}</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">{appt.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="border-t border-border bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <Badge><BrainCircuit className="size-3" /> Simple by design</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              From phone call to confirmed booking
            </h2>
            <p className="mt-3 text-muted-foreground">
              Three steps. Fully automated. Zero effort from you.
            </p>
          </div>

          <div className="relative grid gap-10 md:grid-cols-3">
            <StepCard
              step="1"
              icon={Phone}
              title="Customer calls"
              description="Your AI agent answers instantly, day or night. No hold music, no voicemail."
            />
            <StepCard
              step="2"
              icon={Mic}
              title="Agent books it"
              description="The agent collects name, service, date & time, confirms details, and books in real time."
            />
            <StepCard
              step="3"
              icon={LayoutDashboard}
              title="You see it live"
              description="The appointment appears on your dashboard instantly. Change status with one click."
              last
            />
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <Badge><Star className="size-3" /> Built for real businesses</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Everything your front desk needs
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Phone}
              title="24/7 AI phone agent"
              description="ElevenLabs voice AI answers every call with a natural, human-sounding voice. No scripts, just real conversation."
            />
            <FeatureCard
              icon={CalendarDays}
              title="Smart booking"
              description="Validates dates, checks your business hours, and only books slots when you're actually open."
            />
            <FeatureCard
              icon={Zap}
              title="Real-time dashboard"
              description="Firebase Firestore keeps your appointments list live. No refresh needed. See new bookings the second they come in."
            />
            <FeatureCard
              icon={Shield}
              title="Business hours enforcement"
              description="Appointments can only be booked within your configured hours. The agent politely redirects callers if needed."
            />
            <FeatureCard
              icon={Clock}
              title="Status tracking"
              description="Mark appointments as Upcoming, Completed, or Cancelled right from the dashboard with one click."
            />
            <FeatureCard
              icon={BrainCircuit}
              title="Powered by ElevenLabs"
              description="Conversational AI that handles follow-ups, collects all details, and confirms bookings before writing anything to the database."
            />
          </div>
        </div>
      </section>

      {/* ── Business info ── */}
      <section id="business" className="border-t border-border bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <Badge><Phone className="size-3" /> Currently configured for</Badge>
              <h2 className="mt-4 text-3xl font-bold tracking-tight">{businessConfig.name}</h2>
              <p className="mt-3 text-muted-foreground">{businessConfig.about}</p>
              <p className="mt-4 text-sm text-muted-foreground">{businessConfig.address}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {businessConfig.services.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <Button asChild className="mt-8 gap-2">
                <Link href="/dashboard">
                  Open Dashboard <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            {/* Hours card */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
              <div className="border-b border-border px-5 py-3.5">
                <p className="text-sm font-semibold">Business Hours</p>
              </div>
              {Object.entries(businessConfig.weeklyHours).map(([day, hours], i, arr) => {
                const fmt = (t: string) => {
                  const [h, m] = t.split(":");
                  const n = parseInt(h, 10);
                  return `${n % 12 || 12}:${m} ${n >= 12 ? "PM" : "AM"}`;
                };
                return (
                  <div
                    key={day}
                    className={`flex items-center justify-between px-5 py-2.5 text-sm ${
                      i < arr.length - 1 ? "border-b border-border" : ""
                    } ${!hours ? "opacity-40" : ""}`}
                  >
                    <span className="capitalize font-medium">{day}</span>
                    <span className="text-muted-foreground">
                      {hours ? `${fmt(hours.open)} – ${fmt(hours.close)}` : "Closed"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground shadow-2xl shadow-primary/30">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-[60px]" />
              <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-white/5 blur-[40px]" />
            </div>
            <div className="relative">
              <h2 className="text-3xl font-bold md:text-4xl">
                Your phone is ringing right now.
              </h2>
              <p className="mt-3 text-primary-foreground/75">
                Let FrontDeskAI answer it, book the appointment, and get back to work.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 bg-background text-foreground hover:bg-background/90 shadow-lg"
              >
                <Link href="/dashboard">
                  Open Dashboard <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary">
              <Phone className="size-3 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">FrontDeskAI</span>
            <span>— Built with Cursor for the Cursor Hackathon, Waterloo 2026</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link href="/dashboard/settings" className="hover:text-foreground transition-colors">
              Settings
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
