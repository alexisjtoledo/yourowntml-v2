<script setup lang="ts">
import type { ArtistPerformance, PerformanceAction } from "@/types";

import Background from "@/components/Background";
import Chronology from "@/components/Chronology";
import Timeline from "@/components/Timeline";
import Performance from "@/components/Performance";

import { useArtistsStore } from "@/stores/artistsStore";
import { useSessionStore } from "@/stores/sessionStore";
const artistsStore = useArtistsStore();
const sessionStore = useSessionStore();

const handlePerformance = (performance: ArtistPerformance, action: PerformanceAction) => {
  switch (action) {
    case "add":
      sessionStore.addPerformance(performance);
      break;
    case "remove":
      sessionStore.removePerformance(performance.id);
      break;
    default:
      return;
  }
};

const example: ArtistPerformance = {
  id: "9027",
  artist_id: "5414",
  artist_name: "Idle Days",
  artist_uid: "idle-days",
  artist_image:
    "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSRKQS-XxuhlaGEygrNPASBm3zwcJ5VcPUEYHK_czwZGYt8OfcB",
  day: "2024-07-26",
  stage_id: "1639",
  stage_color: "#FF0000",
  stage_host: "",
  stage_name: "The Library",
  stage_order: 0,
  start_time: "13:00",
  end_time: "14:00",
  start_position: artistsStore.calculatePosition("13:00"),
  end_position: artistsStore.calculatePosition("14:00"),
};
</script>

<template>
  <main class="MobileDashboard--main-container">
    <Background />
    <Chronology />
    <Timeline style="grid-area: current">
      <template #artists>
        <Performance :performance="example" @click="handlePerformance" />
        <Performance
          v-for="performance in sessionStore.visibleUserPerformances"
          :key="`user_performance_${performance.id}`"
          :performance="performance"
          @click="handlePerformance($event, 'remove')"
        />
      </template>
    </Timeline>
    <Timeline style="grid-area: stage">
      <template #artists>
        <Performance
          v-for="performance in artistsStore.visiblePerformances(
            sessionStore.day,
            sessionStore.stage
          )"
          :key="`stage_performance_${performance.id}`"
          :performance="performance"
          @click="handlePerformance($event, 'add')"
        />
      </template>
    </Timeline>
  </main>
</template>

<style scoped src="./MobileDashboard.css" />
