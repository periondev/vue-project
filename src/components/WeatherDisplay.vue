<template>
  <div
    class="flex justify-center align-center text-xl font-bold my-4 p-2 text-white rounded-lg bg-sky-600"
  >
    <h1>
      {{ weatherList.cityName }}{{ weatherList.regionName }} - 未來一週天氣預報
    </h1>
  </div>
  <div class="flex flex-col gap-6 text-center">
    <div
      class="grid grid-cols-5 justify-items-center items-center py-2 rounded-lg bg-weather-secondary text-white"
      v-for="el in elementItems"
    >
      <div>
        <p>{{ el.dayOfWeek }}</p>
        <p>{{ el.date }}</p>
      </div>
      <div>
        <p class="text-sm">時間</p>
        <div>{{ el.time[0] }}</div>
        <div>{{ el.time[1] }}</div>
      </div>
      <div>
        <p class="text-sm">天氣現象</p>
        <div>
          <i :class="getIcon(el.wx[0])" alt="" width="64" height="64"> </i>
          {{ el.wx[0] }}
        </div>
        <div>
          <i :class="getIcon(el.wx[1])" alt="" width="64" height="64"> </i>
          {{ el.wx[1] }}
        </div>
      </div>
      <div>
        <p class="text-sm">平均溫度</p>
        <div>{{ el.t[0] }} °C</div>
        <div>{{ el.t[1] }} °C</div>
      </div>
      <div>
        <p class="text-sm">降雨機率</p>
        <div>{{ el.pop[0] === ' ' ? '-' : el.pop[0] }} %</div>
        <div>{{ el.pop[1] === ' ' ? '-' : el.pop[1] }} %</div>
      </div>
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
