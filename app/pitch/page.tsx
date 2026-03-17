"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Phone,
  PhoneOff,
  CalendarDays,
  ArrowRight,
  ChevronDown,
  Mic,
  LayoutDashboard,
  Database,
  Globe,
  Server,
  Languages,
  CalendarX,
  RefreshCw,
} from "lucide-react";

const TOTAL_SLIDES = 4;

export default function PitchPage() {
  const [current, setCurrent] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      setCurrent((c) => Math.max(0, Math.min(TOTAL_SLIDES - 1, c + dir)));
    },
    []
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        go(1);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        go(-1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <div className="fixed inset-0 bg-white text-gray-900 overflow-hidden select-none">
      {/* Slide container */}
      <div
        className="h-full transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
        style={{ transform: `translateY(-${current * 100}%)` }}
      >
        <Slide1 active={current === 0 && ready} />
        <Slide2 active={current === 1} />
        <Slide3 active={current === 2} />
        <Slide4 active={current === 3} />
      </div>

      {/* Navigation dots */}
      <div className="fixed right-8 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3">
        {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "h-8 w-2 bg-gray-900"
                : "h-2 w-2 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Bottom hint */}
      {current < TOTAL_SLIDES - 1 && (
        <button
          onClick={() => go(1)}
          className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 animate-bounce text-gray-300 transition-colors hover:text-gray-500"
        >
          <ChevronDown className="size-6" />
        </button>
      )}

      {/* Slide counter */}
      <div className="fixed left-8 bottom-8 z-50 font-mono text-xs text-gray-300">
        {current + 1} / {TOTAL_SLIDES}
      </div>
    </div>
  );
}

/* ── Shared ─────────────────────────────────────────────────────────── */

