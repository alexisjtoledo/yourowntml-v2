<script setup lang="ts">
import type { ArtistPerformance, PropType } from "@/types";
import { computed } from "vue";

const props = defineProps({
  performance: {
    type: Object as PropType<ArtistPerformance>,
    required: true,
  },
});

const humanWalkingDistance = computed(
  () => `~${(props.performance.transit_time as number) * 5} min.`
);
</script>

<template>
  <div class="Transit">
    <font-awesome-icon :icon="['fas', 'person-walking']" class="Transit--icon" />
    <p class="Transit--stage">from {{ performance.transit_from }}</p>
    <p class="Transit--time">{{ humanWalkingDistance }}</p>
  </div>
</template>

<style scoped src="./Transit.css" />
