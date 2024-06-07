import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import axios from "axios";
import time from "@/assets/time";
import type {
  Artist,
  Day,
  ArtistPerformance,
  PerformanceWithArtist,
  PerformanceWithPosition,
  PerformanceWithDates,
  Stage,
  StageName,
} from "@/types";

import { useStagesStore } from "@/stores/stagesStore";

export const useArtistsStore = defineStore("artists", () => {
  const stagesStore = useStagesStore();
  const { stages } = storeToRefs(stagesStore);

  const artists = ref<Artist[]>([]);
  const rawPerformances = ref<PerformanceWithArtist[]>([]);
  const artistsPerformances = ref<ArtistPerformance[]>([]);

  const visiblePerformances = (day: Day, stage: StageName) =>
    artistsPerformances.value.filter(
      (performance) => performance.day === day && stage === performance.stage_name
    );

  const getArtists = async () => {
    try {
      const res = await axios.get(
        "https://www.tomorrowland.com/api/v2?method=LineUp.getArtists&eventid=17&format=json"
      );
      const data = await res.data;
      artists.value = await data?.artists;
      artists.value.forEach((artist) => mergeArtist(artist));
      mergeData();
    } catch (error) {
      console.error(error);
    }
  };

  const mergeData = () => {
    const performances = rawPerformances.value.map((performance) => {
      let temp: any = performance;
      temp = mergeDate(temp);
      temp = mergePosition(temp);
      temp = mergeStage(temp);
      return temp;
    });
    artistsPerformances.value = performances;
  };

  const mergeArtist = (artist: Artist) => {
    const temp: PerformanceWithArtist[] = [];
    artist.performances?.forEach((performance) => {
      temp.push({
        ...performance,
        artist_id: artist.id,
        artist_image: artist.image,
        artist_name: artist.name,
        artist_uid: artist.uid,
      });
    });
    rawPerformances.value = [...rawPerformances.value, ...temp];
  };

  const mergeDate = (performance: PerformanceWithArtist): PerformanceWithDates => {
    return {
      ...performance,
      day: getDay(performance.start_time) as Day,
      start_time: getTime(performance.start_time),
      end_time: getTime(performance.end_time),
    };
  };

  const mergePosition = (performance: PerformanceWithDates): PerformanceWithPosition => {
    return {
      ...performance,
      start_position: calculatePosition(performance.start_time),
      end_position: calculatePosition(performance.end_time),
    };
  };

  const mergeStage = (performance: PerformanceWithPosition): ArtistPerformance => {
    const stage: Stage = getStage(performance.stage_id);
    return {
      ...performance,
      stage_name: stage.name,
      stage_host: stage.host,
      stage_color: stage.color,
      stage_order: stage.priority,
    };
  };

  const getDay = (dateTime: string) => dateTime.split(" ")[0];

  const calculatePosition = (value: string): number =>
    Number(Object.keys(time).find((key) => time[Number(key)] === value)) + 1;

  const getTime = (dateTime: string) => {
    const time = dateTime.split(" ")[1].split(":");
    return `${time[0]}:${time[1]}`;
  };

  const getStage = (id: string): Stage => {
    return (
      stages.value.find((stage) => stage.id === id) || {
        id: id,
        name: "",
        host: "",
        color: "",
        priority: 999,
      }
    );
  };

  return {
    artists,
    getArtists,
    artistsPerformances,
    visiblePerformances,
  };
});
