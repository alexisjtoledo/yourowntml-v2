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

const showTransit = (performance: ArtistPerformance) =>
  sessionStore.transitEnabled && performance.has_transit;
</script>

<template>
  <main class="MobileDashboard--main-container">
    <Background />
    <Chronology />
    <Timeline style="grid-area: current">
      <template #artists>
        <PerformanceWrapper
          v-for="performance in sessionStore.visibleUserPerformances"
          :key="`user_performance_${performance.id}_walking_${sessionStore.transitEnabled ? 'enabled' : 'disabled'}`"
          :start="
            showTransit(performance)
              ? (performance.transit_start_position as number)
              : performance.start_position
          "
          :end="performance.end_position"
          :transit="showTransit(performance) ? performance.transit_time : 0"
        >
          <template v-if="showTransit(performance)" #transit>
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
            <Performance
              :performance="performance"
              hide-stage
              @click="handlePerformance($event, 'add')"
            />
          </template>
        </PerformanceWrapper>
      </template>
    </Timeline>
  </main>
</template>

<style scoped src="./MobileDashboard.css" />
