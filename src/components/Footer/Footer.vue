<script setup lang="ts">
import { useSessionStore } from "@/stores/sessionStore";
import { dayNames } from "@/assets/days";
import { isMobile } from "@/helpers/mobile";

const sessionStore = useSessionStore();
</script>

<template>
  <footer class="Footer">
    <template v-if="isMobile">
      <button
        v-for="day in dayNames"
        :key="`day_button_${day}`"
        @click="sessionStore.setDay(day)"
        class="Footer--item"
        :class="{ 'Footer--item-active': sessionStore.dayName === day }"
      >
        {{ day.toUpperCase() }}
      </button>
    </template>
    <p v-else class="Footer--text">Tomorrowland 2024</p>
  </footer>
</template>

<style scoped src="./Footer.css" />
