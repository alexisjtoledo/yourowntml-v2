<script setup lang="ts">
import { onMounted } from "vue";
import { useStagesStore } from "@/stores/stagesStore";
import { useArtistsStore } from "@/stores/artistsStore";
import { useSessionStore } from "@/stores/sessionStore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WeekendSelector from "@/components/WeekendSelector";

const stagesStore = useStagesStore();
const artistsStore = useArtistsStore();
const sessionStore = useSessionStore();

onMounted(() => {
  sessionStore.initializeStore();
  artistsStore.getArtists();
  stagesStore.getStages();
});
</script>

<template>
  <div v-if="sessionStore.isSessionReady" class="App--main-grid">
    <Navbar>
      <template #logo>
        <nav class="flex gap-3">
          <RouterLink class="Navbar--menu-item" to="/">Home</RouterLink>
          <RouterLink class="Navbar--menu-item" to="/weekend">Weekend</RouterLink>
        </nav>
      </template>

      <template #weekend>
        <WeekendSelector
          :weekend="sessionStore.weekend"
          @update:weekend="sessionStore.setWeekend"
        />
      </template>
    </Navbar>
    <RouterView />
    <Footer />
  </div>
</template>
