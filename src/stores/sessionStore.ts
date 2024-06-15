import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Weekend, Session, Day, ArtistPerformance, StageName, DayName } from "@/types";
import { useStagesStore } from "@/stores/stagesStore";
import { days } from "@/assets/days";

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
    has_transit: false,
  },
  {
    id: "9028",
    artist_id: "5415",
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
    has_transit: false,
  },
  {
    id: "9029",
    artist_id: "5416",
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
    has_transit: false,
  },
  {
    id: "9030",
    artist_id: "5417",
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
    has_transit: false,
  },
];

export const useSessionStore = defineStore("session", () => {
  const stagesStore = useStagesStore();

  const isSessionReady = ref<boolean>(false);
  const weekend = ref<Weekend>("W1");
  const day = ref<Day>(weekend.value === "W1" ? "2024-07-19" : "2024-07-26");
  const stage = ref<StageName>("Mainstage");
  const transitEnabled = ref<boolean>(true);
  const userPerformances = ref<ArtistPerformance[]>([]);

  const dayName = computed<DayName>(
    () =>
      Object.keys(days[weekend.value]).find(
        (key) => days[weekend.value][key] === day.value
      ) as DayName
  );

  const localData = computed(() => {
    return {
      weekend: weekend.value,
      day: day.value,
      stage: stage.value,
      performances: userPerformances.value,
      transit: transitEnabled.value,
    };
  });

  const initializeStore = () => {
    const previousSession: Session | null = getLocal();
    if (previousSession) {
      weekend.value = previousSession.weekend;
      day.value = previousSession.day;
      userPerformances.value = previousSession.performances;
      transitEnabled.value = previousSession.transit;
    }
    isSessionReady.value = true;
  };

  const setWeekend = (payload: Weekend) => {
    if (weekend.value === payload) return;

    weekend.value = payload;
    day.value = payload === "W1" ? "2024-07-19" : "2024-07-26";
    saveLocal();
  };

  const setDay = (payload: DayName) => {
    if (dayName.value === payload) return;

    day.value = days[weekend.value][payload];
    saveLocal();
  };

  const setStage = (payload: StageName) => {
    if (stage.value === payload) return;

    stage.value = payload;
    saveLocal();
  };

  const setTransit = (payload: boolean) => {
    if (transitEnabled.value === payload) return;

    transitEnabled.value = payload;
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

  const visibleUserPerformances = computed(() => {
    // const visible = userPerformances.value.filter((performance) => performance.day === day.value);
    // const sorted = visible.sort((a, b) => a.start_position - b.start_position);
    const sorted = example.sort((a, b) => a.start_position - b.start_position);
    const withTransit = mergeTransit(sorted);
    return withTransit;
  });

  const mergeTransit = (performances: ArtistPerformance[]): ArtistPerformance[] => {
    const temp: ArtistPerformance[] = Array.from(performances);

    temp.map((performance, i) => {
      const transit = stagesStore.generateTransit(temp[i - 1] || null, temp[i]);

      if (transit) {
        performance.has_transit = true;
        performance.transit_from = transit.transit_from;
        performance.transit_time = transit.transit_time;
        performance.transit_start_position = transit.transit_start_position;
      }
      return performance;
    });

    return temp;
  };

  return {
    weekend,
    setWeekend,
    day,
    dayName,
    setDay,
    stage,
    setStage,
    transitEnabled,
    setTransit,
    initializeStore,
    isSessionReady,
    visibleUserPerformances,
    addPerformance,
    removePerformance,
  };
});
