import type { DayName, Days } from "@/types";

const days: Days = {
  W1: {
    FRIDAY: "2025-07-18",
    SATURDAY: "2025-07-19",
    SUNDAY: "2025-07-20",
  },
  W2: {
    FRIDAY: "2025-07-25",
    SATURDAY: "2025-07-26",
    SUNDAY: "2025-07-27",
  },
};

const dayNames: DayName[] = ["FRIDAY", "SATURDAY", "SUNDAY"];

export { days, dayNames };
