import { getAvailableSlots, isDateAvailable, getNextAvailableDays } from "../availability";

describe("Availability Library", () => {
  describe("isDateAvailable", () => {
    it("should return true for any date (current business logic)", () => {
      const date = new Date("2024-10-15");
      expect(isDateAvailable(date)).toBe(true);
    });
  });

  describe("getAvailableSlots", () => {
    it("should return 9 AM to 5:30 PM slots for Sunday (Day 0)", () => {
      const sunday = new Date("2024-10-13"); 
      const slots = getAvailableSlots(sunday);
      expect(slots[0]).toBe("9:00 AM");
      expect(slots[slots.length - 1]).toBe("5:30 PM");
    });

    it("should return 9 AM to 5:30 PM slots for Saturday (Day 6)", () => {
      const saturday = new Date("2024-10-12");
      const slots = getAvailableSlots(saturday);
      expect(slots[0]).toBe("9:00 AM");
      expect(slots[slots.length - 1]).toBe("5:30 PM");
    });

    it("should return 9 AM to 5:30 PM slots for Monday (Day 1)", () => {
      const monday = new Date("2024-10-14");
      const slots = getAvailableSlots(monday);
      expect(slots[0]).toBe("9:00 AM");
      expect(slots[slots.length - 1]).toBe("5:30 PM");
    });

    it("should return 11 AM to 2:30 PM slots for Tuesday (Day 2)", () => {
      const tuesday = new Date("2024-10-15");
      const slots = getAvailableSlots(tuesday);
      expect(slots[0]).toBe("11:00 AM");
      expect(slots[slots.length - 1]).toBe("2:30 PM");
    });

    it("should return 11 AM to 2:30 PM slots for Friday (Day 5)", () => {
      const friday = new Date("2024-10-18");
      const slots = getAvailableSlots(friday);
      expect(slots[0]).toBe("11:00 AM");
      expect(slots[slots.length - 1]).toBe("2:30 PM");
    });
  });

  describe("getNextAvailableDays", () => {
    it("should return the specified number of days", () => {
      const days = getNextAvailableDays(5);
      expect(days.length).toBe(5);
    });

    it("should start from the current day", () => {
      const days = getNextAvailableDays(1);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      expect(days[0].getTime()).toBe(today.getTime());
    });
  });
});