<script setup lang="ts">
import time from "@/assets/time";
</script>

<template>
  <section class="Chronology">
    <template v-for="i in Object.keys(time)" :key="`chronology-time-${i}`">
      <div v-if="Number(i) % 12 === 0" class="Chronology--time">{{ time[Number(i)] }}</div>
      <div
        v-if="Number(i) % 6 === 0 && Number(i) % 12 !== 0"
        class="Chronology--time Chronology--small"
      >
        {{ time[Number(i)] }}
      </div>
    </template>
  </section>
</template>

<style scoped src="./Chronology.css" />
