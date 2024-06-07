<script setup lang="ts">
import WeekendSelector from "@/components/WeekendSelector";
import StageSelector from "@/components/StageSelector";
import { useSessionStore } from "@/stores/sessionStore";
import logo from "@/assets/tomorrowland.svg";

const sessionStore = useSessionStore();
</script>

<template>
  <header class="Navbar">
    <div class="Navbar--logo-container">
      <img :src="logo" alt="Tomorrowland logo" class="Navbar--logo" />
      <p class="Navbar--text">My own TML</p>
    </div>
    <div class="Navbar--selector-container">
      <WeekendSelector
        :weekend="sessionStore.weekend"
        @update:weekend="sessionStore.setWeekend"
        class="Navbar--selector"
      />
      <StageSelector
        :stage="sessionStore.stage"
        @update:stage="sessionStore.setStage"
        class="GridHeader--selector"
      />
    </div>
  </header>
</template>

<style scoped src="./Navbar.css" />
