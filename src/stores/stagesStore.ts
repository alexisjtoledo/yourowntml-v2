import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import type { Stage, StageName, ArtistPerformance, Transit } from "@/types";
import distances from "@/assets/distance";

export const useStagesStore = defineStore("stages", () => {
  const stages = ref<Stage[]>([]);
  const stageNames = ref<StageName[]>([]);
  // const userTransit = ref<Transit[]>([]);

  const example: ArtistPerformance[] = [
    {
      id: "9027",
      artist_id: "5414",
      artist_name: "Idle Days",
      artist_uid: "idle-days",
      artist_image: "",
      day: "2024-07-26",
      stage_id: "1639",
      stage_color: "#FF0000",
      stage_host: "",
      stage_name: "Mainstage",
      stage_order: 0,
      start_time: "18:30",
      end_time: "20:00",
      start_position: 79,
      end_position: 97,
    },
    {
      id: "9028",
      artist_id: "5414",
      artist_name: "Alibi",
      artist_uid: "alibi",
      artist_image: "",
      day: "2024-07-26",
      stage_id: "1639",
      stage_color: "#FF0000",
      stage_host: "",
      stage_name: "Cage",
      stage_order: 0,
      start_time: "13:00",
      end_time: "14:00",
      start_position: 13,
      end_position: 25,
    },
    {
      id: "9029",
      artist_id: "5414",
      artist_name: "Bassjackers",
      artist_uid: "bassjackers",
      artist_image: "",
      day: "2024-07-26",
      stage_id: "1639",
      stage_color: "#FF0000",
      stage_host: "",
      stage_name: "The Library",
      stage_order: 0,
      start_time: "15:00",
      end_time: "16:25",
      start_position: 37,
      end_position: 54,
    },
    {
      id: "9030",
      artist_id: "5414",
      artist_name: "Another one",
      artist_uid: "another-one",
      artist_image: "",
      day: "2024-07-26",
      stage_id: "1639",
      stage_color: "#FF0000",
      stage_host: "",
      stage_name: "Mainstage",
      stage_order: 0,
      start_time: "20:30",
      end_time: "22:00",
      start_position: 103,
      end_position: 121,
    },
  ];

  const getStages = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_STAGES_API);
      const data = await res.data;
      stages.value = await data?.stages;
      stages.value.forEach((stage) => (stage.name = trimStageName(stage.name)));
      getStageNames();
      // generateTransit(example);
    } catch (error) {
      console.error(error);
    }
  };

  const getStageNames = () => {
    const fullNames = stages.value.map((stage) => stage.name);
    const uniqueNames = [...new Set(fullNames)].sort((a, b) => a.localeCompare(b));
    stageNames.value = uniqueNames as StageName[];
  };

  // const generateTransit = (userSchedule: ArtistPerformance[]) => {
  //   const sorted = Array.from(userSchedule.sort((a, b) => a.start_position - b.start_position));

  //   const temp: Transit[] = [];
  //   sorted.forEach((performance, index) => {
  //     if (index === 0) return;

  //     const fromStage = sorted[index - 1].stage_name;
  //     const toStage = performance.stage_name;

  //     if (fromStage === toStage) return;
  //     const zones: number[] = [];

  //     Object.keys(distances).forEach((zone) => {
  //       if (distances[Number(zone)].includes(fromStage)) zones[0] = Number(zone);
  //       if (distances[Number(zone)].includes(toStage)) zones[1] = Number(zone);
  //     });

  //     zones.sort((a, b) => a - b);
  //     const rawDistance = zones[1] - zones[0];
  //     const distanceCoefficient =
  //       (rawDistance ? rawDistance * 2 : 1) * timeMultiplier(performance.start_position);

  //     const transit: Transit = {
  //       transit_for: performance.id,
  //       transit_from: fromStage as StageName,
  //       transit_start_position: performance.start_position - distanceCoefficient,
  //       transit_time: distanceCoefficient,
  //     };

  //     temp.push(transit);
  //     userTransit.value = temp;
  //   });
  // };

  const trimStageName = (name: string) => name.split("by")[0].trim();

  // const timeMultiplier = (position: number) => {
  //   switch (true) {
  //     case position > 120:
  //       return 3;
  //     case position > 78:
  //       return 2;
  //     default:
  //       return 1;
  //   }
  // };

  return {
    stages,
    stageNames,
    getStages,
    // userTransit,
    // generateTransit
  };
});
