import { defineStore, getActivePinia } from 'pinia';
import type { History, WeatherData } from '@/types';
import axios from 'axios';

export const useStore = defineStore('store', {
  // 定義狀態
  state: () => ({
    history: <History[]>[],
    weatherData: {} as WeatherData,
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
        // 如果紀錄超過6筆，則移除最後一筆
        if (this.history.length > 6) {
          this.history.pop();
        }
      }
    },
    // 清除歷史紀錄中所選的地區
    deleteFromHistory(index: any) {
      if (this.history.length > 0) {
        this.history.splice(index, 1);
      }
    },
    async fetchWeather(city: string, region: string, dataId: string) {
      try {
        const response = await axios.get(
          `https://opendata.cwa.gov.tw/api/v1/rest/datastore/${dataId}?Authorization=${
            import.meta.env.VITE_API
          }&locationName=${region}&elementName=PoP12h,T,Wx`
        );
        //${encodeURIComponent(region)}
        console.log(dataId);
        console.log(city);
        console.log(region);

        const data =
          response.data.records.locations[0].location[0].weatherElement;
        // 取得縣市及鄉鎮市區名稱並存進weatherData
        this.weatherData.cityName = city;
        this.weatherData.regionName = region;
        // 判斷data存在之後
        if (data) {
          // 從每天開始時間獲取日期陣列
          this.weatherData.date = data[0].time.map(
            (item: any) => item.startTime
          );
          // 獲取一週降雨機率陣列
          this.weatherData.dayPoP = data[0].time.map(
            (item: any) => item.elementValue[0].value
          );
          // 獲取一週平均氣溫陣列
          this.weatherData.dayT = data[1].time.map(
            (item: any) => item.elementValue[0].value
          );
          // 獲取一週天氣描述陣列
          this.weatherData.dayWx = data[2].time.map(
            (item: any) => item.elementValue[0].value
          );

          // 排除陣列第一筆資料:因查詢時間區段跨夜(After 18:00)造成第一筆為過時資料
          if (this.weatherData.date.length > 14) {
            this.weatherData.date.shift();
          }
          if (this.weatherData.dayPoP.length > 14) {
            this.weatherData.dayPoP.shift();
          }
          if (this.weatherData.dayT.length > 14) {
            this.weatherData.dayT.shift();
          }
          if (this.weatherData.dayWx.length > 14) {
            this.weatherData.dayWx.shift();
          }
          // 取得今日時間
          //const todayDate = new Date().toString().split('GMT')[0];
        }
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
