import { defineStore } from 'pinia';
import type { CurrentData } from '@/types';
import axios from 'axios';
import moment from 'moment';
moment.updateLocale('zh-tw', {
  weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
});

export const useCurrentWeather = defineStore('currentWeather', {
  state: () => ({
    currentData: {} as CurrentData,
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
          const wx = dataNow[0].time[1].elementValue[0].value; // 天氣現象
          const t = dataNow[1].time[1].elementValue[0].value; // 溫度
          const rh = dataNow[2].time[1].elementValue[0].value; // 相對濕度
          const ci = dataNow[3].time[1].elementValue[1].value; // 舒適度文字描述
          const pop6h = dataNow[4].time[1].elementValue[0].value; // 6小時降雨機率
          const ws = dataNow[5].time[1].elementValue[0].value; // 風速 公尺/秒

          // 取得現在時間、格式化時間、創建時間戳記
          const now = moment();
          const dayOfWeek = now.locale('zh-tw').format('dddd');
          const date = now.format('YYYY年M月D日');
          const time = now.format('HH:mm');
          const timestamp = date + ' ' + dayOfWeek + ' ' + time;

          // 將資料存進 currentData 物件
          this.currentData = {
            cityName: city,
            regionName: region,
            timestamp: timestamp,
            pop: pop6h, // PoP6h 降雨機率
            t: t, // T 平均溫度
            rh: rh, // RH 相對濕度
            wx: wx, // Wx 天氣現象
            ci: ci, // CI 舒適度指數
            ws: ws, // WS 風速 公尺/秒
          };
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
