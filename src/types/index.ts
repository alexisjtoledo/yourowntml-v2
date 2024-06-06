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

interface ArtistPerformance {
  id: string;
  artist_id: string;
  name: string;
  uid: string;
  stage_id: string;
  day: Day;
  start_time: string;
  start_position: number;
  end_time: string;
  end_position: number;
  image: string;
}

interface Performances {
  "2024-07-19": ArtistPerformance[];
  "2024-07-20": ArtistPerformance[];
  "2024-07-21": ArtistPerformance[];
  "2024-07-26": ArtistPerformance[];
  "2024-07-27": ArtistPerformance[];
  "2024-07-28": ArtistPerformance[];
}

interface Stage {
  id: string;
  host: string;
  name: string;
  priority: number;
  color: string;
}

type Weekend = "W1" | "W2" | null;

interface Session {
  weekend: Weekend;
}

type Day = keyof Performances;

type Time = {
  [index: number]: string;
};

export type {
  Artist,
  Performance,
  Stage,
  Weekend,
  Session,
  ArtistPerformance,
  Performances,
  Day,
  Time,
};
