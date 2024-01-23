<template>
  <div
    class="grid grid-cols-7 mt-3 py-2 justify-items-center text-center font-bold text-xs md:text-sm text-sky-200"
  >
    <p>日期</p>
    <p>時間</p>
    <p class="col-span-2">天氣現象</p>
    <p>濕度</p>
    <p>降雨機率</p>
    <p>溫度</p>
  </div>
  <div class="flex flex-col gap-2 md:gap-3">
    <div
      class="grid grid-cols-7 justify-items-center items-center py-3 md:py-4 text-sm md:text-base rounded-lg bg-black/20 text-white"
      v-for="el in elementItems"
    >
      <span class="text-center">
        <p>{{ el.date }}</p>
        <p>{{ el.dayOfWeek }}</p>
      </span>
      <span>
        <p>白天</p>
        <p>晚上</p>
      </span>
      <div class="col-span-2 gap-1">
        <span class="flex flex-row gap-1 items-center">
          <WeatherImage
            v-if="el.wx[0]"
            :weather="el.wx[0]"
            class="h-4 md:h-5 w-auto"
          />
          <p>{{ el.wx[0] }}</p>
        </span>
        <span class="flex flex-row gap-1 items-center">
          <WeatherImage
            v-if="el.wx[1]"
            :weather="el.wx[1]"
            class="h-4 md:h-5 w-auto"
          />
          <p>{{ el.wx[1] }}</p>
        </span>
      </div>
      <span>
        <p>{{ el.rh[0] }} %</p>
        <p>{{ el.rh[1] }} %</p>
      </span>
      <span>
        <p>{{ el.pop[0] === ' ' ? '-' : el.pop[0] }} %</p>
        <p>{{ el.pop[1] === ' ' ? '-' : el.pop[1] }} %</p>
      </span>
      <span>
        <p>{{ el.t[0] }} °C</p>
        <p>{{ el.t[1] }} °C</p>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWeeklyWeather } from '@/store/weeklyWeather';
import WeatherImage from './WeatherImage.vue';
const store = useWeeklyWeather();
const elementItems = store.elements;
</script>
