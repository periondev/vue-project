<template>
  <main class="container mx-auto p-4">
    <div class="flex justify-center min-w-36 items-center space-x-4 my-4">
      <select
        title="select city"
        v-model="selectedCity"
        @change="updateRegions"
      >
        <option v-for="city in cities" :key="city.dataId" :value="city.name">
          {{ city.name }}
        </option>
      </select>
      <select title="select region" v-model="selectedRegion">
        <option v-for="region in regions" :key="region" :value="region">
          {{ region }}
        </option>
      </select>
      <button type="submit" @click="confirm">確認</button>
    </div>
    <ul>
      <li v-for="(history, index) in historyList" :key="index">
        <span @click="updateFromHistory(history)" class="cursor-pointer"
          >{{ history.city }} - {{ history.region }}</span
        >
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import locationData from '../location.json';
import { useLocationStore } from '@/store/store';
import type { History } from '@/types';
console.log(locationData);

export default defineComponent({
  name: 'Home',
  setup() {
    // 讀取location全局狀態
    const locationStore = useLocationStore();
    // 視需要重設全局store狀態
    //locationStore.resetAllStores();

    // 從locationData讀取所有縣市資料
    const cities = ref(locationData);
    // 鄉鎮市區列表
    const regions = ref(cities.value[0].regions);
    // 選擇的縣市
    const selectedCity = ref(cities.value[0].name);
    // 選擇的鄉鎮市區
    const selectedRegion = ref(cities.value[0].regions[0]);
    // 根據選擇的縣市更新鄉鎮市區
    const updateRegions = () => {
      const city = cities.value.find((c) => c.name === selectedCity.value);
      if (city) {
        regions.value = city.regions;
        selectedRegion.value = city.regions[0];
      }
    };

    // 點擊確認按鈕，將選擇的縣市和鄉鎮市區加入歷史紀錄
    const confirm = () => {
      locationStore.addHistory(selectedCity.value, selectedRegion.value);
    };
    // 點擊歷史紀錄欄位，更新選擇的縣市和鄉鎮市區
    const updateFromHistory = (history: History) => {
      selectedCity.value = history.city;
      updateRegions();
      selectedRegion.value = history.region;
    };

    return {
      cities,
      regions,
      selectedCity,
      selectedRegion,
      updateRegions,
      confirm,
      historyList: locationStore.history,
      updateFromHistory,
    };
  },
});
</script>
