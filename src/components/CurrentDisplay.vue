<template>
  <div
    class="flex justify-between py-3 md:py-4 px-4 text-sm md:text-base rounded-lg bg-black/20 text-white"
  >
    <div>
      <p>{{ currentData.cityName }}{{ currentData.regionName }}目前天氣</p>
      <span>
        <p>{{ currentData.wx }}</p>
      </span>
      <span>
        <p>{{ currentData.ci }}</p>
      </span>
    </div>
    <div v-if="currentData.wx">
      <i
        :class="[getIcon(currentData.wx) || 'fas fa-cloud']"
        :alt="currentData.wx"
        width="100"
        height="auto"
      >
      </i>
    </div>
    <div
      class="grid grid-cols-4 gap-5 md:gap-8 items-center align-items-center"
    >
      <span>
        <p>溫度</p>
        <p>{{ currentData.t }} °C</p>
      </span>
      <span>
        <p>濕度</p>
        <p>{{ currentData.rh }} %</p>
      </span>
      <span>
        <p>降雨機率</p>
        <p>{{ currentData.pop }} %</p>
      </span>
      <span>
        <p>風速</p>
        <p>{{ currentData.ws }} 公尺/秒</p>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCurrentWeather } from '@/store/currentWeather';
import { toRefs } from 'vue';
const store = useCurrentWeather();
const { currentData } = toRefs(store);

const getIcon = (wx: string) => {
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
    case '晴':
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
</script>
