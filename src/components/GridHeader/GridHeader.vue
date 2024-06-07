<script setup lang="ts">
import { useSessionStore } from "@/stores/sessionStore";
const sessionStore = useSessionStore();
</script>

<template>
  <div class="GridHeader">
    <div class="GridHeader--item" style="grid-area: chronology-h" />
    <div class="GridHeader--item" style="grid-area: current-h">
      <p>YOUR SCHEDULE</p>
    </div>
    <div class="GridHeader--item" style="grid-area: stage-h">
      <p>
        {{ `STAGE: ${sessionStore.stage.toUpperCase()}` }}
      </p>
    </div>
  </div>
</template>

<style scoped src="./GridHeader.css" />
