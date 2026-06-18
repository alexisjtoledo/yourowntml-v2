import type { DayName, Days } from "@/types";

const days: Days = {
  W1: {
    FRIDAY: "2026-07-17",
    SATURDAY: "2026-07-18",
    SUNDAY: "2026-07-19",
  },
  W2: {
    FRIDAY: "2026-07-24",
    SATURDAY: "2026-07-25",
    SUNDAY: "2026-07-26",
  },
};

const dayNames: DayName[] = ["FRIDAY", "SATURDAY", "SUNDAY"];

export { days, dayNames };
