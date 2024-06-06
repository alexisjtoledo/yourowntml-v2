<script setup lang="ts">
const divisions = 27;
</script>

<template>
  <section class="Background">
    <span
      v-for="i in divisions"
      :key="`Background-time-${i}`"
      class="Background--division"
      :class="Number(i) % 2 === 0 ? 'Background--divisions--even' : 'Background--divisions--odd'"
    />
  </section>
</template>

<style scoped src="./Background.css" />
