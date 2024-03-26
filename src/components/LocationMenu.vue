<template>
  <div class="grid grid-cols-2 md:flex justify-center gap-y-4 gap-x-3 my-6">
    <!-- 選擇縣市 -->
    <select
      name="city"
      title="select city"
      autocomplete="off"
      v-model="selectedCity"
      @change="updateRegions"
      class="rounded-full truncate"
    >
      <option v-for="city in cities" :key="city.name" :value="city.name">
        {{ $t(city.name) }}
      </option>
    </select>
    <!-- 選擇鄉鎮市區 -->
    <select
      name="region"
      title="select region"
      autocomplete="off"
      v-model="selectedRegion"
      class="rounded-full truncate"
    >
      <option v-for="region in regions" :key="region" :value="region">
        {{ $t(region) }}
      </option>
    </select>
    <button
      type="button"
      name="submit"
      title="submit"
      @click="submit"
      class="col-span-2 md:flex text-sky-100 bg-confirm-btn hover:bg-confirm-btn-dark rounded-full px-3 py-1"
    >
      <MagnifyingGlassIcon class="h-5 w-5 my-0.5 mx-auto" />
    </button>
  </div>
  <!-- 地區歷史紀錄 -->
  <ul v-if="historyList.length" class="grid grid-cols-3 gap-3 pb-4">
    <li v-for="(history, index) in historyList" :key="index">
      <div class="relative pb-2 text-sky-200">
        <div
          @click="updateFromHistory(history)"
          class="rounded-full duration-150 cursor-pointer border border-sky-200"
        >
          <span
            v-if="$i18n.locale === 'en'"
            class="flex text-sm py-1.5 px-2 justify-start md:justify-center hover:font-bold duration-150"
            :title="`${$t(history.region)}` + ', ' + `${$t(history.city)}`"
          >
            <p class="truncate">
              {{ $t(history.region) }}, {{ $t(history.city) }}
            </p>
          </span>
          <span
            v-else
            class="flex text-sm py-1.5 justify-center hover:font-bold duration-150"
          >
            <p class="truncate">{{ history.city }}{{ history.region }}</p>
          </span>
        </div>
        <MinusCircleIcon
          @click="deleteItem(index)"
          class="h-[19px] w-auto mr-[-2px] mb-[-2px] duration-150 cursor-pointer absolute bottom-0 right-0 hover:scale-125"
        />
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import locationData from '../location.json';
import { useCurrentWeather } from '@/store/currentWeather';
import { useWeeklyWeather } from '@/store/weeklyWeather';
import { useHistory } from '@/store/history';
import type { History } from '@/types';
import { MinusCircleIcon } from '@heroicons/vue/24/solid';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';
import { debounce } from '@/utils/debounce';

const currentWeatherStore = useCurrentWeather();
const weeklyWeatherStore = useWeeklyWeather();
const historyStore = useHistory();
const historyList = historyStore.history;
const cities = locationData;
const regions = ref(cities[0].regions);
const selectedCity = ref(cities[0].name);
const selectedRegion = ref(cities[0].regions[0]);
const selectedCityDataId = ref(cities[0].dataId);

// 若歷史紀錄有儲存地區，則取得最近一組地區的天氣資料，否則取得預設地區天氣資料
const fetchWeatherData = () => {
  if (historyStore.history.length > 0) {
    const { city, region, dataId } = historyStore.history[0];
    fetchWeather(city, region, dataId);
  } else {
    fetchWeather('宜蘭縣', '羅東鎮', cities[0].dataId);
  }
};
// 調用 weeklyWeatherStore 和 currentWeatherStore 的 fetchWeather API 函式
const fetchWeather = (city: string, region: string, dataId: string[]) => {
  weeklyWeatherStore.fetchWeather(city, region, dataId);
  currentWeatherStore.fetchWeather(city, region, dataId);
};
// 網頁立即取得天氣資料
fetchWeatherData();

// 根據選擇的縣市更新鄉鎮市區列表並顯示鄉鎮市區列表第一筆
const updateRegions = () => {
  const city = cities.find((c) => c.name === selectedCity.value);
  if (city) {
    regions.value = city.regions; // 所選取縣市的鄉鎮市區列表
    selectedRegion.value = city.regions[0]; // 第一筆鄉/鎮/區
    selectedCityDataId.value = city.dataId;
  }
};

// 使用防抖函式包裝 fetchWeather 函式
const debouncedFetchWeather = debounce(fetchWeather, 5000); // 延遲時間為5秒

// 點擊查詢按鈕，將選擇的地區加入歷史紀錄，並獲取更新該地區天氣
const submit = () => {
  const { value: city } = selectedCity;
  const { value: region } = selectedRegion;
  const { value: dataId } = selectedCityDataId;
  historyStore.addHistory(city, region, dataId);
  debouncedFetchWeather(city, region, dataId); // 調用防抖後的 fetchWeather 函式
};

// 點擊歷史紀錄中的地區，異步更新該地區天氣
const updateFromHistory = (history: History) => {
  const { city, region, dataId } = history;
  selectedCity.value = city;
  selectedCityDataId.value = dataId;
  updateRegions();
  selectedRegion.value = region;
  debouncedFetchWeather(city, region, dataId); // 調用防抖後的 fetchWeather 函式
};

// 點擊刪除歷史紀錄中所選的地區
const deleteItem = (index: number) => {
  historyStore.deleteFromHistory(index);
};
</script>
