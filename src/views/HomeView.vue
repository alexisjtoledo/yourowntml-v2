<script setup lang="ts">
import DesktopDashboard from "@/layouts/DesktopDashboard";
import MobileDashboard from "@/layouts/MobileDashboard";
import { isMobile } from "@/helpers/mobile";
</script>

<template>
  <MobileDashboard v-if="isMobile" />
  <DesktopDashboard v-else />
</template>
