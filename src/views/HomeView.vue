<template>
  <main class="container mx-auto p-3">
    <!-- 選擇地區 -->
    <div class="flex justify-center min-w-36 items-center space-x-4 my-4">
      <select
        name="city"
        title="select city"
        v-model="selectedCity"
        @change="updateRegions"
        class="rounded-full px-5 py-1.5"
      >
        <option v-for="city in cities" :key="city.dataId" :value="city.name">
          {{ city.name }}
        </option>
      </select>
      <select
        name="region"
        title="select region"
        v-model="selectedRegion"
        class="rounded-full px-5 py-1.5"
      >
        <option v-for="region in regions" :key="region" :value="region">
          {{ region }}
        </option>
      </select>
      <button
        type="button"
        @click="confirm"
        class="text-white font-bold bg-sky-700 hover:bg-sky-600 rounded-full px-3 py-1.5"
      >
        查詢
      </button>
    </div>
    <!-- 地區歷史紀錄 -->
    <ul class="grid grid-cols-3 gap-x-4 mb-4">
      <li v-for="(history, index) in historyList" :key="index">
        <div class="relative py-2 text-sky-100">
          <div
            @click="updateFromHistory(history)"
            class="rounded-full duration-150 cursor-pointer border border-sky-100"
          >
            <span
              class="flex flex-wrap text-sm py-1.5 justify-center hover:scale-110 duration-150"
            >
              <p>{{ history.city }}</p>
              <p>{{ history.region }}</p>
            </span>
          </div>
          <i
            @click="deleteItem(index)"
            class="fa-solid fa-circle-minus duration-150 cursor-pointer absolute bottom-0 right-0 hover:scale-125"
          ></i>
        </div>
      </li>
    </ul>
    <WeatherDisplay />
  </main>
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
