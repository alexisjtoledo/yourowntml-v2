<script setup lang="ts">
import time from "@/assets/time";
import { computed } from "vue";

const gridRows = computed(() => Object.keys(time).length);
</script>

<template>
  <div class="Timeline" :style="`grid-template-rows: repeat(${gridRows}, ${50 / 6}px);`">
    <slot name="artists" />
  </div>
</template>

<style scoped src="./Timeline.css" />
