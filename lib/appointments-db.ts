import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
  type QuerySnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export type AppointmentStatus = "upcoming" | "completed" | "cancelled";

export type Appointment = {
  id: string;
  sessionId: string;
  customerName: string;
  customerPhone: string;
  service: string;
  appointmentDate: string; // "YYYY-MM-DD"
  appointmentTime: string; // "HH:MM" 24h
  status: AppointmentStatus;
  notes: string;
  createdAt: Timestamp;
};

export type CreateAppointmentData = Omit<Appointment, "id" | "createdAt" | "status">;

const COLLECTION = "appointments";

export async function createAppointment(
  data: CreateAppointmentData
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    status: "upcoming" as AppointmentStatus,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function getAppointments(): Promise<Appointment[]> {
  const q = query(
    collection(db, COLLECTION),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshotToAppointments(snapshot);
}

export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), { status });
}

export function subscribeToAppointments(
  callback: (appointments: Appointment[]) => void
): () => void {
  const q = query(
    collection(db, COLLECTION),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (snapshot) => {
    callback(snapshotToAppointments(snapshot));
  });
}

function snapshotToAppointments(
  snapshot: QuerySnapshot<DocumentData>
): Appointment[] {
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Appointment, "id">),
  }));
}