function FadeIn({
  active,
  delay = 0,
  children,
  className = "",
}: {
  active: boolean;
  delay?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`transition-all duration-700 ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(24px)",
      }}
    >
      {children}
    </div>
  );
}

/* ── Slide 1: The Problem ───────────────────────────────────────────── */

function Slide1({ active }: { active: boolean }) {
  return (
    <section className="relative flex h-full items-center justify-center bg-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-100/80 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl px-8 text-center">
        <FadeIn active={active}>
          <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-full border border-red-200 bg-red-50">
            <PhoneOff className="size-10 text-red-500" />
          </div>
        </FadeIn>

        <FadeIn active={active} delay={200}>
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-gray-900 md:text-7xl">
            Small businesses lose{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              $75B/year
            </span>{" "}
            from missed calls
          </h1>
        </FadeIn>

        <FadeIn active={active} delay={400}>
          <p className="mt-6 text-lg text-gray-400 md:text-xl">
            Your barber, your dentist, your salon — they&apos;re all too busy to pick up the phone.
          </p>
        </FadeIn>

        <FadeIn active={active} delay={600}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            {["62% of calls go unanswered", "Caller won't call back", "Lost revenue, every day"].map(
              (stat) => (
                <span key={stat} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-red-400" />
                  {stat}
                </span>
              )
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Slide 2: The Solution ──────────────────────────────────────────── */

function Slide2({ active }: { active: boolean }) {
  return (
    <section className="relative flex h-full items-center justify-center bg-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/70 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl px-8 text-center">
        <FadeIn active={active}>
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-xs font-medium text-gray-500">
            <Phone className="size-3" />
            Introducing
          </div>
        </FadeIn>

        <FadeIn active={active} delay={150}>
          <h1 className="text-6xl font-bold tracking-tight text-gray-900 md:text-8xl">
            Front
            <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Desk
            </span>
            AI
          </h1>
        </FadeIn>

        <FadeIn active={active} delay={300}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 md:text-xl">
            An AI voice agent that answers your phone, books appointments, and fills your calendar — 24/7.
          </p>
        </FadeIn>

        {/* 3-step flow */}
        <FadeIn active={active} delay={500}>
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-4">
            {[
              { icon: Phone, label: "Call comes in", sub: "Twilio number" },
              { icon: Mic, label: "AI agent books it", sub: "ElevenLabs voice" },
              { icon: LayoutDashboard, label: "Dashboard updates", sub: "Real-time sync" },
            ].map((step, i) => (
              <div key={step.label} className="relative flex flex-col items-center">
                {i < 2 && (
                  <div className="absolute right-0 top-7 hidden translate-x-1/2 md:block">
                    <ArrowRight className="size-5 text-gray-200" />
                  </div>
                )}
                <div className="mb-3 flex size-14 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50">
                  <step.icon className="size-6 text-blue-500" />
                </div>
                <p className="text-sm font-semibold text-gray-900">{step.label}</p>
                <p className="mt-0.5 text-xs text-gray-400">{step.sub}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Capabilities */}
        <FadeIn active={active} delay={700}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: CalendarDays, label: "Book" },
              { icon: CalendarX, label: "Cancel" },
              { icon: RefreshCw, label: "Reschedule" },
              { icon: Languages, label: "Multilingual" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-medium text-gray-500"
              >
                <Icon className="size-3.5 text-blue-500/70" />
                {label}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Slide 3: Tech Stack ────────────────────────────────────────────── */

function Slide3({ active }: { active: boolean }) {
  const stack = [
    { icon: Phone, label: "Twilio", sub: "Phone number", color: "text-red-500 border-red-200 bg-red-50" },
    { icon: Mic, label: "ElevenLabs", sub: "Voice AI agent", color: "text-violet-500 border-violet-200 bg-violet-50" },
    { icon: Server, label: "Next.js", sub: "API routes", color: "text-gray-900 border-gray-200 bg-gray-50" },
    { icon: Database, label: "Firebase", sub: "Firestore DB", color: "text-amber-500 border-amber-200 bg-amber-50" },
    { icon: Globe, label: "Vercel", sub: "Hosting", color: "text-cyan-600 border-cyan-200 bg-cyan-50" },
  ];

  return (
    <section className="relative flex h-full items-center justify-center bg-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-violet-100/60 blur-[100px]" />
        <div className="absolute right-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-cyan-100/60 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl px-8 text-center">
        <FadeIn active={active}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            How it&apos;s built
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
            The stack
          </h2>
        </FadeIn>

        {/* Architecture flow */}
        <FadeIn active={active} delay={300}>
          <div className="mx-auto mt-16 flex flex-wrap items-center justify-center gap-3">
            {stack.map((item, i) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className={`flex items-center gap-3 rounded-2xl border px-5 py-4 ${item.color}`}>
                  <item.icon className="size-6" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-400">{item.sub}</p>
                  </div>
                </div>
                {i < stack.length - 1 && (
                  <ArrowRight className="hidden size-4 text-gray-200 md:block" />
                )}
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Data flow description */}
        <FadeIn active={active} delay={500}>
          <div className="mx-auto mt-14 max-w-2xl">
            <div className="rounded-xl border border-gray-100 bg-gray-50 px-6 py-4">
              <p className="text-sm leading-relaxed text-gray-400">
                Caller dials Twilio number &rarr; ElevenLabs voice agent handles the conversation
                &rarr; Agent calls Next.js webhooks to check availability &amp; book &rarr; Appointment
                saved to Firestore &rarr; Dashboard updates in real-time
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Slide 4: Live Demo ─────────────────────────────────────────────── */

function Slide4({ active }: { active: boolean }) {
  return (
    <section className="relative flex h-full items-center justify-center bg-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-100/70 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl px-8 text-center">
        <FadeIn active={active}>
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 md:text-8xl">
            Let me show you.
          </h1>
        </FadeIn>

        <FadeIn active={active} delay={300}>
          <div className="mt-12 inline-flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="relative flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-3 rounded-full bg-emerald-500" />
              </span>
              <span className="text-sm font-semibold text-emerald-600">Agent Live</span>
            </div>

            <a
              href="tel:+18676791431"
              className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 px-8 py-6 transition-all hover:border-emerald-300 hover:bg-emerald-50"
            >
              <div className="flex size-14 items-center justify-center rounded-xl bg-emerald-100">
                <Phone className="size-7 text-emerald-600" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-400">Call now</p>
                <p className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                  +1 (867) 679-1431
                </p>
              </div>
            </a>
          </div>
        </FadeIn>

        <FadeIn active={active} delay={500}>
          <p className="mt-10 text-sm text-gray-400">
            Ask Clara to book a haircut — watch it appear on the dashboard in real time.
          </p>
        </FadeIn>

        <FadeIn active={active} delay={700}>
          <div className="mt-12 flex items-center justify-center gap-6 text-xs text-gray-300">
            <span>FrontDeskAI</span>
            <span className="size-1 rounded-full bg-gray-300" />
            <span>Built with Cursor</span>
            <span className="size-1 rounded-full bg-gray-300" />
            <span>Cursor Hackathon — Waterloo 2026</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
