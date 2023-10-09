<template>
  <div
    class="flex justify-center align-center text-xl font-bold my-4 p-3 text-white rounded-lg bg-sky-700"
  >
    <h1>{{ weatherList.cityName }}{{ weatherList.regionName }}一週天氣預報</h1>
  </div>
  <div
    class="grid grid-cols-7 py-2 justify-items-center text-center font-bold text-sm text-white"
  >
    <p>日期</p>
    <p>時間</p>
    <p class="col-span-2">天氣現象</p>
    <p>平均溫度</p>
    <p>平均濕度</p>
    <p>降雨機率</p>
  </div>
  <div class="flex flex-col gap-6">
    <div
      class="grid grid-cols-7 justify-items-center items-center text-sm md:text-base py-2 rounded-lg bg-weather-secondary text-white"
      v-for="el in elementItems"
    >
      <span>
        <p>{{ el.date }}</p>
        <p>{{ el.dayOfWeek }}</p>
      </span>
      <span>
        <p>{{ el.time[0] }}</p>
        <p>{{ el.time[1] }}</p>
      </span>
      <div class="col-span-2">
        <span class="flex py-1">
          <i :class="getIcon(el.wx[0])" :alt="el.wx[0]" width="64" height="64">
          </i>
          <p class="text-xs md:text-sm pl-1">{{ el.wx[0] }}</p>
        </span>
        <span class="flex py-1">
          <i :class="getIcon(el.wx[1])" :alt="el.wx[1]" width="64" height="64">
          </i>
          <p class="text-xs md:text-sm pl-1">{{ el.wx[1] }}</p>
        </span>
      </div>
      <span>
        <p>{{ el.t[0] }} °C</p>
        <p>{{ el.t[1] }} °C</p>
      </span>
      <span>
        <p>{{ el.rh[0] }} %</p>
        <p>{{ el.rh[1] }} %</p>
      </span>
      <span>
        <p>{{ el.pop[0] === ' ' ? '-' : el.pop[0] }} %</p>
        <p>{{ el.pop[1] === ' ' ? '-' : el.pop[1] }} %</p>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from '@/store/store';
export default defineComponent({
  name: 'WeatherDisplay',
  setup() {
    const store = useStore();

    // 根據天氣現象回傳對應的fontawesome圖標，僅供參考，以文字描述為準。
    const getIcon = (wx: string) => {
      // 天氣現象描述資訊參考: https://opendata.cwa.gov.tw/opendatadoc/MFC/A0012-001.pdf
      // 僅大致分類列出，並將相似的天氣歸為一種圖標

      if (wx.includes('雷陣雨')) {
        return 'fas fa-cloud-bolt';
      }
      if (wx.includes('短暫雨')) {
        return 'fas fa-cloud-rain';
      }
      if (wx.includes('短暫陣雨')) {
        return 'fas fa-cloud-rain';
      }
      if (wx.includes('雪')) {
        return 'fas fa-snowflake';
      }
      switch (wx) {
        case '晴天':
          return 'fas fa-sun';
        case '多雲':
          return 'fas fa-cloud';
        case '陰天':
          return 'fas fa-cloud';
        case '陰時多雲':
          return 'fas fa-cloud-sun';
        case '多雲時陰':
          return 'fas fa-cloud-sun';
        case '多雲時晴':
          return 'fas fa-cloud-sun';
        case '晴時多雲':
          return 'fas fa-cloud-sun';
        default:
          return 'fas fa-cloud';
      }
    };
    return {
      weatherList: store.weatherData,
      elementItems: store.elements,
      getIcon,
    };
  },
});
</script>
