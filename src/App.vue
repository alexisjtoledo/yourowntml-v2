<script setup lang="ts">
import { onMounted } from "vue";
import { useStagesStore } from "@/stores/stagesStore";
import { useArtistsStore } from "@/stores/artistsStore";
import { useSessionStore } from "@/stores/sessionStore";
import Navbar from "@/components/Navbar";
import GridHeader from "@/components/GridHeader";
import Footer from "@/components/Footer";

const stagesStore = useStagesStore();
const artistsStore = useArtistsStore();
const sessionStore = useSessionStore();

onMounted(() => {
  sessionStore.initializeStore();
  stagesStore.getStages();
  artistsStore.getArtists();
});
</script>

<template>
  <div v-if="sessionStore.isSessionReady" class="App--main-grid">
    <Navbar />
    <GridHeader />
    <RouterView />
    <Footer />
  </div>
</template>
