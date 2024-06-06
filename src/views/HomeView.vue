<script setup lang="ts">
import Background from "@/components/Background";
import Chronology from "@/components/Chronology";
import Timeline from "@/components/Timeline";
import Performance from "@/components/Performance";
import type { ArtistPerformance } from "@/types";

const example: ArtistPerformance = {
  id: "9027",
  artist_id: "5414",
  name: "Idle Days",
  uid: "idle-days",
  image: "",
  day: "2024-07-26",
  stage_id: "1639",
  start_time: "13:00",
  end_time: "13:45",
  start_position: 13,
  end_position: 22,
};
</script>

<template>
  <main class="HomeView--main-container">
    <Background />
    <Chronology />
    <Timeline style="grid-area: current">
      <template #artists>
        <Performance :performance="example" />
      </template>
    </Timeline>
    <Timeline style="grid-area: stage" />
    <!-- {{ artistsStore.performances }} -->
  </main>
</template>
