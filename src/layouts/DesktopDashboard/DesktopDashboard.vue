<script setup lang="ts">
import type { ArtistPerformance, PerformanceAction } from "@/types";

import MaskedTimeline from "@/layouts/MaskedTimeline";
import Timeline from "@/components/Timeline";
import Performance from "@/components/Performance";
import PerformanceWrapper from "@/layouts/PerformanceWrapper";
import Transit from "@/components/Transit";

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

const showTransit = (performance: ArtistPerformance) =>
  sessionStore.transitEnabled && performance.has_transit;
</script>

<template>
  <main class="DesktopDashboard--main-container">
    <h2 class="DesktopDashboard--title" style="grid-area: current-title">YOUR SCHEDULE</h2>

    <MaskedTimeline style="grid-area: current">
      <template #timeline>
        <Timeline>
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
                <Performance
                  :performance="performance"
                  @click="handlePerformance($event, 'remove')"
                />
              </template>
            </PerformanceWrapper>
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
            <PerformanceWrapper
              v-for="performance in artistsStore.visiblePerformances(sessionStore.day, stage)"
              :key="`stage_${nameToSnakeCase(stage)}_performance_${performance.id}`"
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
      </template>
    </MaskedTimeline>
  </main>
</template>

<style scoped src="./DesktopDashboard.css" />
