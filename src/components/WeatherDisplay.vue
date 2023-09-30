<template>
  <div class="bg-weather-secondary p-2 mx-auto">
    <div class="flex justify-center align-center text-xl font-bold mb-4">
      <h1>
        {{ weatherList.cityName }} -
        {{ weatherList.regionName }} 未來一週天氣預報
      </h1>
    </div>
    <div class="flex flex-col gap-6">
      <div
        class="grid grid-cols-5 justify-items-center items-center py-2 rounded-lg bg-weather-primary text-white"
        v-for="el in elementItems"
      >
        <p>星期幾</p>
        <div>
          <div>{{ el.date[0] }}</div>
          <div>{{ el.date[1] }}</div>
        </div>
        <div>
          <div>
            <i :class="getIcon(el.wx[0])" alt="" width="64" height="64">
              {{ el.wx[0] }}
            </i>
          </div>
          <div>
            <i :class="getIcon(el.wx[1])" alt="" width="64" height="64">
              {{ el.wx[1] }}
            </i>
          </div>
        </div>
        <div>
          <div>{{ el.t[0] }} °C</div>
          <div>{{ el.t[1] }} °C</div>
        </div>
        <div>
          <div>{{ el.pop[0] }} %</div>
          <div>{{ el.pop[1] }} %</div>
        </div>
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
