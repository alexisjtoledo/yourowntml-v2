import { defineStore } from "pinia";
import type { Weekend, Session } from "@/types";
import { ref } from "vue";

export const useSessionStore = defineStore("session", () => {
  const isSessionReady = ref<boolean>(false);
  const weekend = ref<Weekend>(null);

  const initializeStore = () => {
    const previousSession: Session = window.sessionStorage.getItem("tml__session")
      ? JSON.parse(window.sessionStorage.getItem("tml__session") as string)
      : null;
    if (previousSession) {
      weekend.value = previousSession.weekend;
    }
    isSessionReady.value = true;
  };

  const setWeekend = (payload: Weekend) => {
    weekend.value = payload;
    window.sessionStorage.setItem(
      "tml__session",
      JSON.stringify({
        weekend: weekend.value,
      })
    );
  };

  return { initializeStore, isSessionReady, weekend, setWeekend };
});
