<script setup lang="ts">
import type { PropType, Weekend } from "@/types";
import { ref, watch } from "vue";

const props = defineProps({
  weekend: {
    type: String as PropType<Weekend>,
    default: null,
  },
});

const emits = defineEmits(["update:weekend"]);

const currentWeekend = ref<Weekend>(props.weekend);

watch(currentWeekend, () => {
  emits("update:weekend", currentWeekend.value);
});
</script>

<template>
  <select v-model="currentWeekend" id="weekend-selector" class="WeekendSelector">
    <option value="W1">Weekend 1</option>
    <option value="W2">Weekend 2</option>
  </select>
</template>

<style scoped src="./WeekendSelector.css" />
