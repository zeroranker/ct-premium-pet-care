import { generateTimeSlots, formatDate } from "../utils";

describe("Utils Library", () => {
  describe("generateTimeSlots", () => {
    it("should generate 30-minute intervals correctly", () => {
      const slots = generateTimeSlots("09:00", "10:00");
      expect(slots).toEqual(["9:00 AM", "9:30 AM", "10:00 AM"]);
    });

    it("should handle single hour blocks", () => {
      const slots = generateTimeSlots("11:00", "12:00");
      expect(slots).toEqual(["11:00 AM", "11:30 AM", "12:00 PM"]);
    });

    it("should handle afternoon blocks correctly", () => {
      const slots = generateTimeSlots("13:00", "14:30");
      expect(slots).toEqual(["1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM"]);
    });

    it("should return empty array if start time is after end time", () => {
      const slots = generateTimeSlots("15:00", "09:00");
      expect(slots).toEqual([]);
    });
  });

  describe("formatDate", () => {
    it("should format a date correctly with dynamic year", () => {
      const currentYear = new Date().getFullYear();
      const date = new Date(`${currentYear}-10-15T10:00:00Z`);
      const formatted = formatDate(date);
      // Verify it matches the pattern "Weekday, October 15" without hardcoding the year or day
      expect(formatted).toMatch(/^[A-Z][a-z]+, October 15$/);
    });
  });
});