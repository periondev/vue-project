import { defineStore } from 'pinia';
import type { CurrentElements } from '@/types';
import axios from 'axios';

export const useCurrentWeather = defineStore('currentWeather', {
  state: () => ({
    currentData: {} as CurrentElements,
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
              elementName: 'Wx,T,RH,CI,PoP6h,WS',
            },
          }
        );
        // 由API獲取的指定天氣因子資料存進 dataNow
        const dataNow =
          response.data.records.locations[0].location[0].weatherElement;

        if (dataNow) {
          const wx = dataNow[0].time[1].elementValue[0].value; // Wx 天氣現象
          const t = dataNow[1].time[1].elementValue[0].value; // T 平均溫度
          const rh = dataNow[2].time[1].elementValue[0].value; // RH 相對濕度
          const ci = dataNow[3].time[1].elementValue[1].value; // CI 舒適度指數, 舒適度文字描述
          const pop6h = dataNow[4].time[1].elementValue[0].value; // PoP6h 6小時降雨機率
          const ws = dataNow[5].time[1].elementValue[0].value; // WS 風速 公尺/秒

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
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
