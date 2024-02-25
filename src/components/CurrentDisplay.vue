<template>
  <div
    class="flex justify-center align-center text-xl py-2 text-white rounded-t-lg bg-weather-primary"
  >
    <h1>{{ currentData.cityName }}{{ currentData.regionName }}</h1>
  </div>
  <div
    class="flex flex-col justify-between p-3 md:px-12 rounded-b-lg text-sm md:text-base bg-black/20 text-white"
  >
    <div class="font-bold text-lg">
      <p>{{ $t('current_weather') }}</p>
    </div>
    <div class="flex flex-col">
      <div class="flex justify-between my-1 mx-3 md:mx-8">
        <div
          v-if="currentData.wx && currentData.t && currentData.ci"
          class="flex flex-row items-center gap-3 md:gap-10"
        >
          <WeatherImage :weather="currentData.wx" class="h-20 md:h-24 w-auto" />
          <div>
            <span class="flex flex-row items-start font-bold md:gap-2">
              <p class="text-5xl">{{ currentData.t }}</p>
              <p class="text-base md:text-5xl">°C</p>
            </span>
            <span>
              <p>{{ $t(currentData.wx) }}</p>
            </span>
            <span>
              <p>{{ $t(currentData.ci) }}</p>
            </span>
          </div>
        </div>
        <div class="h-20 border-l-4 rounded opacity-0 md:opacity-25"></div>
        <div class="flex flex-col text-left gap-1">
          <span>
            <p>{{ $t('wind_speed') }} : {{ currentData.ws }} {{ $t('m/s') }}</p>
          </span>
          <span>
            <p>{{ $t('humidity') }} : {{ currentData.rh }} %</p>
          </span>
          <span>
            <p>{{ $t('pop') }} : {{ currentData.pop }} %</p>
          </span>
        </div>
      </div>
      <div class="flex justify-end">
        <p>{{ $d(Date.now(), 'long') }}</p>
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
