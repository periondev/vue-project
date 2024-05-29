<template>
  <div
    class="grid grid-cols-7 py-2 items-center text-center text-sm text-sky-200"
  >
    <p>{{ $t('date') }}</p>
    <p>{{ $t('time') }}</p>
    <p class="col-span-2">{{ $t('weather') }}</p>
    <p>{{ $t('humidity') }}</p>
    <p>{{ $t('pop') }}</p>
    <p>{{ $t('temp') }}</p>
  </div>
  <div class="flex flex-col gap-2 md:gap-3">
    <div
      class="grid grid-cols-7 justify-items-center items-center py-3 text-sm rounded-lg bg-black/20 text-white"
      v-if="elementItems"
      v-for="el in elementItems"
    >
      <span class="text-center">
        <p>{{ el.date }}</p>
        <i18n-d tag="p" :value="el.dayOfWeek" format="dayOfWeek"></i18n-d>
      </span>
      <span class="text-center">
        <p>{{ $t('day') }}</p>
        <p>{{ $t('night') }}</p>
      </span>
      <div class="col-span-2 gap-1">
        <span class="flex flex-row gap-1 items-start">
          <WeatherImage
            :weather="el.wx[0]"
            :hours="8"
            :width="22"
            :height="22"
          />
          <p>{{ $t(el.wx[0]) }}</p>
        </span>
        <span class="flex flex-row gap-1 items-start">
          <WeatherImage
            :weather="el.wx[1]"
            :hours="20"
            :width="22"
            :height="22"
          />
          <p>{{ $t(el.wx[1]) }}</p>
        </span>
      </div>
      <span class="text-right">
        <p>{{ el.rh[0] }}%</p>
        <p>{{ el.rh[1] }}%</p>
      </span>
      <span class="text-right">
        <p>{{ el.pop[0] === ' ' ? '-' : el.pop[0] }}%</p>
        <p>{{ el.pop[1] === ' ' ? '-' : el.pop[1] }}%</p>
      </span>
      <span class="text-right">
        <p>{{ el.temp[0] }}°</p>
        <p>{{ el.temp[1] }}°</p>
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
