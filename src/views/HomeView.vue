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
    <!-- <WeatherTable /> -->
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import locationData from '../location.json';
import { useStore } from '@/store/store';
import type { History } from '@/types';
import WeatherTable from '@/components/WeatherDisplay.vue';

export default defineComponent({
  name: 'Home',
  components: { WeatherTable },
  setup() {
    // 讀取location全局狀態
    const store = useStore();
    // 視需要重設全局store狀態
    //store.resetAllStores();

    // 從locationData讀取所有縣市資料
    const cities = ref(locationData);
    // 鄉鎮市區列表
    const regions = ref(cities.value[0].regions);
    // 選擇的縣市
    const selectedCity = ref(cities.value[0].name);
    // 選擇的鄉鎮市區
    const selectedRegion = ref(cities.value[0].regions[0]);
    // 選擇的縣市dataID
    const selectedCityDataId = ref(cities.value[0].dataId);

    //fetchWeather()函數在組件掛載到 DOM 後執行一次，取得預設地區天氣資料。
    onMounted(() => {
      store.fetchWeather(
        selectedCity.value,
        selectedRegion.value,
        selectedCityDataId.value
      );
      console.log(store.weather);
    });
    // 根據選擇的縣市更新鄉鎮市區
    const updateRegions = () => {
      const city = cities.value.find((c) => c.name === selectedCity.value);
      if (city) {
        regions.value = city.regions;
        selectedRegion.value = city.regions[0];
      }
    };

    // 點擊確認按鈕，將選擇的縣市和鄉鎮市區加入歷史紀錄，異步更新該地區天氣
    const confirm = async () => {
      store.addHistory(
        selectedCity.value,
        selectedRegion.value,
        selectedCityDataId.value
      );
      await store.fetchWeather(
        selectedCity.value,
        selectedRegion.value,
        selectedCityDataId.value
      );
      console.log(store.weather);
    };
    // 點擊歷史紀錄欄位，更新選擇的縣市和鄉鎮市區，異步更新該地區天氣
    const updateFromHistory = async (history: History) => {
      selectedCity.value = history.city;
      updateRegions();
      selectedRegion.value = history.region;
      await store.fetchWeather(history.city, history.region, history.dataId);
      console.log(store.weather);
    };

    return {
      cities,
      regions,
      selectedCity,
      selectedRegion,
      updateRegions,
      confirm,
      historyList: store.history,
      updateFromHistory,
    };
  },
});
</script>
