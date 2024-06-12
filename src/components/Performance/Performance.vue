<script setup lang="ts">
import { isMobile } from "@/helpers/mobile";
import type { PropType, ArtistPerformance } from "@/types";
import { computed } from "vue";

const emits = defineEmits(["click"]);

const props = defineProps({
  performance: {
    type: Object as PropType<ArtistPerformance>,
    required: true,
  },
  hideStage: {
    type: Boolean,
    default: false,
  },
});

const gridPosition = computed(() =>
  isMobile.value
    ? `
  grid-row-start: ${props.performance.start_position};
  grid-row-end: ${props.performance.end_position};`
    : `
  grid-column-start: ${props.performance.start_position};
  grid-column-end: ${props.performance.end_position};`
);

const colors = computed(() => {
  // Check color format or use customs
  // if (props.performance.stage_color)
  //   return `
  //     background-color: ${};
  //     border-color: ${};
  //   `;
  return "";
});

const style = computed(() => `${gridPosition.value} ${colors.value}`);
</script>

<template>
  <button class="Performance" :style="style" @click.prevent.stop="emits('click', performance)">
    <img
      v-if="false && !!performance.artist_image"
      :src="performance.artist_image"
      :alt="`${performance.artist_name} profile`"
      class="Performance--image"
    />
    <div class="Performance--container">
      <h2 class="Performance--title">{{ performance.artist_name }}</h2>
      <p v-if="!hideStage" class="Performance--stage">{{ performance.stage_name }}</p>
      <p class="Performance--time">{{ performance.start_time }} - {{ performance.end_time }}</p>
    </div>
  </button>
</template>

<style scoped src="./Performance.css" />
