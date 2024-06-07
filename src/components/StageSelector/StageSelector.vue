<script setup lang="ts">
import type { Option, PropType, StageName } from "@/types";
import { computed, ref, watch } from "vue";
import Selector from "@/components/Selector";
import { useStagesStore } from "@/stores/stagesStore";

const stagesStore = useStagesStore();

const props = defineProps({
  stage: {
    type: String as PropType<StageName>,
    default: null,
  },
});

const emits = defineEmits(["update:stage"]);

const options = computed<Option[]>(() =>
  stagesStore.stageNames.map((stage) => {
    return {
      id: stage,
      label: stage,
    };
  })
);

const currentStage = ref<StageName>(props.stage);

watch(currentStage, () => emits("update:stage", currentStage.value));
</script>

<template>
  <Selector v-model="currentStage" :options="options" id="stage_selector" />
</template>
