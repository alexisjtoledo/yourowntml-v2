import { defineStore } from "pinia";
import { computed, ref, watchEffect } from "vue";
import type { Weekend, Session, Day, ArtistPerformance, StageName, DayName } from "@/types";
import { useStagesStore } from "@/stores/stagesStore";
import { days } from "@/assets/days";

export const useSessionStore = defineStore("session", () => {
  const stagesStore = useStagesStore();

  const isSessionReady = ref<boolean>(false);
  const weekend = ref<Weekend>("W1");
  const day = ref<Day>(weekend.value === "W1" ? "2026-07-17" : "2026-07-24");
  const stage = ref<StageName>("mainstage");
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
    day.value = payload === "W1" ? "2026-07-17" : "2026-07-24";
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
    window.localStorage.getItem("tml__session")
      ? JSON.parse(window.localStorage.getItem("tml__session") as string)
      : null;

  // Debounced save to avoid blocking the main thread when localData is large.
  // Multiple rapid updates will coalesce into a single write.
  let saveTimeout: number | null = null;
  const saveLocal = () => {
    if (saveTimeout !== null) {
      clearTimeout(saveTimeout);
    }
    saveTimeout = window.setTimeout(() => {
      try {
        window.localStorage.setItem("tml__session", JSON.stringify(localData.value));
      } catch (e) {
        // swallow storage errors to avoid breaking the app; could log if desired
        // console.error('Failed saving session:', e);
      } finally {
        saveTimeout = null;
      }
    }, 120);
  };
  // Work on shallow clones so we never mutate the original reactive objects.
  const mergeTransit = (performances: ArtistPerformance[]): ArtistPerformance[] => {
    const cloned: ArtistPerformance[] = performances.map((p) => ({ ...p }));

    for (let i = 0; i < cloned.length; i++) {
      const prev = cloned[i - 1] || null;
      const cur = cloned[i];
      const transit = stagesStore.generateTransit(prev, cur);
      if (transit) {
        cur.has_transit = true;
        cur.transit_from = transit.transit_from;
        cur.transit_time = transit.transit_time;
        cur.transit_start_position =
          typeof transit.transit_start_position === "number"
            ? transit.transit_start_position
            : Number(cur.transit_start_position ?? cur.start_position ?? 0);
      } else {
        cur.has_transit = false;
        cur.transit_start_position = cur.start_position;
        delete cur.transit_from;
        delete cur.transit_time;
      }
    }

    // Sort the cloned array by the computed transit start (non-mutating for source)
    cloned.sort((a, b) => {
      const aPos = Number(a.transit_start_position ?? a.start_position ?? 0);
      const bPos = Number(b.transit_start_position ?? b.start_position ?? 0);
      return aPos - bPos;
    });

    return cloned;
  };

  // Cached visible performances: recompute only when the inputs change to avoid heavy
  // work during render. This prevents repeated calls to generateTransit on every access.
  const cachedVisiblePerformances = ref<ArtistPerformance[]>([]);

  // Recompute whenever the inputs change. watchEffect tracks reactive reads (including
  // array mutations like push/pop) and runs immediately.
  watchEffect(() => {
    const visible = userPerformances.value.filter((performance) => performance.date === day.value);
    const sorted = visible.slice().sort((a, b) => {
      const aPos = Number(a.transit_start_position ?? a.start_position ?? 0);
      const bPos = Number(b.transit_start_position ?? b.start_position ?? 0);
      return aPos - bPos;
    });
    cachedVisiblePerformances.value = mergeTransit(sorted);
  });

  const visibleUserPerformances = computed(() => cachedVisiblePerformances.value);

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
