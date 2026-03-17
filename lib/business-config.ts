export type DayHours = {
  open: string;  // "HH:MM" 24h
  close: string; // "HH:MM" 24h
} | null; // null = closed that day

export type WeeklyHours = {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
};

export const businessConfig = {
  name: "FreshCut",
  title: "Modern Barbershop in Waterloo",
  about:
    "FreshCut is a modern barbershop in the heart of Waterloo. We keep it simple. Great haircuts, clean beard work, and a relaxed atmosphere.",
  phone: "+1 (867) 679-1431",
  address: "258 King Street North, Waterloo, ON N2J 2Y9, Canada",
  services: [
    "Haircut",
    "Beard Trim",
    "Hot Towel Shave",
    "Haircut & Beard Combo",
  ],
  weeklyHours: {
    monday:    { open: "10:00", close: "19:00" },
    tuesday:   { open: "10:00", close: "19:00" },
    wednesday: { open: "10:00", close: "19:00" },
    thursday:  { open: "10:00", close: "20:00" },
    friday:    { open: "10:00", close: "20:00" },
    saturday:  { open: "09:00", close: "18:00" },
    sunday:    { open: "11:00", close: "16:00" },
  } satisfies WeeklyHours,
} as const;

export type BusinessConfig = typeof businessConfig;
