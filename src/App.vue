<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useStagesStore } from "@/stores/stagesStore";
import { useArtistsStore } from "@/stores/artistsStore";
import { useSessionStore } from "@/stores/sessionStore";
import Navbar from "@/components/Navbar";
import GridHeader from "@/components/GridHeader";
import Footer from "@/components/Footer";
import { isMobile } from "@/helpers/mobile";
const stagesStore = useStagesStore();
const artistsStore = useArtistsStore();
const sessionStore = useSessionStore();

const fetchAndLoad = () => {
  sessionStore.initializeStore();
  stagesStore.getStages();
  artistsStore.getArtists();
};

const appReady = computed(
  () => sessionStore.isSessionReady && artistsStore.areArtistsReady && stagesStore.areStagesReady
);

onMounted(() => {
  fetchAndLoad();
});
</script>

<template>
  <div v-if="appReady" class="App--main-grid">
    <Navbar />
    <GridHeader v-if="isMobile" />
    <RouterView />
    <Footer />
  </div>
  <div v-else class="App--loading">
    <font-awesome-icon :icon="['fas', 'spinner']" class="App--loading-icon" />
    LOADING APP...
  </div>
</template>
