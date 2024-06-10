import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import type { Stage, StageName } from "@/types";

export const useStagesStore = defineStore("stages", () => {
  const stages = ref<Stage[]>([]);
  const stageNames = ref<StageName[]>([]);

  const getStages = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_STAGES_API);
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
