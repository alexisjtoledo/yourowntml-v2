export type { PropType } from "vue";

interface Artist {
  id: string;
  name: string;
  uid: string;
  performances: Performance[];
  image: string;
  facebook: string;
  twitter: string;
  youtube: string;
  soundcloud: string;
}

interface Performance {
  id: string;
  stage_id: string;
  start_time: string;
  end_time: string;
}

interface PerformanceWithArtist extends Performance {
  artist_id: string;
  artist_name: string;
  artist_uid: string;
  artist_image: string;
}

interface PerformanceWithDates extends PerformanceWithArtist {
  day: Day;
}

interface PerformanceWithPosition extends PerformanceWithDates {
  start_position: number;
  end_position: number;
}

interface PerformanceWithStage extends PerformanceWithPosition {
  stage_name: string;
  stage_host: string;
  stage_order: number;
  stage_color: string;
}

interface ArtistPerformance extends PerformanceWithStage {}

interface Stage {
  id: string;
  host: string;
  name: string;
  priority: number;
  color: string;
}

type Weekend = "W1" | "W2";

type DayName = "friday" | "saturday" | "sunday";

type Day = "2024-07-19" | "2024-07-20" | "2024-07-21" | "2024-07-26" | "2024-07-27" | "2024-07-28";

type StageName =
  | "Atmosphere"
  | "Cage"
  | "Core"
  | "Crystal Garden"
  | "Elixir"
  | "Freedom"
  | "House of Fortune"
  | "Mainstage"
  | "Melodia"
  | "Moosebar"
  | "Planaxis"
  | "Rise"
  | "The Library"
  | "The Rave Cave"
  | "The Rose Garden";

type PerformanceAction = "add" | "remove";

interface Session {
  weekend: Weekend;
  day: Day;
  stage: StageName;
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

export type {
  Artist,
  Performance,
  Stage,
  Weekend,
  Session,
  ArtistPerformance,
  PerformanceWithArtist,
  PerformanceWithDates,
  PerformanceWithPosition,
  PerformanceWithStage,
  Day,
  Time,
  Option,
  DayName,
  Days,
  StageName,
  PerformanceAction,
};
