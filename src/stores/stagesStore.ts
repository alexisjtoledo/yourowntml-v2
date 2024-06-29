import { defineStore } from "pinia";
import { ref } from "vue";
import type { ArtistPerformance, Stage, StageName, Transit } from "@/types";
import distances from "@/assets/distance";
import stagesData from "@/data/stages.json";
// import axios from "axios";

export const useStagesStore = defineStore("stages", () => {
  const areStagesReady = ref<boolean>(false);
  const stages = ref<Stage[]>([]);
  const stageNames = ref<StageName[]>([]);

  const getStages = async () => {
    try {
      // const res = await axios.get(
      //   "https://www.tomorrowland.com/api/v2?method=LineUp.getStages&eventid=17&format=json"
      // );
      // const data = await res.data;
      // stages.value = await data?.stages;
      stages.value = stagesData as Stage[];
      stages.value.forEach((stage) => (stage.name = trimStageName(stage.name)));
      getStageNames();
      areStagesReady.value = !!stageNames.value;
    } catch (error) {
      console.error(error);
    }
  };

  const getStageNames = () => {
    const fullNames = stages.value.map((stage) => stage.name.toLowerCase());
    const uniqueNames = [...new Set(fullNames)].sort((a, b) => a.localeCompare(b));
    stageNames.value = uniqueNames as StageName[];
  };

  const generateTransit = (
    firstPerformance: ArtistPerformance | undefined,
    secondPerformance: ArtistPerformance
  ): Transit | null => {
    if (!firstPerformance) return null; // Don't calculate it for the fist performance
    if (firstPerformance.stage.name === secondPerformance.stage.name) return null; // If the stage is the same, don't calculate it

    const zones: number[] = [];
    Object.keys(distances).forEach((zone) => {
      if (distances[Number(zone)].includes(firstPerformance.stage.name)) zones[0] = Number(zone);
      if (distances[Number(zone)].includes(secondPerformance.stage.name)) zones[1] = Number(zone);
    });
    zones.sort((a, b) => a - b);

    const rawDistance = zones[1] - zones[0]; // Difference between zones

    // Add 10 minutes for each zone travelled through
    // Base of 5 minutes for stages within the same zone
    const zonesTravelTime = rawDistance ? rawDistance * 2 : 1;

    // Increase the travel time acording which time is it
    const travelTimeByHour = zonesTravelTime * timeMultiplier(secondPerformance.start_position);

    // Round the travel time so we don't get decimals and weird behaviours on the grid
    const roundedTravelTimeByHour = Math.ceil(travelTimeByHour);

    // Set a minimum and maximum travel time
    const travelTimeWithinBoundaries = distanceLimits(roundedTravelTimeByHour);

    const transit: Transit = {
      transit_for: secondPerformance.id,
      transit_from: firstPerformance.stage.name as StageName,
      transit_start_position: secondPerformance.start_position - travelTimeWithinBoundaries,
      transit_time: travelTimeWithinBoundaries,
    };

    return transit;
  };

  const trimStageName = (name: string) => name.split("BY")[0].trim();

  const distanceLimits = (value: number) => {
    // Set a max and min walking time
    switch (true) {
      case value > 9:
        return 9; // 45 mins
      case value < 3:
        return 3; // 15 mins
      default:
        return value;
    }
  };

  const timeMultiplier = (position: number) => {
    // Multiply the value according the time of the day
    switch (true) {
      case position > 120:
        return 2;
      case position > 78:
        return 1.5;
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
    trimStageName,
  };
});
