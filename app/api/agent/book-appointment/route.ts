import { NextRequest, NextResponse } from "next/server";
import { parseISO, isValid, isBefore, startOfDay } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { businessConfig } from "@/lib/business-config";
import { createAppointment } from "@/lib/appointments-db";

// Waterloo, Ontario timezone
const TIMEZONE = "America/Toronto";

type DayKey = keyof typeof businessConfig.weeklyHours;

const DAY_NAMES: DayKey[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

function fmt12(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${suffix}`;
}

function isWithinBusinessHours(date: string, time: string): boolean {
  const parsed = parseISO(date);
  if (!isValid(parsed)) return false;

  const dayName = DAY_NAMES[parsed.getDay()];
  const hours = businessConfig.weeklyHours[dayName];

  if (!hours) return false;

  // HH:MM strings compare correctly lexicographically
  return time >= hours.open && time < hours.close;
}

function isDateInPast(date: string): boolean {
  const parsed = parseISO(date);
  if (!isValid(parsed)) return true;
  // Compare against today in Waterloo's local timezone, not UTC
  const todayLocal = startOfDay(toZonedTime(new Date(), TIMEZONE));
  return isBefore(parsed, todayLocal);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      session_id,
      customerName,
      customerPhone,
      service,
      appointmentDate,
      appointmentTime,
      notes = "",
    } = body as {
      session_id: string;
      customerName: string;
      customerPhone: string;
      service: string;
      appointmentDate: string;
      appointmentTime: string;
      notes?: string;
    };

    // Required fields (customerPhone is optional, may be absent in test calls)
    if (!customerName || !service || !appointmentDate || !appointmentTime) {
      return NextResponse.json(
        { success: false, reason: "Missing required fields: customer name, service, date, and time." },
        { status: 400 }
      );
    }

    // Date format validation
    if (!isValid(parseISO(appointmentDate))) {
      return NextResponse.json(
        { success: false, reason: "Invalid date format. Please use YYYY-MM-DD." },
        { status: 400 }
      );
    }

    // Past date check (uses Waterloo local time)
    if (isDateInPast(appointmentDate)) {
      return NextResponse.json(
        { success: false, reason: "That date has already passed. Please choose a future date." },
        { status: 400 }
      );
    }

    // Business hours check
    if (!isWithinBusinessHours(appointmentDate, appointmentTime)) {
      const dayName = DAY_NAMES[parseISO(appointmentDate).getDay()];
      const hours = businessConfig.weeklyHours[dayName];

      const reason = hours
        ? `We're open on ${dayName}s from ${fmt12(hours.open)} to ${fmt12(hours.close)}. Please choose a time within those hours.`
        : `We're closed on ${dayName}s. Please choose another day.`;

      return NextResponse.json({ success: false, reason }, { status: 400 });
    }

    const appointmentId = await createAppointment({
      sessionId: session_id ?? "",
      customerName,
      customerPhone: customerPhone ?? "",
      service,
      appointmentDate,
      appointmentTime,
      notes,
    });

    return NextResponse.json({
      success: true,
      appointmentId,
      message: `Appointment confirmed for ${customerName} on ${appointmentDate} at ${fmt12(appointmentTime)} for ${service}. Booking ID: ${appointmentId}.`,
    });
  } catch (err) {
    console.error("[book-appointment]", err);
    return NextResponse.json(
      { success: false, reason: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
