<template>
  <div
    class="flex justify-center align-center text-xl my-4 py-2 text-white rounded-lg bg-weather-primary"
  >
    <h1>{{ currentData.cityName }}{{ currentData.regionName }}</h1>
  </div>
  <div
    class="flex flex-col justify-between p-3 md:px-12 rounded-lg bg-black/20"
  >
    <div class="font-bold text-lg text-white">
      <p>目前天氣</p>
    </div>
    <div class="flex flex-col text-sm md:text-base text-white">
      <div class="flex justify-between my-2 mx-4 md:mx-8">
        <div class="flex flex-row items-center gap-3 md:gap-10">
          <WeatherImage v-if="currentData.wx" :weather="currentData.wx" />
          <div>
            <span>
              <p class="text-4xl md:text-5xl font-bold">
                {{ currentData.t }} °C
              </p>
            </span>
            <span>
              <p>{{ currentData.wx }}</p>
            </span>
            <span>
              <p>{{ currentData.ci }}</p>
            </span>
          </div>
        </div>
        <div class="grid grid-rows-3 text-left">
          <span>
            <p>風速 : {{ currentData.ws }} 公尺/秒</p>
          </span>
          <span>
            <p>濕度 : {{ currentData.rh }} %</p>
          </span>
          <span>
            <p>降雨機率 : {{ currentData.pop }} %</p>
          </span>
        </div>
      </div>
      <div class="flex justify-end">
        <p>{{ currentData.timestamp }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCurrentWeather } from '@/store/currentWeather';
import WeatherImage from './WeatherImage.vue';
import { toRefs } from 'vue';
const store = useCurrentWeather();
const { currentData } = toRefs(store);
</script>
