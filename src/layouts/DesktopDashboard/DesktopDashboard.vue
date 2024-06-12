<script setup lang="ts">
import type { ArtistPerformance, PerformanceAction } from "@/types";

import MaskedTimeline from "@/layouts/MaskedTimeline";
import Timeline from "@/components/Timeline";
import Performance from "@/components/Performance";

import { useArtistsStore } from "@/stores/artistsStore";
import { useSessionStore } from "@/stores/sessionStore";
import { useStagesStore } from "@/stores/stagesStore";
const artistsStore = useArtistsStore();
const sessionStore = useSessionStore();
const stagesStore = useStagesStore();

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

const nameToSnakeCase = (name: string) => name.split(" ").join("-");

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
  <main class="DesktopDashboard--main-container">
    <h2 class="DesktopDashboard--title" style="grid-area: current-title">YOUR SCHEDULE</h2>

    <MaskedTimeline style="grid-area: current">
      <template #timeline>
        <Timeline>
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
      </template>
    </MaskedTimeline>

    <h2 class="DesktopDashboard--title" style="grid-area: stages-title">OTHER STAGES</h2>
    <MaskedTimeline
      v-for="(stage, i) in stagesStore.stageNames"
      :key="`stage-${nameToSnakeCase(stage)}`"
      :stage-name="stage"
      :style="`grid-area: stage-${i}`"
    >
      <template #timeline>
        <Timeline>
          <template #artists>
            <Performance
              v-for="performance in artistsStore.visiblePerformances(sessionStore.day, stage)"
              :key="`stage_${nameToSnakeCase(stage)}_performance_${performance.id}`"
              :performance="performance"
              hide-stage
              @click="handlePerformance($event, 'add')"
            />
          </template>
        </Timeline>
      </template>
    </MaskedTimeline>
  </main>
</template>

<style scoped src="./DesktopDashboard.css" />
