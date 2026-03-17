import { NextRequest, NextResponse } from "next/server";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

function fmt12(time: string): string {
  const [h, m] = time.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

export async function POST(req: NextRequest) {
  try {
    const { customerPhone, appointmentDate } = (await req.json()) as {
      customerPhone?: string;
      appointmentDate?: string;
    };

    if (!customerPhone) {
      return NextResponse.json(
        {
          success: false,
          reason:
            "Caller phone number is required to look up appointments.",
        },
        { status: 400 }
      );
    }

    // Build query: upcoming appointments for this phone number
    const constraints = [
      where("customerPhone", "==", customerPhone),
      where("status", "==", "upcoming"),
    ];
    if (appointmentDate) {
      constraints.push(where("appointmentDate", "==", appointmentDate));
    }

    const snapshot = await getDocs(
      query(collection(db, "appointments"), ...constraints)
    );

    if (snapshot.empty) {
      return NextResponse.json({
        success: false,
        reason: appointmentDate
          ? `No upcoming appointments found for your number on ${appointmentDate}.`
          : "No upcoming appointments found for your phone number.",
      });
    }

    // Multiple appointments — return the list so the agent can ask which one
    if (snapshot.size > 1) {
      const appointments = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          appointmentDate: data.appointmentDate,
          appointmentTime: data.appointmentTime,
          service: data.service,
          formattedTime: fmt12(data.appointmentTime as string),
        };
      });

      return NextResponse.json({
        success: false,
        multipleFound: true,
        count: snapshot.size,
        appointments,
        reason: `Found ${snapshot.size} upcoming appointments. Ask the caller which date they want to cancel, then call this tool again with the appointmentDate.`,
      });
    }

    // Exactly one match — cancel it
    const apptDoc = snapshot.docs[0];
    const apptData = apptDoc.data();

    await updateDoc(doc(db, "appointments", apptDoc.id), {
      status: "cancelled",
    });

    return NextResponse.json({
      success: true,
      cancelledAppointment: {
        customerName: apptData.customerName,
        service: apptData.service,
        appointmentDate: apptData.appointmentDate,
        appointmentTime: apptData.appointmentTime,
        formattedTime: fmt12(apptData.appointmentTime as string),
      },
      message: `Cancelled ${apptData.customerName}'s ${apptData.service} appointment on ${apptData.appointmentDate} at ${fmt12(apptData.appointmentTime as string)}.`,
    });
  } catch (err) {
    console.error("[cancel-appointment]", err);
    return NextResponse.json(
      { success: false, reason: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
