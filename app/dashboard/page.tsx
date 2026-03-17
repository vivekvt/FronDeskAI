import { Header } from "@/components/dashboard/header";
import { AppointmentsList } from "@/components/appointments/appointments-list";

export default function DashboardPage() {
  return (
    <>
      <Header
        title="Appointments"
        description="Real-time bookings from your voice agent"
      />
      <AppointmentsList />
    </>
  );
}
