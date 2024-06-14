<script setup lang="ts">
import { isMobile } from "@/helpers/mobile";
import { computed, useSlots } from "vue";

const slot = useSlots();

const props = defineProps({
  start: {
    type: Number,
    required: true,
  },
  end: {
    type: Number,
    required: true,
  },
  transit: {
    type: Number,
    default: 0,
  },
});

const totalLength = computed(() => props.end - props.start);

const performanceLength = computed(() => totalLength.value - props.transit);

const gridPosition = computed(() =>
  isMobile.value
    ? `
      grid-row-start: ${props.start};
      grid-row-end: ${props.end};`
    : `
      grid-column-start: ${props.start};
      grid-column-end: ${props.end};
    `
);

const subGridStructure = computed(() => {
  return !slot.transit
    ? ``
    : `
      display: grid;
      grid-template-${isMobile.value ? "columns" : "rows"}: 1fr;
      grid-template-${isMobile.value ? "rows" : "columns"}: ${props.transit}fr ${performanceLength.value}fr;
    `;
});

const style = computed(() => `${gridPosition.value} ${subGridStructure.value}`);
</script>

<template>
  <div class="PerformanceWrapper" :style="style">
    <slot v-if="slot.transit" name="transit" />
    <slot name="performance" />
  </div>
</template>
