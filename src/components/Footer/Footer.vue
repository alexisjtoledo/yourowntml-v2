<script setup lang="ts">
import { useSessionStore } from "@/stores/sessionStore";
import { days, dayNames } from "@/assets/days";
import type { DayName } from "@/types";

const sessionStore = useSessionStore();

const switchDay = (value: (typeof dayNames)[number]) => {
  sessionStore.setDay(days[sessionStore.weekend][value]);
};

const active = (day: DayName) => days[sessionStore.weekend][day] === sessionStore.day;
</script>

<template>
  <footer class="Footer">
    <button
      v-for="day in dayNames"
      :key="`day_button_${day}`"
      @click="switchDay(day)"
      class="Footer--item"
      :class="{ 'Footer--item-active': active(day) }"
    >
      {{ day.toUpperCase() }}
    </button>
  </footer>
</template>

<style scoped src="./Footer.css" />
