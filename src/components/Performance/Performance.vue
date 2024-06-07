<script setup lang="ts">
import type { PropType, ArtistPerformance } from "@/types";
import { computed } from "vue";

const emits = defineEmits(["click"]);

const props = defineProps({
  performance: {
    type: Object as PropType<ArtistPerformance>,
    required: true,
  },
});

const gridPosition = computed(
  () => `
  grid-row-start: ${props.performance.start_position};
  grid-column-start: 0;
  grid-row-end: ${props.performance.end_position};
  grid-column-end: 1;`
);
</script>

<template>
  <button
    class="Performance"
    :style="gridPosition"
    @click.prevent.stop="emits('click', performance)"
  >
    <h2 class="Performance--title">{{ performance.artist_name }}</h2>
    <p class="Performance--time">{{ performance.start_time }} - {{ performance.end_time }}</p>
  </button>
</template>

<style scoped src="./Performance.css" />
