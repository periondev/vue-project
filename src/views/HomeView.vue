<template>
  <main class="container mx-auto p-4">
    <!-- 選擇並輸入地區 -->
    <div class="flex justify-center min-w-36 items-center space-x-4 my-4">
      <select
        name="city"
        title="select city"
        v-model="selectedCity"
        @change="updateRegions"
        class="rounded-full px-4 py-2"
      >
        <option v-for="city in cities" :key="city.dataId" :value="city.name">
          {{ city.name }}
        </option>
      </select>
      <select
        name="region"
        title="select region"
        v-model="selectedRegion"
        class="rounded-full px-4 py-2"
      >
        <option v-for="region in regions" :key="region" :value="region">
          {{ region }}
        </option>
      </select>
      <button
        type="submit"
        @click="confirm"
        class="text-white bg-violet-700 hover:bg-violet-800 rounded-full px-4 py-2"
      >
        確認
      </button>
    </div>
    <!-- 地區歷史紀錄 -->
    <ul class="grid grid-cols-3 mb-4 text-cyan-200">
      <li v-for="(history, index) in historyList" :key="index">
        <div class="relative p-2">
          <div
            @click="updateFromHistory(history)"
            class="flex flex-wrap text-sm p-2 justify-center rounded-full hover:text-white hover:border-white duration-150 cursor-pointer border border-cyan-200"
          >
            <p>{{ history.city }}</p>
            <p>{{ history.region }}</p>
          </div>
          <i
            @click="deleteItem(index)"
            class="fa-solid fa-circle-minus hover:text-white duration-150 cursor-pointer absolute bottom-0 right-0 pr-1 pb-1"
          ></i>
        </div>
      </li>
    </ul>
  </main>
  <WeatherDisplay />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import locationData from '../location.json';
import { useStore } from '@/store/store';
import type { History, WeatherData } from '@/types';
import WeatherDisplay from '@/components/WeatherDisplay.vue';

export default defineComponent({
  name: 'Home',
  components: { WeatherDisplay },
  setup() {
    const store = useStore();
    // 視需要重設全局store狀態
    //store.resetAllStores();
    //console.log(store.weatherData);
    // 從locationData讀取所有縣市資料
    const cities = locationData;
    const regions = ref(cities[0].regions);
    const selectedCity = ref(cities[0].name);
    const selectedRegion = ref(cities[0].regions[0]);
    const selectedCityDataId = ref(cities[0].dataId);

    //fetchWeather()函數在組件掛載到 DOM 後執行一次，取得預設地區天氣資料。
    onMounted(() => {
      store.fetchWeather('宜蘭縣', '羅東鎮', 'F-D0047-003');
    });
    // 根據選擇的縣市更新鄉鎮市區清單，更新縣市並顯示鄉鎮市區第一位
    const updateRegions = () => {
      const city = cities.find((c) => c.name === selectedCity.value);
      if (city) {
        regions.value = city.regions; // 所選取縣市的鄉鎮市區
        selectedRegion.value = city.regions[0]; // 鄉鎮市區第一位
        selectedCityDataId.value = city.dataId;
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
    };
    // 點擊歷史紀錄欄位，更新選擇的縣市和鄉鎮市區，異步更新該地區天氣
    const updateFromHistory = async (history: History) => {
      selectedCity.value = history.city;
      selectedCityDataId.value = history.dataId;
      updateRegions();
      selectedRegion.value = history.region;
      await store.fetchWeather(history.city, history.region, history.dataId);
    };

    // 點擊刪除歷史紀錄中所選的地區
    const deleteItem = (index: number) => {
      store.deleteFromHistory(index);
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
      deleteItem,
    };
  },
});
</script>
