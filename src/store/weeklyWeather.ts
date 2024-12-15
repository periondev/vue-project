import { defineStore } from 'pinia';
import type { WeeklyChartData, WeeklyElements } from '@/types';
import axios from 'axios';

export const useWeeklyWeather = defineStore('weeklyWeather', {
  state: () => ({
    elements: <WeeklyElements[]>[], // 一週天氣元素按照日期排序集合儲存於陣列中
    weeklyChartData: {} as WeeklyChartData, // 一週折線圖數據 Chart data
  }),
  actions: {
    async fetchWeather(city: string, region: string, dataId: string[]) {
      try {
        // 串接臺灣各縣市鄉鎮未來1週天氣預報API
        const response = await axios.get(
          `https://opendata.cwa.gov.tw/api/v1/rest/datastore/${dataId[1]}?`,
          {
            params: {
              Authorization: import.meta.env.VITE_API,
              LocationName: region,
              ElementName: '平均溫度,平均相對濕度,12小時降雨機率,天氣現象',
            },
          }
        );

        // 由API獲取的指定天氣因子資料存進data
        const data =
          response.data.records.Locations[0].Location[0].WeatherElement;

        if (data) {
          // 通用函數，用來提取氣象元素數值
          const extractData = (source: any, index: number, key: string) => {
            return source[index].Time.map(
              (item: any) => item.ElementValue[0][key]
            );
          };
          const tArr = extractData(data, 0, 'Temperature'); // 平均溫度
          const rhArr = extractData(data, 1, 'RelativeHumidity'); // 平均相對濕度
          const popArr = extractData(data, 2, 'ProbabilityOfPrecipitation'); // 12小時降雨機率
          const wxArr = extractData(data, 3, 'Weather'); // 天氣現象

          // 提取每天開始時間陣列:
          const dateArr = data[0].Time.map((item: any) => item.StartTime);

          // 排除陣列第一筆資料:因查詢時間區段跨夜(After 18:00)造成第一筆為過時資料
          [dateArr, popArr, tArr, rhArr, wxArr].forEach(
            (arr) => arr.length > 14 && arr.shift()
          );

          // 通用函數，用於簡化時間為:月/日
          const shortDate = dateArr.map((d: string) =>
            d.split('T')[0].split('-').slice(1).join('/')
          );
          // 通用函數，用於格式化時間為 Unix 時間戳記
          const formattedDate = dateArr.map((d: string) => {
            return new Date(d);
          });

          // 一週預報天氣元素
          for (let i = 0; i < 7; i++) {
            this.elements[i] = {
              dayOfWeek: formattedDate[i * 2],
              date: shortDate[i * 2],
              pop: [popArr[i * 2], popArr[i * 2 + 1]],
              temp: [tArr[i * 2], tArr[i * 2 + 1]],
              rh: [rhArr[i * 2], rhArr[i * 2 + 1]],
              wx: [wxArr[i * 2], wxArr[i * 2 + 1]],
            };
          }
          // 一週預報折線圖資料
          this.weeklyChartData = {
            date: shortDate.filter((_: any, i: number) => i % 2 === 0),
            dayOfWeek: formattedDate.filter((_: any, i: number) => i % 2 === 0),
            tempDay: tArr
              .filter((_: any, i: number) => i % 2 === 0)
              .map((str: string) => parseInt(str)),
            tempNight: tArr
              .filter((_: any, i: number) => i % 2 === 1)
              .map((str: string) => parseInt(str)),
          };
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
