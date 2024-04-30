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
        const response = await axios.get(
          `https://opendata.cwa.gov.tw/api/v1/rest/datastore/${dataId[1]}?`,
          {
            params: {
              Authorization: import.meta.env.VITE_API,
              locationName: region,
              elementName: 'PoP12h,T,RH,Wx',
            },
          }
        );
        // 由API獲取的指定天氣因子資料存進data
        const data =
          response.data.records.locations[0].location[0].weatherElement;

        if (data) {
          const pop12h = data[0].time;
          const t = data[1].time;
          const rh = data[2].time;
          const wx = data[3].time;
          // 取得氣象元素數值方法
          const getValue = (arr: any) => {
            return arr.map((item: any) => item.elementValue[0].value);
          };
          // 資料陣列:
          const dateArr = data[0].time.map((item: any) => item.startTime); // 每天開始時間
          const popArr = getValue(pop12h); // 降雨機率
          const tArr = getValue(t); // 平均氣溫
          const rhArr = getValue(rh); // 平均相對濕度
          const wxArr = getValue(wx); // 天氣現象

          // 排除陣列第一筆資料:因查詢時間區段跨夜(After 18:00)造成第一筆為過時資料
          [dateArr, popArr, tArr, rhArr, wxArr].forEach(
            (arr) => arr.length > 14 && arr.shift()
          );

          // 簡化日期:月/日、格式化日期
          const date = dateArr.map((d: string) =>
            d.split(' ')[0].split('-').slice(1).join('/')
          );
          const formatedDate = dateArr.map((d: string) => {
            return new Date(d);
          });

          // 使用迭代方法將陣列轉換為物件儲存於陣列中
          for (let i = 0; i < 7; i++) {
            this.elements[i] = {
              dayOfWeek: formatedDate[i * 2],
              date: date[i * 2],
              pop: [popArr[i * 2], popArr[i * 2 + 1]],
              temp: [tArr[i * 2], tArr[i * 2 + 1]],
              rh: [rhArr[i * 2], rhArr[i * 2 + 1]],
              wx: [wxArr[i * 2], wxArr[i * 2 + 1]],
            };
          }
          // 折線圖數據
          this.weeklyChartData = {
            date: date.filter((_: any, i: number) => i % 2 === 0),
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
