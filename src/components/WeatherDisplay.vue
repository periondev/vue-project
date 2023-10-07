<template>
  <div
    class="flex justify-center align-center text-xl font-bold my-4 p-3 text-white rounded-lg bg-sky-600"
  >
    <h1>{{ weatherList.cityName }}{{ weatherList.regionName }}一週天氣預報</h1>
  </div>
  <div
    class="grid grid-cols-6 py-2 justify-items-center text-center font-bold text-sm text-white"
  >
    <p>日期</p>
    <p>時間</p>
    <p>天氣現象</p>
    <p>平均溫度</p>
    <p>平均濕度</p>
    <p>降雨機率</p>
  </div>
  <div class="flex flex-col gap-6">
    <div
      class="grid grid-cols-6 justify-items-center items-center text-center py-2 rounded-lg bg-weather-secondary text-white"
      v-for="el in elementItems"
    >
      <span>
        <p>{{ el.dayOfWeek }}</p>
        <p>{{ el.date }}</p>
      </span>
      <span>
        <p>{{ el.time[0] }}</p>
        <p>{{ el.time[1] }}</p>
      </span>
      <div>
        <span>
          <i
            :class="getIcon(el.wx[0])"
            :title="el.wx[0]"
            width="64"
            height="64"
          >
          </i>
          <p class="text-sm">{{ el.wx[0] }}</p>
        </span>
        <span>
          <i
            :class="getIcon(el.wx[1])"
            :title="el.wx[1]"
            width="64"
            height="64"
          >
          </i>
          <p class="text-sm">{{ el.wx[1] }}</p>
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
    // 根據天氣現象回傳對應的fontawesome圖標
    const getIcon = (wx: string) => {
      switch (wx) {
        case '晴':
          return 'fas fa-sun';
        case '多雲':
          return 'fas fa-cloud';
        case '陰':
          return 'fas fa-cloud';
        case '陰短暫雨':
          return 'fas fa-cloud-showers-heavy';
        case '陰時多雲':
          return 'fas fa-cloud-sun';
        case '多雲時陰':
          return 'fas fa-cloud-sun';
        case '多雲短暫雨':
          return 'fas fa-cloud-rain';
        case '多雲時晴':
          return 'fas fa-cloud-sun';
        case '晴時多雲':
          return 'fas fa-cloud-sun';
        case '陰有雷雨':
          return 'fas fa-poo-storm';
        default:
          return '';
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
