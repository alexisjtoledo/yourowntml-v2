<script setup lang="ts">
import TransitCheckbox from "@/components/TransitCheckbox";
import WeekendSelector from "@/components/WeekendSelector";
import StageSelector from "@/components/StageSelector";
import DaySelector from "@/components/DaySelector";
import { useSessionStore } from "@/stores/sessionStore";
import logo from "@/assets/tomorrowland.svg";
import { isMobile } from "@/helpers/mobile";

const sessionStore = useSessionStore();
</script>

<template>
  <header class="Navbar">
    <div class="Navbar--logo-container">
      <img :src="logo" alt="Tomorrowland logo" class="Navbar--logo" />
      <p v-if="!isMobile" class="Navbar--text">My own TML</p>
    </div>
    <div class="Navbar--selector-container">
      <WeekendSelector
        :weekend="sessionStore.weekend"
        @update:weekend="sessionStore.setWeekend"
        class="Navbar--selector"
      />
      <StageSelector
        v-if="isMobile"
        :stage="sessionStore.stage"
        @update:stage="sessionStore.setStage"
        class="GridHeader--selector"
      />
      <DaySelector
        v-else
        :day="sessionStore.dayName"
        @update:day="sessionStore.setDay($event)"
        class="GridHeader--selector"
      />
      <TransitCheckbox
        :checkbox="sessionStore.transitEnabled"
        @update:checkbox="sessionStore.setTransit"
      />
    </div>
  </header>
</template>

<style scoped src="./Navbar.css" />
