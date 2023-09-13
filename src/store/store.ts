import { defineStore, getActivePinia } from 'pinia';
import type { History, Weather } from '@/types';
import axios from 'axios';
export const useStore = defineStore('store', {
  // 定義狀態
  state: () => ({
    history: <History[]>[],
    weather: <Weather[]>[],
  }),
  // 定義方法
  actions: {
    // 添加一筆紀錄到狀態中
    addHistory(city: string, region: string, dataId: string) {
      // 檢查是否已經存在相同的紀錄
      const exist = this.history.find(
        (r) => r.city === city && r.region === region
      );
      if (!exist) {
        // 如果不存在，則將紀錄推入陣列的開頭
        this.history.unshift({ city, region, dataId });
        // 如果紀錄超過7筆，則移除最後一筆
        if (this.history.length > 7) {
          this.history.pop();
        }
      }
    },
    async fetchWeather(city: string, region: string, dataId: string) {
      try {
        const response = await axios.get(
          `https://opendata.cwb.gov.tw/api/v1/rest/datastore/${dataId}?Authorization=CWB-7C3ADE05-5381-4590-A629-C4EE5650DF8B&locationName=${encodeURIComponent(
            region
          )}&elementName=T,MaxT,MinT,RH,Wx,PoP`
        );
        const data = response.data.records.locations[0].location[0];
        this.weather = data.weatherElement.map((element: any) => {
          return {
            locationName: data.locationName,
            startTime: element.time[0].startTime,
            endTime: element.time[0].endTime,
            parameter: element.time[0].elementValue,
          };
        });
      } catch (error) {
        console.error(error);
      }
    },

    // 重設全局store狀態的方法
    resetAllStores() {
      const activepinia = getActivePinia();
      if (activepinia) {
        Object.entries(activepinia.state.value).forEach(
          ([storeName, state]) => {
            const storeDefinition = defineStore(storeName, state);
            const store = storeDefinition(activepinia);
            store.$reset();
          }
        );
      }
    },
  },
  persist: true,
});
