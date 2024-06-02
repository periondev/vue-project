<template>
  <LocationMenu />
  <History />
  <CurrentWeather />
  <ChartDisplay />
  <WeeklyWeather />
</template>

<script setup lang="ts">
import { useHistory } from '@/store/history';
import LocationMenu from '@/components/LocationMenu.vue';
import History from '@/components/History.vue';
import CurrentWeather from '@/components/CurrentWeather.vue';
import ChartDisplay from '@/components/ChartDisplay.vue';
import WeeklyWeather from '@/components/WeeklyWeather.vue';
const historyStore = useHistory();
historyStore.initialFetchWeather(); // 網頁取得初始天氣資料
</script>
