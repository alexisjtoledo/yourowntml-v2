<script setup lang="ts">
import type { PropType, Option, DayName } from "@/types";
import { ref, watch, computed } from "vue";
import Selector from "@/components/Selector";
import { dayNames } from "@/assets/days";

const props = defineProps({
  day: {
    type: String as PropType<DayName>,
    default: null,
  },
});

const emits = defineEmits(["update:day"]);

const options = computed<Option[]>(() =>
  dayNames.map((day) => {
    return {
      id: day,
      label: day,
    };
  })
);

const currentDay = ref<DayName>(props.day);

watch(currentDay, () => emits("update:day", currentDay.value));
</script>

<template>
  <Selector v-model="currentDay" :options="options" id="day_selector" />
</template>
