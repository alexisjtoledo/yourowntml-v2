import { defineStore } from "pinia";
import type { Stages } from "@/types";
import { ref } from "vue";
import axios from "axios";

export const useStagesStore = defineStore("stages", () => {
  const stages = ref<Stages>(null);

  const getStages = () =>
    axios
      .get("https://www.tomorrowland.com/api/v2?method=LineUp.getStages&eventid=17&format=json")
      .then((res) => res.data)
      .then((data) => (stages.value = data))
      .catch((e) => console.error(e));

  return { stages, getStages };
});
