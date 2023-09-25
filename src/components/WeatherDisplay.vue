<template>
  <div class="bg-weather-secondary p-4 rounded-lg">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold mb-4">未來一週天氣預報</h1>
      <h2 class="text-xl mb-4">
        {{ weatherList.cityName }} -- {{ weatherList.regionName }}
      </h2>
    </div>
    <div class="flex flex-col gap-4">
      <div
        class="grid grid-cols-5 justify-items-center items-center py-2 rounded-lg bg-weather-primary text-white"
        v-for="(key, value, index) in weatherList"
        :key="index"
      >
        <p>星期幾</p>
        <div>
          <div>{{ index * 2 }} | {{ weatherList.date[index * 2] }}</div>
          <div>{{ index * 2 + 1 }} | {{ weatherList.date[index * 2 + 1] }}</div>
        </div>
        <div>
          <div>
            {{ index * 2 }}
            <i
              :class="getIcon(weatherList.dayWx[index * 2])"
              alt=""
              width="64"
              height="64"
            />
            {{ weatherList.dayWx[index * 2] }}
          </div>
          <div>
            {{ index * 2 + 1 }}
            <i
              :class="getIcon(weatherList.dayWx[index * 2 + 1])"
              alt=""
              width="64"
              height="64"
            />
            {{ weatherList.dayWx[index * 2 + 1] }}
          </div>
        </div>
        <div>
          <div>{{ weatherList.dayT[index * 2] }} °C</div>
          <div>{{ weatherList.dayT[index * 2 + 1] }} °C</div>
        </div>
        <div>
          <div>{{ weatherList.dayPoP[index * 2] }} %</div>
          <div>{{ weatherList.dayPoP[index * 2 + 1] }} %</div>
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
    //const weatherList = ref(store.weatherData)
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
      getIcon,
    };
  },
});
</script>
