<script setup lang="ts">
import type { PropType, Weekend, Option } from "@/types";
import { ref, watch } from "vue";
import Selector from "@/components/Selector";

const props = defineProps({
  weekend: {
    type: String as PropType<Weekend>,
    default: null,
  },
});

const emits = defineEmits(["update:weekend"]);

const options = ref<Option[]>([
  { id: "W1", label: "Weekend 1" },
  { id: "W2", label: "Weekend 2" },
]);

const currentWeekend = ref<Weekend>(props.weekend);

watch(currentWeekend, () => emits("update:weekend", currentWeekend.value));
</script>

<template>
  <Selector v-model="currentWeekend" :options="options" id="weekend_selector" />
</template>
