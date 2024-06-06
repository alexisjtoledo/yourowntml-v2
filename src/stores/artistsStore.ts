import { defineStore } from "pinia";
import type { Artist, Performances, Day, ArtistPerformance } from "@/types";
import { ref } from "vue";
import time from "@/assets/time";
import axios from "axios";

export const useArtistsStore = defineStore("artists", () => {
  const artists = ref<Artist[]>([]);

  const artistsPerformances = ref<ArtistPerformance[]>([]);

  const performances = ref<Performances>({
    "2024-07-19": [],
    "2024-07-20": [],
    "2024-07-21": [],
    "2024-07-26": [],
    "2024-07-27": [],
    "2024-07-28": [],
  });

  const getArtists = async () => {
    try {
      const res = await axios.get(
        "https://www.tomorrowland.com/api/v2?method=LineUp.getArtists&eventid=17&format=json"
      );
      const data = await res.data;
      artists.value = await data?.artists;
      getPerformancesFromArtists();
      sortArtistPerformances();
    } catch (error) {
      console.error(error);
    }
  };

  const getPerformancesFromArtists = () =>
    artists.value.forEach((artist) => artistsPerformances.value.push(standarizeArtist(artist)));

  const standarizeArtist = (artist: Artist): ArtistPerformance => {
    const temp: ArtistPerformance = {
      id: "",
      artist_id: artist.id,
      name: artist.name,
      uid: artist.uid,
      image: artist.image,
      day: "" as Day,
      stage_id: "",
      start_time: "",
      start_position: 0,
      end_time: "",
      end_position: 0,
    };

    artist.performances?.forEach((performance) => {
      temp.id = performance.id;
      temp.stage_id = performance.stage_id;
      temp.day = getDay(performance.start_time) as Day;
      temp.start_time = getTime(performance.start_time);
      temp.end_time = getTime(performance.end_time);
      temp.start_position = calculatePosition(performance.start_time);
      temp.end_position = calculatePosition(performance.end_time);
    });

    return temp;
  };

  const getDay = (dateTime: string) => dateTime.split(" ")[0];

  const calculatePosition = (value: string): number =>
    Number(Object.keys(time).find((key) => time[Number(key)] === value)) + 1;

  const getTime = (dateTime: string) => {
    const time = dateTime.split(" ")[1].split(":");
    return `${time[0]}:${time[1]}`;
  };

  const sortArtistPerformances = () => {
    artistsPerformances.value.forEach((artistPerformance) =>
      performances.value[artistPerformance.day].push(artistPerformance)
    );
  };

  return { artists, getArtists, artistsPerformances, performances };
});
