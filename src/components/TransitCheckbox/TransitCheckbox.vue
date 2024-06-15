<script setup lang="ts">
import { isMobile } from "@/helpers/mobile";
import { ref, watch } from "vue";

const props = defineProps({
  checkbox: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(["update:checkbox"]);

const currentValue = ref(props.checkbox);

watch(currentValue, () => emits("update:checkbox", currentValue.value));
</script>

<template>
  <label for="comments" class="TransitCheckbox">
    <font-awesome-icon
      v-if="isMobile"
      :icon="['fas', 'person-walking']"
      class="TransitCheckbox--icon"
    />
    <input
      id="comments"
      name="comments"
      type="checkbox"
      v-model="currentValue"
      class="TransitCheckbox--input"
    />
    <span v-if="!isMobile" class="TransitCheckbox--label">Show walking distances</span>
  </label>
</template>

<style scoped src="./TransitCheckbox.css" />
