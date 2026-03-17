"use client";

import { useEffect, useState } from "react";
import {
  subscribeToAppointments,
  updateAppointmentStatus,
  type Appointment,
  type AppointmentStatus,
} from "@/lib/appointments-db";

export type { Appointment, AppointmentStatus };

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAppointments((data) => {
      setAppointments(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function changeStatus(id: string, status: AppointmentStatus) {
    try {
      await updateAppointmentStatus(id, status);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status");
    }
  }

  return { appointments, loading, error, changeStatus };
}
