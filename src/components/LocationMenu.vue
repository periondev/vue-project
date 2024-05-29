<template>
  <div class="grid grid-cols-2 md:flex justify-center gap-3 my-6">
    <!-- 選擇縣市 -->
    <select
      name="city"
      title="select city"
      autocomplete="off"
      v-model="selectedCity"
      @change="historyStore.setUpdateRegions(selectedCity)"
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
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useHistory } from '@/store/history';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';
import { debounce } from '@/utils/debounce';

const historyStore = useHistory();
const { cities, regions, selectedCity, selectedRegion, selectedCityDataId } =
  storeToRefs(historyStore);

// 防抖函式
const debouncedFetchWeather = debounce(historyStore.onFetchWeather, 5000); // 延遲時間為5秒

// 點擊查詢按鈕，將選擇的地區加入歷史紀錄，並獲取更新該地區天氣
const submit = () => {
  const { value: city } = selectedCity;
  const { value: region } = selectedRegion;
  const { value: dataId } = selectedCityDataId;
  historyStore.addHistory(city, region, dataId);
  debouncedFetchWeather(city, region, dataId); // 調用防抖函式
};
</script>
