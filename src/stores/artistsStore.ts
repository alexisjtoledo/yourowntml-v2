import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import time from "@/assets/time";
import type {
  Artist,
  Day,
  ArtistPerformance,
  Performance,
  PerformanceWithPosition,
  StageName,
} from "@/types";

import { useStagesStore } from "@/stores/stagesStore";

export const useArtistsStore = defineStore("artists", () => {
  const stagesStore = useStagesStore();

  const areArtistsReady = ref<boolean>(false);
  const artists = ref<Artist[]>([]);
  const rawPerformances = ref<Performance[]>([]);
  const artistsPerformances = ref<ArtistPerformance[]>([]);

  const visiblePerformances = (day: Day, stage: StageName) => {
    const visible = artistsPerformances.value.filter(
      (performance) => performance.date === day && stage === performance.stage.name
    );
    const filtered = visible.filter(
      (performance) => performance.start_position !== performance.end_position
    );
    const sorted = filtered.sort((a, b) => a.start_position - b.start_position);
    return sorted;
  };

  const getArtists = async () => {
    try {
      const resW1 = await axios.get(
        "https://artist-lineup-cdn.tomorrowland.com/TLBE24-W1-211903bb-da4c-445d-a1b3-6b17479a9fab.json"
      );
      const resW2 = await axios.get(
        "https://artist-lineup-cdn.tomorrowland.com/TLBE24-W2-211903bb-da4c-445d-a1b3-6b17479a9fab.json"
      );
      const dataW1 = await resW1.data;
      const dataW2 = await resW2.data;
      rawPerformances.value = [...dataW1.performances, ...dataW2.performances];

      mergeData();
      areArtistsReady.value = !!artistsPerformances.value.length;
    } catch (error) {
      console.error(error);
    }
  };

  const mergeData = () => {
    const performances = rawPerformances.value.map((performance) => {
      let temp: any = performance;
      temp = mergeDate(temp);
      temp = mergePosition(temp);
      return temp;
    });
    artistsPerformances.value = performances;
  };

  const mergeDate = (performance: Performance): Performance => {
    return {
      ...performance,
      startTime: getTime(performance.startTime),
      endTime: getTime(performance.endTime),
    };
  };

  const mergePosition = (performance: Performance): PerformanceWithPosition => {
    const temp = {
      ...performance,
      start_position: calculatePosition(performance.startTime),
      end_position: calculatePosition(performance.endTime),
      has_transit: false,
    };
    temp.stage.name = stagesStore.trimStageName(temp.stage.name);
    return temp;
  };

  const calculatePosition = (value: string): number =>
    Number(Object.keys(time).find((key) => time[Number(key)] === value)) + 1;

  const getTime = (dateTime: string) => {
    const time = dateTime.split(" ")[1].split(":");
    return `${time[0]}:${time[1]}`;
  };

  return {
    areArtistsReady,
    artists,
    getArtists,
    artistsPerformances,
    visiblePerformances,
    calculatePosition,
  };
});
