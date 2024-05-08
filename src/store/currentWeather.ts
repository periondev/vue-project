import { defineStore } from 'pinia';
import type { CurrentChartData, CurrentElements } from '@/types';
import axios from 'axios';

export const useCurrentWeather = defineStore('currentWeather', {
  state: () => ({
    currentData: {} as CurrentElements,
    currentChartData: {} as CurrentChartData, // 折線圖數據 Chart data
  }),
  actions: {
    async fetchWeather(city: string, region: string, dataId: string[]) {
      try {
        const response = await axios.get(
          `https://opendata.cwa.gov.tw/api/v1/rest/datastore/${dataId[0]}?`,
          {
            params: {
              Authorization: import.meta.env.VITE_API,
              locationName: region,
              elementName: 'Wx,AT,T,RH,CI,PoP6h,WS',
            },
          }
        );
        // 由API獲取的指定天氣因子資料存進 dataNow
        const dataNow =
          response.data.records.locations[0].location[0].weatherElement;

        if (dataNow) {
          const wx = dataNow[0].time[1].elementValue[0].value; // Wx 天氣現象
          const t = dataNow[2].time[1].elementValue[0].value; // T 平均溫度
          const rh = dataNow[3].time[1].elementValue[0].value; // RH 相對濕度
          const ci = dataNow[4].time[1].elementValue[1].value; // CI 舒適度指數, 舒適度文字描述
          const pop6h = dataNow[5].time[1].elementValue[0].value; // PoP6h 6小時降雨機率
          const ws = dataNow[6].time[1].elementValue[0].value; // WS 風速 公尺/秒

          // 將資料存進 currentData 物件
          this.currentData = {
            cityName: city,
            regionName: region,
            pop: pop6h,
            temp: t,
            rh: rh,
            wx: wx,
            ci: ci,
            ws: ws,
          };

          const TCollection = dataNow[2].time.slice(0, 25);
          const ATCollection = dataNow[1].time.slice(0, 25);
          console.log(TCollection);
          // 取得簡化日期、時間函式
          const getDate = (str: string) =>
            str.split(' ')[0].split('-').slice(1).join('/');
          const getTime = (str: string) => str.split(' ')[1].slice(0, 5);

          const dateArr = TCollection.map((el: any) => [
            getDate(el.dataTime),
            getTime(el.dataTime),
          ]);

          const tArr = TCollection.map((el: any) => el.elementValue[0].value);
          const atArr = ATCollection.map((el: any) => el.elementValue[0].value);

          // 將資料存進 currentChartData 物件
          this.currentChartData = {
            date: dateArr,
            temp: tArr,
            at: atArr,
          };
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
