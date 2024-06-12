<script setup lang="ts">
import time from "@/assets/time";
import { isMobile } from "@/helpers/mobile";
import { computed } from "vue";

const gridSlots = computed(() => Object.keys(time).length);

const style = computed(() => {
  return isMobile.value
    ? `
    grid-template-rows: repeat(${gridSlots.value}, ${50 / 6}px);
    grid-auto-columns: 1fr;
    `
    : `
    grid-auto-rows: 1fr;
    grid-template-columns: repeat(${gridSlots.value}, ${100 / 6}px);
  `;
});
</script>

<template>
  <div class="Timeline">
    <div class="Timeline--stage" :style="style">
      <slot name="artists" />
    </div>
  </div>
</template>

<style scoped src="./Timeline.css" />
