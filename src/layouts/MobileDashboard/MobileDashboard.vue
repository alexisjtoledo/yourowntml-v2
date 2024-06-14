<script setup lang="ts">
import type { ArtistPerformance, PerformanceAction } from "@/types";

import Background from "@/components/Background";
import Chronology from "@/components/Chronology";
import Timeline from "@/components/Timeline";
import Performance from "@/components/Performance";
import PerformanceWrapper from "@/layouts/PerformanceWrapper";
import Transit from "@/components/Transit";

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
    has_transit: true,
    transit_from: "The Library",
    transit_time: 2,
    transit_start_position: 77,
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
    has_transit: true,
    transit_from: "Cage",
    transit_time: 6,
    transit_start_position: 31,
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
</script>

<template>
  <main class="MobileDashboard--main-container">
    <Background />
    <Chronology />
    <Timeline style="grid-area: current">
      <template #artists>
        <PerformanceWrapper
          v-for="performance in example"
          :key="`user_performance_${performance.id}`"
          :start="
            performance.has_transit
              ? (performance.transit_start_position as number)
              : performance.start_position
          "
          :end="performance.end_position"
          :transit="performance.has_transit ? performance.transit_time : 0"
        >
          <template v-if="performance.has_transit" #transit>
            <Transit :performance="performance" />
          </template>

          <template #performance>
            <Performance :performance="performance" @click="handlePerformance($event, 'remove')" />
          </template>
        </PerformanceWrapper>
      </template>
    </Timeline>
    <Timeline style="grid-area: stage">
      <template #artists>
        <PerformanceWrapper
          v-for="performance in artistsStore.visiblePerformances(
            sessionStore.day,
            sessionStore.stage
          )"
          :key="`stage_${sessionStore.stage}_performance_${performance.id}`"
          :start="performance.start_position"
          :end="performance.end_position"
        >
          <template #performance>
            <Performance :performance="performance" @click="handlePerformance($event, 'add')" />
          </template>
        </PerformanceWrapper>
      </template>
    </Timeline>
  </main>
</template>

<style scoped src="./MobileDashboard.css" />
