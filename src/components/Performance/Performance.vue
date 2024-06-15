<script setup lang="ts">
import type { PropType, ArtistPerformance } from "@/types";
import { useSessionStore } from "@/stores/sessionStore";
import { computed } from "vue";

const sessionStore = useSessionStore();

const emits = defineEmits(["click"]);

defineProps({
  performance: {
    type: Object as PropType<ArtistPerformance>,
    required: true,
  },
  hideStage: {
    type: Boolean,
    default: false,
  },
});

const colors = computed(() => {
  // Check color format or use customs
  // if (props.performance.stage_color)
  //   return `
  //     background-color: ${};
  //     border-color: ${};
  //   `;
  return "";
});
</script>

<template>
  <button
    class="Performance"
    :class="{ 'Performance--has-transit': sessionStore.transitEnabled && performance.has_transit }"
    :style="colors"
    @click.prevent.stop="emits('click', performance)"
  >
    <div class="Performance--container">
      <h2 class="Performance--title">{{ performance.artist_name }}</h2>
      <p v-if="!hideStage" class="Performance--stage">{{ performance.stage_name }}</p>
      <p class="Performance--time">{{ performance.start_time }} - {{ performance.end_time }}</p>
    </div>
  </button>
</template>

<style scoped src="./Performance.css" />
