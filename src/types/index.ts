export type { PropType } from "vue";

interface Artist {
  id: string;
  name: string;
  image?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  soundcloud?: string;
}

interface Performance {
  id: string;
  name: string;
  artists: Artist[];
  stage: Stage;
  startTime: string;
  endTime: string;
  day: DayName;
  date: Day;
}

interface PerformanceWithPosition extends Performance {
  start_position: number;
  end_position: number;
  has_transit: boolean;
}

interface ArtistPerformance extends PerformanceWithPosition {
  transit_from?: StageName;
  transit_time?: number;
  transit_start_position?: number;
}

type Hosts = {
  [day: string]: string;
};

interface Stage {
  id: string;
  hosts?: Hosts;
  name: string;
  priority?: number;
  color?: string;
}

type Weekend = "W1" | "W2";

type DayName = "FRIDAY" | "SATURDAY" | "SUNDAY";

type Day = "2024-07-19" | "2024-07-20" | "2024-07-21" | "2024-07-26" | "2024-07-27" | "2024-07-28";

type StageName =
  | "atmosphere"
  | "cage"
  | "core"
  | "crystal garden"
  | "elixir"
  | "freedom"
  | "house of fortune"
  | "mainstage"
  | "melodia"
  | "planaxis"
  | "rise"
  | "the library"
  | "the rave cave"
  | "the rose garden";

type PerformanceAction = "add" | "remove";

interface Session {
  weekend: Weekend;
  day: Day;
  stage: StageName;
  transit: boolean;
  performances: ArtistPerformance[];
}

type DayEquivalency = {
  [day: string]: Day;
};

type Days = {
  [week: string]: DayEquivalency;
};

type Time = {
  [index: number]: string;
};

interface Option {
  id: string;
  label: string;
}

type Distances = {
  [zone: number]: string[];
};

interface Transit {
  transit_for: string;
  transit_from?: StageName;
  transit_time?: number;
  transit_start_position?: number;
}

export type {
  Artist,
  Performance,
  Stage,
  Weekend,
  Session,
  ArtistPerformance,
  PerformanceWithPosition,
  Day,
  Time,
  Option,
  DayName,
  Days,
  StageName,
  PerformanceAction,
  Distances,
  Transit,
};
