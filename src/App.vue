<template>
  <div
    class="flex flex-col min-h-screen font-Roboto bg-fixed bg-cover bg-[url('/bg-outdoor.jpg')]"
  >
    <SiteNavigation />
    <RouterView />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import SiteNavigation from './components/SiteNavigation.vue';
import AppFooter from './components/Footer.vue';
</script>
