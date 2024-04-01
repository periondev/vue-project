import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useCurrentWeather } from '@/store/currentWeather';
import { useWeeklyWeather } from '@/store/weeklyWeather';
import type { History } from '@/types';
import locationData from '../location.json';
const cities = locationData;

export const useHistory = defineStore('history', {
  state: () => ({
    history: <History[]>[],
    cities: ref(cities),
    regions: ref(cities[0].regions),
    selectedCity: ref(cities[0].name),
    selectedRegion: ref(cities[0].regions[0]),
    selectedCityDataId: ref(cities[0].dataId),
  }),
  actions: {
    setUpdateRegions(city: string) {
      // 根據選擇的縣市更新鄉鎮
      const setCity = cities.find((c) => c.name === city);
      if (setCity) {
        this.regions = setCity.regions;
        this.selectedRegion = setCity.regions[0];
        this.selectedCityDataId = setCity.dataId;
      }
    },
    setSelectedLocation(city: string, region: string, dataId: string[]) {
      this.selectedCity = city;
      this.selectedRegion = region;
      this.selectedCityDataId = dataId;
    },
    onFetchWeather(city: string, region: string, dataId: string[]) {
      const currentWeather = useCurrentWeather();
      const weeklyWeather = useWeeklyWeather();
      weeklyWeather.fetchWeather(city, region, dataId);
      currentWeather.fetchWeather(city, region, dataId);
    },
    // 取得上次查詢地區的天氣資料，否則取得初始地區天氣資料
    initialFetchWeather() {
      this.onFetchWeather(
        this.selectedCity,
        this.selectedRegion,
        this.selectedCityDataId
      );
    },
    addHistory(city: string, region: string, dataId: string[]) {
      // 檢查紀錄是否已存在相同的地區
      const exist = this.history.find(
        (r) => r.city === city && r.region === region
      );
      if (!exist) {
        // 如果不存在，則將地區推入紀錄陣列的開頭
        this.history.unshift({ city, region, dataId });
        // 如果紀錄超過6筆，則移除最後一筆
        if (this.history.length > 6) {
          this.history.pop();
        }
      }
    },
    deleteFromHistory(index: any) {
      if (this.history.length > 0) {
        this.history.splice(index, 1);
      }
    },
  },
  persist: true,
});
