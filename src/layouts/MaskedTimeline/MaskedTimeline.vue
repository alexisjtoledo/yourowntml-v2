<script setup lang="ts">
import Background from "@/components/Background";
import Chronology from "@/components/Chronology";
import { isMobile } from "@/helpers/mobile";

defineProps({
  stageName: {
    type: String,
    default: null,
  },
});
</script>

<template>
  <div class="MaskedTimeline">
    <h3 v-if="!isMobile && !!stageName" class="MaskedTimeline--title">
      {{ stageName }}
    </h3>
    <div class="MaskedTimeline--content">
      <Background />
      <Chronology />
      <div class="MaskedTimeline--slot">
        <slot name="timeline" />
      </div>
    </div>
  </div>
</template>

<style scoped src="./MaskedTimeline.css" />
