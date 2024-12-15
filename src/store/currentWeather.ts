import { defineStore } from 'pinia';
import type { CurrentChartData, CurrentElements } from '@/types';
import axios from 'axios';

export const useCurrentWeather = defineStore('currentWeather', {
  state: () => ({
    currentData: {} as CurrentElements,
    currentChartData: {} as CurrentChartData, // 逐三小時折線圖數據 3-hour Chart data
  }),
  actions: {
    async fetchWeather(city: string, region: string, dataId: string[]) {
      try {
        // 串接臺灣各縣市鄉鎮未來3天天氣預報API
        const response = await axios.get(
          `https://opendata.cwa.gov.tw/api/v1/rest/datastore/${dataId[0]}?`,
          {
            params: {
              Authorization: import.meta.env.VITE_API,
              LocationName: region,
              ElementName:
                '溫度,相對濕度,體感溫度,舒適度指數,風速,3小時降雨機率,天氣現象',
            },
          }
        );

        // 由API獲取的指定天氣因子資料存進 dataNow
        const dataNow =
          response.data.records.Locations[0].Location[0].WeatherElement;

        if (dataNow) {
          // 通用函數，用來提取即時天氣元素數值
          const extractData = (source: any, index: number, key: string) => {
            return source[index].Time[1].ElementValue[0][key];
          };

          const t = extractData(dataNow, 0, 'Temperature'); // 溫度
          const rh = extractData(dataNow, 1, 'RelativeHumidity'); // 相對濕度
          const ci = extractData(dataNow, 3, 'ComfortIndexDescription'); // 舒適度指數, 舒適度文字描述
          const ws = extractData(dataNow, 4, 'WindSpeed'); // 風速 (公尺/秒)
          const pop3h = extractData(dataNow, 5, 'ProbabilityOfPrecipitation'); // 3小時降雨機率
          const wx = extractData(dataNow, 6, 'Weather'); // 天氣現象

          // 將資料存進 currentData 物件
          this.currentData = {
            cityName: city,
            regionName: region,
            pop: pop3h,
            temp: t,
            rh: rh,
            wx: wx,
            ci: ci,
            ws: ws,
          };

          // 折線圖-溫度、體感溫度各25筆資料集 (更新為逐1小時資料?)
          const TCollection = dataNow[0].Time.slice(0, 25);
          const ATCollection = dataNow[2].Time.slice(0, 25);

          // 通用函數，用來簡化日期、簡化時間
          const getDate = (str: string) =>
            str.split('T')[0].split('-').slice(1).join('/');
          const getTime = (str: string) => str.split('T')[1].slice(0, 2);

          // 逐3小時的日期時間陣列 (更新為逐1小時資料?)
          const dateArr = TCollection.map((el: any, i: number) => {
            // 陣列中每逢8倍數索引值的陣列中加入時間、日期兩個字串，其餘僅時間字串
            return i % 8 === 0
              ? [getTime(el.DataTime), getDate(el.DataTime)]
              : [getTime(el.DataTime)];
          });

          const tArr = TCollection.map(
            (el: any) => el.ElementValue[0].Temperature
          );
          const atArr = ATCollection.map(
            (el: any) => el.ElementValue[0].ApparentTemperature
          );

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
