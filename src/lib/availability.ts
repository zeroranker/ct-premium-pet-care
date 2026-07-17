import { generateTimeSlots } from "./utils";

/**
 * Calculates available time slots based on the business rules:
 * Sat/Sun/Mon: All Day (9 AM - 6 PM)
 * Tue-Fri: 11 AM - 3 PM (End time is 3 PM, so last start time is 2:30 PM)
 */
export function getAvailableSlots(date: Date): string[] {
  const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday

  // 0 (Sun), 1 (Mon), 6 (Sat)
  if (dayOfWeek === 0 || dayOfWeek === 1 || dayOfWeek === 6) {
    // 9 AM to 6 PM (last start at 5:30 PM)
    return generateTimeSlots("09:00", "17:30");
  }

  // 2 (Tue), 3 (Wed), 4 (Thu), 5 (Fri)
  if (dayOfWeek >= 2 && dayOfWeek <= 5) {
    // 11 AM to 3 PM (last start at 2:30 PM)
    return generateTimeSlots("11:00", "14:30");
  }

  return [];
}

export function isDateAvailable(date: Date): boolean {
  return true;
}

export function getNextAvailableDays(daysAhead: number = 30): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < daysAhead; i++) {
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + i);
    if (isDateAvailable(futureDate)) {
      dates.push(futureDate);
    }
  }

  return dates;
}