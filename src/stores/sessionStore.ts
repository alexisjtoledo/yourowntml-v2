import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";
import type { Weekend, Session, Day, ArtistPerformance, StageName, Transit } from "@/types";
import { useStagesStore } from "@/stores/stagesStore";

export const useSessionStore = defineStore("session", () => {
  // const stagesStore = useStagesStore();
  // const { userTransit } = storeToRefs(stagesStore);

  const isSessionReady = ref<boolean>(false);
  const weekend = ref<Weekend>("W1");
  const day = ref<Day>(weekend.value === "W1" ? "2024-07-19" : "2024-07-26");
  const stage = ref<StageName>("Mainstage");
  const userPerformances = ref<ArtistPerformance[]>([]);

  const localData = computed(() => {
    return {
      weekend: weekend.value,
      day: day.value,
      stage: stage.value,
      performances: userPerformances.value,
    };
  });

  const initializeStore = () => {
    const previousSession: Session | null = getLocal();
    if (previousSession) {
      weekend.value = previousSession.weekend;
      day.value = previousSession.day;
      userPerformances.value = previousSession.performances;
    }
    isSessionReady.value = true;
  };

  const setWeekend = (payload: Weekend) => {
    if (weekend.value === payload) return;

    weekend.value = payload;
    day.value = payload === "W1" ? "2024-07-19" : "2024-07-26";
    saveLocal();
  };

  const setDay = (payload: Day) => {
    if (day.value === payload) return;

    day.value = payload;
    saveLocal();
  };

  const setStage = (payload: StageName) => {
    if (stage.value === payload) return;

    stage.value = payload;
    saveLocal();
  };

  const addPerformance = (payload: ArtistPerformance) => {
    const alreadyExists = !!userPerformances.value?.find(
      (performance) => performance.id === payload.id
    );
    if (alreadyExists) return;

    userPerformances.value.push(payload);
    saveLocal();
  };

  const removePerformance = (id: string) => {
    const nonExistent = !userPerformances.value?.find((performance) => performance.id === id);
    if (nonExistent) return;

    userPerformances.value = userPerformances.value.filter((performance) => performance.id !== id);
    saveLocal();
  };

  const getLocal = (): Session | null =>
    window.sessionStorage.getItem("tml__session")
      ? JSON.parse(window.sessionStorage.getItem("tml__session") as string)
      : null;

  const saveLocal = () =>
    window.sessionStorage.setItem("tml__session", JSON.stringify(localData.value));

  const visibleUserPerformances = computed(() =>
    userPerformances.value.filter((performance) => performance.day === day.value)
  );
  //   {
  //   const performancesWithTransit = userPerformances.value.map((performance) =>
  //     mergeTransit(performance)
  //   );
  //   return performancesWithTransit.filter((performance) => performance.day === day.value);
  // };

  // const mergeTransit = (performance: ArtistPerformance): ArtistPerformance => {
  //   const transit = userTransit.value.find(
  //     (transit: Transit) => transit.transit_for === performance.id
  //   );

  //   console.log(transit);

  //   return {
  //     ...performance,
  //     has_transit: false,
  //     transit_time: 0,
  //     transit_from: "Mainstage",
  //     transit_start_position: 0,
  //   };
  // };

  return {
    weekend,
    setWeekend,
    day,
    setDay,
    stage,
    setStage,
    initializeStore,
    isSessionReady,
    visibleUserPerformances,
    addPerformance,
    removePerformance,
  };
});
