import { defineStore } from "pinia";
import { ref } from "vue";
import type { ArtistPerformance, Stage, StageName, Transit } from "@/types";
import distances from "@/assets/distance";
import axios from "axios";

export const useStagesStore = defineStore("stages", () => {
  const areStagesReady = ref<boolean>(false);
  const stages = ref<Stage[]>([]);
  const stageNames = ref<StageName[]>([]);

  const getStages = async () => {
    try {
      const res = await axios.get(
        "https://www.tomorrowland.com/api/v2?method=LineUp.getStages&eventid=17&format=json"
      );
      const data = await res.data;
      stages.value = await data?.stages;
      stages.value.forEach((stage) => (stage.name = trimStageName(stage.name)));
      getStageNames();
      areStagesReady.value = !!stageNames.value;
    } catch (error) {
      console.error(error);
    }
  };

  const getStageNames = () => {
    const fullNames = stages.value.map((stage) => stage.name);
    const uniqueNames = [...new Set(fullNames)].sort((a, b) => a.localeCompare(b));
    stageNames.value = uniqueNames as StageName[];
  };

  const generateTransit = (
    firstPerformance: ArtistPerformance | undefined,
    secondPerformance: ArtistPerformance
  ): Transit | null => {
    if (!firstPerformance) return null; // Don't calculate it for the fist performance
    if (firstPerformance.stage_name === secondPerformance.stage_name) return null; // If the stage is the same, don't calculate it

    const zones: number[] = [];
    Object.keys(distances).forEach((zone) => {
      if (distances[Number(zone)].includes(firstPerformance.stage_name)) zones[0] = Number(zone);
      if (distances[Number(zone)].includes(secondPerformance.stage_name)) zones[1] = Number(zone);
    });
    zones.sort((a, b) => a - b);

    const rawDistance = zones[1] - zones[0]; // Difference between zones

    // If they are within the same zone, give 10 mins as minimum
    // Add 15mins for each zone you need to travel
    const distanceCoefficient =
      (rawDistance ? rawDistance * 3 : 2) * timeMultiplier(secondPerformance.start_position);

    const transit: Transit = {
      transit_for: secondPerformance.id,
      transit_from: firstPerformance.stage_name as StageName,
      transit_start_position: secondPerformance.start_position - distanceCoefficient,
      transit_time: distanceCoefficient,
    };

    return transit;
  };

  const trimStageName = (name: string) => name.split("by")[0].trim();

  const timeMultiplier = (position: number) => {
    // Multiply the value according the time of the day
    switch (true) {
      case position > 120:
        return 3;
      case position > 78:
        return 2;
      default:
        return 1;
    }
  };

  return {
    areStagesReady,
    stages,
    stageNames,
    getStages,
    generateTransit,
  };
});
