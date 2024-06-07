import { defineStore } from "pinia";
import type { Stage, StageName } from "@/types";
import { ref } from "vue";
import axios from "axios";

export const useStagesStore = defineStore("stages", () => {
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
    } catch (error) {
      console.error(error);
    }
  };

  const getStageNames = () => {
    const fullNames = stages.value.map((stage) => stage.name);
    const uniqueNames = [...new Set(fullNames)].sort();
    stageNames.value = uniqueNames as StageName[];
  };

  const trimStageName = (name: string) => name.split("by")[0].trim();

  return { stages, stageNames, getStages };
});
