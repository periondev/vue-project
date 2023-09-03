<template>
  <main class="container mx-auto p-4">
    <div class="flex justify-center min-w-36 items-center space-x-4 my-4">
      <select v-model="selectedCity" @change="updateRegions">
        <option v-for="city in cities" :value="city">{{ city }}</option>
      </select>
      <select v-model="selectedRegion">
        <option v-for="region in regions" :value="region">{{ region }}</option>
      </select>
      <button @click="addToHistory">確認</button>
    </div>
    <ul>
      <li
        v-for="(history, index) in historyList"
        :key="index"
        @click="updateFromHistory(history)"
      >
        {{ history.city }} - {{ history.region }}
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import locationData from '../location.json';
import { useLocationStore } from '@/store/store';
import type { History } from '@/types';

export default defineComponent({
  name: 'Home',
  setup() {
    const cities = locationData.locations.map((location) => location.name);
    const selectedCity = ref(cities[0]);
    const regions =
      locationData.locations.find(
        (location) => location.name === selectedCity.value
      )?.regions || [];
    const selectedRegion = ref(regions[0]);
    //const historyList = ref<History[]>([]);
    const locationStore = useLocationStore();

    //BUG:再點擊宜蘭縣無法調出鄉鎮市區
    function updateRegions() {
      regions.length = 0;
      const selectedLocation = locationData.locations.find(
        (location) => location.name === selectedCity.value
      );
      if (selectedLocation) {
        regions.push(...selectedLocation.regions);
        selectedRegion.value = regions[0];
      }
    }

    // 實現數據持久化
    function addToHistory() {
      locationStore.historyList.unshift({
        city: selectedCity.value,
        region: selectedRegion.value,
      });
      if (locationStore.historyList.length > 8) {
        locationStore.historyList.pop();
      }
    }

    function updateFromHistory(history: History) {
      selectedCity.value = history.city;
      updateRegions();
      selectedRegion.value = history.region;
    }

    return {
      cities,
      selectedCity,
      regions,
      selectedRegion,
      addToHistory,
      historyList: locationStore.historyList,
      updateFromHistory,
      updateRegions,
    };
  },
});
</script>
