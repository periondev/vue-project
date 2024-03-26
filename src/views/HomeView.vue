<template>
  <main class="container mx-auto px-4 mt-14 tracking-wide">
    <LocationMenu />
    <CurrentDisplay />
    <WeeklyDisplay />
  </main>
</template>

<script setup lang="ts">
import LocationMenu from '@/components/LocationMenu.vue';
import CurrentDisplay from '@/components/CurrentDisplay.vue';
import WeeklyDisplay from '@/components/WeeklyDisplay.vue';
</script>
