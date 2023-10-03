import { defineStore, getActivePinia } from 'pinia';
import type { History, WeatherData, Elements } from '@/types';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/zh-tw';
moment.locale('zh-tw');
export const useStore = defineStore('store', {
  // 定義狀態
  state: () => ({
    history: <History[]>[],
    weatherData: {} as WeatherData,
    elements: <Elements[]>[],
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
        // 將由API獲取的大致資料存進data
        const data =
          response.data.records.locations[0].location[0].weatherElement;
        console.log(data);
        // 取得縣市及鄉鎮市區名稱並存進weatherData
        this.weatherData.cityName = city;
        this.weatherData.regionName = region;
        // 判斷data存在之後
        if (data) {
          // 獲取一週每天開始時間的陣列
          const dateArr = data[0].time.map((item: any) => item.startTime);
          // 獲取一週降雨機率陣列
          const popArr = data[0].time.map(
            (item: any) => item.elementValue[0].value
          );
          // 獲取一週平均氣溫陣列
          const tArr = data[1].time.map(
            (item: any) => item.elementValue[0].value
          );
          // 獲取一週天氣描述陣列
          const wxArr = data[2].time.map(
            (item: any) => item.elementValue[0].value
          );

          // 獲取星期幾

          // 排除陣列第一筆資料:因查詢時間區段跨夜(After 18:00)造成第一筆為過時資料
          dateArr.length > 14 ? dateArr.shift() : dateArr;
          popArr.length > 14 ? popArr.shift() : popArr;
          tArr > 14 ? tArr.shift() : tArr;
          wxArr > 14 ? wxArr.shift() : wxArr;
          // 將所有天氣元素按照一週時間排序集合成七個物件儲存於陣列中
          // 使用遞歸方式將數個陣列轉換為數個物件儲存於陣列格式
          for (let i = 0; i < 7; i++) {
            const day = moment(dateArr[i * 2]);
            const date = dateArr.map((d: string) => d.split(' ')[0]);
            const time = dateArr.map((d: string) => d.split(' ')[1]);
            this.elements[i] = {
              dayOfWeek: day.locale('zh-tw').format('dddd'),
              date: date[i * 2],
              time: [time[i * 2], time[i * 2 + 1]],
              pop: [popArr[i * 2], popArr[i * 2 + 1]],
              t: [tArr[i * 2], tArr[i * 2 + 1]],
              wx: [wxArr[i * 2], wxArr[i * 2 + 1]],
            };
          }
          console.log(this.elements);

          // 使用moment從日期轉換為星期幾:
          // const date = moment('2023-10-02 12:00:00');
          // const dayOfWeek = date.locale('zh-tw').format('dddd');
          // console.log(dayOfWeek);
        }
        //console.log(this.weatherData);
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
