import { NextRequest, NextResponse } from "next/server";
import { parseISO, isValid } from "date-fns";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { businessConfig } from "@/lib/business-config";
import { toZonedTime } from "date-fns-tz";

const TIMEZONE = "America/Toronto";

type DayKey = keyof typeof businessConfig.weeklyHours;

const DAY_NAMES: DayKey[] = [
  "sunday", "monday", "tuesday", "wednesday",
  "thursday", "friday", "saturday",
];

function fmt12(time: string): string {
  const [h, m] = time.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

// Generate every 30-minute slot between open and close
function generateSlots(open: string, close: string): string[] {
  const slots: string[] = [];
  const [openH, openM] = open.split(":").map(Number);
  const [closeH, closeM] = close.split(":").map(Number);
  const openMins = openH * 60 + openM;
  const closeMins = closeH * 60 + closeM;

  for (let m = openMins; m < closeMins; m += 30) {
    const h = Math.floor(m / 60);
    const min = m % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`);
  }
  return slots;
}

export async function POST(req: NextRequest) {
  try {
    const { appointmentDate } = await req.json() as {
      appointmentDate: string;
    };

    if (!appointmentDate) {
      return NextResponse.json(
        { available: false, reason: "Date is required." },
        { status: 400 }
      );
    }

    const parsed = parseISO(appointmentDate);
    if (!isValid(parsed)) {
      return NextResponse.json(
        { available: false, reason: "Invalid date format. Use YYYY-MM-DD." },
        { status: 400 }
      );
    }

    // Past date check (Waterloo local time)
    const todayLocal = toZonedTime(new Date(), TIMEZONE);
    todayLocal.setHours(0, 0, 0, 0);
    if (parsed < todayLocal) {
      return NextResponse.json(
        { available: false, reason: "That date has already passed." },
        { status: 400 }
      );
    }

    // Check business hours for that day
    const dayName = DAY_NAMES[parsed.getDay()];
    const hours = businessConfig.weeklyHours[dayName];

    if (!hours) {
      return NextResponse.json({
        available: false,
        availableSlots: [],
        reason: `We are closed on ${dayName}s. Please choose another day.`,
      });
    }

    // Get all booked slots for that date
    const q = query(
      collection(db, "appointments"),
      where("appointmentDate", "==", appointmentDate),
      where("status", "==", "upcoming")
    );
    const snapshot = await getDocs(q);
    const bookedTimes = new Set(snapshot.docs.map((d) => d.data().appointmentTime as string));

    // Build available slots
    const allSlots = generateSlots(hours.open, hours.close);
    const availableSlots = allSlots.filter((slot) => !bookedTimes.has(slot));

    if (availableSlots.length === 0) {
      return NextResponse.json({
        available: false,
        availableSlots: [],
        reason: `We are fully booked on ${appointmentDate}. Please choose another day.`,
      });
    }

    return NextResponse.json({
      available: true,
      availableSlots,
      availableSlotsFormatted: availableSlots.map(fmt12),
      message: `Available slots on ${appointmentDate}: ${availableSlots.map(fmt12).join(", ")}.`,
    });
  } catch (err) {
    console.error("[check-availability]", err);
    return NextResponse.json(
      { available: false, reason: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
