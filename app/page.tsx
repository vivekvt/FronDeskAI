"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Phone,
  CalendarDays,
  Zap,
  Shield,
  Clock,
  Check,
  ArrowRight,
  Mic,
  LayoutDashboard,
  Languages,
  CalendarX,
  RefreshCw,
  Scissors,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { businessConfig } from "@/lib/business-config";

/* ─── animated phone call transcript ─────────────────────────────────── */

const TRANSCRIPT = [
  { speaker: "Clara" as const, text: "Hey, FreshCut! This is Clara, how can I help you?" },
  { speaker: "Caller" as const, text: "Hi, I'd like to book a haircut for tomorrow." },
  { speaker: "Clara" as const, text: "Sure! What's your name?" },
  { speaker: "Caller" as const, text: "It's Alex." },
  { speaker: "Clara" as const, text: "We have openings at 10 AM, 11:30 AM, and 2 PM. What works?" },
  { speaker: "Caller" as const, text: "2 PM sounds good." },
  { speaker: "Clara" as const, text: "Alex, Haircut tomorrow at 2 PM. Sound good?" },
  { speaker: "Caller" as const, text: "Yes, perfect." },
  { speaker: "Clara" as const, text: "Done! See you tomorrow at 2." },
];

function PhoneCallDemo() {
  const [visible, setVisible] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const tick = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    if (visible >= TRANSCRIPT.length) return;
    const timer = setTimeout(() => setVisible((v) => v + 1), 1800);
    return () => clearTimeout(timer);
  }, [visible]);

  useEffect(() => {
    if (visible >= TRANSCRIPT.length) {
      const reset = setTimeout(() => {
        setVisible(0);
        setSeconds(0);
      }, 4000);
      return () => clearTimeout(reset);
    }
  }, [visible]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="flex flex-col">
      {/* Call screen header */}
      <div className="flex flex-col items-center gap-3 border-b border-border bg-muted/30 px-5 py-5">
        <div className="flex size-14 items-center justify-center rounded-full bg-emerald-100">
          <Phone className="size-6 text-emerald-600" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold">+1 (437) 665-7744</p>
          <p className="text-xs text-muted-foreground">Incoming call</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-xs text-emerald-600">{mm}:{ss}</span>
        </div>

        {/* Audio waveform */}
        <div className="flex items-center gap-[3px]">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="w-[3px] rounded-full bg-emerald-400/60"
              style={{
                height: `${8 + Math.sin(i * 0.8 + seconds * 2) * 6 + Math.random() * 4}px`,
                transition: "height 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* Live transcript */}
      <div className="px-5 py-4">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/50">
          Live transcript
        </p>
        <div className="flex flex-col gap-2">
          {TRANSCRIPT.slice(0, visible).map((line, i) => (
            <div key={i} className="text-xs leading-relaxed" style={{ animation: "fadeSlideIn 0.3s ease-out" }}>
              <span className={`font-semibold ${line.speaker === "Clara" ? "text-primary" : "text-foreground"}`}>
                {line.speaker}:
              </span>{" "}
              <span className="text-muted-foreground">{line.text}</span>
            </div>
          ))}
          {visible < TRANSCRIPT.length && visible > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground/40">
              <span className="size-1 animate-pulse rounded-full bg-muted-foreground/40" />
              listening...
            </div>
          )}
        </div>
      </div>
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
            <span className="text-sm font-bold tracking-tight">FrontDeskAI</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#how-it-works" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#try-it" className="transition-colors hover:text-foreground">Try it</a>
          </nav>
          <Button asChild size="sm">
            <Link href="/dashboard">
              Dashboard <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-16 md:grid-cols-2 md:pb-28 md:pt-24">
          {/* Left: copy */}
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
              <Zap className="size-3" />
              AI-Powered Voice Agent
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
              Your AI receptionist that
              <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent"> never misses a call</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
              FrontDeskAI answers your business phone, books appointments through natural conversation, and updates your dashboard in real time. 24/7. No extra hires needed.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="gap-2 px-6 shadow-lg shadow-primary/20">
                <Link href="/dashboard">
                  <LayoutDashboard className="size-4" />
                  View Dashboard
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 px-6">
                <a href="#try-it">
                  <Phone className="size-4" />
                  Try it live
                </a>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {["Books appointments", "Cancels & reschedules", "Multilingual", "Real-time sync"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <Check className="size-3.5 text-primary" /> {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: phone call demo */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10">
              <PhoneCallDemo />
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="border-t border-border bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              From phone call to booked appointment
            </h2>
            <p className="mt-3 text-muted-foreground">
              Three steps. Fully automated. Zero effort from you.
            </p>
          </div>

          <div className="relative grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                icon: Phone,
                title: "Customer calls",
                desc: "Your AI agent answers instantly. No hold music, no voicemail, no missed calls.",
                color: "bg-blue-500",
              },
              {
                step: "2",
                icon: Mic,
                title: "Clara books it",
                desc: "She collects the name, service, and date. Checks availability. Confirms with the caller.",
                color: "bg-violet-500",
              },
              {
                step: "3",
                icon: LayoutDashboard,
                title: "Dashboard updates",
                desc: "The appointment appears live on your dashboard. Manage status with one click.",
                color: "bg-emerald-500",
              },
            ].map((s, i, arr) => (
              <div key={s.step} className="relative text-center">
                {i < arr.length - 1 && (
                  <div className="absolute left-1/2 top-10 hidden h-px w-full translate-x-8 border-t-2 border-dashed border-border md:block" />
                )}
                <div className={`relative mx-auto mb-5 flex size-20 items-center justify-center rounded-2xl ${s.color} text-white shadow-lg`}>
                  <s.icon className="size-8" />
                  <span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-background text-xs font-bold ring-2 ring-border">
                    {s.step}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold">{s.title}</h3>
                <p className="mx-auto max-w-[260px] text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Everything your front desk needs
            </h2>
            <p className="mt-3 text-muted-foreground">
              Built for service businesses that can&apos;t afford to miss a single call.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Phone, title: "24/7 AI phone agent", desc: "ElevenLabs voice AI answers every call with a natural, human-sounding voice. Real conversation, not a phone tree." },
              { icon: CalendarDays, title: "Smart slot booking", desc: "Checks your available 30-minute slots for the day and lets the caller pick. No double bookings." },
              { icon: CalendarX, title: "Cancel & reschedule", desc: "Callers can cancel or reschedule by phone. The agent verifies their identity by phone number automatically." },
              { icon: Shield, title: "Business hours enforcement", desc: "Appointments can only be booked when you're open. The agent redirects callers to available times." },
              { icon: Languages, title: "Multilingual", desc: "Clara speaks whatever language the caller speaks. No configuration needed. Just talks naturally." },
              { icon: Zap, title: "Real-time dashboard", desc: "Firestore keeps your appointment list live. New bookings appear instantly. No refresh needed." },
            ].map((f) => (
              <div
                key={f.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                  <f.icon className="size-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Try it live ── */}
      <section id="try-it" className="border-t border-border bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Left: CTA */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                Agent Live
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">
                Try it right now
              </h2>
              <p className="mt-3 max-w-md text-muted-foreground">
                Call the number below and book an appointment with Clara. Then open the dashboard and watch it appear in real time.
              </p>

              <a
                href="tel:+18676791431"
                className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-border bg-card px-6 py-4 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-100">
                  <Phone className="size-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Call FreshCut</p>
                  <p className="text-xl font-bold tracking-tight">+1 (867) 679-1431</p>
                </div>
              </a>

              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-3.5" />
                {businessConfig.address}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {businessConfig.services.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium"
                  >
                    <Scissors className="size-3 text-muted-foreground" />
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: hours card */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
              <div className="border-b border-border px-5 py-3.5">
                <p className="text-sm font-semibold">Business Hours</p>
                <p className="text-xs text-muted-foreground">Agent books within these hours only</p>
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
                    <span className="font-medium capitalize">{day}</span>
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

      {/* ── Tech stack bar ── */}
      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/60">Built with</p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-muted-foreground">
            {[
              "ElevenLabs",
              "Twilio",
              "Next.js 16",
              "Firebase",
              "Tailwind CSS",
              "Vercel",
              "Cursor",
            ].map((tech) => (
              <span key={tech} className="transition-colors hover:text-foreground">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="py-20">
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
                Let FrontDeskAI answer it, book the appointment, and fill your calendar.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-background text-foreground shadow-lg hover:bg-background/90"
                >
                  <Link href="/dashboard">
                    Open Dashboard <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-transparent text-white hover:bg-white/10"
                >
                  <a href="tel:+18676791431">
                    <Phone className="size-4" />
                    Call Now
                  </a>
                </Button>
              </div>
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
            <span>· Built with Cursor for the Cursor Hackathon, Waterloo 2026</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="transition-colors hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/dashboard/settings" className="transition-colors hover:text-foreground">
              Settings
            </Link>
            <Link href="/pitch" className="transition-colors hover:text-foreground">
              Pitch
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
