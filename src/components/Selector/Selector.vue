<script setup lang="ts">
import type { PropType, Option } from "@/types";
import { ref, watch } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    default: null,
  },
  options: {
    type: Array as PropType<Option[]>,
    default: () => [],
  },
});

const emits = defineEmits(["update:modelValue"]);

const currentValue = ref(props.modelValue);

watch(currentValue, () => emits("update:modelValue", currentValue.value));
</script>

<template>
  <select v-model="currentValue" :id="id" class="Selector">
    <option v-for="option in options" :key="`option_${option.id}_for_${id}`" :value="option.id">
      {{ option.label }}
    </option>
  </select>
</template>

<style scoped src="./Selector.css" />
